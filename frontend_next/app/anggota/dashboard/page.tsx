"use client";
import Transition from '@/components/Transition';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import CardDataStats from "@/components/CardDataStats";

export default function Page() {
  const [simpananWajib, setSimpananWajib] = useState('Loading...');
  const [simpananPokok, setSimpananPokok] = useState('Loading...');
  const [simpananSukarela, setSimpananSukarela] = useState('Loading...');
  const [tunggakan, setTunggakan] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [informasi, setInformasi] = useState(null);

  useEffect(() => {
    const fetchInformasi = async () => {
      try {
        const response = await axios.get('/api/get-user-role-anggota');
        setInformasi(response.data.anggota);
        setSimpananWajib(response.data.simpananWajib.toString());
        setSimpananPokok(response.data.simpananPokok.toString());
        setSimpananSukarela(response.data.simpananSukarela.toString());
        setTunggakan(response.data.tunggakan.toString());
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        setError('Error fetching informasi cair');
        console.error('Error fetching informasi cair:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchInformasi();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const formatRupiah = (angka, prefix) => {
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

  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}

      {!loading && (
        <>
          <Transition />
          <div className="container">
            <div className="grid grid-cols-3 gap-4">
            <p className='font-semibold text-xl mb-4 col-span-2'>Informasi Saldo</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-4">
              <CardDataStats title="Simpanan Wajib" total={simpananWajib !== 'Loading...' ? formatRupiah(simpananWajib, "Rp. ") : simpananWajib} rate="0.43%" levelUp>
                <img
                  className="fill-primary dark:fill-white"
                  style={{ width: '35%', height: '35%' }}
                  src="/images/wajib.png" // replace with your actual path
                  alt="Total views icon"
                />
              </CardDataStats>
              <CardDataStats title="Simpanan Pokok" total={simpananPokok !== 'Loading...' ? formatRupiah(simpananPokok, "Rp. ") : simpananPokok} rate="4.35%" levelUp>
                <img
                  className="fill-primary dark:fill-white"
                  style={{ width: '35%', height: '35%' }}
                  src="/images/pokok.png" // replace with your actual path
                  alt="Total views icon"
                />
              </CardDataStats>
              <CardDataStats title="Simpanan Sukarela" total={simpananSukarela !== 'Loading...' ? formatRupiah(simpananSukarela, "Rp. ") : simpananSukarela} rate="2.59%" levelUp>
                <img
                  className="fill-primary dark:fill-white"
                  style={{ width: '35%', height: '35%' }}
                  src="/images/sukarela.png" // replace with your actual path
                  alt="Total views icon"
                />
              </CardDataStats>
              <CardDataStats title="Tunggakan" total={tunggakan !== 'Loading...' ? formatRupiah(tunggakan, "Rp. ") : tunggakan} rate="0.95%" levelDown>
                <img
                  className="fill-primary dark:fill-white"
                  style={{ width: '35%', height: '35%' }}
                  src="/images/tunggakan.png" // replace with your actual path
                  alt="Total views icon"
                />
              </CardDataStats>
            </div>

            <div>
              <p className='font-semibold text-xl mb-4'>Informasi Pencairan Dana</p>
              {informasi ? (
                <div className='bg-white drop-shadow-md p-4 rounded'>
                <p>
                 <span className="font-bold text-lg"> Selamat</span> atas nama <span className="font-bold">{informasi.nama_peminjam}</span>! Dana pinjaman sebesar 
                  <span className="font-bold text-green-700"> {formatRupiah(informasi.dana_cair.toString(), 'Rp. ')}</span> telah berhasil dicairkan pada 
                  tanggal {new Date(informasi.created_at).toLocaleDateString('id-ID')}. Semoga dana ini dapat memberikan 
                  manfaat yang besar dan membantu Anda meraih impian Anda dengan sukses. Silakan untuk mengambil dana 
                  tersebut di kantor pusat.
                </p>
              </div>
              
              ) : (
                <p>Tidak ada informasi pencairan dana.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
