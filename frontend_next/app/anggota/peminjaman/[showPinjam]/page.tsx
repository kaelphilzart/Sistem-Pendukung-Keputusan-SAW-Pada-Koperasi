"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';
import useAuth from '@/hooks/useAuth'; // Ensure the path is correct
import { PuffLoader } from 'react-spinners';
import './styles.css';

export default function Page() {
  const router = useRouter();
  const [pinjam, setPinjam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPinjam = async () => {
      try {
        const user = await useAuth(); // Adjust to match your authentication logic

        if (!user || !user.id) {
          throw new Error("User not found or not authenticated");
        }

        const peminjamanResponse = await axios.get(`/api/show-pinjam/${user.id}`);
        setPinjam(peminjamanResponse.data);
      } catch (error) {
        console.error('Error fetching pinjam data:', error);
        toast.error('Error fetching borrowing history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPinjam();
  }, []);

  const formatRupiah = (angka, prefix) => {
    if (angka === undefined || angka === null) {
      return '';
    }
    angka = angka.toString();

    const numberString = angka.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  };

  if (loading) {
    return (
      <div className="overlay">
        <PuffLoader color="#36d7b7" loading={loading} size={150} />
      </div>
    );
  }

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID');
  };

  return (
    <>
      <Transition />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="grid grid-cols-4 gap-4">
            <h2 className="col-span-3 font-bold">Riwayat Peminjaman</h2>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">No</th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Nama Koordinator</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Besar Pinjaman</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {pinjam.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">Tidak ada riwayat peminjaman</td>
                </tr>
              ) : (
                pinjam.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">{item.nama_korwil}</h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">{formatRupiah(item.jumlah_pinjam.toString(), "Rp. ")}</h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="text-black dark:text-white">{formatTanggal(item.created_at)}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
