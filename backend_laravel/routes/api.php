<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnggotaController;
use App\Http\Controllers\KoordinatorController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware(['auth:sanctum'])->get('get-user-role-anggota', [AuthController::class, 'getUserRoleAnggota']);
Route::middleware(['auth:sanctum'])->get('get-user-role', [AuthController::class, 'getUserRole']);


Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // Halaman-halaman yang hanya bisa diakses oleh admin
    // Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::post('logout-admin', [AuthController::class, 'logoutAdmin']);
   
});


Route::middleware(['auth:sanctum', 'role:anggota'])->group(function () {
    // Halaman-halaman yang hanya bisa diakses oleh anggota
    // Route::get('/Anggota/dashboard', [AnggotaController::class, 'dashboard']);
    Route::post('logout-anggota', [AuthController::class, 'logoutAnggota']);
});

Route::middleware(['auth:sanctum', 'role:koordinator'])->group(function () {
   // Halaman-halaman yang hanya bisa diakses oleh anggota
   // Route::get('/Anggota/dashboard', [AnggotaController::class, 'dashboard']);
   Route::post('logout-koordinator', [AuthController::class, 'logoutKoordinator']);
});


Route::controller(AuthController::class)->group(function(){
    Route::post('login','login');
    Route::post('register','register');
    
});


//dashboard
    Route::get('total-anggota', [AdminController::class, 'totalAnggota']);
    Route::get('total-koordinator', [AdminController::class, 'totalKoordinator']);
    Route::get('total-saldo', [AdminController::class, 'totalSaldo']);
    Route::get('total-user', [AdminController::class, 'totalUser']);
    Route::get('total-pinjaman', [AdminController::class, 'totalPinjaman']);

 // user
    Route::get('data-user', [AdminController::class, 'dataUser']);
    Route::post('delete-user', [AdminController::class, 'deleteUser']);
    Route::put('update-user/{user_id}', [AdminController::class, 'updateUser']);
    Route::get('edit-user/{user_id}', [AdminController::class, 'editUser']);

 // kriteria
    Route::get('data-kriteria', [AdminController::class, 'dataKriteria']);
    Route::post('tambah-kriteria',[AdminController::class, 'tambahKriteria']);
    Route::post('delete-kriteria', [AdminController::class, 'deleteKriteria']);
    Route::get('edit-kriteria/{kriteria_id}', [AdminController::class, 'editKriteria']);
    Route::put('update-kriteria/{kriteria_id}', [AdminController::class, 'updateKriteria']);

 // Nilai
    Route::get('data-nilai', [AdminController::class, 'dataNilai']);
    Route::get('daftar-kriteria', [AdminController::class, 'daftarKriteria']);
    Route::post('tambah-nilai',[AdminController::class, 'tambahNilai']);
    Route::post('delete-nilai', [AdminController::class, 'deleteNilai']);
    Route::get('edit-nilai/{nilai_id}', [AdminController::class, 'editNilai']);
    Route::put('update-nilai/{nilai_id}', [AdminController::class, 'updateNilai']);

  // sub_kriteria
    Route::get('data-subKriteria', [AdminController::class, 'dataSubKriteria']);
    Route::get('daftar-KriteriaSub', [AdminController::class, 'daftarKriteriaSub']);
    Route::post('tambah-subKriteria',[AdminController::class, 'tambahSubKriteria']);
    Route::post('delete-subKriteria', [AdminController::class, 'deleteSubKriteria']);
    Route::get('edit-subKriteria/{subKriteria_id}', [AdminController::class, 'editSubKriteria']);
    Route::put('update-subKriteria/{subKriteria_id}', [AdminController::class, 'updateSubKriteria']);

 // korwil
    Route::get('data-korwil', [AdminController::class, 'dataKorwil']);
    Route::post('tambah-korwil',[AdminController::class, 'tambahKorwil']);
    Route::post('delete-korwil', [AdminController::class, 'deleteKorwil']);
    Route::get('edit-korwil/{korwil_id}', [AdminController::class, 'editKorwil']);
    Route::put('update-korwil/{korwil_id}', [AdminController::class, 'updateKorwil']);

// Saldo
   Route::post('tambah-saldo', [AdminController::class, 'tambahSaldo']);
   Route::post('kurang-saldo', [AdminController::class, 'kurangSaldo']);
   Route::get('get-saldo', [AdminController::class, 'getSaldo']);
   Route::get('transaksi', [AdminController::class, 'getTransaksi']);
   Route::get('daftar-anggota', [AdminController::class, 'daftarAnggota']);
//pemnjaman
   Route::get('data-cair-dana',[AdminController::class,'dataDanaCair']);
   Route::post('cair-dana', [AdminController::class, 'cairkanDana']);

// anggota
   Route::get('data-anggota', [AdminController::class, 'dataAnggota']);
   
// koordinator
   Route::get('data-peminjam', [KoordinatorController::class, 'dataPeminjam']);
   Route::get('menghitung', [KoordinatorController::class, 'menghitung']);
   Route::get('peminjam/{peminjam_id}', [KoordinatorController::class, 'lihatPeminjam']);
   Route::get('start-spk', [KoordinatorController::class, 'startSpk']);
   Route::post('send-admin', [KoordinatorController::class, 'sendAdmin']);
   Route::get('/cek-cair-dana/{id_user}', [KoordinatorController::class, 'cekCairDana']);
   Route::get('riwayat-peminjam', [KoordinatorController::class, 'riwayatPeminjam']);


  // anggota controller
    Route::get('show-profile/{profile_id}', [AnggotaController::class, 'showProfile']);
    Route::get('daftar-korwil', [AnggotaController::class, 'daftarKorwil']);
    Route::get('daftar-kriteria', [AnggotaController::class, 'daftarKriteria']);
    Route::get('daftar-sub-kriteria', [AnggotaController::class, 'daftarSubKriteria']);

  
    Route::post('submit-profile',[AnggotaController::class, 'submitProfile']);
    Route::post('submit-pinjam',[AnggotaController::class, 'submitPinjam']);
    Route::get('/check-pinjam/{id_user}', [AnggotaController::class, 'checkPinjam']);
    Route::get('show-pinjam/{user_id}', [AnggotaController::class, 'showPinjam']);
    Route::get('informasi-cair/{id}', [AnggotaController::class, 'informasiCair']);

    //dashboard anggota


    Route::get('lihat', [AnggotaController::class, 'lihat']);
    Route::get('riwayat-pinjam', [AnggotaController::class, 'riwayatPinjaman']);



    Route::get('coba-spk', [KoordinatorController::class, 'cobaSpk']);