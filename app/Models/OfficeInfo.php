<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficeInfo extends Model
{
    use HasFactory;

    protected $table = 'office_info';

    protected $fillable = [
        'office_name',
        'address',
        'phone',
        'email',
        'working_hours',
        'maps_embed',
    ];
}
