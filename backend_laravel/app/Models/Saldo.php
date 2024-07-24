<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saldo extends Model
{
    use HasFactory;
    protected $table = 'saldo';
    protected $primaryKey = 'id';
    protected $fillable = ['jumlah', 'status','keterangan','id_user','jenis_saldo'];
}
