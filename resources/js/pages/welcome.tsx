import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Welcome() {
    return (
        <AppShell>
            <Head title="SMK Bina Sriwijaya Alumni System" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
                {/* Hero Section */}
                <section className="relative py-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-6">
                            <h1 className="text-5xl font-bold text-blue-900 mb-4">
                                🎓 Alumni Information System
                            </h1>
                            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                                SMK Bina Sriwijaya Palembang
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Menghubungkan alumni, berbagi informasi, dan membangun jaringan profesional 
                                untuk masa depan yang lebih cerah
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link href="/login">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                                    🔐 Login Alumni
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                                    📝 Daftar Alumni Baru
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                            ✨ Fitur Unggulan Platform Alumni
                        </h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 flex items-center gap-2">
                                        👥 Jaringan Alumni
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Temukan dan terhubung dengan sesama alumni berdasarkan angkatan, 
                                        jurusan, atau profesi. Bangun jaringan profesional yang kuat.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 flex items-center gap-2">
                                        📰 Berita & Informasi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Dapatkan update terbaru tentang perkembangan sekolah, 
                                        prestasi alumni, dan informasi penting lainnya.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 flex items-center gap-2">
                                        💼 Lowongan Kerja
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Akses berbagai peluang karir dari sekolah, mitra, dan sesama alumni. 
                                        Tingkatkan peluang mendapat pekerjaan impian.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 flex items-center gap-2">
                                        🎉 Kegiatan Alumni
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Ikuti berbagai kegiatan menarik seperti reuni, seminar, workshop, 
                                        dan acara networking untuk mempererat silaturahmi.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 flex items-center gap-2">
                                        👤 Profil Pribadi
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Kelola profil pribadi, update informasi kontak, pekerjaan, 
                                        dan pencapaian untuk tetap terhubung dengan komunitas.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle className="text-blue-700 flex items-center gap-2">
                                        🔍 Pencarian Alumni
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Cari alumni berdasarkan nama, angkatan, atau jurusan dengan 
                                        fitur pencarian yang mudah dan cepat.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="py-16 px-4 bg-blue-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">📊 Alumni dalam Angka</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl font-bold mb-2">1000+</div>
                                <div className="text-blue-100">Alumni Terdaftar</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">15+</div>
                                <div className="text-blue-100">Tahun Beroperasi</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold mb-2">6</div>
                                <div className="text-blue-100">Program Keahlian</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            🚀 Siap Bergabung dengan Komunitas Alumni?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Jangan lewatkan kesempatan untuk terhubung kembali dengan sekolah dan 
                            sesama alumni. Bergabunglah sekarang dan mulai membangun jaringan profesional Anda!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4">
                                    📝 Daftar Sekarang
                                </Button>
                            </Link>
                            <Link href="/login">
                                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-12 py-4">
                                    🔐 Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-12 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-xl font-semibold mb-4">SMK Bina Sriwijaya Palembang</h3>
                        <p className="text-gray-300 mb-4">
                            Jl. Veteran No. 10, Palembang, Sumatera Selatan
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-300">
                            <span>📞 Telepon: (0711) 123456</span>
                            <span>📧 Email: info@smkbinasriwijaya.edu</span>
                            <span>🌐 Website: www.smkbinasriwijaya.edu</span>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm">
                            © 2024 SMK Bina Sriwijaya Palembang. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </AppShell>
    );
}