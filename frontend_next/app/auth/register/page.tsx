"use client"
import React from 'react'
import { useState } from 'react';
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import Transition from '@/components/Transition';
import Link from 'next/link'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();

  const csrf = async () => {
      await axios.get('/sanctum/csrf-cookie');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await csrf();
      const response = await axios.post('/api/register', {
        name,
        email,
        password,
        role,
      });
      if (response.status === 201) {
        toast.success('Registrasi berhasil! Silakan login.');
        router.push('/auth/login'); // Mengarahkan pengguna ke halaman login
      } else {
        toast.error('terjadi kesalahan atau ada field yang kosong')
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('terjadi kesalahan atau ada field yang kosong')
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
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign up with
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Username"
                    value={name} onChange={(e) => setName(e.target.value)} required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)} required
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                  />
                </div>
                  <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Role
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={role}
                        onChange={(e) => setRole(e.target.value)} required
                      >
                         <option >pilih sebagai apa</option>
                        <option value="anggota">Anggota</option>
                        <option value="admin">Admin</option>
                        <option value="koordinator">Koordinator</option>
                      </select>
                    </div>
                <div className="text-center mt-2">
                  <button
                    className="bg-slate-800 hover:bg-sky-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Create Account
                  </button>
                  <div className="text-blueGray-400 text-center mt-2 font-bold">
              <Link href="/auth/login">
                  <small>Sign In</small>
              </Link>
            </div>
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
