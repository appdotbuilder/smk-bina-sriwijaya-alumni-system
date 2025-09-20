<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Alumni
 *
 * @property int $id_alumni
 * @property int $id_user
 * @property string $nama
 * @property string $angkatan
 * @property string $jurusan
 * @property string $email
 * @property string|null $no_hp
 * @property string|null $pekerjaan
 * @property string|null $alamat
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Kegiatan> $kegiatan
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni query()
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereAlamat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereAngkatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereIdAlumni($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereIdUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereJurusan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereNoHp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni wherePekerjaan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alumni whereUpdatedAt($value)
 * @method static \Database\Factories\AlumniFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Alumni extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'alumni';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id_alumni';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id_user',
        'nama',
        'angkatan',
        'jurusan',
        'email',
        'no_hp',
        'pekerjaan',
        'alamat',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the alumni profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * The activities that the alumni participates in.
     */
    public function kegiatan(): BelongsToMany
    {
        return $this->belongsToMany(
            Kegiatan::class,
            'alumni_kegiatan',
            'id_alumni',
            'id_kegiatan'
        );
    }

    /**
     * Scope a query to only include alumni from specific graduation year.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $angkatan
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByAngkatan($query, $angkatan)
    {
        return $query->where('angkatan', $angkatan);
    }

    /**
     * Scope a query to only include alumni from specific major.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $jurusan
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByJurusan($query, $jurusan)
    {
        return $query->where('jurusan', $jurusan);
    }
}