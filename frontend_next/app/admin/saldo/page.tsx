"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { getTransaksiData } from '@/components/data/index';
import Transition from '@/components/Transition';
import Paginate from "@/components/paginate";
import { toast } from 'react-toastify';
import Modal from '@/components/modal';

export default function Page() {
  const router = useRouter(); 
  const [transaksiData, setTransaksiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [jumlahSaldo, setJumlahSaldo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [id_user, setAnggota] = useState('');
  const [daftarAnggota, setDaftarAnggota] = useState([]); // State untuk menyimpan daftar anggota sebagai array
  const [jenis_saldo, setJenisSaldo] = useState('');
  const [jumlahFormatted, setJumlahFormatted] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchSaldo = async () => {
        try {
            const response = await axios.get('/api/get-saldo');
            setJumlahSaldo(response.data);
        } catch (error) {
            console.error('Gagal mengambil jumlah saldo:', error);
        }
    };

    fetchSaldo();
  }, []);

  useEffect(() => {
    const fetchDaftarAnggota = async () => {
        try {
            const response = await axios.get('/api/daftar-anggota');
            setDaftarAnggota(response.data); // Menyimpan data anggota ke state sebagai array
        } catch (error) {
            console.error('Gagal mengambil daftar anggota:', error);
        }
    };

    fetchDaftarAnggota();
  }, []);

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const transaksiData = await getTransaksiData();
        setTransaksiData(transaksiData);
        setFilteredData(transaksiData); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching users:', error);
        setTransaksiData([]);
      }
    };

    fetchTransaksi();
  }, []);
  
  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setJumlah("");
    setJumlahFormatted("");
    setKeterangan("");
  };

  const handleSubmit = async () => {
    try {
      const url = modalType === "Masuk" ? "/api/tambah-saldo" : "/api/kurang-saldo";
      await axios.post(url, { jumlah, keterangan, id_user, jenis_saldo });

      const updatedSaldo = await axios.get("/api/get-saldo");
      setJumlahSaldo(updatedSaldo.data);

      const updatedTransaksi = await getTransaksiData();
      setTransaksiData(updatedTransaksi);
      setFilteredData(updatedTransaksi);

      toast.success(`Saldo berhasil ${modalType === "Masuk" ? "ditambahkan" : "dikurangi"}`);
      handleCloseModal();
    } catch (error) {
      toast.error(`Gagal ${modalType === "Masuk" ? "menambahkan" : "mengurangi"} saldo`);
    }
  };

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

  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = formatRupiah(rawValue, "Rp. ");
    setJumlah(rawValue);
    setJumlahFormatted(formattedValue);
  };

  const formatTanggal = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID');
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (selectedDate) {
      const filtered = transaksiData.filter((transaksi) =>
        new Date(transaksi.created_at).toLocaleDateString('id-ID') === new Date(selectedDate).toLocaleDateString('id-ID')
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(transaksiData);
    }
  };

  return (
    <>
      <Transition/>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="grid grid-cols-4 gap-4 mb-2">
            <h2 className='col-span-3 font-bold'>Transaksi</h2>
            <article className='text-wrap text-right'>
              <h3>Saldo Saat ini</h3>
              <p>{formatRupiah(jumlahSaldo.toString(), "Rp. ")}</p>
            </article>
          </div>
          <div className="grid grid-cols-5 gap-4 mb-2">
            <button
              className="bg-emerald-600 text-white active:bg-emerald-900 text-sm uppercase py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-full ease-linear transition-all duration-150"
              onClick={() => handleOpenModal('Masuk')}
            >
              Masuk Saldo
            </button>
            <button
              className="bg-red-600 text-white active:bg-red-900 text-sm uppercase py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 w-full ease-linear transition-all duration-150"
              onClick={() => handleOpenModal('Keluar')}
            >
              Keluar Saldo
            </button>
            <div className="grid grid-cols-subgrid gap-2 col-span-3">
        <div className="col-start-2 flex items-center ">
          <input
            id="date-filter"
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="mt-1 block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
          />
          <button 
            onClick={() => setFilterDate("")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Reset
          </button>
        </div>
      </div>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className=" px-4 py-4 font-medium text-black dark:text-white">No</th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Jumlah</th>
                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Status</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Keterangan</th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((transaksi, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {(currentPage - 1) * itemsPerPage + key + 1}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatRupiah(transaksi.jumlah.toString(), 'Rp. ')}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        transaksi.status === 'masuk'
                          ? 'bg-green-500 text-green-500'
                          : 'bg-red-500 text-red-500'
                      }`}
                    >
                      {transaksi.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{transaksi.keterangan}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatTanggal(transaksi.created_at)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredData.length}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">
            {modalType === 'Masuk' ? 'Saldo Masuk' : 'Saldo Keluar'}
          </h2>
          <div className="mb-4">
            <label htmlFor="jumlah" className="block text-gray-700 font-bold mb-2">
              Jumlah
            </label>
            <input
              id="jumlah"
              type="text"
              value={jumlahFormatted}
              onChange={handleAmountChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="keterangan" className="block text-gray-700 font-bold mb-2">
              Keterangan
            </label>
            <textarea
              id="keterangan"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="anggota" className="block text-gray-700 font-bold mb-2">
              Anggota
            </label>
            <select
              id="anggota"
              value={id_user}
              onChange={(e) => setAnggota(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="0">Pilih Anggota</option>
              <option value="0">Tidak Ada</option>
              {daftarAnggota.map((anggota) => (
                <option key={anggota.id} value={anggota.id}>
                  {anggota.nama_lengkap}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="jenisSaldo" className="block text-gray-700 font-bold mb-2">
              Jenis Saldo
            </label>
            <select
              id="jenisSaldo"
              value={jenis_saldo}
              onChange={(e) => setJenisSaldo(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="0">pilih Jenis Saldo</option>
            <option value="0">Tidak Ada</option>
            <option value="simpanan pokok">Simpanan Pokok</option>
            <option value="simpanan wajib">Simpanan Wajib</option>
            <option value="simpanan sukarela">Simpanan Sukarela</option>
            <option value="bayar tunggakan">Bayar Tunggakan</option>
            </select>
          </div>
          <div className="text-right">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <button
              onClick={handleCloseModal}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
