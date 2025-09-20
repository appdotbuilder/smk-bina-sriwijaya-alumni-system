<?php

use App\Http\Controllers\ActivityRegistrationController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LowonganController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Alumni routes
    Route::resource('alumni', AlumniController::class)->except(['create', 'store']);
    
    // News routes
    Route::resource('berita', BeritaController::class);
    
    // Job posting routes
    Route::resource('lowongan', LowonganController::class);
    
    // Activity routes
    Route::resource('kegiatan', KegiatanController::class);
    Route::post('kegiatan/{kegiatan}/register', [ActivityRegistrationController::class, 'store'])->name('kegiatan.register');
    Route::delete('kegiatan/{kegiatan}/register', [ActivityRegistrationController::class, 'destroy'])->name('kegiatan.unregister');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
