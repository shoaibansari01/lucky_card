import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, actionType }) => {
  if (!isOpen) return null;

  const getMessage = () => {
    switch (actionType) {
      case "delete":
        return "Do you really want to delete this admin?";
      case "block":
        return "Are you sure you want to block this admin?";
      case "unblock":
        return "Are you sure you want to unblock this admin?";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
        <p className="mb-4">{getMessage()}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 text-white bg-red-500 hover:bg-red-600 font-semibold py-1 px-2 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="text-gray-700 bg-gray-300 hover:bg-gray-400 font-semibold py-1 px-2 rounded"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
