import React, { useEffect, useState } from "react";
import { fetchPartners } from "../services/api";
import { faCalendarAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Schedule from "./Schedule";
import Loader from "./Loader";

function PartnersDashboard() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const fetchPartnersList = async () => {
    try {
      const partnersList = await fetchPartners();
      setPartners(partnersList.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching partner list", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnersList();
  }, []);

  const handleOpenModal = (partner) => {
    setSelectedPartner(partner);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPartner(null);
  };

  if (loading) return <Loader/>;

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-left rtl:text-right">
          <caption className="p-5 text-xl font-semibold text-left rtl:text-right">
            Partners Dashboard
          </caption>
          <thead className="text-md bg-orange-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Verification
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Tag
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {partners &&
              partners.map((partner) => (
                <tr className="hover:bg-orange-50" key={partner._id}>
                  <td className="px-6 py-2">{partner.name}</td>
                  <td className="px-6 py-2"
                      style={{ color: partner.isVerified ? 'green' : 'red' }}>
                    {partner.isVerified ? "Verified" : "Pending"}
                  </td>
                  <td className="px-6 py-2">{partner.state}</td>
                  <td className="px-6 py-2">{partner.city}</td>
                  <td className="px-6 py-2">{partner.tag}</td>
                  <td className="px-6 py-2">
                    {partner.rating}{" "}
                    <FontAwesomeIcon
                      icon={faStar}
                      className="font-sm text-yellow-400"
                    />
                  </td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => handleOpenModal(partner)}
                      className="font-medium text-orange-500"
                    >
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Schedule
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        partner={selectedPartner}
      />
    </div>
  );
}

export default PartnersDashboard;
