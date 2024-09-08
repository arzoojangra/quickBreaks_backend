import express from 'express';
import Response from './Response.js';
const router = express.Router();

// Testing route
router.get('/', Response.default);

// Adding a partner
router.post('/addPartner', Response.addPartner);

// Fetch all partners
router.get('/fetchPartners', Response.fetchPartners);

// Adding schedule for a partner
router.post('/addSchedule', Response.addSchedule);

// Finding schedules for a partner
router.get('/findSchedule', Response.findScheduleForPartner);

// Finding schedules for a partner on a given date
router.get('/findScheduleForDate', Response.findScheduleForDate);

// Apply leave
router.post('/applyLeave', Response.applyLeave);

// Get all leaves
router.get('/allLeaves', Response.getAllLeaves);

// Update leave
router.post('/updateLeave', Response.updateLeave);

export default router;