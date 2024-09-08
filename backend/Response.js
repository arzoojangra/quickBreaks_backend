const API = require("./API/api");
const customResponse = require("./utils/customResponse");

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
        let data = await API.findSchedule(req, res);
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

module.exports = Response;