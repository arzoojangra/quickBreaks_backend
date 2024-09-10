import React, { useEffect, useState } from "react";
import { fetchPartnerSlotOnDate, updateLeave } from "../services/api";
import { toast } from "react-toastify";
import moment from "moment";

function EditLeave({ leave, handleCloseModal, showModal }) {
  const [partnerId, setPartnerId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [leaveType, setLeaveType] = useState("multiple");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [slot, setSlot] = useState("");
  const [slots, setSlots] = useState("");

  const fetchSlot = async (partnerId, date) => {
    const unixTime = Math.floor(new Date(date).getTime() / 1000);
    try {
      const slots = await fetchPartnerSlotOnDate(partnerId, unixTime);
      setSlots(slots.data);
    } catch (error) {
      console.error("Error fetching leave requests", error);
    }
  };

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    const data = {
      leaveId: leave._id,
      partnerId: partnerId,
      startDate: Math.floor(new Date(startDate).getTime() / 1000),
      endDate: Math.floor(new Date(endDate).getTime() / 1000),
      slot: JSON.parse(slot),
      reason: reason,
      type: leaveType,
      status: status,
    };
    let res = await updateLeave(data);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (leave) {
      setPartnerId(leave.partnerId._id);
      setPartnerName(leave.partnerId.name);
      setLeaveType(leave.type);
      setReason(leave.reason);
      setStartDate(moment(leave.startDate).format("YYYY-MM-DD"));
      setEndDate(moment(leave.endDate).format("YYYY-MM-DD"));
      if (leave.slot && leave.slot.start) {
        fetchSlot(
          leave.partnerId._id,
          moment(leave.startDate).format("YYYY-MM-DD")
        );
      }
      setStatus(leave.status);
      setSlot(JSON.stringify(leave.slot));
    }
  }, [leave]);

  return (
    <div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto w-full">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-80 flex justify-center items-center"></div>
            <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg z-20">
              <h2 className="text-xl mb-4">Edit Leave</h2>
              <form onSubmit={handleSubmitLeave}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Partner
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    disabled
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Leave Type
                  </label>
                  <select
                    value={leaveType}
                    onChange={(e) => {
                      setLeaveType(e.target.value);
                      setStartDate("");
                      setEndDate("");
                      setSlot("");
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  >
                    <option value="multiple">More than one day</option>
                    <option value="single">Single day</option>
                  </select>
                </div>

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

                {/* Conditional Rendering for Multiple or Single Day */}
                {leaveType === "multiple" ? (
                  <>
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
                          // fetchSlot(partnerId, e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        required
                      />
                    </div>

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
                            <option
                              value={JSON.stringify({
                                start: slot.start,
                                end: slot.end,
                              })}
                              key={index}
                            >
                              {slot.start}-{slot.end}
                            </option>
                          ))}
                      </select>
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Denied">Denied</option>
                  </select>
                </div>

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

export default EditLeave;
