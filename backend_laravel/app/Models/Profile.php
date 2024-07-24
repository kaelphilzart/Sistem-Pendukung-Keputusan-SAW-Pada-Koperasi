<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $table = 'profile';
    protected $primaryKey = 'id';
    protected $fillable = ['id_user', 'nama_lengkap', 'jenis_kelamin','umur','alamat'];

    public function user()
    {
        // Relasi belongsTo dari Profile ke User
        return $this->belongsTo(User::class, 'id_user');
    }
}
