import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { TfiGithub } from "react-icons/tfi";
import "./QandA.css";
import { useState } from "react";
import AIBubble from "./AIBubble";
import HumanBubble from "./HumanBubble";
import axios from "axios";
import HashLoader from "react-spinners/HashLoader";
import { useEffect } from "react";

const QandA = () => {
  const payload2 = {folderPath:"./"}
  useEffect(() => {
    let response  = axios.post("http://localhost:3001/loadStore",payload2)
    console.log(response);
  }, []);
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);

  const handleSubmit = async () => {
    setResponseLoading(true);
    setChats([...chats, { role: "user", text: text }]);
    let payload = { question: text };
    setText("");
    let response = await axios.post("http://localhost:3001/query", payload);
    console.log(response);
    setChats((chats) => [
      ...chats,
      { role: "bot", text: response.data.answer},
    ]);
    setResponseLoading(false);
  };
  return (
    <div className="chat-interface">
      <div className="navbar flex justify-center items-center">
        {/* <TfiGithub className="company-icon" /> */}
        <h4 className="company-name">Chatbot</h4>
      </div>

      <div className="outer-container section">
        <div className="output-window custom-scrollbar">
        <AIBubble text={"Hello, I am a chatbot. How can I help you?"} />
          {chats.map((ele) =>
            ele.role === "user" ? (
              <HumanBubble key={ele.id} text={ele.text} />
            ) : (
              <AIBubble key={ele.id} text={ele.text} />
            )
          )}
        </div>
        <div className="input-window">
          <HashLoader
            className="response-loader"
            color={"white"}
            loading={responseLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="input-textbox"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
            value={text}
            placeholder="E.g. Explain <something> from the <filename.py> file. "
          />
          
          <div
            className="send-button"
            onClick={() => {
              handleSubmit();
            }}
          >
            <AiOutlineSend className="send-icon" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA;
