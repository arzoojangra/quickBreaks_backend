import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL

// Fetch all partners
export const fetchPartners = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetchPartners`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching partners:', error);
    throw error;
  }
};

// Fetch all leave requests
export const fetchLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allLeaves`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    throw error;
  }
};

// Submit a new leave request
export const submitLeaveRequest = async (leaveData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/applyLeave`, leaveData);
    return response.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};

// Fetch slots of a partner
export const fetchPartnerSlotOnDate = async (partnerId, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findScheduleForDate?partnerId=${partnerId}&date=${date}`);
    return response.data.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};

// Fetch schedule of a partner
export const fetchPartnerSchedule = async (partnerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findSchedule?partnerId=${partnerId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};

// Update a leave
export const updateLeave = async (leaveData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/updateLeave`, leaveData);
    return response.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};
