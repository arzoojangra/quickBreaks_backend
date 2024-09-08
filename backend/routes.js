const express = require('express');
const router = express.Router();
const Response = require('./Response');

// Testing route
router.get('/', Response.default);

// Adding a partner
router.post('/addPartner', Response.addPartner);

// Fetch all partners
router.get('/fetchPartners', Response.fetchPartners);

// Adding schedule for a partner
router.post('/addSchedule', Response.addSchedule);

// Adding schedule for a partner
router.get('/findSchedule', Response.findScheduleForPartner);

module.exports = router;