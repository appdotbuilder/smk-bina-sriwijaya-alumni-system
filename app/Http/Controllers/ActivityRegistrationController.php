<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\Request;

class ActivityRegistrationController extends Controller
{
    /**
     * Register alumni for an activity.
     */
    public function store(Request $request, Kegiatan $kegiatan)
    {
        // Only alumni can register for activities
        if (auth()->user()->role !== 'alumni') {
            abort(403);
        }

        $alumni = auth()->user()->alumni;
        
        if (!$alumni) {
            return redirect()->back()
                ->with('error', 'Profil alumni tidak ditemukan.');
        }

        // Check if already registered
        if ($kegiatan->alumni()->where('alumni.id_alumni', $alumni->getKey())->exists()) {
            return redirect()->back()
                ->with('error', 'Anda sudah terdaftar untuk kegiatan ini.');
        }

        $kegiatan->alumni()->attach($alumni->getKey());

        return redirect()->back()
            ->with('success', 'Berhasil mendaftar untuk kegiatan ini.');
    }

    /**
     * Unregister alumni from an activity.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        // Only alumni can unregister from activities
        if (auth()->user()->role !== 'alumni') {
            abort(403);
        }

        $alumni = auth()->user()->alumni;
        
        if (!$alumni) {
            return redirect()->back()
                ->with('error', 'Profil alumni tidak ditemukan.');
        }

        $kegiatan->alumni()->detach($alumni->getKey());

        return redirect()->back()
            ->with('success', 'Berhasil membatalkan pendaftaran kegiatan ini.');
    }
}