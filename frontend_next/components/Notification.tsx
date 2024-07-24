import React from 'react';

export default function NotificationDelete({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
