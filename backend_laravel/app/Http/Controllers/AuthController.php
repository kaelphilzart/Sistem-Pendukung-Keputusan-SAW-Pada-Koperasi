<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Saldo;
use App\Models\InformasiCair;
use App\Models\CairDana;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function getUserRoleAnggota()
    {
        $user = Auth::user();
    
        if ($user) {
            $role = $user->role;
            $name = $user->name;
            $id = $user->id;
            
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;
    
            $anggota = CairDana::where('cair_dana.id_user', $id) // menambahkan alias tabel
                                ->where('status_dana', 'cair')
                                ->whereMonth('cair_dana.created_at', $currentMonth)
                                ->whereYear('cair_dana.created_at', $currentYear)
                                ->join('users', 'cair_dana.id_user', '=', 'users.id')
                                ->join('profile as profile_peminjam', 'users.id', '=', 'profile_peminjam.id_user')
                                ->select('cair_dana.*', 'profile_peminjam.nama_lengkap as nama_peminjam')
                                ->first();

            // Calculate simpanan wajib
            $simpananWajibMasuk = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'simpanan wajib')
                ->where('status', 'masuk')
                ->sum('jumlah');
            $simpananWajibKeluar = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'simpanan wajib')
                ->where('status', 'keluar')
                ->sum('jumlah');
            $simpananWajib = $simpananWajibMasuk - $simpananWajibKeluar;
    
            // Calculate simpanan pokok
            $simpananPokokMasuk = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'simpanan pokok')
                ->where('status', 'masuk')
                ->sum('jumlah');
            $simpananPokokKeluar = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'simpanan pokok')
                ->where('status', 'keluar')
                ->sum('jumlah');
            $simpananPokok = $simpananPokokMasuk - $simpananPokokKeluar;
    
            // Calculate simpanan sukarela
            $simpananSukarelaMasuk = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'simpanan sukarela')
                ->where('status', 'masuk')
                ->sum('jumlah');
            $simpananSukarelaKeluar = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'simpanan sukarela')
                ->where('status', 'keluar')
                ->sum('jumlah');
            $simpananSukarela = $simpananSukarelaMasuk - $simpananSukarelaKeluar;

             // tunggakan
             $tunggakanMasuk = Saldo::where('id_user', $id)
             ->where('jenis_saldo', 'bayar tunggakan')
             ->where('status', 'masuk')
             ->sum('jumlah');

            $tunggakanKeluar = Saldo::where('id_user', $id)
                ->where('jenis_saldo', 'beri pinjam')
                ->where('status', 'keluar')
                ->sum('jumlah');

            $tunggakan = $tunggakanKeluar - $tunggakanMasuk;
    
            return response()->json(['role' => $role, 'name' => $name, 'id'=> $id, 'anggota' => $anggota,
                                    'simpananWajib' => $simpananWajib, 'simpananPokok' => $simpananPokok, 'simpananSukarela' => $simpananSukarela,
                                      'tunggakan' => $tunggakan  ]);
        }
    
        return response()->json(['message' => 'User not logged in'], 401);
    }

        public function getUserRole()
    {
        $user = Auth::user();

        if ($user) {
            $role = $user->role;
            $name = $user->name;
            $id = $user->id;

            // Mengambil informasi pencairan dana berdasarkan ID pengguna

            return response()->json(['role' => $role, 'name' => $name, 'id' => $id]);
        }

        return response()->json(['message' => 'User not logged in'], 401);
    }

    
            public function login(Request $request)
        {
            if (!Auth::attempt($request->only('name', 'password'))) {
                return response()->json(['error' => 'name atau password salah'], 401);
            }

            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            // $cookie = cookie('jwt', $token, 60 * 24);

            if ($user->role === 'admin') {
                return response()->json([
                    $user,
                    'message' => 'Login successful',
                    'role' => 'admin',
                    'token' => $token
                ]);
            } elseif ($user->role === 'koordinator') {
                return response()->json([
                    $user,
                    'message' => 'Login successful',
                    'role' => 'koordinator',
                    'token' => $token
                ]);
            } else {
                return response()->json([
                    $user,
                    'message' => 'Login successful',
                    'role' => 'anggota',
                    'token' => $token
                ]);
            }
            
        }


    public function register (Request $request){
        // validate request 
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'Registrasi berhasil! Silakan login.'], 201);
    }

    public function logoutAdmin(Request $request)
    {
        // Menghapus token akses yang terkait dengan pengguna
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function logoutAnggota(Request $request)
    {
        // Menghapus token akses yang terkait dengan pengguna
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function logoutKoordinator(Request $request)
    {
        // Menghapus token akses yang terkait dengan pengguna
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    
    
}
