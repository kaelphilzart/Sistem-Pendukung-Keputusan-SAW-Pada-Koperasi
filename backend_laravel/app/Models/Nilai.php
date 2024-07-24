<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    use HasFactory;
    protected $table = 'nilai';
    protected $primaryKey = 'id';
    protected $fillable = ['id_kriteria', 'nilai_bobot'];

    public function kriteria()
    {
        return $this->belongsTo(Kriteria::class, 'id', 'id_kriteria');
    }
}
