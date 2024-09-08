const mongoose = require('mongoose');

// Schema for Partner
const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    required: true
  },
  
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
