import React, { useState } from "react";
import axios from "axios";
import { typesOfEmployment } from "../constants";
import { layout } from "../style";

const Predict = () => {

  const [minResponse, setMinResponse] = useState('');
  const [maxResponse, setMaxResponse] = useState('');

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
    coapplicants: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)
    await axios.post("http://localhost:3001/customer", formData);

    const featureMapping = {
      Gender_F: formData.gender === "Female" ? 1 : 0,
      Gender_M: formData.gender === "Male" ? 1 : 0,
      Profession_Commercial_associate:
        formData.profession === "Commercial Associate" ? 1 : 0,
      Profession_Pensioner: formData.profession === "Pensioner" ? 1 : 0,
      Profession_State_servant: formData.profession === "State Servant" ? 1 : 0,
      Profession_Working: formData.profession === "Working" ? 1 : 0,
      Location_Rural: formData.location === "Rural" ? 1 : 0,
      Location_Semi_Urban: formData.location === "Semi-Urban" ? 1 : 0,
      Location_Urban: formData.location === "Urban" ? 1 : 0,
      Expense_Type_1_N: formData.fixed === "No" ? 1 : 0,
      Expense_Type_1_Y: formData.fixed === "Yes" ? 1 : 0,
      Expense_Type_2_N: formData.variable === "No" ? 1 : 0,
      Expense_Type_2_Y: formData.variable === "Yes" ? 1 : 0,
      Has_Active_Credit_Card_Active: formData.credit_card === "Active" ? 1 : 0,
      Has_Active_Credit_Card_Inactive:
        formData.credit_card === "Inactive" ? 1 : 0,
      Has_Active_Credit_Card_Unpossessed:
        formData.credit_card === "Unpossessed" ? 1 : 0,
      Property_Location_Rural: formData.property_location === "Rural" ? 1 : 0,
      Property_Location_Semi_Urban:
        formData.property_location === "Semi-Urban" ? 1 : 0,
      Property_Location_Urban: formData.property_location === "Urban" ? 1 : 0,
      Income_Stability_High: formData.income_stability === "High" ? 1 : 0,
      Income_Stability_Low: formData.income_stability === "Low" ? 1 : 0,
      Age: formData.age,
      Income_USD: formData.income,
      Current_Loan_Expenses_USD: formData.loan_expense,
      Dependents: formData.dependents,
      Credit_Score: formData.credit_score,
      No_of_Defaults: formData.defaults,
      Property_Age: formData.property_age,
      Property_Type: formData.property_type,
      Co_Applicant: formData.coapplicants,
      Property_Price: formData.property_price,
    };

    const X_new = [Object.values(featureMapping)];
    try {
      const result = await axios.post("http://localhost:5001/predict", X_new);
      setMinResponse(result.data.min);
      setMaxResponse(result.data.max);
      console.log(result.data);

      console.log("Form submitted successfully!");

      setFormData({
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
        coapplicants: null,
      })
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <div className="predict h-full font-poppins bg-primary">
      <div
        className={`${layout.block1} overflow-y-auto h-[600px] form flex flex-col mx-auto w-1/2 border-2 border-slate-300 rounded-md p-4`}
      >
        <form onSubmit={handleSubmit}>
          {/* Input fields */}
          <input
            placeholder="Name"
            className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3 w-full"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Income"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"
            />
            <select
              name="income_stability"
              value={formData.income_stability}
              onChange={handleChange}
              className={`w-full rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Income Stability
              </option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className={`w-full rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Profession
              </option>
              <option value="Businessman">Businessman</option>
              <option value="Commercial Associate">Commercial Associate</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Pensioner">Pensioner</option>
              <option value="State Servant">State Servant</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Working">Working</option>
            </select>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              className={`w-full oveflow-y rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Type Of Employment
              </option>
              {typesOfEmployment.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full h-11  rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
          >
            <option value="" disabled hidden>
              Location
            </option>
            <option value="Semi-Urban">Semi-Urban</option>
            <option value="Rural">Rural</option>
            <option value="Urban">Urban</option>
            <option value="Commercial Associate">Commercial Associate</option>
          </select>
          <input
            type="text"
            name="loan_expense"
            value={formData.loan_expense}
            onChange={handleChange}
            placeholder="Loan Expenses"
            className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3 w-full"
          />
          <div className="grid grid-cols-2 gap-4">
            <select
              name="fixed"
              value={formData.fixed}
              onChange={handleChange}
              className={`w-full h-11  rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Fixed Cost
              </option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <select
              name="variable"
              value={formData.variable}
              onChange={handleChange}
              className={`w-full h-11 rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Variable Cost
              </option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <input
            type="number"
            placeholder="Dependents"
            name="dependents"
            value={formData.dependents}
            onChange={handleChange}
            className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3 w-full"
          />
          <input
            type="number"
            placeholder="Credit Score"
            name="credit_score"
            value={formData.credit_score}
            onChange={handleChange}
            className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3 w-full"
          />
          <input
            type="number"
            placeholder="Number of Defaults"
            name="defaults"
            value={formData.defaults}
            onChange={handleChange}
            className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3 w-full"
          />
          <select
            name="credit_card"
            value={formData.credit_card}
            onChange={handleChange}
            className={`w-full h-11  rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
          >
            <option value="" disabled hidden>
              Credit Card
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="unpossessed">Unpossessed</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Property Age"
              name="property_age"
              value={formData.property_age}
              onChange={handleChange}
              className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"
            />
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className={`w-full h-11  rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Property Type
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="property_location"
              value={formData.property_location}
              onChange={handleChange}
              className={`w-full h-11  rounded-lg border-gray-300 border-2 px-2 focus:border-slate-500 my-3 text-gray-400 text-base`}
            >
              <option value="" disabled hidden>
                Property Location
              </option>
              <option value="Rural">Rural</option>
              <option value="Semi-Urban">Semi-Urban</option>
              <option value="Urban">Urban</option>
            </select>
            <input
              type="number"
              placeholder="Property Price"
              name="property_price"
              value={formData.property_price}
              onChange={handleChange}
              className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3"
            />
          </div>

          <input
            type="number"
            placeholder="Number of Co-applicants"
            name="coapplicants"
            value={formData.coapplicants}
            onChange={handleChange}
            className="px-2 border-gray-300 rounded-lg border-2 focus:border-slate-500 block py-2 my-3 w-full"
          />

          <button
            type="submit"
            className="bg-primary rounded text-secondary py-2 w-full"
          >
            Submit
          </button>
        </form>
        
      </div>
      {maxResponse && minResponse && <div className=" bg-white mx-auto w-1/2 text-center py-2 mt-2 shadow-xl rounded-md mb-4">Predicted range of credit amount: {minResponse} - {maxResponse}</div>}
    </div>
  );
};

export default Predict;
