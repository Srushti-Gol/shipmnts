const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  website: String,
  employees: Number,
  founded: Date,
  industry: { type: String, enum: ["Technology", "Finance", "Healthcare", "Retail", "Other"], required: true },
});

module.exports = mongoose.model('Company', CompanySchema);
