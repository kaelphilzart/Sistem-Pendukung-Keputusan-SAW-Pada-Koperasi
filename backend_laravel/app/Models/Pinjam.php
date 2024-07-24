<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pinjam extends Model
{
    use HasFactory;
    protected $table = 'pinjam';
    protected $primaryKey = 'id';
    protected $fillable = ['id_user', 'id_korwil', 'jumlah_pinjam', 'kriteria','status'];
    protected $casts = [
        'kriteria' => 'array',
    ];
}
