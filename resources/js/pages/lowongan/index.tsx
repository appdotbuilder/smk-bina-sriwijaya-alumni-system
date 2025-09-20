import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

interface Lowongan {
    id_lowongan: number;
    judul: string;
    deskripsi: string;
    perusahaan: string;
    tanggal_post: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    lowongan: {
        data: Lowongan[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function LowonganIndex({ lowongan }: Props) {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <AppShell>
            <Head title="Lowongan Pekerjaan" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        💼 Lowongan Pekerjaan
                    </h1>
                    {isAdmin && (
                        <Link href="/lowongan/create">
                            <Button>
                                ➕ Tambah Lowongan
                            </Button>
                        </Link>
                    )}
                </div>

                {lowongan.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lowongan.data.map((job) => (
                            <Card key={job.id_lowongan} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg text-green-900">
                                                <Link href={`/lowongan/${job.id_lowongan}`} className="hover:text-green-700">
                                                    {job.judul}
                                                </Link>
                                            </CardTitle>
                                            <p className="text-sm text-green-700 font-semibold mt-1">
                                                🏢 {job.perusahaan}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                📅 Diposting: {new Date(job.tanggal_post).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex space-x-2">
                                                <Link href={`/lowongan/${job.id_lowongan}/edit`}>
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
                                        {job.deskripsi.substring(0, 150)}...
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                                                💼 Aktif
                                            </span>
                                        </div>
                                        <Link href={`/lowongan/${job.id_lowongan}`}>
                                            <Button variant="outline" size="sm">
                                                👁️ Lihat Detail
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">💼</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum ada lowongan pekerjaan
                            </h3>
                            <p className="text-gray-600">
                                Lowongan pekerjaan terbaru akan ditampilkan di sini
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {lowongan.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: lowongan.last_page }, (_, i) => i + 1).map((page) => (
                            <Link key={page} href={`/lowongan?page=${page}`}>
                                <Button
                                    variant={page === lowongan.current_page ? 'default' : 'outline'}
                                    size="sm"
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Call to Action for Alumni */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardContent className="text-center py-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            🌟 Ingin Berbagi Lowongan?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Jika Anda mengetahui lowongan pekerjaan yang cocok untuk sesama alumni, 
                            silakan hubungi admin untuk menambahkannya ke platform.
                        </p>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                            📧 Hubungi Admin
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}