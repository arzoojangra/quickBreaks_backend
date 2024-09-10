import React, { useEffect, useState } from 'react';
import { fetchPartners, fetchLeaveRequests, submitLeaveRequest } from '../services/api';
import PartnerDetails from './PartnerDetails';

function App() {
  const [partners, setPartners] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners and leave requests on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const partnersData = await fetchPartners();
        // const leaveData = await fetchLeaveRequests();
        setPartners(partnersData.data.data);
        setLoading(false);
        console.log("partnersData--", partnersData.data.data)
        // setLeaveRequests(leaveData);
      } catch (error) {
        setError('Error loading data');
      }
    };

    loadData();
  }, []);

  // Handle leave request submission
  const handleLeaveSubmit = async (leaveData) => {
    try {
      await submitLeaveRequest(leaveData);
      // Optionally reload the leave requests
      const updatedLeaveData = await fetchLeaveRequests();
      setLeaveRequests(updatedLeaveData);
    } catch (error) {
      setError('Error submitting leave');
    }
  };

  if(loading){
    return <p>Loading.....</p>
  }

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {partners && 
      partners.map((partner) => (
          <PartnerDetails partner={partner} key={partner.id} />        
      ))}
      {/* Render your components like Dashboard, PartnerDetails, LeaveForm */}
      {/* Pass down the partners, leaveRequests, and handleLeaveSubmit */}
    </div>
  );
}

export default App;
