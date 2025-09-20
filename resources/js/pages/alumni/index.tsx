import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react';

interface Alumni {
    id_alumni: number;
    nama: string;
    angkatan: string;
    jurusan: string;
    email: string;
    no_hp?: string;
    pekerjaan?: string;
    alamat?: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    alumni: {
        data: Alumni[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        angkatan?: string;
        jurusan?: string;
    };
    angkatanList: string[];
    jurusanList: string[];
    [key: string]: unknown;
}

export default function AlumniIndex({ alumni, filters, angkatanList, jurusanList }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedAngkatan, setSelectedAngkatan] = useState(filters.angkatan || '');
    const [selectedJurusan, setSelectedJurusan] = useState(filters.jurusan || '');

    const handleSearch = () => {
        router.get('/alumni', {
            search: searchTerm,
            angkatan: selectedAngkatan,
            jurusan: selectedJurusan,
        }, {
            preserveState: true,
        });
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedAngkatan('');
        setSelectedJurusan('');
        router.get('/alumni');
    };

    return (
        <AppShell>
            <Head title="Pencarian Alumni" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        🔍 Pencarian Alumni
                    </h1>
                    <div className="text-sm text-gray-500">
                        {alumni.total} alumni terdaftar
                    </div>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle>🎯 Filter Pencarian</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <Input
                                    placeholder="Cari nama, angkatan, atau jurusan..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <div>
                                <Select value={selectedAngkatan} onValueChange={setSelectedAngkatan}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Angkatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Angkatan</SelectItem>
                                        {angkatanList.map((angkatan) => (
                                            <SelectItem key={angkatan} value={angkatan}>
                                                {angkatan}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select value={selectedJurusan} onValueChange={setSelectedJurusan}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Jurusan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Jurusan</SelectItem>
                                        {jurusanList.map((jurusan) => (
                                            <SelectItem key={jurusan} value={jurusan}>
                                                {jurusan}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSearch} className="flex-1">
                                    🔍 Cari
                                </Button>
                                <Button onClick={handleReset} variant="outline">
                                    🔄 Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Alumni Grid */}
                {alumni.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alumni.data.map((alumnus) => (
                            <Card key={alumnus.id_alumni} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{alumnus.nama}</CardTitle>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {alumnus.jurusan}
                                            </p>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                                            {alumnus.angkatan}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="space-y-2">
                                        {alumnus.pekerjaan && (
                                            <p className="text-sm text-gray-600">
                                                💼 {alumnus.pekerjaan}
                                            </p>
                                        )}
                                        {alumnus.no_hp && (
                                            <p className="text-sm text-gray-600">
                                                📞 {alumnus.no_hp}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-600">
                                            📧 {alumnus.email}
                                        </p>
                                        {alumnus.alamat && (
                                            <p className="text-sm text-gray-600 truncate">
                                                📍 {alumnus.alamat}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-4 pt-4 border-t">
                                        <Link href={`/alumni/${alumnus.id_alumni}`}>
                                            <Button variant="outline" size="sm" className="w-full">
                                                👁️ Lihat Profil
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
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Tidak ada alumni ditemukan
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Coba ubah filter pencarian atau kata kunci Anda
                            </p>
                            <Button onClick={handleReset} variant="outline">
                                Reset Filter
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {alumni.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {Array.from({ length: alumni.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/alumni?page=${page}&search=${searchTerm}&angkatan=${selectedAngkatan}&jurusan=${selectedJurusan}`}
                            >
                                <Button
                                    variant={page === alumni.current_page ? 'default' : 'outline'}
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