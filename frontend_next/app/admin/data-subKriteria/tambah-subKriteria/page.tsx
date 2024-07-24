"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '@/lib/axios';
import { getKriteriaData } from '@/components/data/index';

export default function page() {

  const [id_kriteria, setId_kriteria] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [nilai, setNilai] = useState('');

  const router = useRouter();

  const [daftarKriteriaSub, setdaftarKriteriaSub] = useState([]);

  useEffect(() => {
      const fetchKriteria = async () => {
          try {
              const response = await axios.get('/api/daftar-KriteriaSub');
              setdaftarKriteriaSub(response.data);
          } catch (error) {
              console.error('Gagal mengambil data kriteria:', error);
          }
      };

      fetchKriteria();
  }, []);

  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
}

  const handleTambah = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      const response = await axios.post('/api/tambah-subKriteria', {
        id_kriteria,
        keterangan,
        nilai,
      });
      if (response.status === 201) {
       toast.success('Tambah sub Pada kriteria berhasil');
        router.push('/admin/data-subKriteria');
      } else {
        toast.warning('Terjadi kesalahan atau ada fied yang kosong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan dalam mengirim permintaan');
    }
  };
  
  
  return (
    <>
         {/* Wrap the content with Transition component */}
         <Transition/> 
    <div className="container mx-auto px-4 h-full pt-7">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3"> 
                <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                  Tambah Sub Kriteria
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleTambah} method='post'>
                  <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Nama Kriteria
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={id_kriteria} onChange={(e) => setId_kriteria(e.target.value)} required
                    >
                        <option value="">Daftar Kriteria</option>
                        {daftarKriteriaSub.map((kriteria) => (
                            <option key={kriteria.id} value={kriteria.id}>{kriteria.nama}</option>
                        ))}
                    </select>
                    </div>
                    <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Keterangan
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Keterangan"
                    value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required/>
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nilai
                  </label>
                  <input
                    type="number"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nilai"
                    value={nilai} onChange={(e) => setNilai(e.target.value)} required/>
                </div>
                <div className="text-center mt-2">
                  <button
                    className="bg-slate-800 hover:bg-sky-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
  
}
