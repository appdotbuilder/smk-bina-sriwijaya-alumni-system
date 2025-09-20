<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BeritaController extends Controller
{
    /**
     * Display a listing of news.
     */
    public function index()
    {
        $berita = Berita::latest('tanggal')->paginate(10);

        return Inertia::render('berita/index', [
            'berita' => $berita
        ]);
    }

    /**
     * Show the form for creating a new news article.
     */
    public function create()
    {
        // Only admin can create news
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('berita/create');
    }

    /**
     * Store a newly created news article.
     */
    public function store(Request $request)
    {
        // Only admin can create news
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $validated['penulis'] = auth()->user()->name;

        $berita = Berita::create($validated);

        return redirect()->route('berita.show', $berita)
            ->with('success', 'Berita berhasil dibuat.');
    }

    /**
     * Display the specified news article.
     */
    public function show(Berita $berita)
    {
        return Inertia::render('berita/show', [
            'berita' => $berita
        ]);
    }

    /**
     * Show the form for editing the specified news article.
     */
    public function edit(Berita $berita)
    {
        // Only admin can edit news
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('berita/edit', [
            'berita' => $berita
        ]);
    }

    /**
     * Update the specified news article.
     */
    public function update(Request $request, Berita $berita)
    {
        // Only admin can update news
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'tanggal' => 'required|date',
        ]);

        $berita->update($validated);

        return redirect()->route('berita.show', $berita)
            ->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * Remove the specified news article from storage.
     */
    public function destroy(Berita $berita)
    {
        // Only admin can delete news
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        $berita->delete();

        return redirect()->route('berita.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}