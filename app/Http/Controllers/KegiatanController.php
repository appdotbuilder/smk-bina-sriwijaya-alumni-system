<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KegiatanController extends Controller
{
    /**
     * Display a listing of activities.
     */
    public function index()
    {
        $kegiatan = Kegiatan::withCount('alumni')->latest('tanggal')->paginate(10);

        return Inertia::render('kegiatan/index', [
            'kegiatan' => $kegiatan
        ]);
    }

    /**
     * Show the form for creating a new activity.
     */
    public function create()
    {
        // Only admin can create activities
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('kegiatan/create');
    }

    /**
     * Store a newly created activity.
     */
    public function store(Request $request)
    {
        // Only admin can create activities
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $kegiatan = Kegiatan::create($validated);

        return redirect()->route('kegiatan.show', $kegiatan)
            ->with('success', 'Kegiatan berhasil dibuat.');
    }

    /**
     * Display the specified activity.
     */
    public function show(Kegiatan $kegiatan)
    {
        $kegiatan->load('alumni.user');

        // Check if current user is registered for this activity
        $isRegistered = false;
        if (auth()->check() && auth()->user()->role === 'alumni') {
            $alumni = auth()->user()->alumni;
            if ($alumni) {
                $isRegistered = $kegiatan->alumni()
                    ->where('alumni.id_alumni', $alumni->getKey())
                    ->exists();
            }
        }

        return Inertia::render('kegiatan/show', [
            'kegiatan' => $kegiatan,
            'isRegistered' => $isRegistered
        ]);
    }

    /**
     * Show the form for editing the specified activity.
     */
    public function edit(Kegiatan $kegiatan)
    {
        // Only admin can edit activities
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('kegiatan/edit', [
            'kegiatan' => $kegiatan
        ]);
    }

    /**
     * Update the specified activity.
     */
    public function update(Request $request, Kegiatan $kegiatan)
    {
        // Only admin can update activities
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'nama_kegiatan' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $kegiatan->update($validated);

        return redirect()->route('kegiatan.show', $kegiatan)
            ->with('success', 'Kegiatan berhasil diperbarui.');
    }

    /**
     * Remove the specified activity from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        // Only admin can delete activities
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $kegiatan->delete();

        return redirect()->route('kegiatan.index')
            ->with('success', 'Kegiatan berhasil dihapus.');
    }
}