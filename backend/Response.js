import API from "./API/api.js";
import customResponse from './utils/customResponse.js';

const Response = {};

// Default test route
Response.default = function(req, res) {
    customResponse.sendGenericResponse(req, res, 200, null, "Working fine!!");
}

// Add partner
Response.addPartner = async function(req, res) {
    try {
        let data = await API.addPartner(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Fetch all partners
Response.fetchPartners = async function(req, res) {
    try {
        let data = await API.getpartners(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Add schedule
Response.addSchedule = async function(req, res) {
    try {
        let data = await API.addSchedule(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Find schedule of particular partner
Response.findScheduleForPartner = async function(req, res) {
    try {
        let data = await API.findSchedule(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Find schedule of a partner for a given date
Response.findScheduleForDate = async function(req, res) {
    try {
        let data = await API.findScheduleForDate(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Apply leave
Response.applyLeave = async function(req, res) {
    try {
        let data = await API.applyLeave(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Get all leaves
Response.getAllLeaves = async function(req, res) {
    try {
        let data = await API.getAllLeaves(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}

// Update leave
Response.updateLeave = async function(req, res) {
    try {
        let data = await API.updateLeave(req, res);
        customResponse.sendGenericResponse(req, res, data.statusCode, data.result, data.message, data.error);
    } catch (error) {
        customResponse.sendGenericResponse(req, res, 500, null, "", "Something went wrong!");
    }
}
export default Response;