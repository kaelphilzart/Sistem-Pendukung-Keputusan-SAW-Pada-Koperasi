// components/ValidationModal.js
import React from 'react';
import Image from 'next/image';

const ValidationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative mx-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-lg z-10">
        <div className="flex justify-between items-center pb-3 border-b-2">
          <h2 className="text-xl font-semibold">Konfirmasi</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <Image src="/images/times-circle.svg" alt="Close" width={24} height={24} />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <Image src="/images/check-circle.svg" alt="Success" width={48} height={48} />
          <p className="ml-2">{message}</p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Tidak
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={onConfirm}
          >
            Iya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
