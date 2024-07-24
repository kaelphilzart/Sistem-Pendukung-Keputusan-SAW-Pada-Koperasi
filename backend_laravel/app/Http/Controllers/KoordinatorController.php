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
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class KoordinatorController extends Controller
{
    //

    public function dataPeminjam()
    {
        $currentMonth = now()->month;
        $currentYear = now()->year;
    
        return response()->json(Pinjam::join('users', 'pinjam.id_user', '=', 'users.id')
                                        ->join('profile as user_profile', 'users.id', '=', 'user_profile.id_user')
                                        ->join('profile as korwil_profile', 'pinjam.id_korwil', '=', 'korwil_profile.id')
                                        ->select('pinjam.*', 'user_profile.nama_lengkap as nama_peminjam', 'korwil_profile.nama_lengkap as nama_korwil')
                                        ->whereMonth('pinjam.created_at', $currentMonth)
                                        ->whereYear('pinjam.created_at', $currentYear)
                                        ->latest()
                                        ->get());
    }

    public function lihatPeminjam($peminjam_id)
    {
        try {
            // Mengambil data peminjam berdasarkan ID
            $peminjam = Pinjam::findOrFail($peminjam_id);
    
            // Decode data kriteria dari format JSON
            $kriteriaJson = json_decode($peminjam->kriteria, true);
            
            // Inisialisasi array kriteria
            $kriteria = [];
    
            // Ambil ID Sub Kriteria untuk digunakan dalam join
            $idSubKriterias = array_column($kriteriaJson, 'id_kriteria');
    
            // Lakukan join dengan tabel kriteria dan sub_kriteria untuk mendapatkan nama_kriteria
            $result = DB::table('sub_kriteria')
                        ->join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
                        ->whereIn('sub_kriteria.id', $idSubKriterias)
                        ->select('sub_kriteria.id AS sub_kriteria_id', 'kriteria.id AS kriteria_id', 'kriteria.nama AS nama_kriteria',
                                    'sub_kriteria.keterangan AS jawaban')
                        ->get();
    
            // Iterasi melalui setiap item dalam kriteria yang telah di-decode
            foreach ($kriteriaJson as $value) {
                // Cari nama_kriteria yang sesuai
                $namaKriteria = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->nama_kriteria ?? 'Tidak Diketahui';
                $jawaban = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->jawaban ?? 'Tidak Diketahui';
    
                $kriteria[] = [
                    'id_kriteria' => $value['id_kriteria'],
                    'id_kriteria_tipe' => $value['id_kriteria_tipe'],
                    'tipe' => $value['tipe'],
                    'nama_kriteria' => $namaKriteria,
                    'jawaban' => $jawaban,
                    'id_user' => $peminjam->nama_peminjam
                ];
            }
    
            return response()->json($kriteria, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan saat mengambil data kriteria'], 500);
        }
    }

        public function startSpk()
        {
            try {
                // Mendapatkan bulan dan tahun saat ini
                $currentMonth = Carbon::now()->month;
                $currentYear = Carbon::now()->year;
        
                // Mengambil data peminjam berdasarkan bulan dan tahun saat ini dan join dengan tabel users dan profile
                $peminjams = Pinjam::join('users', 'pinjam.id_user', '=', 'users.id')
                ->join('profile as user_profile', 'users.id', '=', 'user_profile.id_user')
                ->leftJoin('saldo', function ($join) {
                    $join->on('pinjam.id_user', '=', 'saldo.id_user')
                        ->where('saldo.status', '=', 'masuk');
                })
                ->select(
                    'pinjam.*',
                    'user_profile.nama_lengkap as nama_peminjam',
                    'user_profile.created_at as profile_created_at', // Ambil tanggal created_at dari profile
                    DB::raw('SUM(CASE WHEN saldo.jenis_saldo != "bayar tunggakan" THEN saldo.jumlah ELSE 0 END) as total_simpanan')
                )
                ->whereMonth('pinjam.created_at', $currentMonth)
                ->whereYear('pinjam.created_at', $currentYear)
                ->groupBy(
                    'pinjam.id',
                    'pinjam.id_user',
                    'pinjam.id_korwil',
                    'pinjam.jumlah_pinjam',
                    'pinjam.created_at',
                    'pinjam.updated_at',
                    'pinjam.kriteria',
                    'pinjam.status',
                    'user_profile.nama_lengkap',
                    'user_profile.created_at' // Tambahkan ke group by
                )
                ->get();
        
                $response = [];
                $groupedKriteria = [];
        
                foreach ($peminjams as $peminjam) {
                    // Decode data kriteria dari format JSON
                    $kriteriaJson = json_decode($peminjam->kriteria, true);
        
                    // Inisialisasi array kriteria
                    $kriteria = [];
        
                    // Ambil ID Sub Kriteria untuk digunakan dalam join
                    $idSubKriterias = array_column($kriteriaJson, 'id_kriteria');
        
                    // Lakukan join dengan tabel kriteria dan sub_kriteria untuk mendapatkan nama_kriteria dan keterangan
                    $result = DB::table('sub_kriteria')
                        ->join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
                        ->leftJoin('nilai', function ($join) use ($currentMonth, $currentYear) {
                            $join->on('kriteria.id', '=', 'nilai.id_kriteria');
                        })
                        ->whereIn('sub_kriteria.id', $idSubKriterias)
                        ->select(
                            'sub_kriteria.id AS sub_kriteria_id',
                            'kriteria.id AS kriteria_id',
                            'kriteria.nama AS nama_kriteria',
                            'kriteria.keterangan AS keterangan_kriteria',
                            'sub_kriteria.keterangan AS jawaban',
                            'sub_kriteria.nilai AS nilai_jawaban',
                            'nilai.nilai_bobot AS bobot' // Mengambil bobot dari tabel nilai
                        )
                        ->get();
        
                    // Iterasi melalui setiap item dalam kriteria yang telah di-decode
                    foreach ($kriteriaJson as $value) {
                        // Cari nama_kriteria dan keterangan yang sesuai
                        $namaKriteria = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->nama_kriteria ?? 'Tidak Diketahui';
                        $keteranganKriteria = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->keterangan_kriteria ?? 'Tidak Diketahui';
                        $jawaban = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->jawaban ?? 'Tidak Diketahui';
                        $nilai_jawaban = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->nilai_jawaban ?? 'Tidak Diketahui';
                        $bobot = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->bobot ?? 1; // Default bobot 1 jika tidak ada bobot
        
                        // Tambahkan ke array kriteria
                        $kriteria[] = [
                            'id_kriteria' => $value['id_kriteria'],
                            'id_kriteria_tipe' => $value['id_kriteria_tipe'],
                            'tipe' => $value['tipe'],
                            'nama_kriteria' => $namaKriteria,
                            'keterangan_kriteria' => $keteranganKriteria,
                            'jawaban' => $jawaban,
                            'nilai_jawaban' => $nilai_jawaban,
                            'nilai_bobot' => $bobot
                        ];
        
                        // Tambahkan nilai_jawaban ke groupedKriteria berdasarkan nama_kriteria
                        if (!isset($groupedKriteria[$namaKriteria])) {
                            $groupedKriteria[$namaKriteria] = [
                                'keterangan' => $keteranganKriteria,
                                'nilai_jawaban' => [],
                                'point' => null
                            ];
                        }
                        $groupedKriteria[$namaKriteria]['nilai_jawaban'][] = $nilai_jawaban;
                    }
        
                    // Pengecekan kriteria "raport"
                    $profileCreatedAt = Carbon::parse($peminjam->profile_created_at);
                    $simpananPokokLengkap = true;
                    $simpananWajibLengkap = true;
                    
                    // Pengecekan simpanan pokok dan wajib setiap bulan dari profile_created_at sampai sekarang
                    for ($year = $profileCreatedAt->year; $year <= $currentYear; $year++) {
                        $startMonth = ($year == $profileCreatedAt->year) ? $profileCreatedAt->month : 1;
                        $endMonth = ($year == $currentYear) ? $currentMonth : 12;
                    
                        for ($month = $startMonth; $month <= $endMonth; $month++) {
                            $simpananWajibExists = DB::table('saldo')
                                ->where('id_user', $peminjam->id_user)
                                ->whereYear('created_at', $year)
                                ->whereMonth('created_at', $month)
                                ->where('jenis_saldo', 'simpanan wajib')
                                ->where('status', 'masuk')
                                ->exists();
                    
                            $simpananPokokExists = DB::table('saldo')
                                ->where('id_user', $peminjam->id_user)
                                ->whereYear('created_at', $year)
                                ->whereMonth('created_at', $month)
                                ->where('jenis_saldo', 'simpanan pokok')
                                ->where('status', 'masuk')
                                ->exists();
                    
                            if (!$simpananWajibExists) {
                                $simpananWajibLengkap = false;
                            }
                    
                            if (!$simpananPokokExists) {
                                $simpananPokokLengkap = false;
                            }
                        }
                    }
                    
                    // Jika simpanan pokok atau wajib tidak lengkap, raport langsung 'jelek'
                    if (!$simpananPokokLengkap || !$simpananWajibLengkap) {
                        $raportStatus = 'jelek';
                        $nilaiJawabanRaport = 3;
                    } else {
                        // Jika lengkap, lanjut ke pengecekan beri pinjam
                        $latestBeriPinjam = DB::table('saldo')
                            ->where('id_user', $peminjam->id_user)
                            ->where('jenis_saldo', 'beri pinjam')
                            ->where('status', 'keluar')
                            ->orderBy('created_at', 'desc')
                            ->first();
                    
                        if ($latestBeriPinjam) {
                            // Ambil beri pinjam terbaru
                            $beriPinjamCreatedAt = Carbon::parse($latestBeriPinjam->created_at);
                            $jumlahPinjaman = $latestBeriPinjam->jumlah;
                    
                            // Ambil semua bayar tunggakan setelah beri pinjam terbaru
                            $tunggakanRecords = DB::table('saldo')
                                ->where('id_user', $peminjam->id_user)
                                ->where('jenis_saldo', 'bayar tunggakan')
                                ->where('status', 'masuk')
                                ->where('created_at', '>', $latestBeriPinjam->created_at)
                                ->orderBy('created_at')
                                ->get();
                    
                            // Membuat array untuk menyimpan bulan-bulan dan tahun bayar tunggakan
                            $tunggakanMonths = [];
                            $totalBayarTunggakan = 0;
                    
                            foreach ($tunggakanRecords as $record) {
                                $recordMonth = Carbon::parse($record->created_at)->month;
                                $recordYear = Carbon::parse($record->created_at)->year;
                                $tunggakanMonths[] = [
                                    'jumlah' => $record->jumlah,
                                    'bayar_tunggakan' => $record->jenis_saldo,
                                    'created_at' => Carbon::parse($record->created_at)->format('Y-m'),
                                ];
                                $totalBayarTunggakan += $record->jumlah;
                    
                                // Hentikan pengecekan jika jumlah bayar tunggakan sudah mencapai jumlah pinjaman
                                if ($totalBayarTunggakan >= $jumlahPinjaman) {
                                    break;
                                }
                            }
                    
                            // Pengecekan urutan bulan-bulan pada bayar tunggakan
                            $raportStatus = 'bagus';
                            $nilaiJawabanRaport = 1;
                    
                            $lastMonth = null;
                            foreach ($tunggakanMonths as $tunggakan) {
                                $currentMonth = $tunggakan['created_at'];
                                if ($lastMonth && Carbon::parse($lastMonth)->addMonth()->format('Y-m') != $currentMonth) {
                                    $raportStatus = 'jelek';
                                    $nilaiJawabanRaport = 3;
                                    break;
                                }
                                $lastMonth = $currentMonth;
                            }
                        } else {
                            // Jika tidak ada beri pinjam, raport 'tidak ada'
                            $raportStatus = 'tidak ada';
                            $nilaiJawabanRaport = 2;
                        }
                    }
                    
                    
        
                    // Tambahkan raport ke groupedKriteria dan kriteria
                    if (!isset($groupedKriteria['raport'])) {
                        $groupedKriteria['raport'] = [
                            'keterangan' => 2, // Keterangan kriteria diatur ke 2
                            'nilai_jawaban' => [],
                            'point' => null
                        ];
                    }
                    $groupedKriteria['raport']['nilai_jawaban'][] = $nilaiJawabanRaport;
                    
        
                    $kriteria[] = [
                        'id_kriteria' => 'raport',
                        'id_kriteria_tipe' => 'custom',
                        'tipe' => 'raport',
                        'nama_kriteria' => 'raport',
                        'keterangan_kriteria' => 2,
                        'jawaban' => $raportStatus,
                        'nilai_jawaban' => $nilaiJawabanRaport,
                        'nilai_bobot' => 40
                    ];
        
                    // Tambahkan data peminjam dengan data kriteria
                    $response[] = [
                        'nama_peminjam' => $peminjam->nama_peminjam,
                        'total_simpanan' => $peminjam->total_simpanan,
                        'kriteria' => $kriteria,
                        'jumlah_pinjam' => $peminjam->jumlah_pinjam,
                        'hasil_akumulasi' => 0, // Ini akan dihitung nanti
                        'dana_cair' => 0, // Ini akan dihitung nanti
                        'id_user' => $peminjam->id_user, // Tambahkan id_user
                        'id_korwil' => $peminjam->id_korwil, // Tambahkan id_korwil
                        'status' => $peminjam->status,
                        'raport' => $raportStatus // Tambahkan hasil raport
                    ];
                }
        
                // Proses nilai_jawaban tertinggi atau terendah berdasarkan keterangan_kriteria
                foreach ($groupedKriteria as $namaKriteria => &$data) {
                    $keterangan = $data['keterangan'];
                    $nilaiJawaban = $data['nilai_jawaban'];
        
                    if ($keterangan == 1) {
                        // Ambil nilai_jawaban tertinggi
                        $data['point'] = max($nilaiJawaban);
                    } elseif ($keterangan == 2) {
                        // Ambil nilai_jawaban terendah
                        $data['point'] = min($nilaiJawaban);
                    } else {
                        $data['point'] = 'Keterangan tidak diketahui';
                    }
                }
        
                // Proses normalisasi nilai jawaban dan penghitungan hasil akhir per kriteria
                foreach ($response as &$item) {
                    $hasil_akumulasi = 0;
                    foreach ($item['kriteria'] as &$kriteria) {
                        $namaKriteria = $kriteria['nama_kriteria'];
                        $nilaiJawaban = $kriteria['nilai_jawaban'];
                        $bobot = $kriteria['nilai_bobot'];
                        $point = $groupedKriteria[$namaKriteria]['point'];
        
                        if ($groupedKriteria[$namaKriteria]['keterangan'] == 1) {
                            // Normalisasi dengan pembagian nilai_jawaban oleh point
                            $kriteria['hasil_normalisasi'] = number_format($nilaiJawaban / $point, 2);
                        } elseif ($groupedKriteria[$namaKriteria]['keterangan'] == 2) {
                            // Normalisasi dengan pembagian point oleh nilai_jawaban
                            $kriteria['hasil_normalisasi'] = number_format($point / $nilaiJawaban, 2);
                        } else {
                            $kriteria['hasil_normalisasi'] = 'Keterangan tidak diketahui';
                        }
        
                        // Hitung nilai akhir per kriteria
                        $kriteria['hasil_akhir'] = $kriteria['hasil_normalisasi'] * $bobot;
        
                        // Tambahkan hasil_akhir ke hasil_akumulasi
                        $hasil_akumulasi += $kriteria['hasil_akhir'];
                    }
                    // Tambahkan hasil_akumulasi ke response
                    $item['hasil_akumulasi'] = $hasil_akumulasi;
        
                    // Tentukan nilai dana_cair berdasarkan hasil_akumulasi
                    if ($hasil_akumulasi < 50) {
                        $dana_cair = $item['total_simpanan'] * 3;
        
                        // Periksa apakah 3 kali total simpanan melebihi jumlah pinjaman yang diajukan
                        if ($dana_cair > $item['jumlah_pinjam']) {
                            $dana_cair = $item['jumlah_pinjam'];
                        }
                    } else {
                        $dana_cair = $item['jumlah_pinjam'];
                    }
        
                    $item['dana_cair'] = $dana_cair;
                }
        
                // Urutkan berdasarkan hasil_akumulasi descending
                usort($response, function ($a, $b) {
                    return $b['hasil_akumulasi'] <=> $a['hasil_akumulasi'];
                });
        
                // Tambahkan ranking ke masing-masing item dalam response
                foreach ($response as $index => &$item) {
                    $item['ranking'] = $index + 1;
                }
        
                // Debug output untuk pengecekan data
                // dd(['response' => $response, 'groupedKriteria' => $groupedKriteria]);
        
                // Mengembalikan response dalam bentuk JSON
                return response()->json(['response' => $response, 'groupedKriteria' => $groupedKriteria], 200);
            } catch (\Exception $e) {
                // Debug output untuk pengecekan error
                // dd($e->getMessage());
        
                return response()->json(['message' => 'Terjadi kesalahan saat mengambil data kriteria'], 500);
            }
        }

    public function sendAdmin (Request $request){
        // validate request 
        $cair_dana = new CairDana;
        $cair_dana->id_user = $request->id_user;
        $cair_dana->id_korwil = $request->id_korwil;
        $cair_dana->ajuan_dana = $request->ajuan_dana;
        $cair_dana->dana_cair = $request->dana_cair;
        $cair_dana->save();

        $pinjam = Pinjam::where('id_user', $cair_dana->id_user)->first();
        $pinjam->status = "sudah";
        $pinjam->save();

        return response()->json(['message' => 'cair dana berhasil diinfokan'], 201);
    }


    public function cobaSpk()
    {
        try {
            // Mendapatkan bulan dan tahun saat ini
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;
    
            // Mengambil data peminjam berdasarkan bulan dan tahun saat ini dan join dengan tabel users dan profile
            $peminjams = Pinjam::join('users', 'pinjam.id_user', '=', 'users.id')
            ->join('profile as user_profile', 'users.id', '=', 'user_profile.id_user')
            ->leftJoin('saldo', function ($join) {
                $join->on('pinjam.id_user', '=', 'saldo.id_user')
                    ->where('saldo.status', '=', 'masuk');
            })
            ->select(
                'pinjam.*',
                'user_profile.nama_lengkap as nama_peminjam',
                'user_profile.created_at as profile_created_at', // Ambil tanggal created_at dari profile
                DB::raw('SUM(CASE WHEN saldo.jenis_saldo != "bayar tunggakan" THEN saldo.jumlah ELSE 0 END) as total_simpanan')
            )
            ->whereMonth('pinjam.created_at', $currentMonth)
            ->whereYear('pinjam.created_at', $currentYear)
            ->groupBy(
                'pinjam.id',
                'pinjam.id_user',
                'pinjam.id_korwil',
                'pinjam.jumlah_pinjam',
                'pinjam.created_at',
                'pinjam.updated_at',
                'pinjam.kriteria',
                'pinjam.status',
                'user_profile.nama_lengkap',
                'user_profile.created_at' // Tambahkan ke group by
            )
            ->get();
    
            $response = [];
            $groupedKriteria = [];
    
            foreach ($peminjams as $peminjam) {
                // Decode data kriteria dari format JSON
                $kriteriaJson = json_decode($peminjam->kriteria, true);
    
                // Inisialisasi array kriteria
                $kriteria = [];
    
                // Ambil ID Sub Kriteria untuk digunakan dalam join
                $idSubKriterias = array_column($kriteriaJson, 'id_kriteria');
    
                // Lakukan join dengan tabel kriteria dan sub_kriteria untuk mendapatkan nama_kriteria dan keterangan
                $result = DB::table('sub_kriteria')
                    ->join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
                    ->leftJoin('nilai', function ($join) use ($currentMonth, $currentYear) {
                        $join->on('kriteria.id', '=', 'nilai.id_kriteria');
                    })
                    ->whereIn('sub_kriteria.id', $idSubKriterias)
                    ->select(
                        'sub_kriteria.id AS sub_kriteria_id',
                        'kriteria.id AS kriteria_id',
                        'kriteria.nama AS nama_kriteria',
                        'kriteria.keterangan AS keterangan_kriteria',
                        'sub_kriteria.keterangan AS jawaban',
                        'sub_kriteria.nilai AS nilai_jawaban',
                        'nilai.nilai_bobot AS bobot' // Mengambil bobot dari tabel nilai
                    )
                    ->get();
    
                // Iterasi melalui setiap item dalam kriteria yang telah di-decode
                foreach ($kriteriaJson as $value) {
                    // Cari nama_kriteria dan keterangan yang sesuai
                    $namaKriteria = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->nama_kriteria ?? 'Tidak Diketahui';
                    $keteranganKriteria = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->keterangan_kriteria ?? 'Tidak Diketahui';
                    $jawaban = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->jawaban ?? 'Tidak Diketahui';
                    $nilai_jawaban = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->nilai_jawaban ?? 'Tidak Diketahui';
                    $bobot = $result->firstWhere('sub_kriteria_id', $value['id_kriteria'])->bobot ?? 1; // Default bobot 1 jika tidak ada bobot
    
                    // Tambahkan ke array kriteria
                    $kriteria[] = [
                        'id_kriteria' => $value['id_kriteria'],
                        'id_kriteria_tipe' => $value['id_kriteria_tipe'],
                        'tipe' => $value['tipe'],
                        'nama_kriteria' => $namaKriteria,
                        'keterangan_kriteria' => $keteranganKriteria,
                        'jawaban' => $jawaban,
                        'nilai_jawaban' => $nilai_jawaban,
                        'nilai_bobot' => $bobot
                    ];
    
                    // Tambahkan nilai_jawaban ke groupedKriteria berdasarkan nama_kriteria
                    if (!isset($groupedKriteria[$namaKriteria])) {
                        $groupedKriteria[$namaKriteria] = [
                            'keterangan' => $keteranganKriteria,
                            'nilai_jawaban' => [],
                            'point' => null
                        ];
                    }
                    $groupedKriteria[$namaKriteria]['nilai_jawaban'][] = $nilai_jawaban;
                }
    
                // Pengecekan kriteria "raport"
                $profileCreatedAt = Carbon::parse($peminjam->profile_created_at);
                $simpananPokokLengkap = true;
                $simpananWajibLengkap = true;
                
                // Pengecekan simpanan pokok dan wajib setiap bulan dari profile_created_at sampai sekarang
                for ($year = $profileCreatedAt->year; $year <= $currentYear; $year++) {
                    $startMonth = ($year == $profileCreatedAt->year) ? $profileCreatedAt->month : 1;
                    $endMonth = ($year == $currentYear) ? $currentMonth : 12;
                
                    for ($month = $startMonth; $month <= $endMonth; $month++) {
                        $simpananWajibExists = DB::table('saldo')
                            ->where('id_user', $peminjam->id_user)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->where('jenis_saldo', 'simpanan wajib')
                            ->where('status', 'masuk')
                            ->exists();
                
                        $simpananPokokExists = DB::table('saldo')
                            ->where('id_user', $peminjam->id_user)
                            ->whereYear('created_at', $year)
                            ->whereMonth('created_at', $month)
                            ->where('jenis_saldo', 'simpanan pokok')
                            ->where('status', 'masuk')
                            ->exists();
                
                        if (!$simpananWajibExists) {
                            $simpananWajibLengkap = false;
                        }
                
                        if (!$simpananPokokExists) {
                            $simpananPokokLengkap = false;
                        }
                    }
                }
                
                // Jika simpanan pokok atau wajib tidak lengkap, raport langsung 'jelek'
                if (!$simpananPokokLengkap || !$simpananWajibLengkap) {
                    $raportStatus = 'jelek';
                    $nilaiJawabanRaport = 3;
                } else {
                    // Jika lengkap, lanjut ke pengecekan beri pinjam
                    $latestBeriPinjam = DB::table('saldo')
                        ->where('id_user', $peminjam->id_user)
                        ->where('jenis_saldo', 'beri pinjam')
                        ->where('status', 'keluar')
                        ->orderBy('created_at', 'desc')
                        ->first();
                
                    if ($latestBeriPinjam) {
                        // Ambil beri pinjam terbaru
                        $beriPinjamCreatedAt = Carbon::parse($latestBeriPinjam->created_at);
                        $jumlahPinjaman = $latestBeriPinjam->jumlah;
                
                        // Ambil semua bayar tunggakan setelah beri pinjam terbaru
                        $tunggakanRecords = DB::table('saldo')
                            ->where('id_user', $peminjam->id_user)
                            ->where('jenis_saldo', 'bayar tunggakan')
                            ->where('status', 'masuk')
                            ->where('created_at', '>', $latestBeriPinjam->created_at)
                            ->orderBy('created_at')
                            ->get();
                
                        // Membuat array untuk menyimpan bulan-bulan dan tahun bayar tunggakan
                        $tunggakanMonths = [];
                        $totalBayarTunggakan = 0;
                
                        foreach ($tunggakanRecords as $record) {
                            $recordMonth = Carbon::parse($record->created_at)->month;
                            $recordYear = Carbon::parse($record->created_at)->year;
                            $tunggakanMonths[] = [
                                'jumlah' => $record->jumlah,
                                'bayar_tunggakan' => $record->jenis_saldo,
                                'created_at' => Carbon::parse($record->created_at)->format('Y-m'),
                            ];
                            $totalBayarTunggakan += $record->jumlah;
                
                            // Hentikan pengecekan jika jumlah bayar tunggakan sudah mencapai jumlah pinjaman
                            if ($totalBayarTunggakan >= $jumlahPinjaman) {
                                break;
                            }
                        }
                
                        // Pengecekan urutan bulan-bulan pada bayar tunggakan
                        $raportStatus = 'bagus';
                        $nilaiJawabanRaport = 1;
                
                        $lastMonth = null;
                        foreach ($tunggakanMonths as $tunggakan) {
                            $currentMonth = $tunggakan['created_at'];
                            if ($lastMonth && Carbon::parse($lastMonth)->addMonth()->format('Y-m') != $currentMonth) {
                                $raportStatus = 'jelek';
                                $nilaiJawabanRaport = 3;
                                break;
                            }
                            $lastMonth = $currentMonth;
                        }
                    } else {
                        // Jika tidak ada beri pinjam, raport 'tidak ada'
                        $raportStatus = 'tidak ada';
                        $nilaiJawabanRaport = 2;
                    }
                }
                
                
    
                // Tambahkan raport ke groupedKriteria dan kriteria
                if (!isset($groupedKriteria['raport'])) {
                    $groupedKriteria['raport'] = [
                        'keterangan' => 2, // Keterangan kriteria diatur ke 2
                        'nilai_jawaban' => [],
                        'point' => null
                    ];
                }
                $groupedKriteria['raport']['nilai_jawaban'][] = $nilaiJawabanRaport;
                
    
                $kriteria[] = [
                    'id_kriteria' => 'raport',
                    'id_kriteria_tipe' => 'custom',
                    'tipe' => 'raport',
                    'nama_kriteria' => 'raport',
                    'keterangan_kriteria' => 2,
                    'jawaban' => $raportStatus,
                    'nilai_jawaban' => $nilaiJawabanRaport,
                    'nilai_bobot' => 40
                ];
    
                // Tambahkan data peminjam dengan data kriteria
                $response[] = [
                    'nama_peminjam' => $peminjam->nama_peminjam,
                    'total_simpanan' => $peminjam->total_simpanan,
                    'kriteria' => $kriteria,
                    'jumlah_pinjam' => $peminjam->jumlah_pinjam,
                    'hasil_akumulasi' => 0, // Ini akan dihitung nanti
                    'dana_cair' => 0, // Ini akan dihitung nanti
                    'id_user' => $peminjam->id_user, // Tambahkan id_user
                    'id_korwil' => $peminjam->id_korwil, // Tambahkan id_korwil
                    'status' => $peminjam->status,
                    'raport' => $raportStatus // Tambahkan hasil raport
                ];
            }
    
            // Proses nilai_jawaban tertinggi atau terendah berdasarkan keterangan_kriteria
            foreach ($groupedKriteria as $namaKriteria => &$data) {
                $keterangan = $data['keterangan'];
                $nilaiJawaban = $data['nilai_jawaban'];
    
                if ($keterangan == 1) {
                    // Ambil nilai_jawaban tertinggi
                    $data['point'] = max($nilaiJawaban);
                } elseif ($keterangan == 2) {
                    // Ambil nilai_jawaban terendah
                    $data['point'] = min($nilaiJawaban);
                } else {
                    $data['point'] = 'Keterangan tidak diketahui';
                }
            }
    
            // Proses normalisasi nilai jawaban dan penghitungan hasil akhir per kriteria
            foreach ($response as &$item) {
                $hasil_akumulasi = 0;
                foreach ($item['kriteria'] as &$kriteria) {
                    $namaKriteria = $kriteria['nama_kriteria'];
                    $nilaiJawaban = $kriteria['nilai_jawaban'];
                    $bobot = $kriteria['nilai_bobot'];
                    $point = $groupedKriteria[$namaKriteria]['point'];
    
                    if ($groupedKriteria[$namaKriteria]['keterangan'] == 1) {
                        // Normalisasi dengan pembagian nilai_jawaban oleh point
                        $kriteria['hasil_normalisasi'] = number_format($nilaiJawaban / $point, 2);
                    } elseif ($groupedKriteria[$namaKriteria]['keterangan'] == 2) {
                        // Normalisasi dengan pembagian point oleh nilai_jawaban
                        $kriteria['hasil_normalisasi'] = number_format($point / $nilaiJawaban, 2);
                    } else {
                        $kriteria['hasil_normalisasi'] = 'Keterangan tidak diketahui';
                    }
    
                    // Hitung nilai akhir per kriteria
                    $kriteria['hasil_akhir'] = $kriteria['hasil_normalisasi'] * $bobot;
    
                    // Tambahkan hasil_akhir ke hasil_akumulasi
                    $hasil_akumulasi += $kriteria['hasil_akhir'];
                }
                // Tambahkan hasil_akumulasi ke response
                $item['hasil_akumulasi'] = $hasil_akumulasi;
    
                // Tentukan nilai dana_cair berdasarkan hasil_akumulasi
                if ($hasil_akumulasi < 50) {
                    $dana_cair = $item['total_simpanan'] * 3;
    
                    // Periksa apakah 3 kali total simpanan melebihi jumlah pinjaman yang diajukan
                    if ($dana_cair > $item['jumlah_pinjam']) {
                        $dana_cair = $item['jumlah_pinjam'];
                    }
                } else {
                    $dana_cair = $item['jumlah_pinjam'];
                }
    
                $item['dana_cair'] = $dana_cair;
            }
    
            // Urutkan berdasarkan hasil_akumulasi descending
            usort($response, function ($a, $b) {
                return $b['hasil_akumulasi'] <=> $a['hasil_akumulasi'];
            });
    
            // Tambahkan ranking ke masing-masing item dalam response
            foreach ($response as $index => &$item) {
                $item['ranking'] = $index + 1;
            }
    
            // Debug output untuk pengecekan data
            dd(['response' => $response, 'groupedKriteria' => $groupedKriteria]);
    
            // Mengembalikan response dalam bentuk JSON
            return response()->json(['response' => $response, 'groupedKriteria' => $groupedKriteria], 200);
        } catch (\Exception $e) {
            // Debug output untuk pengecekan error
            dd($e->getMessage());
    
            return response()->json(['message' => 'Terjadi kesalahan saat mengambil data kriteria'], 500);
        }
    }
    
    
    
    

    // public function cekCairDana($id_user)
    // {
    //     $currentMonth = Carbon::now()->month;
    //     $currentYear = Carbon::now()->year;

    //     $exists = CairDana::where('id_user', $id_user)
    //         ->whereMonth('created_at', $currentMonth)
    //         ->whereYear('created_at', $currentYear)
    //         ->exists();

    //     return response()->json(['exists' => $exists]);
    // }

    
    
      
    // public function menghitung()
    // {
    //     // Ambil data dari tabel pinjam
    //     $pinjams = DB::table('pinjam')
    //         ->join('users as peminjam_user', 'pinjam.id_user', '=', 'peminjam_user.id')
    //         ->join('profile as peminjam_profile', 'peminjam_user.id', '=', 'peminjam_profile.id_user')
    //         ->join('profile as korwil_profile', 'pinjam.id_korwil', '=', 'korwil_profile.id')
    //         ->select(
    //             'pinjam.*', 
    //             'peminjam_profile.nama_lengkap as peminjam_nama_lengkap', 
    //             'korwil_profile.nama_lengkap as korwil_nama_korwil'
    //         )
    //         ->get();
    
    //     // Array untuk menyimpan pengelompokan data
    //     $groupedData = [];
    
    //     // Array untuk menyimpan hasil akhir per user
    //     $hasilAkhirPerUser = [];
    
    //     // Array untuk menyimpan jumlah pinjam per user
    //     $jumlahPinjamPerUser = [];
    
    //     // Loop melalui setiap record pinjam
    //     foreach ($pinjams as $pinjam) {
    //         // Ambil nilai kriteria dari record pinjam
    //         $kriteria = json_decode($pinjam->kriteria, true);

    //         $idSubKriterias = array_column($kriteria, 'id_kriteria');
    
    //         if (!is_array($kriteria)) {
    //             continue; // Lewatkan jika kriteria bukan array
    //         }
    
    //         // Lakukan join dengan tabel sub_kriteria berdasarkan id kriteria dalam kriteria array
    //         $result = DB::table('sub_kriteria')
    //             ->join('kriteria', 'sub_kriteria.id_kriteria', '=', 'kriteria.id')
    //             ->join('nilai', 'kriteria.id', '=', 'nilai.id_kriteria') // Join dengan tabel nilai
    //             ->whereIn('sub_kriteria.id', array_values($idSubKriterias)) // Ambil nilai array kriteria dan gunakan sebagai kunci join
    //             ->select('sub_kriteria.nilai', 'kriteria.keterangan', 'kriteria.nama AS nama_kriteria', 'nilai.nilai_bobot')
    //             ->get();
    
    //         // Simpan jumlah pinjam per user
    //         $jumlahPinjamPerUser[$pinjam->peminjam_nama_lengkap] = $pinjam->jumlah_pinjam;
    
    //         // Tampilkan informasi pinjam
    //         echo "ID Pinjam: $pinjam->id<br>";
    //         echo "Nama Peminjam: $pinjam->peminjam_nama_lengkap<br>";
    //         echo "Nama Korwil: $pinjam->korwil_nama_korwil<br>";
    //         echo "Jumlah Pinjam: $pinjam->jumlah_pinjam<br>";
    
    //         // Tampilkan setiap elemen array kriteria
    //         echo "Kriteria:<br>";
    //         foreach ($kriteria as $key => $value) {
    //             echo "- $key: $value<br>";
    //         }
    
    //         // Tampilkan nilai sub kriteria dan keterangan, serta kelompokkan data
    //         foreach ($result as $row) {
    //             echo "Nilai Sub Kriteria: $row->nilai<br>";
    //             echo "Nama Kriteria: $row->nama_kriteria<br>";
    //             echo "Keterangan: $row->keterangan<br>";
    
    //             // Tambahkan data ke dalam pengelompokan
    //             $groupedData[$row->nama_kriteria][] = [
    //                 'keterangan' => $row->keterangan,
    //                 'nama_peminjam' => $pinjam->peminjam_nama_lengkap,
    //                 'nilai' => $row->nilai,
    //                 'nilai_bobot' => $row->nilai_bobot // Simpan nilai bobot dalam pengelompokan
    //             ];
    //         }
    //         echo "<br>";
    //     }
    
    //     // Tampilkan hasil pengelompokan data
    //     echo "<h2>Pengelompokan Berdasarkan Nama Kriteria</h2>";
    //     foreach ($groupedData as $namaKriteria => $items) {
    //         echo "<h3>$namaKriteria</h3>";
    //         if (!empty($items)) {
    //             echo "Keterangan: {$items[0]['keterangan']}<br>"; // Tampilkan keterangan sekali per kelompok
    //             echo "Nilai Bobot: {$items[0]['nilai_bobot']}<br>"; // Tampilkan nilai bobot sekali per kelompok
    //         }
    
    //         // Menghitung nilai bagi berdasarkan keterangan
    //         if (!empty($items)) {
    //             $keterangan = $items[0]['keterangan'];
    //             $nilai = array_column($items, 'nilai');
    //             if ($keterangan == 1) {
    //                 $nilaiBagi = max($nilai);
    //             } elseif ($keterangan == 2) {
    //                 $nilaiBagi = min($nilai);
    //             } else {
    //                 $nilaiBagi = null;
    //             }
    //             echo "Nilai Bagi: $nilaiBagi<br>";
    
    //             // Menghitung dan menampilkan hasil normalisasi serta hasil bobot
    //             foreach ($items as $item) {
    //                 $nilaiIsi = $item['nilai'];
    //                 $nilaiBobot = $item['nilai_bobot'];
    //                 if ($keterangan == 1) {
    //                     $hasilNormalisasi = $nilaiIsi / $nilaiBagi;
    //                 } elseif ($keterangan == 2) {
    //                     $hasilNormalisasi = $nilaiBagi / $nilaiIsi;
    //                 } else {
    //                     $hasilNormalisasi = null;
    //                 }
    //                 $hasilBobot = $hasilNormalisasi * $nilaiBobot;
    //                 echo "<br>";
    //                 echo "Nama Peminjam: {$item['nama_peminjam']}<br>";
    //                 echo "Nilai Input: $nilaiIsi<br>";
    //                 echo "Hasil Normalisasi: $hasilNormalisasi<br>";
    //                 echo "Hasil Bobot: $hasilBobot<br>";
    
    //                 // Tambahkan hasil bobot ke dalam hasil akhir per user
    //                 if (!isset($hasilAkhirPerUser[$item['nama_peminjam']])) {
    //                     $hasilAkhirPerUser[$item['nama_peminjam']] = 0;
    //                 }
    //                 $hasilAkhirPerUser[$item['nama_peminjam']] += $hasilBobot;
    //             }
    //         }
    //     }
    
    //     // Mengurutkan hasil akhir per user berdasarkan nilai (descending)
    //     arsort($hasilAkhirPerUser);
    
    //     // Ambil saldo total
    //     $totalIn = DB::table('saldo')->where('status', 'masuk')->sum('jumlah');
    //     $totalOut = DB::table('saldo')->where('status', 'keluar')->sum('jumlah');
    //     $saldo = $totalIn - $totalOut;
    
    //     // Tampilkan hasil akhir per user
    //     echo "<h2>Hasil Akhir Per User</h2>";
    //     foreach ($hasilAkhirPerUser as $namaPeminjam => $hasilAkhir) {
    //         $jumlahPinjam = $jumlahPinjamPerUser[$namaPeminjam];
    //         echo "Nama Peminjam: $namaPeminjam<br>";
    //         echo "Hasil Akhir: $hasilAkhir<br>";
    //         echo "Jumlah Pinjam: $jumlahPinjam<br>";
            
    //         if ($saldo > 0) {
    //             if ($saldo >= $jumlahPinjam) {
    //                 echo "Pinjaman Disetujui: Ya<br>";
    //                 echo "Pinjaman Sebesar: $jumlahPinjam<br>";
    //                 $saldo -= $jumlahPinjam; // Kurangi saldo dengan jumlah pinjaman yang disetujui
    //             } else {
    //                 echo "Pinjaman Disetujui: Sebagian<br>";
    //                 echo "Pinjaman Sebesar: $saldo<br>";
    //                 $saldo = 0; // Kurangi saldo hingga habis
    //             }
    //         } else {
    //             echo "Pinjaman Disetujui: Tidak<br>";
    //             echo "Pinjaman Sebesar: 0<br>";
    //         }
    //         echo "<br>";
    //     }
    
    //     echo "Saldo Akhir: $saldo<br>";
    
    //     return;
    // }

    public function riwayatPeminjam()
    {
        $transaksi = Pinjam::join('users','pinjam.id_user','=','users.id')
                            ->join('profile as profile_user','users.id','profile_user.id_user')
                            ->join('profile as profile_korwil','pinjam.id_korwil','profile_korwil.id')
                            ->select('pinjam.*','profile_user.nama_lengkap as nama_peminjam','profile_korwil.nama_lengkap as nama_korwil')
                            ->get();
        return response()->json($transaksi);
    }
    
    
}
