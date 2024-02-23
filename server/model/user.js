const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  age: {
    type: Number,
    // required: true,
  },
  income: {
    type: Number,
    // required: true,
  },
  income_stability: {
    type: String,
    // required: true,
  },
  profession: {
    type: String,
    // required: true,
  },
  employment_type: {
    type: String,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  loan_expense: {
    type: Number,
    // required: true,
  },
  fixed: {
    type: String,
    // required: true,
  },
  variable: {
    type: String,
    // required: true,
  },
  dependents: {
    type: Number,
    // required: true,
  },
  credit_score: {
    type: Number,
    // required: true,
  },
  defaults: {
    type: Number,
    // required: true,
  },
  credit_card: {
    type: String,
    // required: true,
  },
  property_age: {
    type: Number,
    // required: true,
  },
  property_type: {
    type: String,
    // required: true,
  },
  property_location: {
    type: String,
    // required: true,
  },
  property_price: {
    type: String,
    // required: true,
  },
  coapplicants: {
    type: Number,
    // required: true,
  },
});

const customerModel = mongoose.model("CustomerData", customerSchema);

module.exports = customerModel;
