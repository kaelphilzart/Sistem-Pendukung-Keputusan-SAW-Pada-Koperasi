"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '@/lib/axios';

export default function page() {

  const [nama, setNama] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [tipe, setTipe] = useState('');
  const [text_input, setText_input] = useState('');

  const router = useRouter();

  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
}

  const handleTambah = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      const response = await axios.post('/api/tambah-kriteria', {
        nama,
        keterangan,
        tipe,
        text_input,
      });
      if (response.status === 201) {
       toast.success('Tambah Kriteria berhasil');
        router.push('/admin/data-kriteria');
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
    <div className="container mx-auto px-4 h-full pt4">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full  px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
            <div className="rounded-t mb-0 px-6 py-4">
              <div className="text-center mb-3"> 
                <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                  Tambah Kriteria
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleTambah} method='post'>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nama Kriteria
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Nama Kriteria"
                    value={nama} onChange={(e) => setNama(e.target.value)} required/>
                </div>
                  <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Status Kriteia
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={keterangan} onChange={(e) => setKeterangan(e.target.value)} required>
                         <option >Status kriteria</option>
                        <option value="1">Benefit</option>
                        <option value="2">Cost</option>
                      </select>
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Tipe
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={tipe} onChange={(e) => setTipe(e.target.value)} required>
                         <option >Tipe</option>
                        <option value="file">File</option>
                        <option value="text">Text</option>
                      </select>
                    </div>
                    <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Perintah
                  </label>
                  <textarea
                      id="text_input"
                      value={text_input}
                      onChange={(e) => setText_input(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
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
