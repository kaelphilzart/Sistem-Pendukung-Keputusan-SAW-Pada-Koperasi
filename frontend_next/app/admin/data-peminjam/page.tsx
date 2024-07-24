"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { getPeminjamCair } from '@/components/data/index';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';

export default function Page() {
  
  const router = useRouter(); 
  const [peminjamData, setPeminjamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    const peminjam = async () => {
      try {
        const peminjamData = await getPeminjamCair();
        setPeminjamData(peminjamData);
        setFilteredData(peminjamData); // Set filteredData to initial data
      } catch (error) {
        console.error('Error fetching users:', error);
        setPeminjamData([]);
        setFilteredData([]);
      }
    };

    peminjam();
  }, []);

  const cairkan = async (userId, danaCair) => {
    try {
      const response = await axios.post('/api/cair-dana', { status_dana: 'cair', id_user: userId, dana_cair: danaCair });
      if (response.status === 201) {
        toast.success('Dana berhasil dicairkan');
        const updatedPeminjamData = peminjamData.map((peminjam) =>
          peminjam.id_user === userId ? { ...peminjam, status_dana: 'cair' } : peminjam
        );
        setPeminjamData(updatedPeminjamData);
        setFilteredData(updatedPeminjamData);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Terjadi kesalahan saat mencairkan dana');
    }
  };

  const handleFilterChange = (e) => {
    const selectedMonth = e.target.value;
    setFilterMonth(selectedMonth);

    if (selectedMonth) {
      const filtered = peminjamData.filter((peminjam) =>
        new Date(peminjam.created_at).toISOString().slice(0, 7) === selectedMonth
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(peminjamData);
    }
  };

  return (
    <>
      <Transition/>
      <div className="container mx-auto px-4 h-full pt-7">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                    Data Peminjam Siap Pencairan
                  </h6>
                </div>
                <div className="col-start-2 flex items-center ">
                  <input
                    id="month-filter"
                    type="month"
                    value={filterMonth}
                    onChange={handleFilterChange}
                    className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <button 
                    onClick={() => setFilterMonth("")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Reset
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto py-4">
                    <thead>
                      <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="py-4 font-medium text-black dark:text-white">No</th>
                        <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Nama Peminjam</th>
                        <th className="min-w-[120px] py-4 font-medium text-black dark:text-white">Nama Koordinator</th>
                        <th className="py-4 font-medium text-black dark:text-white">Ajuan Pinjaman</th>
                        <th className="py-4 font-medium text-black dark:text-white">Dana Cair</th>
                        <th className="py-4 font-medium text-black dark:text-white">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((peminjam, key) => (
                        <tr key={key}>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{key + 1}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">{peminjam.nama_peminjam}</h5>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{peminjam.nama_korwil}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{peminjam.ajuan_dana}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{peminjam.dana_cair}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">
                              {peminjam.status_dana === 'belum' ? (
                                <button
                                  className="hover:bg-sky-700 bg-red-700 rounded-md text-white p-2"
                                  type="button"
                                  onClick={() => cairkan(peminjam.id_user, peminjam.dana_cair)}
                                >
                                  Cairkan
                                </button>
                              ) : (
                                <button className="hover:bg-sky-700 bg-green-700 rounded-md text-white p-2" type="button" disabled>
                                  Selesai
                                </button>
                              )}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
