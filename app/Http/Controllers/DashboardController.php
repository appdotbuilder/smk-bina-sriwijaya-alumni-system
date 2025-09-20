<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use App\Models\Berita;
use App\Models\Kegiatan;
use App\Models\Lowongan;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->role === 'admin') {
            $stats = [
                'total_alumni' => Alumni::count(),
                'active_alumni' => User::where('role', 'alumni')->where('status', 'active')->count(),
                'pending_alumni' => User::where('role', 'alumni')->where('status', 'pending')->count(),
                'total_news' => Berita::count(),
                'total_jobs' => Lowongan::count(),
                'total_activities' => Kegiatan::count(),
                'upcoming_activities' => Kegiatan::where('tanggal', '>=', now())->count(),
            ];

            // Recent data for admin overview
            $recentNews = Berita::latest('tanggal')->limit(5)->get();
            $recentJobs = Lowongan::latest('tanggal_post')->limit(5)->get();
            $upcomingActivities = Kegiatan::where('tanggal', '>=', now())->latest('tanggal')->limit(5)->get();
            $pendingAlumni = User::where('role', 'alumni')
                ->where('status', 'pending')
                ->with('alumni')
                ->latest()
                ->limit(5)
                ->get();

            return Inertia::render('dashboard/admin', [
                'stats' => $stats,
                'recentNews' => $recentNews,
                'recentJobs' => $recentJobs,
                'upcomingActivities' => $upcomingActivities,
                'pendingAlumni' => $pendingAlumni,
            ]);
        } else {
            $alumni = $user->alumni;

            // Get recent content
            $recentNews = Berita::latest('tanggal')->limit(5)->get();
            $recentJobs = Lowongan::latest('tanggal_post')->limit(5)->get();
            $upcomingActivities = Kegiatan::where('tanggal', '>=', now())->withCount('alumni')->limit(5)->get();

            // Get alumni's registered activities
            $myActivities = collect();
            if ($alumni) {
                $myActivities = Kegiatan::whereHas('alumni', function ($query) use ($alumni) {
                    $query->where('alumni.id_alumni', $alumni->getKey());
                })
                ->where('tanggal', '>=', now())
                ->latest('tanggal')
                ->limit(5)
                ->get();
            }

            return Inertia::render('dashboard/alumni', [
                'alumni' => $alumni,
                'recentNews' => $recentNews,
                'recentJobs' => $recentJobs,
                'upcomingActivities' => $upcomingActivities,
                'myActivities' => $myActivities,
            ]);
        }
    }
}