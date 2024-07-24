"use client"

import React, { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { getPeminjamData } from '@/components/data/index';
import Transition from '@/components/Transition';
import Modal from '@/components/modal';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { PropagateLoader } from 'react-spinners';
import { RingLoader } from 'react-spinners';
import { SyncLoader } from 'react-spinners';
import { ScaleLoader } from 'react-spinners';




export default function Page() {
  const router = useRouter(); 
  const [peminjamData, setPeminjamData] = useState([]);
  const [selectedPeminjam, setSelectedPeminjam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHiddenContentVisible, setIsHiddenContentVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculationResult, setCalculationResult] = useState(null);


  useEffect(() => {
    const fetchPeminjam = async () => {
      try {
        const korwilData = await getPeminjamData();
        setPeminjamData(korwilData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setPeminjamData([]);
      }
    };
  
    fetchPeminjam();
  }, []);

  // const YourComponent = ({ item }) => {
  //   const [cairDanaExists, setCairDanaExists] = useState(false);

  //   useEffect(() => {
  //       const checkCairDana = async () => {
  //           try {
  //               const response = await axios.get(`/cek-cair-dana/${item.id_user}`);
  //               setCairDanaExists(response.data.exists);
  //           } catch (error) {
  //               console.error("Error checking cair dana", error);
  //           }
  //       };

  //       checkCairDana();
  //   }, [item.id_user]);

  const handleOpenModal = async (e, peminjamId) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/peminjam/${peminjamId}`);
      setSelectedPeminjam(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching peminjam data:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPeminjam(null);
  };

  const sendAdmin = async (data) => {
    try {
      const response = await axios.post('/api/send-admin', data);
      if (response.status === 201) {
        
        toast.success('Berhasil memberi informasi pada admin');
        updateStatus(data.id_user);
      } else {
        toast.warning('Terjadi kesalahan atau ada field yang kosong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan dalam mengirim permintaan');
    }
  };

  const updateStatus = (id_user) => {
    setCalculationResult((prevResult) => ({
      response: prevResult.response.map((item) =>
        item.id_user === id_user ? { ...item, status: 'sudah' } : item
      ),
    }));
  };

  
  

  const handleMenghitungClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading menjadi true saat tombol "Menghitung" diklik
      const response = await axios.get('/api/start-spk');
      if (response.status === 200) {
        toast.success('Berhasil Menghitung');
        setCalculationResult(response.data); // Simpan hasil perhitungan
        setIsHiddenContentVisible(true); // Tampilkan konten tersembunyi
      } else {
        toast.warning('Terjadi kesalahan atau ada field yang kosong');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Terjadi kesalahan dalam mengirim permintaan');
    } finally {
      setLoading(false); // Set loading menjadi false setelah permintaan selesai
    }
  };

  const formatRupiah = (angka, prefix = "Rp. ") => {
    if (angka == null) {
      return "";
    }
  
    const numberString = angka.toString().replace(/[^,\d]/g, "");
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
  
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix + rupiah;
  };
  

  

  return (
    <>
      <Transition/>
      <div className="container mx-auto px-4 h-full pt-7">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full ">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                    Data Peminjam Bulan Ini
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <form onSubmit={handleTambah} method='post'> */}
                  <table className="w-full table-auto py-4">
                    <thead>
                      <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="py-4 font-medium text-black dark:text-white">No</th>
                        <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Nama Peminjam</th>
                        <th className="min-w-[120px] py-4 font-medium text-black dark:text-white">Nama Korwil</th>
                        <th className="py-4 font-medium text-black dark:text-white">Besar Pinjam</th>
                        <th className="py-4 font-medium text-black dark:text-white">Input</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peminjamData.map((peminjam, key) => (
                        <tr key={key}>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{key + 1}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                            <h5 className="font-medium text-black dark:text-white">{peminjam.nama_peminjam}</h5>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{peminjam.nama_korwil}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{peminjam.jumlah_pinjam ? formatRupiah(peminjam.jumlah_pinjam, "Rp. ") : "N/A"}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark">
                            <button 
                              className="text-blue-500 hover:underline" 
                              onClick={(e) => handleOpenModal(e, peminjam.id)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-center w-full mt-4">
                    <button
                      className="lg:w-6/12 bg-slate-800 hover:bg-sky-600 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                      disabled={loading}
                      onClick={handleMenghitungClick}>
                         {loading ? <RingLoader color={"#ffffff"} />  : 'Menghitung'}
                    </button>
                  </div>
                {/* </form> */}
              </div>
            </div>
          </div>
        </div>
      {isHiddenContentVisible && (
          <div className="w-full mt-8">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                    Hasil Perhitungan
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              {/* tabel 1*/}
              {calculationResult ? (
                <div>
                  <div className="overflow-x-auto">
              <table className="w-full table-auto py-4">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="py-4 font-medium text-black dark:text-white">No</th>
                    <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Peminjam</th>
                    {calculationResult.response.length > 0 && calculationResult.response[0].kriteria.map((kriteria, index) => (
                      <th key={index} className="min-w-[120px] text-center py-4 font-medium text-black dark:text-white">{kriteria.nama_kriteria}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calculationResult.response.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.nama_peminjam}</h5>
                      </td>
                      {item.kriteria.map((kriteria, kIndex) => (
                        <td key={kIndex} className="border-b border-[#eee] py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white text-center">{kriteria.nilai_jawaban}</p>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
                </div>
              ) : (
                <p>Data perhitungan tidak tersedia.</p>
              )}
              {/* tabel ke 2 */}
              {calculationResult && calculationResult.groupedKriteria && Object.keys(calculationResult.groupedKriteria).length > 0 ? (
                <div className="overflow-x-auto">
                <table className="w-full table-auto py-4 my-10">
                  <thead>
                    <tr className="bg-gray-200 text-left dark:bg-meta-4">
                      <th className="py-4 font-medium text-black dark:text-white text-center">Nama Kriteria</th>
                      <th className="py-4 font-medium text-black dark:text-white text-center">Nilai Jawaban</th>
                      <th className="py-4 font-medium text-black dark:text-white text-center">Keterangan</th>
                      <th className="py-4 font-medium text-black dark:text-white text-center">Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Ambil panjang dari nilai_jawaban pertama untuk mengiterasi sesuai panjangnya */}
                    {calculationResult.groupedKriteria && Object.keys(calculationResult.groupedKriteria).length > 0 &&
                      calculationResult.groupedKriteria[Object.keys(calculationResult.groupedKriteria)[0]].nilai_jawaban.length > 0 &&
                      Object.keys(calculationResult.groupedKriteria).map((key, index) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                            <p className="text-black dark:text-white">{key}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark text-center">
                            {calculationResult.groupedKriteria[key].nilai_jawaban.join(', ')}
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark text-center">
                            {calculationResult.groupedKriteria[key].keterangan === 1 ? "Benefit" : 
                            calculationResult.groupedKriteria[key].keterangan === 2 ? "Cost" : 
                            calculationResult.groupedKriteria[key].keterangan}
                          </td>
                          <td className="border-b border-[#eee] py-5 dark:border-strokedark text-center">
                            {calculationResult.groupedKriteria[key].point}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                </div>
              ) : (
                <p>Data perhitungan tidak tersedia atau sedang dimuat...</p>
              )}
{/* tabel ke 3 */}
                <p className="text-center font-bold">Hasil Normalisasi</p>
        {calculationResult ? (
               <div className="overflow-x-auto">
              <table className="w-full table-auto py-4 my-10 ">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="py-4 font-medium text-black dark:text-white">No</th>
                    <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Peminjam</th>
                    {calculationResult.response.length > 0 && calculationResult.response[0].kriteria.map((kriteria, index) => (
                      <th key={index} className="min-w-[120px] text-center py-4 font-medium text-black dark:text-white">{kriteria.nama_kriteria}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calculationResult.response.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.nama_peminjam}</h5>
                      </td>
                      {item.kriteria.map((kriteria, kIndex) => (
                        <td key={kIndex} className="border-b border-[#eee] py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white text-center">{kriteria.hasil_normalisasi}</p>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              ) : (
                <p>Data perhitungan tidak tersedia.</p>
              )}
              {/* tabel ke 4 */}
              <p className="text-center font-bold">Hasil Akumulatif</p>
        {calculationResult ? (
                <div className="overflow-x-auto">
              <table className="w-full table-auto py-4 my-10 ">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="py-4 font-medium text-black dark:text-white">No</th>
                    <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Peminjam</th>
                    {calculationResult.response.length > 0 && calculationResult.response[0].kriteria.map((kriteria, index) => (
                      <th key={index} className="min-w-[120px] text-center py-4 font-medium text-black dark:text-white">{kriteria.nama_kriteria}</th>
                    ))}
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Hasil Akhir</th>
                  </tr>
                 
                </thead>
                <tbody>
                  {calculationResult.response.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.nama_peminjam}</h5>
                      </td>
                      {item.kriteria.map((kriteria, kIndex) => (
                        <td key={kIndex} className="border-b border-[#eee] py-5 dark:border-strokedark">
                          <p className="text-black dark:text-white text-center">{kriteria.hasil_normalisasi} X {kriteria.nilai_bobot}</p>
                        </td>
                      ))}
                        <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.hasil_akumulasi}</h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              ) : (
                <p>Data perhitungan tidak tersedia.</p>
              )}
              {/* tabel ke 5 */}
              <p className="text-center font-bold">Rangking</p>
        {calculationResult ? (
                <div className="overflow-x-auto">
              <table className="w-full table-auto py-4 my-10 ">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4">
                    <th className="py-4 font-medium text-black dark:text-white">No</th>
                    <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Peminjam</th>
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Hasil Akhir</th>
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Rangking</th>
                  </tr>
                 
                </thead>
                <tbody>
                  {calculationResult.response.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.nama_peminjam}</h5>
                      </td>
                        <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.hasil_akumulasi}</h5>
                      </td>
                      <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.ranking}</h5>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              ) : (
                <p>Data perhitungan tidak tersedia.</p>
              )}
               <p className="text-center font-bold">Pencairan Dana</p>
        {calculationResult ? (
                <div className="overflow-x-auto">
              <table className="w-full table-auto py-4 my-10 ">
                <thead>
                  <tr className="bg-gray-200 text-left dark:bg-meta-4 text-center">
                    <th className="py-4 font-medium text-black dark:text-white">No</th>
                    <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Peminjam</th>
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Hasil Akhir</th>
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Ajuan Pinjaman</th>
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Dana Cair</th>
                     <th className="min-w-[150px] py-4 font-medium text-black dark:text-white">Aksi</th>
                  </tr>
                 
                </thead>
                <tbody>
                  {calculationResult.response.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] px-4 py-2 dark:border-strokedark">
                        <p className="text-black dark:text-white">{index + 1}</p>
                      </td>
                      <td className="border-b border-[#eee] py-2 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.nama_peminjam}</h5>
                      </td>
                        <td className="border-b border-[#eee] py-2 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.hasil_akumulasi}</h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.jumlah_pinjam ? formatRupiah(item.jumlah_pinjam, "Rp. ") : "N/A"}</h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">{item.dana_cair ? formatRupiah(item.dana_cair, "Rp. ") : "N/A"}</h5>
                      </td>
                      <td className="border-b border-[#eee] py-2 pl-9 dark:border-strokedark xl:pl-11">
                      {item.status == "proses" ? (
                        <button
                        className="hover:text-sky-700 hover:underline text-red-600"
                        type="button"
                        onClick={() => sendAdmin({
                          id_user: item.id_user,
                          id_korwil: item.id_korwil,
                          ajuan_dana: item.jumlah_pinjam,
                          dana_cair: item.dana_cair
                        })}
                              >
                                Rekomendasikan
                              </button>
                ) : (
                  <button className="hover:bg-slate-700 bg-green-600 rounded-md text-white p-2" type="button" disabled>
                  Telah direkomendasikan
                </button>
                      )}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
                </div>
              ) : (
                <p>Data perhitungan tidak tersedia.</p>
              )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  {selectedPeminjam && (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Detail</h2>
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          {selectedPeminjam.map((kriteria, index) => (
            <div key={index} className="border p-2">
              <p className="font-bold">{kriteria.nama_kriteria}</p>
              <p>{kriteria.jawaban}</p>
              {kriteria.tipe === 'file' ? (
             <a href={`http://127.0.0.1:8000/${kriteria.id_kriteria_tipe}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Lihat File
            </a>
              ) : (
                <p>Tipe: {kriteria.id_kriteria_tipe}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="text-right">
        <button
          onClick={handleCloseModal}
          className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  )}
</Modal>

    </>
  );
}
