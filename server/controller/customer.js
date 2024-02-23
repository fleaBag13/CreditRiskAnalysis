const customerModel = require("../model/user");

const custData = async (req, res) => {
  const {
    name,
    gender,
    age,
    income,
    income_stability,
    profession,
    employment_type,
    location,
    loan_expense,
    fixed,
    variable,
    dependents,
    credit_score,
    defaults,
    credit_card,
    property_age,
    property_type,
    property_location,
    property_price,
    coapplicants,
  } = req.body;

  try {
    const cdata = new customerModel({
      name,
      gender,
      age,
      income,
      income_stability,
      profession,
      employment_type,
      location,
      loan_expense,
      fixed,
      variable,
      dependents,
      credit_score,
      defaults,
      credit_card,
      property_age,
      property_type,
      property_location,
      property_price,
      coapplicants,
    });

    await cdata.save();
    res.status(201).json({ cdata });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};


module.exports = {
    custData
};
