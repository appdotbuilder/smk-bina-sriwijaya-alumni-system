<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Kegiatan
 *
 * @property int $id_kegiatan
 * @property string $nama_kegiatan
 * @property string $deskripsi
 * @property \Illuminate\Support\Carbon $tanggal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Alumni> $alumni
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan query()
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan whereDeskripsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan whereIdKegiatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan whereNamaKegiatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan whereTanggal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Kegiatan whereUpdatedAt($value)
 * @method static \Database\Factories\KegiatanFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Kegiatan extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kegiatan';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id_kegiatan';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_kegiatan',
        'deskripsi',
        'tanggal',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The alumni that participate in this activity.
     */
    public function alumni(): BelongsToMany
    {
        return $this->belongsToMany(
            Alumni::class,
            'alumni_kegiatan',
            'id_kegiatan',
            'id_alumni'
        );
    }

    /**
     * Scope a query to only include upcoming activities.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUpcoming($query)
    {
        return $query->where('tanggal', '>=', now());
    }
}