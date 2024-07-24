"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Transition from '@/components/Transition';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '@/hooks/useAuth';
import axios from '@/lib/axios';
import { PuffLoader } from 'react-spinners';
import './styles.css';

export default function Page() {
  const [kriteria, setKriteria] = useState([]);
  const [subKriteria, setSubKriteria] = useState({});
  const [formData, setFormData] = useState([]);
  const [id_user, setIdUser] = useState('');
  const [id_korwil, setId_korwil] = useState('');
  const [daftarKorwil, setDaftarKorwil] = useState([]);
  const [jumlah_pinjam, setJumlahPinjam] = useState('');
  const [jumlahFormatted, setJumlahFormatted] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await useAuth();
        setIdUser(user.id);

        const checkPinjam = await axios.get(`/api/check-pinjam/${user.id}`);
        if (checkPinjam.data.exists) {
          router.push('/error');
        } else {
          await fetchInitialData();
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, [router]);

  const fetchInitialData = async () => {
    try {
      const korwilResponse = await axios.get('/api/daftar-korwil');
      setDaftarKorwil(korwilResponse.data);

      const kriteriaResponse = await axios.get('/api/daftar-kriteria');
      setKriteria(kriteriaResponse.data);

      const initialFormData = kriteriaResponse.data.map((item) => ({
        id_kriteria: '',
        id_kriteria_tipe: item.tipe === 'file' ? null : ''
      }));
      setFormData(initialFormData);

      const subKriteriaResponse = await axios.get('/api/daftar-sub-kriteria');
      const groupedSubKriteria = subKriteriaResponse.data.reduce((acc, item) => {
        if (!acc[item.id_kriteria]) acc[item.id_kriteria] = [];
        acc[item.id_kriteria].push(item);
        return acc;
      }, {});
      setSubKriteria(groupedSubKriteria);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  const csrf = async () => {
    await axios.get('/sanctum/csrf-cookie');
  }

  const handleTambah = async (e) => {
    e.preventDefault();
    try {
      await csrf();
  
      const data = new FormData();
      data.append('id_user', id_user);
      data.append('id_korwil', id_korwil);
      data.append('jumlah_pinjam', jumlah_pinjam);
  
      formData.forEach((item, index) => {
        data.append(`id_kriteria[${index}]`, item.id_kriteria);
        if (item.id_kriteria_tipe instanceof File) {
          data.append(`id_kriteria_tipe[${index}]`, item.id_kriteria_tipe);
        } else {
          data.append(`id_kriteria_tipe[${index}]`, item.id_kriteria_tipe);
        }
      });
  
      const response = await axios.post('/api/submit-pinjam', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 201) {
        toast.success('Berhasil Mengajukan peminjaman');
        router.push('/anggota/dashboard');
      } else {
        toast.warning('Terjadi kesalahan atau anda masih memiliki tunggakan');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.warning('Terjadi kesalahan atau anda masih memiliki tunggakan');
    }
  };
  
  

// handleChange function
const handleChange = (e, index, type) => {
  const { value, files } = e.target;
  const updatedFormData = [...formData];
  if (type === 'file') {
    updatedFormData[index].id_kriteria_tipe = files[0];
  } else {
    updatedFormData[index].id_kriteria = value;
    if (type === 'text') {
      updatedFormData[index].id_kriteria_tipe = e.target.nextElementSibling.value;
    }
  }
  setFormData(updatedFormData);
};

    const handleAmountChange = (e) => {
      const rawValue = e.target.value.replace(/\D/g, ''); // Hanya mengizinkan angka
      const formattedValue = formatRupiah(rawValue, "Rp. ");
      setJumlahPinjam(rawValue);
      setJumlahFormatted(formattedValue);
    };

    const formatRupiah = (angka, prefix) => {
      if (!angka) {
          return '';
      }
      angka = angka.toString();

      const numberString = angka.replace(/\D/g, "").toString(); // Hanya mengizinkan angka
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


  const handleTextChange = (e, index) => {
    const { value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index].id_kriteria_tipe = value;
    setFormData(updatedFormData);
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
      <div className="container mx-auto px-4 h-full pt-7">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-white">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold uppercase">
                    Memohon Pinjaman
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleTambah} method='post'>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2 mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Pilih Koordinator
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={id_korwil} onChange={(e) => setId_korwil(e.target.value)} required
                      >
                        <option value="">Pilih Koordinator</option>
                        {daftarKorwil.map((korwil) => (
                          <option key={korwil.id} value={korwil.id}>{korwil.nama_lengkap}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full xl:w-1/2 mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-role">
                        Jumlah Pinjam
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Jumlah Pinjam"
                        value={jumlahFormatted}
                        onChange={handleAmountChange}
                        required
                    />
                    </div>
                  </div>
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    {kriteria.map((item, index) => (
                      <div className="w-full xl:w-1/2 mb-3" key={index}>
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor={`id_kriteria[${index}]`}
                        >
                          {item.nama}
                        </label>
                        <select
                          id={`id_kriteria[${index}]`}
                          name={`id_kriteria`}
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          value={formData[index]?.id_kriteria}
                          onChange={(e) => handleChange(e, index, 'dropdown')}
                          required
                        >
                          <option value="" disabled>Pilih {item.nama}</option>
                          {subKriteria[item.id] && subKriteria[item.id].map((subItem) => (
                            <option key={subItem.id} value={subItem.id}>{subItem.keterangan}</option>
                          ))}
                        </select>
                        <label
                          className="block text-blueGray-600 text-xs  mb-2 my-2"
                        >
                          {item.text_input}
                        </label>
                        {item.tipe === 'text' && (
                          <input
                            type="text"
                            id={`id_kriteria_tipe[${index}]`}
                            name={`id_kriteria_tipe`}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-2"
                            value={formData[index]?.id_kriteria_tipe}
                            onChange={(e) => handleTextChange(e, index)}
                            required
                          />
                        )}
                        {item.tipe === 'file' && (
                          <input
                            type="file"
                            id={`id_kriteria_tipe[${index}]`}
                            name={`id_kriteria_tipe`}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mt-2"
                            onChange={(e) => handleChange(e, index, 'file')}
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center w-full">
                    <button
                      className="bg-slate-800 hover:bg-sky-600 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit">
                      Pinjam
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
