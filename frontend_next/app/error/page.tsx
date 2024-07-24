"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Transition from '@/components/Transition';

export default function page() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/anggota/dashboard');
  };

  return (
    <>
    <Transition />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Maaf</h1>
        <p className="mb-4">Anda sudah mengajukan peminjaman pada bulan ini. Tidak dapat mengajukan pinjaman baru.</p>
        <button
          onClick={handleBackToHome}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-150"
        >
          Back to Home
        </button>
      </div>
    </div>
    </>
    
  );
}
