import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

interface Props {
    alumni: {
        id_alumni: number;
        nama: string;
        angkatan: string;
        jurusan: string;
        email: string;
        no_hp?: string;
        pekerjaan?: string;
        alamat?: string;
    } | null;
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
        alumni_count: number;
    }>;
    myActivities: Array<{
        id_kegiatan: number;
        nama_kegiatan: string;
        tanggal: string;
        deskripsi: string;
    }>;
    [key: string]: unknown;
}

export default function AlumniDashboard({
    alumni,
    recentNews,
    recentJobs,
    upcomingActivities,
    myActivities
}: Props) {
    return (
        <AppShell>
            <Head title="Dashboard Alumni" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            👋 Selamat datang, {alumni?.nama || 'Alumni'}!
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Jelajahi informasi terbaru dan kegiatan untuk alumni SMK Bina Sriwijaya
                        </p>
                    </div>
                </div>

                {/* Profile Summary */}
                {alumni && (
                    <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
                        <CardHeader>
                            <CardTitle className="text-blue-800">🎓 Profil Alumni</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nama</p>
                                    <p className="font-semibold">{alumni.nama}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Angkatan</p>
                                    <p className="font-semibold">{alumni.angkatan}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Jurusan</p>
                                    <p className="font-semibold">{alumni.jurusan}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Pekerjaan</p>
                                    <p className="font-semibold">{alumni.pekerjaan || 'Belum diisi'}</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-blue-200">
                                <Link href={`/alumni/${alumni.id_alumni}/edit`}>
                                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                                        ✏️ Edit Profil
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}

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
                                        <Link key={news.id_berita} href={`/berita/${news.id_berita}`}>
                                            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
                                        </Link>
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
                            <CardTitle>💼 Lowongan Kerja Terbaru</CardTitle>
                            <Link href="/lowongan">
                                <Button variant="outline" size="sm">Lihat Semua</Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentJobs.length > 0 ? (
                                    recentJobs.map((job) => (
                                        <Link key={job.id_lowongan} href={`/lowongan/${job.id_lowongan}`}>
                                            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
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
                                        </Link>
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
                                        <Link key={activity.id_kegiatan} href={`/kegiatan/${activity.id_kegiatan}`}>
                                            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm text-gray-900 truncate">
                                                        {activity.nama_kegiatan}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(activity.tanggal).toLocaleDateString('id-ID')} • {activity.alumni_count} peserta
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Belum ada kegiatan mendatang</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* My Registered Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle>📅 Kegiatan Saya</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {myActivities.length > 0 ? (
                                    myActivities.map((activity) => (
                                        <Link key={activity.id_kegiatan} href={`/kegiatan/${activity.id_kegiatan}`}>
                                            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-sm text-gray-900 truncate">
                                                        {activity.nama_kegiatan}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(activity.tanggal).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">Belum mendaftar kegiatan apapun</p>
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
                            <Link href="/alumni">
                                <Button variant="outline" className="w-full">
                                    🔍 Cari Alumni
                                </Button>
                            </Link>
                            <Link href="/berita">
                                <Button variant="outline" className="w-full">
                                    📰 Baca Berita
                                </Button>
                            </Link>
                            <Link href="/lowongan">
                                <Button variant="outline" className="w-full">
                                    💼 Cari Kerja
                                </Button>
                            </Link>
                            <Link href="/kegiatan">
                                <Button variant="outline" className="w-full">
                                    🎉 Ikut Kegiatan
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}