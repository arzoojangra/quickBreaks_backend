import React, { useEffect, useState } from "react";
import { fetchLeaveRequests } from "../services/api";
import moment from "moment";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeaveForm from "./LeaveForm";
import EditLeave from "./EditLeave";
import Loader from "./Loader";

function LeavesDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [editLeave, setEditleave] = useState(false);

  const fetchLeaves = async () => {
    try {
      const leavesList = await fetchLeaveRequests();
      setLeaves(leavesList.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leave requests", error);
      setLoading(false);
    }
  };

  const handleOpenEditLeave = (leave) => {
    setSelectedLeave(leave);
    setEditleave(true);
  };

  const handleApplyLeave = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditleave(false);
  };

  useEffect(() => {
    fetchLeaves();
  }, [showModal, editLeave]);

  if (loading) return <Loader />;

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-5 flex justify-between items-center">
          <div className="text-xl font-semibold">Leaves Dashboard</div>
          <button
            onClick={handleApplyLeave}
            className="text-black hover:bg-orange-200 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none"
          >
            Apply Leave
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-md bg-orange-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Applied Date
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {leaves &&
              leaves.map((leave) => (
                <tr className="hover:bg-orange-50" key={leave._id}>
                  <td className="px-6 py-2 font-medium">
                    {leave.partnerId.name}
                  </td>
                  <td className="px-6 py-2">{leave.partnerId.city}</td>
                  <td className="px-6 py-2">
                    {moment(leave.appliedDate).format(
                      "MMM DD, YYYY [at] hh:mm A"
                    )}
                  </td>
                  <td className="px-6 py-2">
                    {moment(leave.startDate).format(
                      "MMM DD, YYYY [at] hh:mm A"
                    )}
                  </td>
                  <td className="px-6 py-2">
                    {moment(leave.endDate).format("MMM DD, YYYY [at] hh:mm A")}
                  </td>
                  <td
                    className="px-6 py-2"
                    style={{
                      color:
                        leave.status.toUpperCase() === "APPROVED"
                          ? "green"
                          : leave.status.toUpperCase() === "PENDING"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {leave.status}
                  </td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleOpenEditLeave(leave)}
                      className="font-medium text-orange-500 hover:underline"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <LeaveForm showModal={showModal} handleCloseModal={handleCloseModal} />
      <EditLeave
        leave={selectedLeave}
        handleCloseModal={handleCloseModal}
        showModal={editLeave}
      />
    </div>
  );
}

export default LeavesDashboard;
