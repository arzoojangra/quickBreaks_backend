import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL
const APP_NAME = process.env.REACT_APP_NAME
const APP_KEY = process.env.REACT_APP_KEY


const headers = {
  app_name: APP_NAME,
  app_key: APP_KEY
}


// Fetch all partners
export const fetchPartners = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetchPartners`,{
      headers: headers
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching partners:', error);
    throw error;
  }
};

// Fetch all leave requests
export const fetchLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allLeaves`,{
      headers: headers
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    throw error;
  }
};

// Submit a new leave request
export const submitLeaveRequest = async (leaveData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/applyLeave`, leaveData, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};

// Fetch slots of a partner
export const fetchPartnerSlotOnDate = async (partnerId, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findScheduleForDate?partnerId=${partnerId}&date=${date}`, {
      headers: headers
    });
    return response.data.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};

// Fetch schedule of a partner
export const fetchPartnerSchedule = async (partnerId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/findSchedule?partnerId=${partnerId}`,{
      headers: headers
    });
    return response.data.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};

// Update a leave
export const updateLeave = async (leaveData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/updateLeave`, leaveData, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    throw error;
  }
};
