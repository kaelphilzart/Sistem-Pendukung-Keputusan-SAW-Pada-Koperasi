<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubKriteria extends Model
{
    use HasFactory;
    protected $table = 'sub_kriteria';
    protected $primaryKey = 'id';
    protected $fillable = ['id_kriteria', 'keterangan', 'nilai'];

    public function kriteria()
    {
        return $this->belongsTo(Kriteria::class, 'id', 'id_kriteria');
    }
}
