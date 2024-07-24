-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Jul 2024 pada 23.59
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `koperasi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cair_dana`
--

CREATE TABLE `cair_dana` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_korwil` int(11) NOT NULL,
  `ajuan_dana` double NOT NULL,
  `dana_cair` double NOT NULL,
  `status_dana` varchar(20) NOT NULL DEFAULT 'belum',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `cair_dana`
--

INSERT INTO `cair_dana` (`id`, `id_user`, `id_korwil`, `ajuan_dana`, `dana_cair`, `status_dana`, `created_at`, `updated_at`) VALUES
(13, 8, 2, 500000, 500000, 'cair', '2024-07-11 23:40:14', '2024-07-11 23:40:47'),
(14, 7, 2, 5000000, 5000000, 'belum', '2024-07-22 00:04:48', '2024-07-22 00:04:48');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kriteria`
--

CREATE TABLE `kriteria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `keterangan` int(11) NOT NULL,
  `tipe` varchar(20) NOT NULL,
  `text_input` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kriteria`
--

INSERT INTO `kriteria` (`id`, `nama`, `keterangan`, `tipe`, `text_input`, `created_at`, `updated_at`) VALUES
(4, 'pendapatan', 1, 'file', 'Silakan upload slip gaji anda atau bukti pendapatan lainnya', '2024-04-12 02:48:30', '2024-06-12 20:53:41'),
(5, 'tujuan peminjaman', 1, 'text', 'Silakan Isi detailnya', '2024-04-13 00:18:08', '2024-06-12 20:55:17'),
(6, 'jumlah tanggungan', 2, 'file', 'Silakan mengupload Foto kartu keluarga', '2024-06-12 21:16:03', '2024-06-12 21:16:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_04_03_054531_create_profile', 2),
(6, '2024_04_03_055742_create_kriteria', 3),
(7, '2024_04_03_055754_create_sub_kriteria', 3),
(8, '2024_04_03_055801_create_nilai', 3),
(9, '2024_04_03_104056_create_saldo', 4),
(10, '2024_04_03_104152_create_pinjam', 4),
(11, '2024_04_03_104226_create_rangking', 4),
(12, '2024_04_03_104257_create_alternatif', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `nilai`
--

CREATE TABLE `nilai` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_kriteria` int(11) NOT NULL,
  `nilai_bobot` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `nilai`
--

INSERT INTO `nilai` (`id`, `id_kriteria`, `nilai_bobot`, `created_at`, `updated_at`) VALUES
(3, 5, 20, '2024-06-12 21:21:30', '2024-06-27 20:23:10'),
(4, 4, 25, '2024-06-12 21:22:10', '2024-06-26 17:03:22'),
(5, 6, 15, '2024-06-12 21:22:29', '2024-06-27 20:22:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(184, 'App\\Models\\User', 9, 'token', 'a43486b1586f8a09273d953f3849c0d79e98919a0baf71a729072b43bbeaefce', '[\"*\"]', NULL, NULL, '2024-07-21 09:01:02', '2024-07-21 09:01:02'),
(186, 'App\\Models\\User', 10, 'token', '26b0a697b175ea41e0b11f765387ed59c3fa5fd090f3f748e64f58ae9032ebcd', '[\"*\"]', NULL, NULL, '2024-07-22 21:54:24', '2024-07-22 21:54:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pinjam`
--

CREATE TABLE `pinjam` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_korwil` int(11) NOT NULL,
  `kriteria` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`kriteria`)),
  `jumlah_pinjam` double NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'proses',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pinjam`
--

INSERT INTO `pinjam` (`id`, `id_user`, `id_korwil`, `kriteria`, `jumlah_pinjam`, `status`, `created_at`, `updated_at`) VALUES
(8, 13, 2, '\"[{\\\"id_kriteria\\\":\\\"6\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/fernanda.pdf\\\",\\\"tipe\\\":\\\"file\\\"},{\\\"id_kriteria\\\":\\\"12\\\",\\\"id_kriteria_tipe\\\":\\\"bahan pangan dan pakan\\\",\\\"tipe\\\":\\\"text\\\"},{\\\"id_kriteria\\\":\\\"9\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/kk1.jpg\\\",\\\"tipe\\\":\\\"file\\\"}]\"', 500000, 'proses', '2024-06-30 17:00:23', '2024-06-30 17:00:23'),
(9, 12, 2, '\"[{\\\"id_kriteria\\\":\\\"7\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/deden.pdf\\\",\\\"tipe\\\":\\\"file\\\"},{\\\"id_kriteria\\\":\\\"10\\\",\\\"id_kriteria_tipe\\\":\\\"bayar ukt\\\",\\\"tipe\\\":\\\"text\\\"},{\\\"id_kriteria\\\":\\\"16\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/kk2.jpg\\\",\\\"tipe\\\":\\\"file\\\"}]\"', 500000, 'proses', '2024-06-30 17:00:03', '2024-07-11 18:56:53'),
(10, 11, 2, '\"[{\\\"id_kriteria\\\":\\\"6\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/firdaus.pdf\\\",\\\"tipe\\\":\\\"file\\\"},{\\\"id_kriteria\\\":\\\"11\\\",\\\"id_kriteria_tipe\\\":\\\"jualan pentol bakar\\\",\\\"tipe\\\":\\\"text\\\"},{\\\"id_kriteria\\\":\\\"8\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/kk3.jpg\\\",\\\"tipe\\\":\\\"file\\\"}]\"', 10000000, 'proses', '2024-06-30 17:00:31', '2024-06-30 17:00:31'),
(11, 7, 2, '\"[{\\\"id_kriteria\\\":\\\"5\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/kuseno.pdf\\\",\\\"tipe\\\":\\\"file\\\"},{\\\"id_kriteria\\\":\\\"15\\\",\\\"id_kriteria_tipe\\\":\\\"uang muka\\\",\\\"tipe\\\":\\\"text\\\"},{\\\"id_kriteria\\\":\\\"8\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/kk4.jpg\\\",\\\"tipe\\\":\\\"file\\\"}]\"', 5000000, 'sudah', '2024-06-30 17:00:04', '2024-07-22 00:04:48'),
(13, 8, 2, '\"[{\\\"id_kriteria\\\":\\\"6\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/cover_2.jpg\\\",\\\"tipe\\\":\\\"file\\\"},{\\\"id_kriteria\\\":\\\"10\\\",\\\"id_kriteria_tipe\\\":\\\"perguruan tinggi\\\",\\\"tipe\\\":\\\"text\\\"},{\\\"id_kriteria\\\":\\\"8\\\",\\\"id_kriteria_tipe\\\":\\\"storage\\\\\\/kriteria_files\\\\\\/1.jpg\\\",\\\"tipe\\\":\\\"file\\\"}]\"', 500000, 'sudah', '2024-07-11 23:28:31', '2024-07-11 23:40:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `profile`
--

CREATE TABLE `profile` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_user` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `umur` int(11) NOT NULL,
  `jenis_kelamin` varchar(20) NOT NULL,
  `alamat` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `profile`
--

INSERT INTO `profile` (`id`, `id_user`, `nama_lengkap`, `umur`, `jenis_kelamin`, `alamat`, `created_at`, `updated_at`) VALUES
(2, 10, 'mama gufron', 23, 'laki-laki', 'bandar', '2024-06-11 03:43:44', '2024-06-11 03:43:44'),
(3, 8, 'revanda azhar', 24, 'laki-laki', 'bujel', '2023-05-11 20:49:14', '2023-05-11 20:49:14'),
(4, 7, 'kuseno', 20, 'laki-laki', 'jambi', '2023-05-14 05:27:01', '2023-05-14 05:27:01'),
(5, 11, 'firdaus uye', 19, 'laki-laki', 'sukarame', '2023-01-20 12:42:46', '2023-01-20 12:42:46'),
(6, 12, 'faisal arwani', 24, 'laki-laki', 'mojo', '2023-01-21 09:52:57', '2023-01-21 09:52:57'),
(7, 13, 'fernanda putri', 20, 'perempuan', 'ploso', '2023-11-21 09:56:17', '2023-11-21 09:56:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `saldo`
--

CREATE TABLE `saldo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jumlah` double NOT NULL,
  `status` varchar(20) NOT NULL,
  `keterangan` text NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `jenis_saldo` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `saldo`
--

INSERT INTO `saldo` (`id`, `jumlah`, `status`, `keterangan`, `id_user`, `jenis_saldo`, `created_at`, `updated_at`) VALUES
(1, 20000, 'masuk', 'lunas', NULL, NULL, '2024-06-11 20:50:57', '2024-06-11 20:50:57'),
(4, 15000, 'keluar', 'amplop', 0, '0', '2024-06-11 21:16:13', '2024-06-11 21:16:13'),
(11, 2000, 'masuk', 'nemu', 0, '0', '2024-06-20 11:49:15', '2024-06-20 11:49:15'),
(12, 2000, 'keluar', 'sodaqoh', 0, '0', '2024-06-20 12:02:00', '2024-06-20 12:02:00'),
(15, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2023-12-27 08:20:30', '2023-12-27 08:20:30'),
(16, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-01-27 08:20:42', '2024-01-27 08:20:42'),
(17, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-02-27 08:20:51', '2024-02-27 08:20:51'),
(18, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-03-27 08:21:10', '2024-03-27 08:21:10'),
(19, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-04-27 08:21:19', '2024-04-27 08:21:19'),
(20, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-05-27 08:21:25', '2024-05-27 08:21:25'),
(21, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-06-27 08:21:32', '2024-06-27 08:21:32'),
(32, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2023-11-27 08:24:12', '2023-11-27 08:24:12'),
(33, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2023-12-27 08:24:27', '2023-12-27 08:24:27'),
(34, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-01-27 08:24:45', '2024-01-27 08:24:45'),
(35, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-02-27 08:29:39', '2024-02-27 08:29:39'),
(36, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-03-27 08:29:54', '2024-03-27 08:29:54'),
(37, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-04-27 08:30:01', '2024-04-27 08:30:01'),
(38, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-05-27 08:30:12', '2024-05-27 08:30:12'),
(39, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-06-27 08:30:35', '2024-06-27 08:30:35'),
(40, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-01-27 08:53:44', '2023-01-27 08:53:44'),
(41, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-02-27 08:53:55', '2023-02-27 08:53:55'),
(42, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-03-27 08:54:04', '2023-03-27 08:54:04'),
(43, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-04-27 08:54:21', '2023-04-27 08:54:21'),
(44, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-05-27 08:54:28', '2023-05-27 08:54:28'),
(45, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-06-27 08:54:29', '2023-06-27 08:54:29'),
(46, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-07-27 08:54:36', '2023-07-27 08:54:36'),
(47, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-08-27 08:54:43', '2023-08-27 08:54:43'),
(48, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-09-27 08:54:51', '2023-09-27 08:54:51'),
(49, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-10-27 08:54:58', '2023-10-27 08:54:58'),
(50, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-11-27 08:55:21', '2023-11-27 08:55:21'),
(51, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2023-12-27 08:55:36', '2023-12-27 08:55:36'),
(52, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-01-27 08:55:43', '2024-01-27 08:55:43'),
(53, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-02-27 08:55:49', '2024-02-27 08:55:49'),
(54, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-03-27 08:55:56', '2024-03-27 08:55:56'),
(55, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-04-27 08:56:07', '2024-04-27 08:56:07'),
(56, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-05-27 08:56:32', '2024-05-27 08:56:32'),
(57, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-06-27 08:56:39', '2024-06-27 08:56:39'),
(58, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-01-27 09:00:07', '2023-01-27 09:00:07'),
(59, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-02-27 09:00:17', '2023-02-27 09:00:17'),
(60, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-03-27 09:00:24', '2023-03-27 09:00:24'),
(61, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-04-27 09:00:31', '2023-04-27 09:00:31'),
(62, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-05-27 09:00:40', '2023-05-27 09:00:40'),
(63, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-06-27 09:00:46', '2023-06-27 09:00:46'),
(64, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-07-27 09:00:53', '2023-07-27 09:00:53'),
(65, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-08-27 09:01:00', '2023-08-27 09:01:00'),
(66, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-09-27 09:01:06', '2023-09-27 09:01:06'),
(67, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-10-27 09:01:12', '2023-10-27 09:01:12'),
(68, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-11-27 09:01:19', '2023-11-27 09:01:19'),
(69, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2023-12-27 09:01:25', '2023-12-27 09:01:25'),
(70, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-01-27 09:01:31', '2024-01-27 09:01:31'),
(71, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-02-27 09:01:42', '2024-02-27 09:01:42'),
(72, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-03-27 09:01:49', '2024-03-27 09:01:49'),
(73, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-04-27 09:01:55', '2024-04-27 09:01:55'),
(74, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-05-27 09:02:01', '2024-05-27 09:02:01'),
(75, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-06-27 09:02:07', '2024-06-27 09:02:07'),
(76, 250000, 'masuk', 'langsung', 12, 'simpanan sukarela', '2023-03-27 09:19:26', '2023-03-27 09:19:26'),
(77, 1500000, 'keluar', 'pencairan pinjaman', 12, 'beri pinjam', '2023-02-27 17:02:40', '2023-02-27 17:02:40'),
(78, 150000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2023-03-27 10:08:20', '2023-03-27 10:08:20'),
(79, 150000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2023-04-27 10:08:31', '2023-04-27 10:08:31'),
(80, 150000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2023-05-27 10:08:38', '2023-05-27 10:08:38'),
(81, 150000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2023-07-27 10:09:07', '2023-07-27 10:09:07'),
(82, 150000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2023-08-27 10:09:16', '2023-08-27 10:09:16'),
(83, 450000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2023-09-27 10:09:23', '2023-09-27 10:09:23'),
(85, 300000, 'masuk', 'bayar', 12, 'bayar tunggakan', '2024-02-27 10:09:39', '2024-02-27 10:09:39'),
(87, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-01-27 10:27:50', '2023-01-27 10:27:50'),
(88, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-02-27 10:27:57', '2023-02-27 10:27:57'),
(89, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-03-27 10:28:03', '2023-03-27 10:28:03'),
(90, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-04-27 10:28:10', '2023-04-27 10:28:10'),
(91, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-05-27 10:28:16', '2023-05-27 10:28:16'),
(92, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-06-27 10:28:23', '2023-06-27 10:28:23'),
(93, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-07-27 10:28:31', '2023-07-27 10:28:31'),
(94, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-08-27 10:28:37', '2023-08-27 10:28:37'),
(95, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-09-27 10:28:42', '2023-09-27 10:28:42'),
(96, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-10-27 10:28:49', '2023-10-27 10:28:49'),
(97, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-11-27 10:28:56', '2023-11-27 10:28:56'),
(98, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2023-12-27 10:29:03', '2023-12-27 10:29:03'),
(99, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-01-27 10:29:08', '2024-01-27 10:29:08'),
(100, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-02-27 10:29:14', '2024-02-27 10:29:14'),
(101, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-03-27 10:29:20', '2024-03-27 10:29:20'),
(102, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-04-27 10:29:26', '2024-04-27 10:29:26'),
(103, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-05-27 10:29:32', '2024-05-27 10:29:32'),
(104, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-06-27 10:29:42', '2024-06-27 10:29:42'),
(105, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-01-27 10:30:31', '2023-01-27 10:30:31'),
(106, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-02-27 10:30:37', '2023-02-27 10:30:37'),
(107, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-03-27 10:30:46', '2023-03-27 10:30:46'),
(108, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-04-27 10:30:52', '2023-04-27 10:30:52'),
(109, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-05-27 10:30:58', '2023-05-27 10:30:58'),
(110, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-06-27 10:31:05', '2023-06-27 10:31:05'),
(111, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-07-27 10:31:11', '2023-07-27 10:31:11'),
(112, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-08-27 10:31:16', '2023-08-27 10:31:16'),
(113, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-09-27 10:31:23', '2023-09-27 10:31:23'),
(114, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-10-27 10:31:30', '2023-10-27 10:31:30'),
(115, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-11-27 10:31:38', '2023-11-27 10:31:38'),
(116, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2023-12-27 10:32:01', '2023-12-27 10:32:01'),
(117, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-01-27 10:32:06', '2024-01-27 10:32:06'),
(118, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-02-27 10:32:12', '2024-02-27 10:32:12'),
(119, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-03-27 10:32:24', '2024-03-27 10:32:24'),
(120, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-04-27 10:32:29', '2024-04-27 10:32:29'),
(121, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-05-27 10:32:35', '2024-05-27 10:32:35'),
(122, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-06-27 10:32:41', '2024-06-27 10:32:41'),
(123, 300000, 'masuk', 'langsung', 11, 'simpanan sukarela', '2023-03-27 10:47:11', '2023-03-27 10:47:11'),
(124, 250000, 'masuk', 'langsung', 11, 'simpanan sukarela', '2024-01-27 10:47:22', '2024-01-27 10:47:22'),
(125, 2500000, 'keluar', 'pencairan pinjaman', 11, 'beri pinjam', '2023-04-27 17:48:42', '2023-04-27 17:48:42'),
(126, 250000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2023-05-27 10:52:54', '2023-05-27 10:52:54'),
(127, 250000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2023-06-27 10:53:07', '2023-06-27 10:53:07'),
(128, 250000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2023-07-27 10:53:24', '2023-07-27 10:53:24'),
(129, 250000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2023-08-27 10:53:34', '2023-08-27 10:53:34'),
(130, 250000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2023-09-27 10:53:45', '2023-09-27 10:53:45'),
(131, 250000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2023-10-27 10:53:55', '2023-10-27 10:53:55'),
(132, 500000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2024-02-27 10:54:04', '2024-02-27 10:54:04'),
(133, 500000, 'masuk', 'bayar', 11, 'bayar tunggakan', '2024-05-27 10:54:13', '2024-05-27 10:54:13'),
(134, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-05-27 10:59:12', '2023-05-27 10:59:12'),
(135, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-06-27 10:59:21', '2023-06-27 10:59:21'),
(136, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-07-27 10:59:28', '2023-07-27 10:59:28'),
(137, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-08-27 10:59:35', '2023-08-27 10:59:35'),
(138, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-09-27 10:59:41', '2023-09-27 10:59:41'),
(139, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-10-27 10:59:47', '2023-10-27 10:59:47'),
(140, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-11-27 10:59:53', '2023-11-27 10:59:53'),
(141, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2023-12-27 11:00:04', '2023-12-27 11:00:04'),
(142, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-01-27 11:00:09', '2024-01-27 11:00:09'),
(143, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-02-27 11:00:16', '2024-02-27 11:00:16'),
(144, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-03-27 11:00:24', '2024-03-27 11:00:24'),
(145, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-04-27 11:00:30', '2024-04-27 11:00:30'),
(146, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-05-27 11:00:36', '2024-05-27 11:00:36'),
(147, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-06-27 11:00:43', '2024-06-27 11:00:43'),
(149, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-05-27 11:01:32', '2023-05-27 11:01:32'),
(150, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-06-27 11:01:38', '2023-06-27 11:01:38'),
(151, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-07-27 11:01:45', '2023-07-27 11:01:45'),
(152, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-08-27 11:01:51', '2023-08-27 11:01:51'),
(153, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-09-27 11:01:57', '2023-09-27 11:01:57'),
(154, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-10-27 11:02:10', '2023-10-27 11:02:10'),
(155, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-11-27 11:02:16', '2023-11-27 11:02:16'),
(156, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2023-12-27 11:02:22', '2023-12-27 11:02:22'),
(157, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-01-27 11:02:28', '2024-01-27 11:02:28'),
(158, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-02-27 11:02:34', '2024-02-27 11:02:34'),
(159, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-03-27 11:02:45', '2024-03-27 11:02:45'),
(160, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-04-27 11:03:08', '2024-04-27 11:03:08'),
(161, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-05-27 11:03:15', '2024-05-27 11:03:15'),
(162, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-06-27 11:03:21', '2024-06-27 11:03:21'),
(163, 50000, 'masuk', 'langsung', 7, 'simpanan sukarela', '2023-08-27 11:09:53', '2023-08-27 11:09:53'),
(164, 1000000, 'keluar', 'pencairan pinjaman', 7, 'beri pinjam', '2023-06-27 18:11:47', '2023-06-27 18:11:47'),
(165, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2023-07-27 11:13:25', '2023-07-27 11:13:25'),
(166, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2023-08-27 11:13:45', '2023-08-27 11:13:45'),
(167, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2023-09-27 11:13:57', '2023-09-27 11:13:57'),
(168, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2023-10-27 11:14:11', '2023-10-27 11:14:11'),
(169, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2023-11-27 11:14:19', '2023-11-27 11:14:19'),
(170, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2023-12-27 11:14:27', '2023-12-27 11:14:27'),
(171, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2024-01-27 11:14:36', '2024-01-27 11:14:36'),
(172, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2024-02-27 11:14:52', '2024-02-27 11:14:52'),
(173, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2024-03-27 11:14:58', '2024-03-27 11:14:58'),
(174, 100000, 'masuk', 'bayar', 7, 'bayar tunggakan', '2024-04-27 11:15:00', '2024-04-27 11:15:00'),
(175, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-05-27 11:19:05', '2023-05-27 11:19:05'),
(176, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-06-27 11:19:12', '2023-06-27 11:19:12'),
(177, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-07-27 11:19:19', '2023-07-27 11:19:19'),
(178, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-08-27 11:19:28', '2023-08-27 11:19:28'),
(179, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-09-27 11:19:34', '2023-09-27 11:19:34'),
(180, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-10-27 11:19:40', '2023-10-27 11:19:40'),
(181, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-11-27 11:19:47', '2023-11-27 11:19:47'),
(182, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2023-12-27 11:19:53', '2023-12-27 11:19:53'),
(183, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-01-27 11:20:00', '2024-01-27 11:20:00'),
(184, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-02-27 11:20:08', '2024-02-27 11:20:08'),
(185, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-03-27 11:20:14', '2024-03-27 11:20:14'),
(186, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-04-27 11:20:21', '2024-04-27 11:20:21'),
(187, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-05-27 11:20:27', '2024-05-27 11:20:27'),
(188, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-06-27 11:20:33', '2024-06-27 11:20:33'),
(189, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-05-27 11:21:29', '2023-05-27 11:21:29'),
(190, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-06-27 11:21:34', '2023-06-27 11:21:34'),
(191, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-07-27 11:21:41', '2023-07-27 11:21:41'),
(192, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-08-27 11:21:46', '2023-08-27 11:21:46'),
(193, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-09-27 11:21:52', '2023-09-27 11:21:52'),
(194, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-10-27 11:21:58', '2023-10-27 11:21:58'),
(195, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-11-27 11:22:05', '2023-11-27 11:22:05'),
(196, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2023-12-27 11:22:12', '2023-12-27 11:22:12'),
(197, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-01-27 11:22:19', '2024-01-27 11:22:19'),
(198, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-02-27 11:22:25', '2024-02-27 11:22:25'),
(199, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-03-27 11:22:33', '2024-03-27 11:22:33'),
(200, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-04-27 11:22:39', '2024-04-27 11:22:39'),
(201, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-05-27 11:22:45', '2024-05-27 11:22:45'),
(202, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-06-27 11:22:51', '2024-06-27 11:22:51'),
(203, 200000, 'masuk', 'langsung', 8, 'simpanan sukarela', '2023-08-27 11:30:27', '2023-08-27 11:30:27'),
(204, 250000, 'masuk', 'langsung', 8, 'simpanan sukarela', '2023-12-27 11:30:41', '2023-12-27 11:30:41'),
(205, 2000000, 'keluar', 'pencairan pinjaman', 8, 'beri pinjam', '2023-05-27 18:50:53', '2023-05-27 18:50:53'),
(206, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-06-27 12:21:05', '2023-06-27 12:21:05'),
(207, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-07-27 12:21:16', '2023-07-27 12:21:16'),
(208, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-08-27 12:21:27', '2023-08-27 12:21:27'),
(209, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-09-27 12:21:37', '2023-09-27 12:21:37'),
(210, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-10-27 12:21:48', '2023-10-27 12:21:48'),
(211, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-11-27 12:21:58', '2023-11-27 12:21:58'),
(212, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2023-12-27 12:22:06', '2023-12-27 12:22:06'),
(213, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2024-01-27 12:22:13', '2024-01-27 12:22:13'),
(214, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2024-02-27 12:22:20', '2024-02-27 12:22:20'),
(215, 200000, 'masuk', 'bayar', 8, 'bayar tunggakan', '2024-03-27 12:22:27', '2024-03-27 12:22:27'),
(216, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2023-11-27 08:20:30', '2023-11-27 08:20:30'),
(217, 10000, 'masuk', 'langsung', 13, 'simpanan pokok', '2024-06-30 18:40:21', '2024-06-30 18:40:21'),
(218, 15000, 'masuk', 'langsung', 13, 'simpanan wajib', '2024-06-30 18:40:35', '2024-06-30 18:40:35'),
(219, 10000, 'masuk', 'langsung', 12, 'simpanan pokok', '2024-06-30 18:40:58', '2024-06-30 18:40:58'),
(220, 15000, 'masuk', 'langsung', 12, 'simpanan wajib', '2024-06-30 18:41:07', '2024-06-30 18:41:07'),
(221, 10000, 'masuk', 'langsung', 11, 'simpanan pokok', '2024-06-30 18:41:17', '2024-06-30 18:41:17'),
(222, 15000, 'masuk', 'langsung', 11, 'simpanan wajib', '2024-06-30 18:41:26', '2024-06-30 18:41:26'),
(223, 10000, 'masuk', 'langsung', 7, 'simpanan pokok', '2024-06-30 18:41:40', '2024-06-30 18:41:40'),
(224, 15000, 'masuk', 'langsung', 7, 'simpanan wajib', '2024-06-30 18:41:51', '2024-06-30 18:41:51'),
(225, 10000, 'masuk', 'langsung', 8, 'simpanan pokok', '2024-06-30 18:42:02', '2024-06-30 18:42:02'),
(226, 15000, 'masuk', 'langsung', 8, 'simpanan wajib', '2024-06-30 18:42:12', '2024-06-30 18:42:12'),
(228, 500000, 'keluar', 'pencairan pinjaman', 8, 'beri pinjam', '2024-07-11 23:40:47', '2024-07-11 23:40:47');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_kriteria`
--

CREATE TABLE `sub_kriteria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_kriteria` bigint(20) UNSIGNED NOT NULL,
  `keterangan` varchar(255) NOT NULL,
  `nilai` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sub_kriteria`
--

INSERT INTO `sub_kriteria` (`id`, `id_kriteria`, `keterangan`, `nilai`, `created_at`, `updated_at`) VALUES
(1, 2, '< 1 Juta', 4, '2024-04-22 07:53:58', '2024-04-22 07:53:58'),
(3, 2, '1 – 10 Juta', 3, '2024-04-24 00:09:28', '2024-04-24 00:09:28'),
(5, 4, 'diatas 2,5 juta', 3, '2024-04-24 00:11:11', '2024-07-21 08:21:32'),
(6, 4, 'diantara 1,5 sampai 2,5 juta', 2, '2024-06-12 21:28:30', '2024-06-26 17:11:18'),
(7, 4, 'dibawah 1,5 juta', 1, '2024-06-12 21:29:02', '2024-06-26 17:10:56'),
(8, 6, '1 atau 2 orang', 2, '2024-06-12 21:29:27', '2024-07-21 08:28:20'),
(9, 6, 'lebih dari 2 orang', 3, '2024-06-12 21:29:42', '2024-07-21 08:28:02'),
(10, 5, 'pendidikan', 2, '2024-06-12 21:30:06', '2024-06-26 17:06:26'),
(11, 5, 'usaha', 4, '2024-06-12 21:30:27', '2024-06-26 17:06:14'),
(12, 5, 'kebutuhan primer', 3, '2024-06-12 21:30:53', '2024-06-26 17:07:02'),
(15, 5, 'umroh / haji', 1, '2024-06-26 17:07:30', '2024-06-26 17:07:30'),
(16, 6, 'tidak ada', 1, '2024-06-26 17:10:27', '2024-06-26 17:10:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, 'rizal_f', 'kurop.99@gmail.com', 'admin', NULL, '$2y$12$dABLzwSzQYea2ZVF3qP7teLkembUQiZyBUeZjr7OfjDoVxeuNKBm2', NULL, '2024-03-29 16:46:19', '2024-04-05 18:12:20'),
(7, 'kuseno', 'kuseno@gmail.com', 'anggota', NULL, '$2y$12$iw4lFLq1xJG85fzrKoNpAO7TRWLMCXiEZYzalB7R50to84u1jEj/.', NULL, '2024-04-11 19:25:19', '2024-04-11 19:25:19'),
(8, 'revanda', 'agoy@gmail.com', 'anggota', NULL, '$2y$12$4Qr1hTPLPSPSZi2I7sZevOb08GA8OHM7ii8PNj5E1RCPJWWJmeVDm', NULL, '2024-04-12 02:31:31', '2024-04-12 02:31:31'),
(9, 'rizal', 'rizal@gmail.com', 'admin', NULL, '$2y$12$C2Y1Tr5eTUOnygGhnIJWWOol6HzC5RM7jP9xOIoDcSI17CrGOTq1m', NULL, '2024-04-13 00:27:48', '2024-04-13 00:27:48'),
(10, 'gufron', 'gufron@gmail.com', 'koordinator', NULL, '$2y$12$7IGomc4g/2Wo4iOBrJRFcuoiubophSXRDskdLajT1wMXJvdkNxWaq', NULL, '2024-06-11 03:42:13', '2024-06-11 03:42:13'),
(11, 'firdaus', 'firdaus@gmail.com', 'anggota', NULL, '$2y$12$PYlDJVEs.wHZU9ap24pTX.T55ZgKfu6mNhYrQ3MRM3KC6/uYH8Ny.', NULL, '2024-06-20 12:26:42', '2024-06-20 12:26:42'),
(12, 'faisal', 'deden@gmail.com', 'anggota', NULL, '$2y$12$OUE.vxQsJUPU8Tq4O/Zd7eY1EjLxP3WTg85wsGAApZTSabj9kSCTy', NULL, '2024-06-21 09:51:51', '2024-06-21 09:51:51'),
(13, 'fernanda', 'nanda@gmail.com', 'anggota', NULL, '$2y$12$B1jOrGpmRM7ey3ppWvhwkewQtn0KW3g1JgD1FXipno7vTKcDNcTha', NULL, '2024-06-21 09:53:58', '2024-06-21 09:53:58');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cair_dana`
--
ALTER TABLE `cair_dana`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `nilai`
--
ALTER TABLE `nilai`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `pinjam`
--
ALTER TABLE `pinjam`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `saldo`
--
ALTER TABLE `saldo`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_kriteria`
--
ALTER TABLE `sub_kriteria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_kriteria` (`id_kriteria`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cair_dana`
--
ALTER TABLE `cair_dana`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `nilai`
--
ALTER TABLE `nilai`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=187;

--
-- AUTO_INCREMENT untuk tabel `pinjam`
--
ALTER TABLE `pinjam`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `profile`
--
ALTER TABLE `profile`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `saldo`
--
ALTER TABLE `saldo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=229;

--
-- AUTO_INCREMENT untuk tabel `sub_kriteria`
--
ALTER TABLE `sub_kriteria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
