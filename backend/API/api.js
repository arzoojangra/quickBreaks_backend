import { DAYS } from '../utils/constants.js';
import customResponse from '../utils/customResponse.js';
import Partner from '../models/Partner.js'
import Schedule from '../models/Schedule.js'
import { generateTimeSlots, setDateTonewDate, setTimeToGivenDate } from '../utils/customFunction.js';
import Leave from '../models/Leave.js';

const API = {};

// Adding Partner
API.addPartner = async (req, res) => {
  console.log("Creating partner...");
  const { name, email, phone, city, state, tag, rating, isVerified } = req.body;
  const response = customResponse.makeGenericResponse();

  try {
    // Creating a new partner
    const newPartner = new Partner({
      name,
      email,
      phone,
      city,
      state,
      tag,
      rating,
      isVerified,
    });

    // Save the partner to the database
    let id = await newPartner.save();
    response.result = { data: id._id };
    response.statusCode = 201;
    response.message = "Partner added successfully!";
    console.log("Partner added successfully!");
    return response;
  } catch (error) {
    console.log("Error creating partner!");
    response.statusCode = 500;
    response.message = "Error creating partner!";
    response.error = error;
    return response;
  }
};

// Fetch all partner details
API.getpartners = async (req, res) => {
  const response = customResponse.makeGenericResponse();

  try {
    let partners = await Partner.find();
    response.result = { data: partners };
    response.statusCode = 201;
    response.message = "Partners fetched successfully!";
    console.log("Partners fetched successfully!");
    return response;
  } catch (error) {
    console.log("Error fetching partners!");
    response.statusCode = 500;
    response.message = "Error fetching partners!";
    response.error = error;
    return response;
  }
}

// Adding Schedules
API.addSchedule = async (req, res) => {
  console.log("Adding schedule...");
  const { partnerId, week } = req.body;
  const response = customResponse.makeGenericResponse();

  try {
    // Creating a new partner
    const newSchedule = new Schedule({
      partnerId,
      week
    });

    // Save the partner to the database
    let id = await newSchedule.save();
    response.result = { data: id._id };
    response.statusCode = 201;
    response.message = "Schedule added successfully!";
    console.log("Schedule added successfully!");
    return response;
  } catch (error) {
    console.log("Error adding schedule!");
    response.statusCode = 500;
    response.message = "Error adding schedule!";
    response.error = error;
    return response;
  }
}

// Find schedule of a paricular partner
API.findSchedule = async (req, res) => {
  console.log("Finding schedule for partner....")
  const partnerId = req.query.partnerId;
  const response = customResponse.makeGenericResponse();

  try {
    if(!partnerId){
      response.statusCode = 400;
      response.message = "Please provide partner id";
      response.error = "Partner id missing";
      return response;
    }

    let schedules = await Schedule.findOne({ partnerId });
    response.result = { data: schedules.week };
    response.statusCode = 201;
    response.message = "Partners fetched successfully!";
    console.log("Partners fetched successfully!");
    return response;
  } catch (error) {
    console.log("Error fetching partners!");
    response.statusCode = 500;
    response.message = "Error fetching partners!";
    response.error = error;
    return response;
  }
  
}

// Find schedule of a partner for given date
API.findScheduleForDate = async (req, res) =>{
  console.log("Finding schedule for partner on given date....")
  const response = customResponse.makeGenericResponse();
  const {date, partnerId} = req.query;

  try {
    if(!date){
      response.statusCode = 400;
      response.message = "Please provide date";
      response.error = "Date missing";
      return response;
    }
    if(!partnerId){
      response.statusCode = 400;
      response.message = "Please provide partner id";
      response.error = "Partner id missing";
      return response;
    }

    let day = new Date(date * 1000).getDay();
    day = DAYS[day];

    let schedules = await Schedule.findOne({partnerId});
    schedules = schedules.week[day];
    let slots = generateTimeSlots(schedules[0].start, schedules[0].end);

    response.result = { data: slots };
    response.statusCode = 201;
    response.message = "Partner's schedule fetched successfully!";
    console.log("Partner's schedule fetched successfully!");
    return response;
    
  } catch (error) {
    console.log("Error fetching partner's schedule for given date!");
    response.statusCode = 500;
    response.message = "Error fetching partner's schedule for given date!";
    response.error = error;
    return response;
  }
}

// Apply leave
API.applyLeave = async (req, res) => {
  let {partnerId, startDate, endDate, slot, reason, type} = req.body;
  const response = customResponse.makeGenericResponse();

  try {
    if(!partnerId || !startDate || !endDate || !type){
      response.statusCode = 400;
      response.message = "Please provide all details (partnerId, startDate, endDate, type)";
      response.error = "Some details are missing";
      return response;
    }

    startDate = setDateTonewDate(startDate);
    endDate = setDateTonewDate(endDate);

    // Checking for duplicate leave (same leave being applied again)
    let duplicateLeave = await Leave.findOne({
      partnerId,
      startDate: startDate,
      endDate: endDate,
      slot: slot || null  
    });

    if (duplicateLeave) {
      response.statusCode = 409;
      response.message = "This leave has already been applied for. Please do not apply again.";
      response.error = "Duplicate leave";
      return response;
    }

    // Checking for overlapping leave dates
    let overlappingLeave = await Leave.findOne({
      partnerId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
      ]
    });

    if (overlappingLeave) {
      response.statusCode = 409;
      response.message = "Leave already exists for this period. Please choose another date.";
      response.error = "Date range conflict";
      return response;
    }

    // For single-day leaves with time slots
    if (type.toUpperCase() == "SINGLE") {
      if (!slot) {
        response.statusCode = 400;
        response.message = "Please provide a slot for the leave";
        response.error = "Slot details are missing";
        return response;
      }

      // Checking for slot conflicts on the same day
      let slotConflictLeave = await Leave.findOne({
        partnerId,
        startDate: startDate,
        "slot": { $in: !Array.isArray(slot) ? [slot] : slot }
      });

      if (slotConflictLeave) {
        response.statusCode = 409;
        response.message = "Leave already exists for the given time slot. Please choose another time.";
        response.error = "Time slot conflict";
        return response;
      }
    }

    // Create new leave
    let newLeave = new Leave({
      partnerId,
      startDate,
      endDate,
      appliedDate: new Date(),
      slot: slot || null,
      reason: reason,
      type: type
    });

    var id = await newLeave.save();
    response.statusCode = 200;
    response.message = "Leave applied successfully!";
    response.result = { data: id };
    return response;

  } catch (error) {
    console.log("Error in applying leave!", error.message);
    response.statusCode = 500;
    response.message = "Error in applying leave!";
    response.error = error;
    return response;
  }
};

// Get all leaves
API.getAllLeaves = async (req, res) => {
  const response = customResponse.makeGenericResponse();

  try {
    let leaves = await Leave.find().sort({ appliedDate: -1 }).populate('partnerId');
    for(let leave of leaves){
      if(leave.slot && leave.slot.start && leave.slot.end){
        let startSlot = leave.slot.start.split(":");
        let endSlot = leave.slot.end.split(":");
        leave.startDate = setTimeToGivenDate(leave.startDate, startSlot[0], startSlot[1]);
        leave.endDate = setTimeToGivenDate(leave.endDate, endSlot[0], endSlot[1]);
      }
    }
    response.result = { data: leaves };
    response.statusCode = 201;
    response.message = "Leaves fetched successfully!";
    console.log("Leaves fetched successfully!");
    return response;
  } catch (error) {
    console.log("Error fetching leaves!", error.message);
    response.statusCode = 500;
    response.message = "Error fetching leaves!";
    response.error = error;
    return response;
  }
}

// Update leave
API.updateLeave = async (req, res) => {
  let { leaveId, startDate, endDate, slot, status, type, reason } = req.body;
  console.log(req.body);
  const response = customResponse.makeGenericResponse();

  try {
    if (!leaveId) {
      response.statusCode = 400;
      response.message = "Please provide leaveId.";
      response.error = "leaveId missing";
      return response;
    }

    // Finding the leave record by ID
    let leave = await Leave.findById(leaveId);
    if (!leave) {
      response.statusCode = 404;
      response.message = "Leave record not found.";
      response.error = "Not found";
      return response;
    }

    if (startDate) {
      leave.startDate = setDateTonewDate(startDate);
    }
    if (endDate) {
      leave.endDate = setDateTonewDate(endDate);
    }
    if (slot) {
      leave.slot = slot;
    }
    if(status){
      leave.status = status;
    }
    if(reason){
      leave.reason = reason;
    }
    if(type){
      leave.type = type;
    }

    // Checking if updates are possible or not
    let overlappingLeave = await Leave.findOne({
      partnerId: leave.partnerId,
      $or: [
        { startDate: { $lt: leave.endDate }, endDate: { $gt: leave.startDate } },
      ]
    });

    if (overlappingLeave && overlappingLeave._id.toString() !== leaveId) {
      response.statusCode = 409;
      response.message = "Updated leave overlaps with an existing leave.";
      response.error = "Date range conflict";
      return response;
    }

    await leave.save();

    response.statusCode = 200;
    response.message = "Leave updated successfully!";
    response.result = leave._id;
    return response;

  } catch (error) {
    console.log("Error updating leave!");
    response.statusCode = 500;
    response.message = "Error updating leave!";
    response.error = error;
    return response;

  }
};

export default API;