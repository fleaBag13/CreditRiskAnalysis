import React from "react";

function HumanBubble({ text }) {
  return (
    <div className="flex justify-end">
      <div className="bubble text-white bg-blue-600 border rounded-3xl inline-block">
        {text}
      </div>
    </div>
  );
}

export default HumanBubble;
