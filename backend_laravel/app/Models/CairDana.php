<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CairDana extends Model
{
    use HasFactory;
    protected $table = 'cair_dana';
    protected $primaryKey = 'id';
    protected $fillable = ['id_user', 'id_korwil', 'ajuan_dana', 'dana_cair'];
}
