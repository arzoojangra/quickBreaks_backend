const Partner = require("../models/Partner");
const Schedule = require("../models/Schedule");
const customResponse = require("../utils/customResponse");

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

module.exports = API;
