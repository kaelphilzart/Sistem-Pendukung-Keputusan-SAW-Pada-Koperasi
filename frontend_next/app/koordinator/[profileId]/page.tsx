"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';
import getUserRole from '@/hooks/useAuth'; // Sesuaikan path sesuai dengan project Anda
import { PuffLoader } from 'react-spinners';
import { RingLoader } from 'react-spinners';
import './styles.css';

export default function Page() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserRole();

        if (!user || !user.id) {
          router.push('/koordinator/isi-profile');
          return;
        }

        const response = await axios.get(`/api/show-profile/${user.id}`);
        
        if (response.status === 200) {
          setProfile(response.data);
        } else if (response.status === 404) {
          router.push('/koordinator/isi-profile');
        } else {
          toast.error('Terjadi kesalahan saat mengambil data profil.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        router.push('/koordinator/isi-profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="overlay">
        <RingLoader color="#36d7b7" loading={loading} size={150} />
      </div>
    );
  }

  if (!profile) {
    // Jika profile tidak ditemukan, alihkan ke halaman pengisian profil
    return null; // Tidak menampilkan apapun, alihkan langsung ke halaman isi profil
  }

  return (
    <>
      <Transition />
      <div className="container mx-auto px-4 h-full pt-7">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 drop-shadow-lg rounded-lg bg-blueGray-200 border-0 bg-slate-100">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                  Profile 
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
             
              <div className="rounded-sm bg-slate-100 shadow-default dark:border-strokedark dark:bg-boxdark">

          {/* Tampilkan data profil di sini */}
          <div className="px-6.5 py-2">
            <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">Nama Lengkap</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{profile.nama_lengkap}</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">Jenis Kelamin</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{profile.jenis_kelamin}</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">Umur</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{profile.umur}</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">Alamat</p>
                </div>

                <div className="relative w-full mb-3">
                  <p className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{profile.alamat}</p>
                </div>

            </div>
          </div>
        </div>

             
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
