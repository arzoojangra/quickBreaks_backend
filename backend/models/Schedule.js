const mongoose = require('mongoose');

// Schema for Schedule
const scheduleSchema = new mongoose.Schema({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true
  },
  week: {
    monday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
    tuesday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
    wednesday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
    thursday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
    friday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
    saturday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
    sunday: [
      {
        start: { type: String, required: true }, 
        end: { type: String, required: true } 
      }
    ],
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
