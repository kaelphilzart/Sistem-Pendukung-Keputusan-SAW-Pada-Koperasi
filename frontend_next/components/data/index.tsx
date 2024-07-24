import axios from 'axios';

//user
  export const getUsersData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/data-user');
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        return [];
      }
    };

    export const User = [
      {
        id : "",
        name: "",
        email: "",
        role: "",
        created_at: "",
      },
    ];

//kriteria
    export const getKriteriaData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/data-kriteria');
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        return [];
      }
    };

    export const Kriteria = [
      {
        id : "",
        nama: "",
        keterangan: "",
        tipe: "",
        text: "",
      },
    ];


//Nilai
  export const getNilaiData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/data-nilai');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return [];
    }
  };

  export const Nilai = [
    {
      id : "",
      id_kriteria: "",
      nilai_bobot: "",
    },
  ];

  //sub_kriteria
    export const getSubKriteriaData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/data-subKriteria');
        return response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
        return [];
      }
    };
  
    export const SubKriteria = [
      {
        id : "",
        nama_kriteria: "",
        keterangan: "",
        nilai:"",
      },
    ];
  
//korwil
  export const getKorwilData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/data-korwil');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return [];
    }
  };

  export const korwil = [
    {
      id_user : "",
      nama_lengkap: "",
      umur: "",
      jenis_kelamin: "",
      alamat: "",
    },
  ];

//anggota
export const getAnggotaData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/data-anggota');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
};

export const anggota = [
  {
    id : "",
    email: "",
    nama_lengkap: "",
    jenis_kelamin: "",
    umur: "",
    alamat: "",
  },
];

export const getPeminjamData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/data-peminjam');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
};

export const peminjam = [
  {
    id : "",
    nama_peminjam: "",
    nama_korwil: "",
    jumlah_pinjam: "",
  },
];


export const getTransaksiData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/transaksi');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
};

export const transaksi = [
  {
    id : "",
    jumlah: "",
    status: "",
    keterangan: "",
    created_at:"",
  },
];

//informasi
export const getInformasi = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/informasi-cair');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
};

export const informasi = [
  {
    id : "",
    id_user: "",
    pengajuan: "",
    cair_dana: "",
    id_pinjam:"",
    created_at:"",
  },
];

export const getPeminjamCair = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/data-cair-dana');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
};

export const riwayatPeminjam = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/riwayat-peminjam');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
};