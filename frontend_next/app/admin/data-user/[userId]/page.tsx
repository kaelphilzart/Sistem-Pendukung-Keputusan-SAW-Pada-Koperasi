"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import Transition from '@/components/Transition'

export default function page({ params }: { params: { userId: string } }) {

  const router = useRouter();
  
  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`/api/edit-user/${params.userId}`);
              setUser(response.data);
          } catch (error) {
              console.error('Error fetching user data:', error);
          }
      };

      fetchData();
  }, [params.userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Memanggil API untuk memperbarui data pengguna
      const response = await axios.put(`/api/update-user/${params.userId}`, {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
  
      // Memeriksa status respons untuk menentukan apakah pembaruan berhasil
      if (response.status === 200) {
        alert('Pembaruan berhasil!');
        router.push('/admin/data-user')
      } else {
        // Menangani situasi di mana pembaruan gagal
        alert(response.data.error || 'Terjadi kesalahan dalam pembaruan.');
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
                Edit User
              </h2>
            </div>
       <form method="post" onSubmit={handleUpdate}>
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
                    value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required

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
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      required
                    />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password Baru
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required

                  />
                </div>
                <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role"
                      >
                        Role Baru
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} required>
                          <option >pilih sebagai apa</option>
                        <option value="anggota">Anggota</option>
                        <option value="admin">Admin</option>
                      </select>
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
