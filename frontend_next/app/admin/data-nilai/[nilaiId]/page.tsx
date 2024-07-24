"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import Transition from '@/components/Transition'
import { toast } from 'react-toastify'

export default function page({ params }: { params: { nilaiId: string } }) {

  const router = useRouter();
  
  const [nilai, setNilai] = useState({ nilai_bobot: '' });

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`/api/edit-nilai/${params.nilaiId}`);
              setNilai(response.data);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchData();
  }, [params.nilaiId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Memanggil API untuk memperbarui data pengguna
      const response = await axios.put(`/api/update-nilai/${params.nilaiId}`, {
        nilai_bobot: nilai.nilai_bobot,
      });
  
      // Memeriksa status respons untuk menentukan apakah pembaruan berhasil
      if (response.status === 200) {
        toast.success('pembaruan berhasil dilakukan')
        router.push('/admin/data-nilai')
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
                Edit Nilai
              </h2>
            </div>
       <form method="post" onSubmit={handleUpdate}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Kriteria
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Username"
                    value={nilai.nama_kriteria} readOnly

                  />
                </div>
                      <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-role"
                    >
                      Nilai Bobot
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nilai Bobot"
                      value={nilai.nilai_bobot}
                      onChange={(e) => setNilai({ ...nilai, nilai_bobot: e.target.value })}
                      required
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
