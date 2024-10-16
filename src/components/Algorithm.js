// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";
// import Constant from "../utils/Constant";

// function AdminData() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     axios
//       .get(`${Constant.BASE_URL}/admin/all-admins`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching:", error);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   const handleDelete = (email) => {
//     const token = localStorage.getItem("authToken");
//     axios
//       .delete(`${Constant.BASE_URL}/super-admin/delete-admin`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: { email }, // Send email in the body for delete
//       })
//       .then((response) => {
//         setData((prevData) => prevData.filter((item) => item.email !== email));
//         alert("Admin deleted successfully!");
//       })
//       .catch((error) => {
//         console.error("Error deleting admin:", error);
//         alert("Failed to delete admin.");
//       });
//   };

//   const handleBlock = (email) => {
//     const token = localStorage.getItem("authToken");
//     axios
//       .post(
//         `${Constant.BASE_URL}/super-admin/block-admin`,
//         { email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.email === email ? { ...item, isBlocked: true } : item
//           )
//         );
//         alert("Admin blocked successfully!");
//       })
//       .catch((error) => {
//         console.error("Error blocking admin:", error);
//         alert("Failed to block admin.");
//       });
//   };

//   const handleUnblock = (email) => {
//     const token = localStorage.getItem("authToken");
//     axios
//       .post(
//         `${Constant.BASE_URL}/super-admin/unblock-admin`,
//         { email },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.email === email ? { ...item, isBlocked: false } : item
//           )
//         );
//         alert("Admin unblocked successfully!");
//       })
//       .catch((error) => {
//         console.error("Error unblocking admin:", error);
//         alert("Failed to unblock admin.");
//       });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 bg-gray-200 h-[91vh] overflow-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Data</h1>
//         {loading ? (
//           <div className="text-gray-500">Loading...</div>
//         ) : data.length > 0 ? (
//           <div className="overflow-hidden border-b border-gray-200 shadow-md rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Created On
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Wallet Balance
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {data.map((item) => (
//                   <tr key={item.email}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {item.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {item.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {new Date(item.creationDate).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       ₹{item.walletBalance}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       <button
//                         className="mr-2 text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 rounded"
//                         onClick={() => handleDelete(item.email)}
//                       >
//                         Delete
//                       </button>
//                       <button
//                         className={`mr-2 text-white font-semibold py-1 px-2 rounded ${
//                           item.isBlocked
//                             ? "bg-green-500 hover:bg-green-600"
//                             : "bg-yellow-500 hover:bg-yellow-600"
//                         }`}
//                         onClick={() =>
//                           item.isBlocked
//                             ? handleUnblock(item.email)
//                             : handleBlock(item.email)
//                         }
//                       >
//                         {item.isBlocked ? "Unblock" : "Block"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="mt-4 text-gray-500">No admin data available.</div>
//         )}
//       </div>
//     </>
//   );
// }

// export default AdminData;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Constant from "../utils/Constant";

function AdminData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Check if token exists, if not redirect to login page
    if (!token) {
      window.location.replace("http://localhost:3000"); // Redirect to login page
      return; // Prevent further execution
    }

    axios
      .get(`${Constant.BASE_URL}/admin/all-admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (email) => {
    const token = localStorage.getItem("authToken");
    axios
      .delete(`${Constant.BASE_URL}/super-admin/delete-admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { email }, // Send email in the body for delete
      })
      .then((response) => {
        setData((prevData) => prevData.filter((item) => item.email !== email));
        alert("Admin deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting admin:", error);
        alert("Failed to delete admin.");
      });
  };

  const handleBlock = (email) => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${Constant.BASE_URL}/super-admin/block-admin`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData((prevData) =>
          prevData.map((item) =>
            item.email === email ? { ...item, isBlocked: true } : item
          )
        );
        alert("Admin blocked successfully!");
      })
      .catch((error) => {
        console.error("Error blocking admin:", error);
        alert("Failed to block admin.");
      });
  };

  const handleUnblock = (email) => {
    const token = localStorage.getItem("authToken");
    axios
      .post(
        `${Constant.BASE_URL}/super-admin/unblock-admin`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData((prevData) =>
          prevData.map((item) =>
            item.email === email ? { ...item, isBlocked: false } : item
          )
        );
        alert("Admin unblocked successfully!");
      })
      .catch((error) => {
        console.error("Error unblocking admin:", error);
        alert("Failed to unblock admin.");
      });
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-200 h-[91vh] overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Data</h1>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : data.length > 0 ? (
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
                        className={`mr-2 text-white font-semibold py-1 px-2 rounded ${
                          item.isBlocked
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                        onClick={() =>
                          item.isBlocked
                            ? handleUnblock(item.email)
                            : handleBlock(item.email)
                        }
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
    </>
  );
}

export default AdminData;

