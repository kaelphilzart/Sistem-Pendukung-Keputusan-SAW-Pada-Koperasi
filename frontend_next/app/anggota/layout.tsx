"use client"

import DefaultLayout from "@/components/Layouts/DefaultLayoutAnggota";
import "@/css/satoshi.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth'; // Menggunakan custom hook useAuth untuk mendapatkan informasi pengguna
import { toast } from "react-toastify";


export default function Anggotalayout({
    children,
}: {
    children: React.ReactNode; 
}) {

  const router = useRouter();
  const { user, loading } = useAuth(); // Menggunakan custom hook useAuth untuk mendapatkan informasi pengguna

  useEffect(() => {
    // Mengecek apakah token ada di cookies
    const authToken = localStorage.getItem('token'); // Menggunakan nama cookies 'jwt' untuk menyimpan token JWT
    if (authToken == null ) {
      // Jika tidak ada token, arahkan ke halaman login
      toast.error('Silakan Login terlebih dahulu')
      router.push('/auth/login');
    } else if (!user) {
      // Jika ada token tapi pengguna belum didapatkan (misalnya, setelah refresh halaman), coba dapatkan informasi pengguna lagi
      useAuth();
    }
  }, [user, router]);

  // Jika loading, tampilkan loading spinner atau indikator lainnya
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
   <main>
        <section className="">  
        <DefaultLayout children={children}/>
        </section>
      </main>
    </>

  )
}
