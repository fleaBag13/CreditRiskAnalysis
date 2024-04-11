import "../App.css";
// import { TfiGithub } from "react-icons/tfi";
// import ReactMarkdown from "react-markdown";

function AIBubble({ text }) {
  return (
    <div className="bubble-ai bg-white border rounded-3xl inline-block">
      <div className="bubble-logo">
        {/* <TfiGithub /> <p>GitHub GPT</p> */}
      </div>
      <div className="bubble-text">
        {text}
      </div>
    </div>
  );
}

export default AIBubble;