"use client"
import Transition from '@/components/Transition';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';


export default function page() {
  //   const router = useRouter();

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     try {
  //       const user = await authService.checkLoginStatus();
  //       console.log('User:', user);
  //       // Tambahkan logika untuk halaman anggota di sini

  //       // Jika bukan anggota, redirect ke halaman lain (misalnya halaman login)
  //       if (user.role !== 'anggota') {
  //         router.push('/auth/login');
  //       }
  //     } catch (error) {
  //       console.error('Check login status error:', error);
  //       // Redirect atau tindakan lain jika tidak ada token atau token tidak valid
  //       router.push('/login');
  //     }
  //   };

  //   checkLogin();
  // }, []);
    
    return (
      
       <>
          <Transition/> 
          <div className="text-xl">
         <p>Selamat datang di Koperasi Mitra Sejahtera</p>
         </div>
          
      </>
      )

}
