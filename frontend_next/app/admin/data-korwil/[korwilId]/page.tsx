"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import Transition from '@/components/Transition'
import { toast } from 'react-toastify'

export default function page({ params }: { params: { korwilId: string } }) {

  const router = useRouter();
  
  const [korwil, setKorwil] = useState({ nama_korwil: '', daerah: '' });

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`/api/edit-korwil/${params.korwilId}`);
              setKorwil(response.data);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchData();
  }, [params.korwilId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Memanggil API untuk memperbarui data pengguna
      const response = await axios.put(`/api/update-korwil/${params.korwilId}`, {
        nama_korwil: korwil.nama_korwil,
        daerah: korwil.daerah,
      });
  
      // Memeriksa status respons untuk menentukan apakah pembaruan berhasil
      if (response.status === 200) {
        toast.success('pembaruan berhasil dilakukan')
        router.push('/admin/data-korwil')
      } else {
        // Menangani situasi di mana pembaruan gagal
        toast.error(response.data.error || 'Terjadi kesalahan dalam pembaruan.');
      }
    } catch (error) {
      // Menangani kesalahan saat melakukan pembaruan
      console.error('Error:', error);
      alert('Terjadi kesalahan dalam mengirim permintaan');
    }
  };
  

  return (
   <>
   <Transition/>
     <div className="flex flex-col gap-9">
         
          <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" px-6.5 py-4 dark:border-strokedark">
              <h2 className="font-medium text-black dark:text-white text-center">
                Edit Koordinator
              </h2>
            </div>
       <form method="post" onSubmit={handleUpdate}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Koordinator
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nama"
                    value={korwil.nama_korwil} onChange={(e) => setKorwil({ ...korwil, nama_korwil: e.target.value })} required

                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Wilayah
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Wilayah"
                    value={korwil.daerah} onChange={(e) => setKorwil({ ...korwil, daerah: e.target.value })} required

                  />
                </div>
                <div className="text-start mt-6" >
                  <button
                    className="rounded-md bg-slate-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
                <div className="text-blueGray-400 text-center mt-2 font-bold">
            </div>
              </form>
        </div>
    </div>
   </>
  )
}
