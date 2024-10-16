import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";
import Modal from "./Modal"; // Import the modal component

function AdminData() {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Function to check auth token and redirect if not present
  const checkAuthToken = () => {
    const token = localStorage.getItem("authToken");

    // If token is missing, redirect to the root (localhost:3000)
    if (!token) {
      window.location.replace("http://localhost:3000"); // Hard redirect
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!checkAuthToken()) return; // Check authToken on component mount

    // Fetch data if token is valid
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

  const handleDelete = (adminId) => {
    if (!checkAuthToken()) return; // Ensure user is authenticated before proceeding

    setSelectedEmail(adminId);
    setActionType("delete");
    setModalOpen(true);
  };

  const toggleBlockUnblock = (admin) => {
    if (!checkAuthToken()) return; // Ensure user is authenticated before proceeding

    setSelectedAdmin(admin);
    setSelectedEmail(admin.adminId);
    setActionType(admin.isBlocked ? "unblock" : "block");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      window.location.replace("http://localhost:3000"); // Redirect if token is missing
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

      // Update state after action (delete or block/unblock)
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmAction}
        actionType={actionType}
      />
    </>
  );
}

export default AdminData;
