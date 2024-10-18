import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";
import Modal from "./Modal"; 
function AdminData() {
  const [data, setData] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [gameDetails, setGameDetails] = useState([]); 
  const [adminId, setAdminId] = useState("");

  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000"); 
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!checkAuthToken()) return; 
    axios
      .get(`${Constant.BASE_URL}/super-admin/all-admins`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);

  const handleCheckDetails = async (admin) => {
    setSelectedAdmin(admin);
    setPopupOpen(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/super-admin/winnings/${admin.adminId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      console.log("API response for winnings:", response.data);
      setGameDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching game details:", error);
    }
  };

  const closePopup = () => {
    setPopupOpen(false); 
    setSelectedAdmin(null); 
    setGameDetails([]); 
  };

  const handleDelete = (adminId) => {
    if (!checkAuthToken()) return; 
    setSelectedEmail(adminId);
    setActionType("delete");
    setModalOpen(true);
  };

  const toggleBlockUnblock = (admin) => {
    if (!checkAuthToken()) return;
    setSelectedAdmin(admin);
    setSelectedEmail(admin.adminId);
    setActionType(admin.isBlocked ? "unblock" : "block");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.replace("http://localhost:3000"); 
      return;
    }
    let apiUrl = "";
    if (actionType === "delete") {
      apiUrl = `${Constant.BASE_URL}/super-admin/delete-admin`;
    } else if (actionType === "block") {
      apiUrl = `${Constant.BASE_URL}/super-admin/block-admin`;
    } else if (actionType === "unblock") {
      apiUrl = `${Constant.BASE_URL}/super-admin/unblock-admin`;
    }
    try {
      await axios.post(
        apiUrl,
        { adminId: selectedEmail },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (actionType === "delete") {
        setData((prevData) =>
          prevData.filter((item) => item.adminId !== selectedEmail)
        );
      } else {
        setData((prevData) =>
          prevData.map((item) =>
            item.adminId === selectedEmail
              ? { ...item, isBlocked: actionType === "block" }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error performing action:", error);
    }
    setModalOpen(false);
    setSelectedEmail("");
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-200 h-[91vh] overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Data</h1>
        {data.length > 0 ? (
          <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wallet Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.email}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(item.creationDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{item.walletBalance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        className="mr-2 text-white bg-green-600 hover:bg-green-700 font-semibold py-1 px-2 rounded"
                        onClick={() => handleCheckDetails(item)}
                      >
                        Check Details
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        className="mr-2 text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 rounded"
                        onClick={() => handleDelete(item.adminId)}
                      >
                        Delete
                      </button>
                      <button
                        className={`mr-2 text-white font-semibold py-1 px-2 rounded ${
                          item.isBlocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                        onClick={() => toggleBlockUnblock(item)}
                      >
                        {item.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-4 text-gray-500">No admin data available.</div>
        )}
      </div>

      {/* Static Popup */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 flex items-center pl-[460px]  bg-gray-900 bg-opacity-75 z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl max-w-5xl w-full h-[500px] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Admin Game Details
            </h2>

            <div className="w-full h-[350px] overflow-auto scrollbar-hide rounded-lg mb-4 border border-gray-300">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-6 py-3 text-sm font-semibold text-gray-700">
                      Game ID
                    </th>
                    <th className="border px-6 py-3 text-sm font-semibold text-gray-700">
                      Admin ID
                    </th>
                    <th className="border px-6 py-3 text-sm font-semibold text-gray-700">
                      Winning Amount
                    </th>
                    <th className="border px-6 py-3 text-sm font-semibold text-gray-700">
                      Created At
                    </th>
                    <th className="border px-6 py-3 text-sm font-semibold text-gray-700">
                      Updated At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gameDetails.length > 0 ? (
                    gameDetails.map((game) => (
                      <tr
                        key={game._id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="border px-6 py-3 text-gray-800 text-sm">
                          {game.gameId}
                        </td>
                        <td className="border px-6 py-3 text-gray-800 text-sm">
                          {game.adminId}
                        </td>
                        <td className="border px-6 py-3 text-gray-800 text-sm">
                          ₹{game.winningAmount}
                        </td>
                        <td className="border px-6 py-3 text-gray-800 text-sm">
                          {new Date(game.createdAt).toLocaleString()}
                        </td>
                        <td className="border px-6 py-3 text-gray-800 text-sm">
                          {new Date(game.updatedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="border px-6 py-3 text-center text-gray-500 text-sm"
                      >
                        No game details available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              className="absolute bottom-3 right-6 bg-red-500 text-white hover:bg-red-600 font-semibold py-2 px-6 rounded-lg shadow-md "
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Delete/Block/Unblock Confirmation */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmAction}
          actionType={actionType}
          email={selectedEmail}
        />
      )}
    </>
  );
}

export default AdminData;
