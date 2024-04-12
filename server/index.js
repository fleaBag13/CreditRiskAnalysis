const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { PDFLoader } = require("langchain/document_loaders/fs/pdf");
const { openai } = require("./openai.js");
const { custData } = require("./controller/customer");

const app = express();
dotenv.config();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "30 mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30 mb", extended: true }));

app.get("/", (req, res) => {
  console.log("Hello World");
});

app.post("/customer", custData);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

let store = null;

const history = [
  {
    role: "system",
    content:
      "You are an AI guide for GitHub repositories. Assist users by providing information, answering queries, and performing basic actions within the repository. Offer guidance on navigation, code exploration, version control, issue management, collaboration, and common tasks. Aim to enhance the user experience for both beginners and experienced developers.",
  },
];

const createStore = (docs) => {
  return MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());
};

// Function to load PDF documents from a local folder
const docsFromLocalPDFs = async (folderPath) => {
  const files = fs.readdirSync(folderPath);
  const pdfFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === ".pdf"
  );
  const allDocs = [];

  for (const file of pdfFiles) {
    const pdfPath = path.join(folderPath, file);
    const loader = new PDFLoader(pdfPath);
    const docs = await loader.loadAndSplit(
      new CharacterTextSplitter({
        separator: "",
        chunkSize: 2500,
        chunkOverlap: 200,
      })
    );
    allDocs.push(...docs);
  }

  return allDocs;
};

// Load documents from local PDFs and create a store
const loadStoreFromLocalPDFs = async (folderPath) => {
  const pdfDocs = await docsFromLocalPDFs(folderPath);
  return createStore([...pdfDocs]);
};

const formatMessage = (question, results) => {
  return {
    role: "Bank chatbot",
    content: `Answer based on context provided , if not found just say Contact nearest branch office.
          Question: ${question}
    
          Context: ${results.map((r) => r.pageContent).join("\n")}`,
  };
};

const newMessage = async (message) => {
  // Your existing implementation remains unchanged
};

app.post("/loadStore", async (req, res) => {
  const  folderPath  = req.body.folderPath;
  try {
    if (!folderPath) {
      throw new Error("Invalid request: Missing folder path.");
    }
    store = await loadStoreFromLocalPDFs(folderPath);
    res.status(200).json({ message: "Store loaded" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

// Modify query endpoint to handle queries after loading store
app.post("/query", async (req, res) => {
  try {
    const question = req.body.question;
    // const  folderPath  = req.body.folderPath;
    // if (!folderPath) {
    //   throw new Error("Invalid request: Missing folder path.");
    // }
    // store = await loadStoreFromLocalPDFs(folderPath);
    const results = await store.similaritySearch(question, 2);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant, answer any questions to the best of your ability.",
        },
        {
          role: "user",
          content: `Answer the following question using the provided context.
          Question: ${question}
    
          Context: ${results.map((r) => r.pageContent).join("\n")}`,
        },
      ],
    });
    console.log(response.choices[0].message.content);
    const answer = await response.choices[0].message.content;
    const sources = await results.map((r) => r.metadata.source).join(", ");

    res.json({ answer, sources });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
