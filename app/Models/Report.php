<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama',
        'nik',
        'laporan',
        'bukti_path',
        'bidang',
        'status',
        'catatan_admin',
    ];

    protected $casts = [
        'bidang' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getBidangOptions(): array
    {
        return [
            'keuangan' => 'Keuangan Daerah (APBD, Pajak, Retribusi)',
            'perdagangan' => 'Perindustrian dan Perdagangan',
            'koperasi' => 'Koperasi dan UMKM',
            'energi' => 'Energi dan Sumber Daya Mineral',
            'pariwisata' => 'Pariwisata dan Ekonomi Kreatif',
        ];
    }

    public function getBidangLabelsAttribute(): array
    {
        $options = self::getBidangOptions();
        return array_map(fn($key) => $options[$key] ?? $key, $this->bidang ?? []);
    }
}
