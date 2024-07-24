<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InformasiCair extends Model
{
    use HasFactory;
    protected $table = 'informasi_cair';
    protected $primaryKey = 'id';
    protected $fillable = ['id_user', 'pengajuan','cair_dana','id_pinjam'];
}
