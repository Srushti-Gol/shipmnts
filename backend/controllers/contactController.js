const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { name, email, type, company } = req.body;

    if (!name || !email || !type) {
      throw new Error('Contact Name, Email, and Contact Type are required.');
    }

    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
