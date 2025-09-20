<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Lowongan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LowonganController extends Controller
{
    /**
     * Display a listing of job postings.
     */
    public function index()
    {
        $lowongan = Lowongan::latest('tanggal_post')->paginate(10);

        return Inertia::render('lowongan/index', [
            'lowongan' => $lowongan
        ]);
    }

    /**
     * Show the form for creating a new job posting.
     */
    public function create()
    {
        // Only admin can create job postings
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('lowongan/create');
    }

    /**
     * Store a newly created job posting.
     */
    public function store(Request $request)
    {
        // Only admin can create job postings
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'perusahaan' => 'required|string|max:255',
            'tanggal_post' => 'required|date',
        ]);

        $lowongan = Lowongan::create($validated);

        return redirect()->route('lowongan.show', $lowongan)
            ->with('success', 'Lowongan pekerjaan berhasil dibuat.');
    }

    /**
     * Display the specified job posting.
     */
    public function show(Lowongan $lowongan)
    {
        return Inertia::render('lowongan/show', [
            'lowongan' => $lowongan
        ]);
    }

    /**
     * Show the form for editing the specified job posting.
     */
    public function edit(Lowongan $lowongan)
    {
        // Only admin can edit job postings
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('lowongan/edit', [
            'lowongan' => $lowongan
        ]);
    }

    /**
     * Update the specified job posting.
     */
    public function update(Request $request, Lowongan $lowongan)
    {
        // Only admin can update job postings
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'perusahaan' => 'required|string|max:255',
            'tanggal_post' => 'required|date',
        ]);

        $lowongan->update($validated);

        return redirect()->route('lowongan.show', $lowongan)
            ->with('success', 'Lowongan pekerjaan berhasil diperbarui.');
    }

    /**
     * Remove the specified job posting from storage.
     */
    public function destroy(Lowongan $lowongan)
    {
        // Only admin can delete job postings
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $lowongan->delete();

        return redirect()->route('lowongan.index')
            ->with('success', 'Lowongan pekerjaan berhasil dihapus.');
    }
}