import React from "react";
import "../index.css";
const Predict = () => {
  return (
    <div className="predict h-screen">
      <h1 className="text-2xl ">Predict</h1>
      <div className="form flex flex-col mx-auto  w-1/2 border-2 border-black rounded-md p-4">
        <input
          clasnnName=""
          type="text"
          placeholder="Dependent people"
        />
        <input type="text" placeholder="Salary" />
        <input type="text" placeholder="Expenditure" />
        <input type="text" placeholder="chippi chippi chappa chappa" />
        <button className="bg-green-500">Predict</button>
      </div>
    </div>
  );
};

export default Predict;
