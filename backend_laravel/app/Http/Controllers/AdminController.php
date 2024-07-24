<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Kriteria;
use App\Models\Korwil;
use App\Models\Profile;
use App\Models\Pinjam;
use App\Models\SubKriteria;
use App\Models\Nilai;
use App\Models\Saldo;
use App\Models\CairDana;
use Illuminate\Support\Facades\DB;
class AdminController extends Controller
{

//dashboard
    public function totalAnggota() {
        $anggota = User::where('role','anggota')->count();
        return response()->json(['totalAnggota' => $anggota]);
    }

    public function totalKoordinator() {
        $koordinator = User::where('role','koordinator')->count();
        return response()->json(['totalKoordinator' => $koordinator]);
    }
    public function totalSaldo() {
        $saldo_masuk = Saldo::where('status','masuk')->sum('jumlah');
        $saldo_keluar = Saldo::where('status','keluar')->sum('jumlah');

        $totalSaldo = $saldo_masuk - $saldo_keluar;
        return response()->json(['totalSaldo' => $totalSaldo]);
    }

    public function totalPinjaman() {
        $saldo_masuk = Saldo::where('status','masuk')->where('jenis_saldo','bayar tunggakan')->sum('jumlah');
        $saldo_keluar = Saldo::where('status','keluar')->where('jenis_saldo','beri pinjam')->sum('jumlah');

        $totalPinjaman = $saldo_masuk - $saldo_keluar;
        return response()->json(['totalPinjaman' => $totalPinjaman]);
    }

    public function totalUser() {
        $user = User::count();
        return response()->json(['totalUser' => $user]);
    }
    
// user


    public function dataUser()
    {
        return response()->json(User::latest()->get());
    }


    public function updateUser(Request $request, $user_id)
    {
        $user = User::find($user_id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role = $request->role;
        $user->update();
        return response()->json(true);
    }

    public function deleteUser(Request $request)
    {
        // Pastikan request memiliki data user_id yang dipilih
        $user_id = $request->input('user_id');

        // Hapus pengguna berdasarkan ID yang dipilih
        $user = User::find($user_id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User berhasil dihapus'], 200);
        } else {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }
    }

    public function editUser(Request $request, $user_id)
    {
        // Lakukan operasi pengeditan pengguna berdasarkan ID yang diterima dari parameter
        $user = User::find($user_id);
        if ($user) {
            // Lakukan operasi pengeditan di sini sesuai kebutuhan
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }
    }
    
    
// kriteria
    public function dataKriteria()
    {
        return response()->json(Kriteria::latest()->get());
    }

    public function tambahKriteria (Request $request){
        // validate request 
        $user = new Kriteria;
        $user->nama = $request->nama;
        $user->keterangan = $request->keterangan;
        $user->tipe = $request->tipe;
        $user->text_input = $request->text_input;
        $user->save();

        return response()->json(['message' => 'Kriteria berhasil ditambahkan'], 201);
    }

    public function updateKriteria(Request $request, $kriteria_id)
    {
        $kriteria = Kriteria::find($kriteria_id);
        $kriteria->nama = $request->nama;
        $kriteria->keterangan = $request->keterangan;
        $kriteria->tipe = $request->tipe;
        $kriteria->text_input = $request->text_input;
        $kriteria->update();
        return response()->json(true);
    }

    public function deleteKriteria(Request $request)
    {
        // Pastikan request memiliki data user_id yang dipilih
        $kriteria_id = $request->input('kriteria_id');

        // Hapus pengguna berdasarkan ID yang dipilih
        $kriteria = Kriteria::find($kriteria_id);
        if ($kriteria) {
            $kriteria->delete();
            return response()->json(['message' => 'Kriteria berhasil dihapus'], 200);
        } else {
            return response()->json(['message' => 'Kriteria tidak ditemukan'], 404);
        }
    }

    public function editKriteria(Request $request, $kriteria_id)
    {
        // Lakukan operasi pengeditan pengguna berdasarkan ID yang diterima dari parameter
        $kriteria = Kriteria::find($kriteria_id);
        if ($kriteria) {
            // Lakukan operasi pengeditan di sini sesuai kebutuhan
            return response()->json($kriteria);
        } else {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }
    }

// Nilai
                public function dataNilai()
            {
                $dataNilai = Nilai::latest()
                    ->join('kriteria', 'nilai.id_kriteria', '=', 'kriteria.id')
                    ->select('nilai.*', 'kriteria.nama as nama_kriteria')
                    ->get();

                return response()->json($dataNilai);
            }

            public function daftarKriteria()
        {
            // Ambil kriteria yang belum memiliki nilai terkait
            $kriteria_nonNilai = Kriteria::whereDoesntHave('nilai')->get();

            // Kirim data kriteria dalam format JSON
            return response()->json($kriteria_nonNilai);
        }
  
      public function tambahNilai (Request $request){
          // validate request 
          $user = new Nilai;
          $user->id_kriteria = $request->id_kriteria;
          $user->nilai_bobot = $request->nilai_bobot;
          $user->save();
  
          return response()->json(['message' => 'Kriteria berhasil ditambahkan'], 201);
      }
  
      public function updateNilai(Request $request, $niali_id)
      {
          $nilai = Nilai::find($niali_id);
          $nilai->nilai_bobot = $request->nilai_bobot;
          $nilai->update();
          return response()->json(true);
      }
  
      public function deleteNilai(Request $request)
      {
          // Pastikan request memiliki data user_id yang dipilih
          $nilai_id = $request->input('nilai_id');
  
          // Hapus pengguna berdasarkan ID yang dipilih
          $nilai = Nilai::find($nilai_id);
          if ($nilai) {
              $nilai->delete();
              return response()->json(['message' => 'User berhasil dihapus'], 200);
          } else {
              return response()->json(['message' => 'User tidak ditemukan'], 404);
          }
      }
  
      public function editNilai(Request $request, $nilai_id)
      {
          // Temukan nilai berdasarkan ID yang diterima dari parameter
          $nilai = Nilai::join('kriteria', 'nilai.id_kriteria', '=', 'kriteria.id')
                         ->select('nilai.*', 'kriteria.nama as nama_kriteria')
                         ->where('nilai.id', $nilai_id)
                         ->first();
      
          if ($nilai) {
              // Lakukan operasi pengeditan di sini sesuai kebutuhan
              return response()->json($nilai);
          } else {
              return response()->json(['message' => 'Nilai tidak ditemukan'], 404);
          }
      }


// sub-kriteria
       public function dataSubKriteria()
       {
           $dataNilai = SubKriteria::latest()
               ->join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
               ->select('sub_kriteria.*', 'kriteria.nama as nama_kriteria')
               ->get();

           return response()->json($dataNilai);
       }

       public function daftarKriteriaSub()
       {
           // Ambil semua kriteria
           $kriteria = Kriteria::all();
       
           // Kirim data kriteria dalam format JSON
           return response()->json($kriteria);
       }
       

        public function tambahSubKriteria (Request $request){
            // validate request 
            $user = new SubKriteria;
            $user->id_kriteria = $request->id_kriteria;
            $user->keterangan = $request->keterangan;
            $user->nilai = $request->nilai;
            $user->save();

            return response()->json(['message' => 'berhasil ditambahkan'], 201);
        }

        public function updateSubKriteria(Request $request, $subKriteria_id)
        {
            $nilai = SubKriteria::find($subKriteria_id);
            $nilai->keterangan = $request->keterangan;
            $nilai->nilai = $request->nilai;
            $nilai->update();
            return response()->json(true);
        }

        public function deleteSubKriteria(Request $request)
        {
            // Pastikan request memiliki data user_id yang dipilih
            $subKriteria_id = $request->input('subKriteria_id');

            // Hapus pengguna berdasarkan ID yang dipilih
            $nilai = SubKriteria::find($subKriteria_id);
            if ($nilai) {
                $nilai->delete();
                return response()->json(['message' => 'User berhasil dihapus'], 200);
            } else {
                return response()->json(['message' => 'User tidak ditemukan'], 404);
            }
        }

        public function editSubKriteria(Request $request, $subKriteria_id)
        {
            // Temukan nilai berdasarkan ID yang diterima dari parameter
            $nilai = SubKriteria::join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
                            ->select('sub_kriteria.*', 'kriteria.nama as nama_kriteria')
                            ->where('sub_kriteria.id', $subKriteria_id)
                            ->first();
        
            if ($nilai) {
                // Lakukan operasi pengeditan di sini sesuai kebutuhan
                return response()->json($nilai);
            } else {
                return response()->json(['message' => 'Nilai tidak ditemukan'], 404);
            }
        }
      
    
// korwil
    public function dataKorwil()
    {
        $korwil = User::where('role','koordinator')
                        ->join('profile','users.id','=','profile.id_user')
                        ->select('profile.*')
                        ->get();
        return response()->json($korwil);
    }

    public function tambahKorwil (Request $request){
        // validate request 
        $korwil = new Korwil;
        $korwil->nama_korwil = $request->nama_korwil;
        $korwil->daerah = $request->daerah;
        $korwil->save();

        return response()->json(['message' => 'Kriteria berhasil ditambahkan'], 201);
    }

    public function updateKorwil(Request $request, $korwil_id)
    {
        $korwil = Korwil::find($korwil_id);
        $korwil->nama_korwil = $request->nama_korwil;
        $korwil->daerah = $request->daerah;
        $korwil->update();
        return response()->json(true);
    }

    public function deleteKorwil(Request $request)
    {
        // Pastikan request memiliki data user_id yang dipilih
        $korwil_id = $request->input('korwil_id');

        // Hapus pengguna berdasarkan ID yang dipilih
        $korwil = Korwil::find($korwil_id);
        if ($korwil) {
            $korwil->delete();
            return response()->json(['message' => 'User berhasil dihapus'], 200);
        } else {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }
    }

    public function editKorwil(Request $request, $korwil_id)
    {
        // Lakukan operasi pengeditan pengguna berdasarkan ID yang diterima dari parameter
        $korwil = Korwil::find($korwil_id);
        if ($korwil) {
            // Lakukan operasi pengeditan di sini sesuai kebutuhan
            return response()->json($korwil);
        } else {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }
    }

// Anggota
    public function dataAnggota()
    {
        return response()->json(Profile::join('users','profile.id_user','=','users.id')
                                        ->where('users.role','anggota')
                                        ->select('profile.*','users.email')
                                        ->latest()->get());
    }

  
    
//saldo
        public function tambahSaldo(Request $request)
        {
            $amount = $request->input('jumlah');
            $description = $request->input('keterangan');
            $user = $request->input('id_user');
            $jenisSaldo = $request->input('jenis_saldo');

            Saldo::create([
                'jumlah' => $amount,
                'keterangan' => $description,
                'id_user' => $user,
                'jenis_saldo' => $jenisSaldo,
                'status' => 'masuk'
            ]);

            return response()->json(['success' => true, 'saldo' => $this->getSaldo()]);
        }

        public function kurangSaldo(Request $request)
        {
            $amount = $request->input('jumlah');
            $description = $request->input('keterangan');
            $user = $request->input('id_user');
            $jenisSaldo = $request->input('jenis_saldo');

            $currentBalance = $this->getSaldo();

            if ($currentBalance < $amount) {
                return response()->json(['success' => false, 'message' => 'Saldo tidak cukup']);
            }

            Saldo::create([
                'jumlah' => $amount,
                'keterangan' => $description,
                'id_user' => $user,
                'jenis_saldo' => $jenisSaldo,
                'status' => 'keluar'
            ]);

            return response()->json(['success' => true, 'saldo' => $this->getSaldo()]);
        }

        public function getSaldo()
        {
            $totalIn = Saldo::where('status', 'masuk')->sum('jumlah');
            $totalOut = Saldo::where('status', 'keluar')->sum('jumlah');
            $saldo = $totalIn - $totalOut;


            return response()->json($saldo);
        }
        
        public function getTransaksi()
        {
            $transaksi = Saldo::all();
            return response()->json($transaksi);
        }
    
        public function daftarAnggota()
    {
        $anggota = User::where('role', 'anggota')
                        ->join('profile','users.id','=','profile.id_user')
                        ->select('users.*','profile.nama_lengkap')
                        ->get();

        return response()->json($anggota);
    }

// peminjaman
    public function dataDanaCair()
    {
        $transaksi = CairDana::join('users','cair_dana.id_user','=','users.id')
                            ->join('profile as profile_user','users.id','profile_user.id_user')
                            ->join('profile as profile_korwil','cair_dana.id_korwil','profile_korwil.id')
                            ->select('cair_dana.*','profile_user.nama_lengkap as nama_peminjam','profile_korwil.nama_lengkap as nama_korwil')
                            ->get();
        return response()->json($transaksi);
    }

    public function cairkanDana (Request $request){
        // validate request 
        $user_id = $request->id_user;

        $saldo = new saldo;
        $saldo->jumlah = $request->dana_cair;
        $saldo->status = "keluar";
        $saldo->keterangan = "pencairan pinjaman";
        $saldo->id_user = $user_id;
        $saldo->jenis_saldo = "beri pinjam";
        $saldo->save();

        $pinjam = CairDana::where('id_user', $user_id)->first();
        $pinjam->status_dana = $request->status_dana;
        $pinjam->save();

        return response()->json(['message' => 'cair dana berhasil diinfokan'], 201);
    }


}
