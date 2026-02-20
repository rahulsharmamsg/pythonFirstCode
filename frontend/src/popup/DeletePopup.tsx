import React from "react";

type DeletePopupProps = {
  cancelDelete: () => void;
  handleDelete: () => void;
};

const DeletePopup = ({ cancelDelete, handleDelete }: DeletePopupProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[360px] p-6 animate-scaleIn">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Confirm Delete
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm text-center mb-6">
          Are you sure you want to delete this item?  
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
