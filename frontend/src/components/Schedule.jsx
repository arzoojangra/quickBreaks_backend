import React, { useEffect, useState } from "react";
import { fetchPartnerSchedule } from "../services/api";

function Schedule({ showModal, handleCloseModal, partner }) {
  const [schedule, setschedule] = useState(null);

  const fetchSchedule = async () => {
    if (!partner || !partner._id) return;
    try {
      const partnerSchedule = await fetchPartnerSchedule(partner._id);
      setschedule(partnerSchedule.data);
      console.log(schedule);
    } catch (error) {
      console.error("Error fetching schedule", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [partner]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96 md:w-[600px]">
        <h2 className="text-lg font-bold mb-4">Schedule for {partner.name}</h2>
        <div className="font-bold">
          Monday:{" "}
          {schedule?.monday &&
            schedule?.monday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="font-bold">
          Tuesday:{" "}
          {schedule?.tuesday &&
            schedule?.tuesday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="font-bold">
          Wednesday:{" "}
          {schedule?.wednesday &&
            schedule?.wednesday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="font-bold">
          Thursday:{" "}
          {schedule?.thursday &&
            schedule?.thursday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="font-bold">
          Friday:{" "}
          {schedule?.friday &&
            schedule?.friday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="font-bold">
          Saturday:{" "}
          {schedule?.saturday &&
            schedule?.saturday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="font-bold">
          Sunday:{" "}
          {schedule?.sunday &&
            schedule?.sunday.map((slot, index) => (
              <p key={index} className="font-normal">
                {slot.start} - {slot.end}
              </p>
            ))}
        </div>
        <div className="flex justify-end">
          <button
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
