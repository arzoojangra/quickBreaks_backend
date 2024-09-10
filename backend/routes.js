import express from 'express';
import Response from './Response.js';
import { headersValidation } from './Middleware.js';
const router = express.Router();

// Testing route
router.get('/', Response.default);

// Adding a partner
router.post('/addPartner', headersValidation, Response.addPartner);

// Fetch all partners
router.get('/fetchPartners', headersValidation, Response.fetchPartners);

// Adding schedule for a partner
router.post('/addSchedule', headersValidation, Response.addSchedule);

// Finding schedules for a partner
router.get('/findSchedule', headersValidation, Response.findScheduleForPartner);

// Finding schedules for a partner on a given date
router.get('/findScheduleForDate', headersValidation, Response.findScheduleForDate);

// Apply leave
router.post('/applyLeave', headersValidation, Response.applyLeave);

// Get all leaves
router.get('/allLeaves', headersValidation, Response.getAllLeaves);

// Update leave
router.post('/updateLeave', headersValidation, Response.updateLeave);

export default router;