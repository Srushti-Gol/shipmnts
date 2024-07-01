const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  try {
    const { name, industry } = req.body;

    if (!name || !industry) {
      throw new Error('Company Name and Industry Type are required.');
    }

    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
