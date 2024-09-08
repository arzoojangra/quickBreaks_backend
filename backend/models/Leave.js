const mongoose = require('mongoose');

// Schema for Leave
const leaveSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending'
  },
  appliedDate: {
    type: Date,
    required: true
  },
  // For single-day leaves
  slots: [
    {
      start: { type: String, required: true }, 
      end: { type: String, required: true } 
    }
  ]
});

const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
