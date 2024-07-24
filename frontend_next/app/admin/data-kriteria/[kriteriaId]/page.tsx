"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import Transition from '@/components/Transition'
import { toast } from 'react-toastify'

export default function page({ params }: { params: { kriteriaId: string } }) {

  const router = useRouter();
  
  const [kriteria, setKriteria] = useState({ nama: '', keterangan: '', tipe: '', text_input: '' });

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`/api/edit-kriteria/${params.kriteriaId}`);
              setKriteria(response.data);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchData();
  }, [params.kriteriaId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Memanggil API untuk memperbarui data pengguna
      const response = await axios.put(`/api/update-kriteria/${params.kriteriaId}`, {
        nama: kriteria.nama,
        keterangan: kriteria.keterangan,
        tipe: kriteria.tipe,
        text_input: kriteria.text_input,
      });
  
      // Memeriksa status respons untuk menentukan apakah pembaruan berhasil
      if (response.status === 200) {
        toast.success('pembaruan berhasil dilakukan')
        router.push('/admin/data-kriteria')
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
                Edit Kriteria
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
                    placeholder="Nama Kriteria"
                    value={kriteria.nama} onChange={(e) => setKriteria({ ...kriteria, nama: e.target.value })} required

                  />
                </div>
                <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Status Kriteria Baru
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={kriteria.keterangan} onChange={(e) => setKriteria({ ...kriteria, keterangan: e.target.value })} required>
                          <option >Status</option>
                        <option value="1">Benefit</option>
                        <option value="2">Cost</option>
                      </select>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Tipe Baru
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={kriteria.tipe} onChange={(e) => setKriteria({ ...kriteria, tipe: e.target.value })} required>
                          <option >Tipe</option>
                        <option value="file">File</option>
                        <option value="text">Text</option>
                      </select>
                    </div>
                    <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Text Perintah
                  </label>
                  <textarea
                      id="text_input"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                      value={kriteria.text_input} onChange={(e) => setKriteria({ ...kriteria, text_input: e.target.value })} required
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
