"use client"

import Transition from '@/components/Transition';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import CardDataStats from "@/components/CardDataStats";
import { PuffLoader } from 'react-spinners';

export default function Page() {
  const [totalAnggota, setTotalAnggota] = useState('Loading...');
  const [totalKoordinator, setTotalKoordinator] = useState('Loading...');
  const [totalSaldo, setTotalSaldo] = useState('Loading...');
  const [totalUser, setTotalUser] = useState('Loading...');
  const [totalPinjaman, setTotalPinjaman] = useState('Loading...');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const anggotaResponse = await axios.get('/api/total-anggota');
        setTotalAnggota(anggotaResponse.data.totalAnggota.toString());

        const koordinatorResponse = await axios.get('/api/total-koordinator');
        setTotalKoordinator(koordinatorResponse.data.totalKoordinator.toString());

        const saldoResponse = await axios.get('/api/total-saldo');
        setTotalSaldo(saldoResponse.data.totalSaldo.toString());

        const tunggakanResponse = await axios.get('/api/total-pinjaman');
        setTotalPinjaman(tunggakanResponse.data.totalPinjaman.toString());

        const userResponse = await axios.get('/api/total-user');
        setTotalUser(userResponse.data.totalUser.toString());
      } catch (error) {
        setError('Error fetching initial data');
        console.error('Error fetching initial data:', error);
      }finally {
        setLoading(false);
      }
    };

    fetchInitialData();
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

  if (loading) {
    return (
      <div className="overlay">
        <PuffLoader color="#36d7b7" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <>
      <Transition />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Anggota" total={totalAnggota} rate="0.43%" levelUp>
          <img
            className="fill-primary dark:fill-white"
            style={{ width: '35%', height: '35%' }}
            src="/images/teamwork.png" // replace with your actual path
            alt="Total views icon"
          />
        </CardDataStats>
        <CardDataStats title="Total Koordinator" total={totalKoordinator} rate="4.35%" levelUp>
          <img
            className="fill-primary dark:fill-white"
            style={{ width: '35%', height: '35%' }}
            src="/images/team.png" // replace with your actual path
            alt="Total views icon"
          />
        </CardDataStats>
        <CardDataStats title="Total Saldo" total={totalSaldo !== 'Loading...' ? formatRupiah(totalSaldo.toString(), "Rp. ") : totalSaldo} rate="2.59%" levelUp>
          <img
            className="fill-primary dark:fill-white"
            style={{ width: '35%', height: '35%' }}
            src="/images/saldo.png" // replace with your actual path
            alt="Total views icon"
          />
        </CardDataStats>
        <CardDataStats title="Saldo Pinjaman" total={totalPinjaman !== 'Loading...' ? formatRupiah(totalPinjaman.toString(), "Rp. ") : totalPinjaman} rate="0.95%" levelDown>
          <img
            className="fill-primary dark:fill-white"
            style={{ width: '35%', height: '35%' }}
            src="/images/sukarela.png" // replace with your actual path
            alt="Total views icon"
          />
        </CardDataStats>
      </div>
    </>
  )
}
