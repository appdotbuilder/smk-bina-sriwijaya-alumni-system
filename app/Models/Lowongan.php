<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Lowongan
 *
 * @property int $id_lowongan
 * @property string $judul
 * @property string $deskripsi
 * @property string $perusahaan
 * @property \Illuminate\Support\Carbon $tanggal_post
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan query()
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan whereIdLowongan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan whereJudul($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan wherePerusahaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan whereTanggalPost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Lowongan whereUpdatedAt($value)
 * @method static \Database\Factories\LowonganFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Lowongan extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lowongan';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id_lowongan';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'judul',
        'deskripsi',
        'perusahaan',
        'tanggal_post',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_post' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include recent job postings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  int  $days
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRecent($query, $days = 30)
    {
        return $query->where('tanggal_post', '>=', now()->subDays($days));
    }
}