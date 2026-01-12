// components/SessionExpiredModal.tsx
import React from "react";

const SessionExpiredModal = ({ onConfirm }: { onConfirm: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[320px] text-center">
        <h2 className="text-lg font-semibold mb-2">Session Expired</h2>
        <p className="text-gray-600 mb-4">
          Your session has expired. Please login again.
        </p>
        <button
          onClick={onConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
