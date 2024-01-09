<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cashier extends Model
{
    use HasFactory;
    protected $table = 'cashiers';
    protected $fillable = [
        'cashier_id',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'address',
        'remarks'
    ];

}
