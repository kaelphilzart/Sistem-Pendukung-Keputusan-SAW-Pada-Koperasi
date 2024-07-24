// components/Paginate.js
import React from 'react';

const Paginate = ({ currentPage, itemsPerPage, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200 disabled:text-gray-400"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200 disabled:text-gray-400"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Paginate;
