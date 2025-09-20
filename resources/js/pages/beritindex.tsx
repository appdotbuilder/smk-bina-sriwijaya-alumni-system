import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link, usePage } from '@inertiajs/react';
import React from 'react';

interface Berita {
    id_berita: number;
    judul: string;
    isi: string;
    tanggal: string;
    penulis: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    berita: {
        data: Berita[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function BeritaIndex({ berita }: Props) {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
    const isAdmin = auth?.user?.role === 'admin';

    return (
        <AppShell>
            <Head title="Berita & Informasi" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        📰 Berita & Informasi
                    </h1>
                    {isAdmin && (
                        <Link href="/berita/create">
                            <Button>
                                ➕ Buat Berita Baru
                            </Button>
                        </Link>
                    )}
                </div>

                {berita.data.length > 0 ? (
                    <div className="space-y-6">
                        {berita.data.map((news) => (
                            <Card key={news.id_berita} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl text-blue-900 hover:text-blue-700">
                                                <Link href={`/berita/${news.id_berita}`}>
                                                    {news.judul}
                                                </Link>
                                            </CardTitle>
                                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                                <span>👤 {news.penulis}</span>
                                                <span>📅 {new Date(news.tanggal).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</span>
                                            </div>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex space-x-2">
                                                <Link href={`/berita/${news.id_berita}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 line-clamp-3">
                                        {news.isi.substring(0, 200)}...
                                    </p>
                                    <div className="mt-4">
                                        <Link href={`/berita/${news.id_berita}`}>
                                            <Button variant="outline" size="sm">
                                                📖 Baca Selengkapnya
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
                            <div className="text-6xl mb-4">📰</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Belum ada berita
                            </h3>
                            <p className="text-gray-600">
                                Berita dan informasi terbaru akan ditampilkan di sini
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {berita.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: berita.last_page }, (_, i) => i + 1).map((page) => (
                            <Link key={page} href={`/berita?page=${page}`}>
                                <Button
                                    variant={page === berita.current_page ? 'default' : 'outline'}
                                    size="sm"
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}