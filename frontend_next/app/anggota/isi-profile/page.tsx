"use client"
import React from 'react'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';


export default function page() {

  const [nama_lengkap, setNamaLengkap] = useState('');
  const [jenis_kelamin, setJenisKelamin] = useState('');
  const [umur, setUmur] = useState('');
  const [alamat, setAlamat] = useState('');
  const [id_user, setIdUser] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //     const fetchKriteria = async () => {
  //         try {
  //             const response = await axios.get('/api/daftar-KriteriaSub');
  //             setdaftarKriteria(response.data);
  //         } catch (error) {
  //             console.error('Gagal mengambil data kriteria:', error);
  //         }
  //     };

  //     fetchKriteria();
  // }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await useAuth();
        setIdUser(user.id);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);
    
  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
}

  const handleTambah = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      const response = await axios.post('/api/submit-profile', {
        id_user,
        nama_lengkap,
        jenis_kelamin,
        umur,
        alamat,
      });
      if (response.status === 201) {
        toast.success('Profile berhasil diisi');
        router.push('/anggota/dashboard');
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
     <Transition/>
         {/* Wrap the content with Transition component */}
    <div className="container mx-auto px-4 h-full pt-7">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3"> 
                <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                  Profile
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 ">
              <form onSubmit={handleTambah} method='post'>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2 mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Nama Lengkap"
                        value={nama_lengkap} onChange={(e) => setNamaLengkap(e.target.value)} required/>
                    </div>
                    <div className="w-full xl:w-1/2 mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role">
                       Jenis Kelamin
                      </label>
                      <select
                      id="jenis_kelamin"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={jenis_kelamin}
                      onChange={(e) => setJenisKelamin(e.target.value)}
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="laki-laki">Laki - Laki</option>
                      <option value="perempuan">Perempuan</option>
                    </select>
                    </div>
                    
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2 mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password">
                        Umur
                    </label>
                    <input
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Umur"
                        value={umur} onChange={(e) => setUmur(e.target.value)} required/>
                    </div>
                   
                    <div className="w-full xl:w-1/2 mb-3">
                    <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Alamat
                        </label>
                        <textarea
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Masukkan Alamat"
                          value={alamat}
                          onChange={(e) => setAlamat(e.target.value)}
                          required
                        />
                    </div>
                </div>
                <div className="text-center w-full">
                  <button
                    className="bg-slate-800 hover:bg-sky-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit">
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
