import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    angkatan: string;
    jurusan: string;
    no_hp: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        angkatan: '',
        jurusan: '',
        no_hp: '',
    });

    const jurusanOptions = [
        'Teknik Komputer dan Jaringan',
        'Akuntansi',
        'Administrasi Perkantoran',
        'Pemasaran',
        'Multimedia',
        'Rekayasa Perangkat Lunak'
    ];

    const currentYear = new Date().getFullYear();
    const angkatanOptions = [];
    for (let year = currentYear; year >= currentYear - 20; year--) {
        angkatanOptions.push(year.toString());
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout 
            title="Daftar Alumni SMK Bina Sriwijaya" 
            description="Bergabunglah dengan komunitas alumni SMK Bina Sriwijaya Palembang"
        >
            <Head title="Daftar Alumni" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nama lengkap sesuai ijazah"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="angkatan">Angkatan/Tahun Lulus</Label>
                            <Select value={data.angkatan} onValueChange={(value) => setData('angkatan', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tahun lulus" />
                                </SelectTrigger>
                                <SelectContent>
                                    {angkatanOptions.map((year) => (
                                        <SelectItem key={year} value={year}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.angkatan} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="jurusan">Jurusan/Program Keahlian</Label>
                            <Select value={data.jurusan} onValueChange={(value) => setData('jurusan', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jurusan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {jurusanOptions.map((jurusan) => (
                                        <SelectItem key={jurusan} value={jurusan}>
                                            {jurusan}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.jurusan} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="no_hp">Nomor HP (Opsional)</Label>
                        <Input
                            id="no_hp"
                            type="tel"
                            tabIndex={5}
                            value={data.no_hp}
                            onChange={(e) => setData('no_hp', e.target.value)}
                            disabled={processing}
                            placeholder="08xxxxxxxxxx"
                        />
                        <InputError message={errors.no_hp} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={6}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password minimal 8 karakter"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={7}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Ulangi password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            <strong>📋 Catatan:</strong> Akun alumni baru memerlukan verifikasi dari admin sebelum dapat mengakses semua fitur sistem.
                        </p>
                    </div>

                    <Button type="submit" className="mt-2 w-full bg-blue-600 hover:bg-blue-700" tabIndex={8} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        🎓 Daftar Sebagai Alumni
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Sudah punya akun?{' '}
                    <TextLink href={route('login')} tabIndex={9}>
                        Login di sini
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}