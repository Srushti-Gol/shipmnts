const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  dob: Date,
  type: { type: String, enum: ["Primary", "Secondary", "Other"], required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
});

module.exports = mongoose.model('Contact', ContactSchema);
