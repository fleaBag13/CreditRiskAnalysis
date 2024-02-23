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
    age: null,
    income: null,
    income_stability: "",
    profession: "",
    employment_type: "",
    location: "",
    loan_expense: null,
    fixed: "",
    variable: "",
    dependents: null,
    credit_score: null,
    defaults: null,
    credit_card: "",
    property_age: null,
    property_type: "",
    property_location: "",
    property_price: null,
    coapplicants: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/customer", formData);
      console.log(formData);
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
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" className="px-2 border border-gray-300 w-full rounded-lg border-2 focus:border-slate-500 block py-2 my-3" type="text" name="name" value={formData.name} onChange={handleChange}/>
        <div className="grid grid-cols-2 gap-4">
          <select name="gender" value={formData.gender} onChange={handleChange} className={`w-full rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Income" value={formData.income} onChange={handleChange} className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
          <select name="income_stability" onChange={handleChange} value={formData.income_stability} className={`w-full rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Income Stability</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <select name="profession" onChange={handleChange} value={formData.profession} className={`w-full rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
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
          <select name="employment_type" onChange={handleChange} value={formData.employment_type} className={`w-full oveflow-y rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Type Of Employment</option>
            {typesOfEmployment.map((value, index) => (
              <option key={index} value={value}>{value}</option>
            ))}
          </select>
        </div>
          
        <select name="location" onChange={handleChange} value={formData.location} className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden select>Location</option>
          <option value="Semi-Urban">Semi-Urban</option>
          <option value="Rural">Rural</option>
          <option value="Urban">Urban</option>
          <option value="Commercial Associate">Commercial Associate</option>
        </select>
        <input type="number" value={formData.loan_expense} onChange={handleChange} placeholder="Loan Expenses" className="w-full px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <div className="grid grid-cols-2 gap-4">
        <select name="fixed" value={formData.fixed} onChange={handleChange} className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden selected>Fixed Cost</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        <select name="variable" onChange={handleChange} value={formData.variable} className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden selected>Variable Cost</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        </div>
        <input type="number" onChange={handleChange} placeholder="Dependents" value={formData.dependents} className="w-full px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <input type="number" onChange={handleChange} placeholder="Credit Score" value={formData.credit_score} className="w-full px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <input type="number" onChange={handleChange} placeholder="Number of Defaults" value={formData.defaults} className="w-full px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        <select name="credit_card" onChange={handleChange} value={formData.credit_card} className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
          <option value="" disabled hidden selected>Credit Card</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="unpossessed">Unpossessed</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" onChange={handleChange} value={formData.property_age} placeholder="Property Age" className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
          <select name="property_type" onChange={handleChange} value={formData.property_type} className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Property Type</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <select name="property_location" onChange={handleChange} value={formData.property_location} className={`w-full h-11  rounded-lg border border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}>
            <option value="" disabled hidden selected>Property Location</option>
            <option value="Rural">Rural</option>
            <option value="Semi-Urban">Semi-Urban</option>
            <option value="Urban">Urban</option>
        </select>
        <input type="number" onChange={handleChange} placeholder="Property Price" value={formData.property_price} className="px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        </div>

        <input type="number" onChange={handleChange} placeholder="Number of Co-applicants" value={formData.coapplicants} className="w-full px-2 border border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"/>
        
        <button type="submit" className="w-full bg-primary rounded text-secondary py-2">Predict</button>
        </form>
      </div>
    </div>
  );
};

export default Predict;
