import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

function AdminData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get("http://localhost:5000/api/admin/all-admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);

  const handleDelete = (email) => {
    console.log(`Delete admin with email: ${email}`);
  };

  const handleBlock = (email) => {
    console.log(`Block admin with email: ${email}`);
  };

  const handleUnblock = (email) => {
    console.log(`Unblock admin with email: ${email}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 h-[91vh] overflow-auto">
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
                        onClick={() => handleDelete(item.email)}
                      >
                        Delete
                      </button>
                      <button
                        className="mr-2 text-white bg-yellow-500 hover:bg-yellow-600 font-semibold py-1 px-2 rounded"
                        onClick={() => handleBlock(item.email)}
                      >
                        Block
                      </button>
                      <button
                        className="text-white bg-green-500 hover:bg-green-600 font-semibold py-1 px-2 rounded"
                        onClick={() => handleUnblock(item.email)}
                      >
                        Unblock
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
    </>
  );
}

export default AdminData;
