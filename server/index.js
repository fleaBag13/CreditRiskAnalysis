const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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
