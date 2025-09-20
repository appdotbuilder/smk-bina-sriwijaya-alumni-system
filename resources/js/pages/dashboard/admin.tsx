import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
    stats: {
        total_alumni: number;
        active_alumni: number;
        pending_alumni: number;
        total_news: number;
        total_jobs: number;
        total_activities: number;
        upcoming_activities: number;
    };
    recentNews: Array<{
        id_berita: number;
        judul: string;
        tanggal: string;
        penulis: string;
    }>;
    recentJobs: Array<{
        id_lowongan: number;
        judul: string;
        perusahaan: string;
        tanggal_post: string;
    }>;
    upcomingActivities: Array<{
        id_kegiatan: number;
        nama_kegiatan: string;
        tanggal: string;
    }>;
    pendingAlumni: Array<{
        id: number;
        name: string;
        email: string;
        alumni?: {
            nama: string;
            angkatan: string;
            jurusan: string;
        };
    }>;
    alumniByYear: Array<{
        angkatan: string;
        count: number;
    }>;
    [key: string]: unknown;
}

export default function AdminDashboard({
    stats,
    recentNews,
    recentJobs,
    upcomingActivities,
    pendingAlumni
}: Props) {
    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        🎛️ Dashboard Admin
                    </h1>
                    <div className="text-sm text-gray-500">
                        SMK Bina Sriwijaya Alumni System
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Alumni</CardTitle>
                            <span className="text-2xl">👥</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.total_alumni}</div>
                            <p className="text-xs text-muted-foreground">Alumni terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Alumni Aktif</CardTitle>
                            <span className="text-2xl">✅</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active_alumni}</div>
                            <p className="text-xs text-muted-foreground">Status aktif</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                            <span className="text-2xl">⏳</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending_alumni}</div>
                            <p className="text-xs text-muted-foreground">Menunggu verifikasi</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kegiatan Mendatang</CardTitle>
                            <span className="text-2xl">🎉</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">{stats.upcoming_activities}</div>
                            <p className="text-xs text-muted-foreground">Dari {stats.total_activities} total</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent News */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>📰 Berita Terbaru</CardTitle>
                            <Link href="/berita">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentNews.length > 0 ? (
                                    recentNews.map((news) => (
                                        <div key={news.id_berita} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-900 truncate">
                                                    {news.judul}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {news.penulis} • {new Date(news.tanggal).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Belum ada berita</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Job Postings */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>💼 Lowongan Terbaru</CardTitle>
                            <Link href="/lowongan">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentJobs.length > 0 ? (
                                    recentJobs.map((job) => (
                                        <div key={job.id_lowongan} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-900 truncate">
                                                    {job.judul}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {job.perusahaan} • {new Date(job.tanggal_post).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Belum ada lowongan</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Activities */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>🎉 Kegiatan Mendatang</CardTitle>
                            <Link href="/kegiatan">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingActivities.length > 0 ? (
                                    upcomingActivities.map((activity) => (
                                        <div key={activity.id_kegiatan} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-900 truncate">
                                                    {activity.nama_kegiatan}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(activity.tanggal).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Belum ada kegiatan</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Alumni */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>⏳ Alumni Pending</CardTitle>
                            <Link href="/alumni">
                                <Button variant="outline" size="sm">Kelola</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {pendingAlumni.length > 0 ? (
                                    pendingAlumni.map((user) => (
                                        <div key={user.id} className="flex items-start space-x-3">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm text-gray-900 truncate">
                                                    {user.alumni?.nama || user.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.alumni?.angkatan} • {user.alumni?.jurusan}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Tidak ada alumni pending</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/berita/create">
                                <Button variant="outline" className="w-full">
                                    📰 Buat Berita
                                </Button>
                            </Link>
                            <Link href="/lowongan/create">
                                <Button variant="outline" className="w-full">
                                    💼 Tambah Lowongan
                                </Button>
                            </Link>
                            <Link href="/kegiatan/create">
                                <Button variant="outline" className="w-full">
                                    🎉 Buat Kegiatan
                                </Button>
                            </Link>
                            <Link href="/alumni">
                                <Button variant="outline" className="w-full">
                                    👥 Kelola Alumni
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}