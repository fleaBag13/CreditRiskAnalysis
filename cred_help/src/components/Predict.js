import React from "react";
import "../index.css";
import { layout } from "../style";
import typesOfEmployment from "../constants";
import { useState } from "react";
import axios from "axios";

const Predict = () => {

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: 0,
    income: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server with the form data
      await axios.post("http://localhost:3001/submit-form", formData);

      // Optionally, you can redirect or perform any other action upon successful submission
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="predict h-screen font-poppins bg-primary">
      <h1 className="text-2xl ">Predict</h1>
      <div className={`${layout.block1} overflow-y-auto h-[600px] form flex flex-col mx-auto w-1/2 border-2 border-slate-300 rounded-md p-4`}>

        <input placeholder="Name" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3" type="text" name="name" value={formData.name} onChange={handleChange}/>
        <div className="grid grid-cols-2 gap-4">
          <select name="gender" onChange={handleChange} placeholder="Gender" className={`w-full rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <input type="text" name="age" onChange={handleChange} placeholder="Age" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Income" onChange={handleChange} className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
          <select name="income_stability" className={`w-full rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Income Stability</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select name="profession" className={`w-full rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Profession</option>
            <option value="Businessman">Businessman</option>
            <option value="Commercial Associate">Commercial Associate</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Pensioner">Pensioner</option>
            <option value="State Servant">State Servant</option>
            <option value="Student">Student</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Working">Working</option>
          </select>
          <select name="employment" className={`w-full oveflow-y rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Type Of Employment</option>
            {typesOfEmployment.map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))}
          </select>
        </div>
          
        <select name="location" className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden select>Location</option>
          <option value="Semi-Urban">Semi-Urban</option>
          <option value="Rural">Rural</option>
          <option value="Urban">Urban</option>
          <option value="Commercial Associate">Commercial Associate</option>
        </select>
        <input type="text" placeholder="Loan Expenses" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <div className="grid grid-cols-2 gap-4">
        <select name="fixed" className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden selected>Fixed Cost</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        <select name="variable" className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden selected>Variable Cost</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        </div>
        <input type="number" placeholder="Dependents" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <input type="number" placeholder="Credit Score" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <input type="number" placeholder="Number of Defaults" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <select name="creditCard" className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden selected>Credit Card</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="unpossessed">Unpossessed</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Property Age" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
          <select name="propertyType" className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Property Type</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <select name="propertyLocation" className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Property Location</option>
            <option value="Rural">Rural</option>
            <option value="Semi-Urban">Semi-Urban</option>
            <option value="Urban">Urban</option>
        </select>
        <input type="number" placeholder="Property Price" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        </div>

        <input type="number" placeholder="Number of Co-applicants" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        
        <button className="bg-primary rounded text-secondary py-2">Predict</button>
      </div>
    </div>
  );
};

export default Predict;
