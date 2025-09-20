<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlumniController extends Controller
{
    /**
     * Display a listing of alumni.
     */
    public function index(Request $request)
    {
        $query = Alumni::with('user');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                  ->orWhere('angkatan', 'like', "%{$search}%")
                  ->orWhere('jurusan', 'like', "%{$search}%");
            });
        }

        // Filter by graduation year
        if ($request->filled('angkatan')) {
            $query->byAngkatan($request->get('angkatan'));
        }

        // Filter by major
        if ($request->filled('jurusan')) {
            $query->byJurusan($request->get('jurusan'));
        }

        $alumni = $query->latest()->paginate(12);

        // Get unique graduation years and majors for filters
        $angkatanList = Alumni::select('angkatan')
            ->distinct()
            ->orderBy('angkatan', 'desc')
            ->pluck('angkatan');

        $jurusanList = Alumni::select('jurusan')
            ->distinct()
            ->orderBy('jurusan')
            ->pluck('jurusan');

        return Inertia::render('alumni/index', [
            'alumni' => $alumni,
            'filters' => [
                'search' => $request->get('search'),
                'angkatan' => $request->get('angkatan'),
                'jurusan' => $request->get('jurusan'),
            ],
            'angkatanList' => $angkatanList,
            'jurusanList' => $jurusanList,
        ]);
    }

    /**
     * Display the specified alumni.
     */
    public function show(Alumni $alumni)
    {
        $alumni->load('user', 'kegiatan');

        return Inertia::render('alumni/show', [
            'alumni' => $alumni
        ]);
    }

    /**
     * Show the form for editing the alumni profile.
     */
    public function edit(Alumni $alumni)
    {
        // Ensure user can only edit their own profile
        if (auth()->user()->role === 'alumni' && auth()->user()->id !== $alumni->id_user) {
            abort(403);
        }

        return Inertia::render('alumni/edit', [
            'alumni' => $alumni
        ]);
    }

    /**
     * Update the specified alumni profile.
     */
    public function update(Request $request, Alumni $alumni)
    {
        // Ensure user can only update their own profile
        if (auth()->user()->role === 'alumni' && auth()->user()->id !== $alumni->id_user) {
            abort(403);
        }

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'angkatan' => 'required|string|max:4',
            'jurusan' => 'required|string|max:255',
            'email' => 'required|email|unique:alumni,email,' . $alumni->id_alumni . ',id_alumni',
            'no_hp' => 'nullable|string|max:20',
            'pekerjaan' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
        ]);

        $alumni->update($validated);

        // Also update the user's email if changed
        if ($alumni->email !== $alumni->user->email) {
            $alumni->user->update(['email' => $validated['email']]);
        }

        return redirect()->route('alumni.show', $alumni)
            ->with('success', 'Profil alumni berhasil diperbarui.');
    }

    /**
     * Remove the specified alumni from storage (Admin only).
     */
    public function destroy(Alumni $alumni)
    {
        // Only admin can delete alumni
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $alumni->user->delete(); // This will cascade delete the alumni record
        
        return redirect()->route('admin.alumni')
            ->with('success', 'Alumni berhasil dihapus.');
    }
}