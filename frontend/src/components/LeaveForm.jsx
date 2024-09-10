import React, { useEffect, useState } from "react";
import { fetchPartners, fetchPartnerSlotOnDate, submitLeaveRequest } from "../services/api";
import { toast } from 'react-toastify';

function LeaveForm({ showModal, handleCloseModal }) {
  const [partners, setPartners] = useState([]);
  const [slots, setSlots] = useState([]);
  const [partnerId, setPartnerId] = useState("");
  const [leaveType, setLeaveType] = useState("multiple");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [slot, setSlot] = useState("");

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    const data = {
      partnerId: partnerId, 
      startDate: Math.floor(new Date(startDate).getTime() / 1000), 
      endDate: Math.floor(new Date(endDate).getTime() / 1000), 
      slot: slot ? JSON.parse(slot): null, 
      reason: reason, 
      type: leaveType
    }
    let res = await submitLeaveRequest(data);
    if(res.error){
      toast.error(res.message);
    }else{
      toast.success(res.message);
      handleCloseModal();
    }
  };

  const fetchPartnersList = async () => {
    try {
      const partnersList = await fetchPartners();
      setPartners(partnersList.data);
    } catch (error) {
      console.error("Error fetching leave requests", error);
    }
  };

  const fetchSlot = async (partnerId, date) => {
    const unixTime = Math.floor(new Date(date).getTime() / 1000);
    try {
      const slots = await fetchPartnerSlotOnDate(partnerId, unixTime);
      setSlots(slots.data);
    } catch (error) {
      console.error("Error fetching leave requests", error);
    }
  };

  useEffect(() => {
    fetchPartnersList();
  }, []);

  return (
    <div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto w-full">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center"></div>
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg z-20">
              <h2 className="text-xl mb-4">Apply for Leave</h2>
              <form onSubmit={handleSubmitLeave}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Select Partner
                  </label>
                  <select
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    required
                  >
                    <option value="">Select Partner</option>
                    {partners &&
                      partners.map((partner) => (
                        <option value={partner._id} key={partner._id}>
                          {partner.name}
                        </option>
                      ))}
                  </select>
                </div>

                {partnerId && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Select Leave Type
                    </label>
                    <select
                      value={leaveType}
                      onChange={(e) => {
                        setLeaveType(e.target.value);
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    >
                      <option value="multiple">More than one day</option>
                      <option value="single">Single day</option>
                    </select>
                  </div>
                )}

                {leaveType && partnerId && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Reason
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    />
                  </div>
                )}

                {/* Conditional Rendering for Multiple or Single Day */}
                {leaveType === "multiple" ? (
                  <>
                    {leaveType && partnerId && (
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                          required
                        />
                      </div>
                    )}
                    {startDate && (
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                          required
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e.target.value);
                          setEndDate(e.target.value);
                          fetchSlot(partnerId, e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        required
                      />
                    </div>
                    {startDate && (
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Select Slot
                        </label>
                        <select
                          value={slot}
                          onChange={(e) => setSlot(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                          required
                        >
                          <option value="">Select slot</option>
                          {slots &&
                            slots.map((slot, index) => (
                              <option value={JSON.stringify({start: slot.start, end: slot.end})} key={index}>
                                {slot.start}-{slot.end}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-orange-200 hover:bg-orange-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaveForm;
