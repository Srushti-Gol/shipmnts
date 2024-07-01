const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const Company = require('../models/Company');
const Contact = require('../models/Contact');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

const validateData = (data) => {
  const errors = [];
  data.forEach((item, index) => {
    if (!item['Company Name']) {
      errors.push(`Row ${index + 1}: Company Name is required`);
    }
    if (!item['Industry Type']) {
      errors.push(`Row ${index + 1}: Industry Type is required`);
    }
    if (!item['Contact Name']) {
      errors.push(`Row ${index + 1}: Contact Name is required`);
    }
    if (!item['Contact Email']) {
      errors.push(`Row ${index + 1}: Contact Email is required`);
    }
    if (!item['Contact Type']) {
      errors.push(`Row ${index + 1}: Contact Type is required`);
    }
  });
  return errors;
};

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = XLSX.readFile(req.file.path);
    const sheet = file.Sheets[file.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);
    
    const errors = validateData(data);
    console.log(errors);
    if (errors.length > 0) {
      res.json({ errors });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(400).json({ errors: ['Invalid file format or content. Please upload a valid Excel file.'] });
  }
});

router.post('/confirm', async (req, res) => {
    const { data } = req.body;
  
    try {
      for (const item of data) {
        // Check if company already exists
        let company = await Company.findOne({ name: item['Company Name'] });
  
        if (!company) {
          // Create new company if it doesn't exist
          company = new Company({
            name: item['Company Name'],
            address: item['Company Address'],
            phone: item['Company Phone'],
            email: item['Company Email'],
            website: item['Company Website'],
            employees: item['Number of Employees'],
            founded: item['Founded Date'],
            industry: item['Industry Type'],
          });
  
          await company.save();
        }
  
        // Check if contact already exists by email
        let contact = await Contact.findOne({ email: item['Contact Email'] });
  
        if (!contact) {
          // Create new contact linked to the company
          contact = new Contact({
            name: item['Contact Name'],
            email: item['Contact Email'],
            phone: item['Contact Phone'],
            dob: item['Date of Birth'],
            type: item['Contact Type'],
            company: company._id,
          });
  
          await contact.save();
        } else {
          // If contact exists, update its details if needed
          // Optionally, you can update contact details here if required
        }
      }
  
      res.status(200).json({ message: 'Data successfully saved' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  

module.exports = router;
