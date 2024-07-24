<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;
use App\Models\User;
use App\Models\Korwil;
use App\Models\Kriteria;
use App\Models\Pinjam;
use App\Models\Saldo;
use App\Models\SubKriteria;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class AnggotaController extends Controller
{
    //
//dashboard
    public function simpananWajib() {
        
        $user = Auth::user();
    
        if ($user) {
            $id = $user->id;

            $anggota = Saldo::where('id_user', $id)
                            ->where('jenis_saldo','simpanan wajib')    
                            ->sum('jumlah');

            return response()->json($anggota);
    }
}

    public function showProfile(Request $request, $profile_id)
    {
        try {
            $profile = Profile::where('id_user', $profile_id)->first();
    
            if ($profile) {
                return response()->json($profile);
            } else {
                return response()->json(['message' => 'Profile tidak ditemukan'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan saat mengambil data profil', 'error' => $e->getMessage()], 500);
        }
    }
    

    public function submitProfile (Request $request){
        // validate request 
        $korwil = new Profile;
        $korwil->id_user = $request->id_user;
        $korwil->nama_lengkap = $request->nama_lengkap;
        $korwil->jenis_kelamin = $request->jenis_kelamin;
        $korwil->umur = $request->umur;
        $korwil->alamat = $request->alamat;
        $korwil->save();

        return response()->json(['message' => 'Kriteria berhasil ditambahkan'], 201);
    }

    public function daftarKorwil()
       {
           // Ambil semua kriteria
           $korwil = Profile::join('users','profile.id_user','=','users.id')
                            ->where('users.role','koordinator')
                            ->select('profile.*')
                            ->get();
       
           // Kirim data kriteria dalam format JSON
           return response()->json($korwil);
       }

       public function daftarSubKriteria()
       {
           $subKriteria = SubKriteria::all();
           return response()->json($subKriteria);
       }

       public function daftarKriteria()
       {
           $kriteria = Kriteria::all();
           return response()->json($kriteria);
       }
       public function submitPinjam(Request $request)
       {
           // Validasi request
          

           $userId = $request->id_user;

           // Hitung tunggakan
           $tunggakanMasuk = Saldo::where('id_user', $userId)
               ->where('jenis_saldo', 'bayar tunggakan')
               ->where('status', 'masuk')
               ->sum('jumlah');
       
           $tunggakanKeluar = Saldo::where('id_user', $userId)
               ->where('jenis_saldo', 'beri pinjam')
               ->where('status', 'keluar')
               ->sum('jumlah');
       
           $tunggakan = $tunggakanKeluar - $tunggakanMasuk;
       
           // Cek apakah ada tunggakan
           if ($tunggakan > 0) {
               return response()->json(['message' => 'Tidak bisa mengajukan pinjaman karena masih ada tunggakan'], 400);
           }

           $request->validate([
            'id_user' => 'required|integer',
            'id_korwil' => 'required|integer',
            'jumlah_pinjam' => 'required|integer',
            'id_kriteria' => 'required|array',
            'id_kriteria.*' => 'required|integer',
            'id_kriteria_tipe' => 'required|array',
            'id_kriteria_tipe.*' => 'nullable',
           ]);

           $kriteriaData = [];
       
           // Menangani kriteria
           foreach ($request->id_kriteria as $key => $id_kriteria) {
               if ($request->hasFile("id_kriteria_tipe.$key")) {
                   // Jika kriteria adalah file
                   $file = $request->file("id_kriteria_tipe.$key");
                   $fileName = $file->getClientOriginalName();
                   $file->storeAs('public/kriteria_files', $fileName);
                   $filePath = 'storage/kriteria_files/' . $fileName;
       
                   $kriteriaData[] = [
                       'id_kriteria' => $id_kriteria,
                       'id_kriteria_tipe' => $filePath,
                       'tipe' => 'file',
                   ];
               } else {
                   // Jika kriteria adalah teks
                   $kriteriaData[] = [
                       'id_kriteria' => $id_kriteria,
                       'id_kriteria_tipe' => $request->input("id_kriteria_tipe.$key"),
                       'tipe' => 'text',
                   ];
               }
           }
       
           // Membuat pinjaman baru
           $pinjaman = Pinjam::create([
               'id_user' => $request->id_user,
               'id_korwil' => $request->id_korwil,
               'jumlah_pinjam' => $request->jumlah_pinjam,
               'kriteria' => json_encode($kriteriaData),
               'status' => "proses",
           ]);
       
           return response()->json(['message' => 'Peminjaman berhasil diajukan', 'data' => $pinjaman], 201);
       }
       
       
       
    
       public function checkPinjam($id_user)
       {
           $currentMonth = Carbon::now()->month;
           $currentYear = Carbon::now()->year;
       
           $exists = Pinjam::where('id_user', $id_user)
                           ->whereMonth('created_at', $currentMonth)
                           ->whereYear('created_at', $currentYear)
                           ->exists();
       
           return response()->json(['exists' => $exists]);
       }
       

    public function showPinjam(Request $request, $user_id)
{
    $pinjam = Pinjam::join('profile', 'pinjam.id_korwil', '=', 'profile.id')
                    ->where('pinjam.id_user', $user_id)
                    ->select('pinjam.*', 'profile.nama_lengkap as nama_korwil') // Adjust the field name as per your schema
                    ->get();

    return response()->json($pinjam, 200);
}

    
    

    public function lihat() {
        $data = Pinjam::all();
    
        // Cetak data
        echo '<pre>';
        print_r($data);
        echo '</pre>';
    }
    

        //     public function dataSubAnggota()
        // {
        //     // Ambil semua data sub-kriteria
        //     $dataSubKriteria = SubKriteria::latest()
        //         ->join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
        //         ->select('sub_kriteria.*', 'kriteria.nama as nama_kriteria')
        //         ->get();

        //     // Inisialisasi array untuk menyimpan data sub-kriteria yang dikelompokkan berdasarkan id_kriteria
        //     $groupedSubKriteria = [];

        //     // Iterasi data sub-kriteria dan kelompokkan berdasarkan id_kriteria
        //     foreach ($dataSubKriteria as $subKriteria) {
        //         $idKriteria = $subKriteria->id_kriteria;

        //         // Tambahkan sub-kriteria ke dalam grup yang sesuai dengan id_kriteria
        //         if (!isset($groupedSubKriteria[$idKriteria])) {
        //             $groupedSubKriteria[$idKriteria] = [];
        //         }

        //         $groupedSubKriteria[$idKriteria][] = $subKriteria;
        //     }

        //     // Kirim data sub-kriteria yang telah dikelompokkan berdasarkan id_kriteria dalam format JSON
        //     return response()->json($groupedSubKriteria);
        // }
       
    
}
