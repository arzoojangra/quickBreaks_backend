import mongoose from "mongoose";

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
  reason:{
    type: String,
    required: false
  },
  type:{
    type: String,
    required: false
  },
  // For single-day leaves
  slot: {
      start: { type: String }, 
      end: { type: String } 
    }
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;
