"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation'
import Transition from '@/components/Transition';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const csrf = async () => {
      await axios.get('/sanctum/csrf-cookie');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await csrf(); 
        const response = await axios.post('/api/login', {
          name,
          password,
        });
  
        if (response.status === 200) {
          const { role, token } = response.data;

          // Cookies.set('jwt', token, { expires: 1, path: '/', httpOnly: true });

          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', token );
  
          if (role === 'admin') {
            toast.success('Anda berhasil login sebagai admin');
            router.push('/admin/dashboard');
          } else if (role === 'koordinator') {
            toast.success('Anda berhasil login sebagai koordinator');
            router.push('/koordinator/dashboard');
          } else {
            toast.success('Anda berhasil login sebagai anggota');
            router.push('/anggota/dashboard');
          }
          } else {
            toast.error('Gagal melakukan login. Silakan cek kembali email dan password Anda.');
          }
          
      } catch (error) {
        console.error('Error:', error);
        toast.error('Gagal melakukan login. Silakan cek kembali email dan password Anda.')
       
      }
    };
  
  return (
    <>
      <Transition/> 
    <div className="container mx-auto px-4 h-full ">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4 ">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign in with
                </h6>
              </div>
 
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-blueGray-400 text-center mb-3 font-bold">
              </div>
              <form onSubmit={handleSubmit} method="post">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Username"
                    value={name} onChange={(e) => setName(e.target.value)} required 
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                  />
                </div>
                <div className="text-center mt-6">
                  <button
                    className=" bg-slate-800 text-white active:bg-slate-500 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                <div className="text-blueGray-400 text-center mt-2 font-bold">
              <Link href="/auth/register">
                  <small>Create new account</small>
              </Link>
            </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2">
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </>
  )

}


