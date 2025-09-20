import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

interface Kegiatan {
    id_kegiatan: number;
    nama_kegiatan: string;
    deskripsi: string;
    tanggal: string;
    alumni_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    kegiatan: {
        data: Kegiatan[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function KegiatanIndex({ kegiatan }: Props) {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
    const isAdmin = auth?.user?.role === 'admin';

    const isUpcoming = (tanggal: string) => {
        return new Date(tanggal) >= new Date();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title="Kegiatan Alumni" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        🎉 Kegiatan Alumni
                    </h1>
                    {isAdmin && (
                        <Link href="/kegiatan/create">
                            <Button>
                                ➕ Buat Kegiatan Baru
                            </Button>
                        </Link>
                    )}
                </div>

                {kegiatan.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {kegiatan.data.map((activity) => (
                            <Card key={activity.id_kegiatan} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <CardTitle className="text-lg text-purple-900">
                                                    <Link href={`/kegiatan/${activity.id_kegiatan}`} className="hover:text-purple-700">
                                                        {activity.nama_kegiatan}
                                                    </Link>
                                                </CardTitle>
                                                {isUpcoming(activity.tanggal) ? (
                                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                                        📅 Mendatang
                                                    </span>
                                                ) : (
                                                    <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                                                        ✅ Selesai
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-purple-700 font-semibold">
                                                📅 {formatDate(activity.tanggal)}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                👥 {activity.alumni_count} peserta terdaftar
                                            </p>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex space-x-2">
                                                <Link href={`/kegiatan/${activity.id_kegiatan}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 line-clamp-3 mb-4">
                                        {activity.deskripsi.substring(0, 150)}...
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm">
                                            {isUpcoming(activity.tanggal) ? (
                                                <span className="text-green-600 font-semibold">
                                                    🔔 Bisa mendaftar
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">
                                                    📜 Kegiatan selesai
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href={`/kegiatan/${activity.id_kegiatan}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ Lihat Detail
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">🎉</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum ada kegiatan
                            </h3>
                            <p className="text-gray-600">
                                Kegiatan alumni akan ditampilkan di sini
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {kegiatan.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: kegiatan.last_page }, (_, i) => i + 1).map((page) => (
                            <Link key={page} href={`/kegiatan?page=${page}`}>
                                <Button
                                    variant={page === kegiatan.current_page ? 'default' : 'outline'}
                                    size="sm"
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Informational Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        <CardContent className="text-center py-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                💡 Tips Mengikuti Kegiatan
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Daftarlah secepatnya untuk kegiatan yang menarik minat Anda. 
                                Slot peserta biasanya terbatas!
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                        <CardContent className="text-center py-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                🤝 Networking
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Manfaatkan kegiatan alumni untuk membangun jaringan profesional 
                                dan bertukar pengalaman dengan sesama alumni.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}