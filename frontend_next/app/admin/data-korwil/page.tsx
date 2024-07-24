"use client"

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { getKorwilData } from '@/components/data/index';
import Transition from '@/components/Transition';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Paginate from "@/components/paginate";


export default function page() {
  
  const router = useRouter(); 
    const [korwilData, setKorwilData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    useEffect(() => {
      const fetchKorwil = async () => {
        try {
          const korwilData = await getKorwilData();
          setKorwilData(korwilData);
        } catch (error) {
          console.error('Error fetching users:', error);
          setKorwilData([]);
        }
      };
  
      fetchKorwil();
    }, []);

  //   const deleteKorwil = async (korwilId) => {
  //     try {
  //       const response = await axios.post('/api/delete-korwil', { korwil_id: korwilId });
  //       console.log(response.data.message); 
  //       toast.success('Koordinator Wilayah  berhasil dihapus')
  //       const updatedKorwilData = korwilData.filter(korwil => korwil.id !== korwilId);
  //       setKorwilData(updatedKorwilData);
  //     } catch (error) {
  //       console.error('Error deleting user:', error);
  //       // Tampilkan pesan kesalahan kepada pengguna jika terjadi masalah
  //     }
  //   };
    

  //   const editKorwil = async (korwilId) => {
  //     try {

  //       router.push(`/admin/data-korwil/${korwilId}`); // Mengarahkan ke halaman data-user dengan userId sebagai parameter
  
  //     } catch (error) {
  //         console.error('Error navigating to user data page:', error);
        
  //     }
  // };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = korwilData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

    

  
  return (
    <>
    <Transition/>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <div className="grid grid-cols-4 gap-4">
          <h2 className='col-span-3 font-bold'>Data Koordinator</h2>
          {/* <Link href="/admin/data-korwil/tambah-korwil">
          <button className=' bg-gray-500 text-white active:bg-gray-700 text-sm  uppercase py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 w-full ease-linear transition-all duration-150'>
            Tambah Koordinator
          </button>
          </Link> */}
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
               <th className=" px-4 py-4 font-medium text-black dark:text-white">
                No
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Nama Koordinator
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Umur
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Jenis Kelamin
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Wilayah
              </th>
              {/* <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody>
             {paginatedData.map((korwil, key) => (
              <tr key={key}>
                 <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                    {(currentPage - 1) * itemsPerPage + key + 1}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {korwil.nama_lengkap}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {korwil.umur}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {korwil.jenis_kelamin}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                  {korwil.alamat}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginate
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={korwilData.length}
            onPageChange={handlePageChange}
          />
      </div>
    </div>
    </>
  )
}
