import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { FileText, Plus } from 'lucide-react';

export default function Dashboard() {
    return (
        <UserLayout header="Dashboard">
            <Head title="Dashboard - User" />

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Selamat Datang!</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Anda dapat membuat laporan terkait bidang-bidang yang ditangani oleh Komisi II DPRD Kabupaten Sumbawa.
                    </p>
                    <Link
                        href="/user/reports/create"
                        className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600"
                    >
                        <Plus size={18} className="mr-2" />
                        Buat Laporan Baru
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Bidang Komisi II</h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-sky-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            Keuangan Daerah (APBD, Pajak, Retribusi)
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-sky-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            Perindustrian dan Perdagangan
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-sky-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            Koperasi dan UMKM
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-sky-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            Energi dan Sumber Daya Mineral
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-sky-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            Pariwisata dan Ekonomi Kreatif
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Laporan Saya</h2>
                    <Link
                        href="/user/reports"
                        className="text-sky-600 hover:text-sky-700 text-sm font-medium"
                    >
                        Lihat Semua →
                    </Link>
                </div>
                <div className="flex items-center justify-center py-8 text-gray-500">
                    <FileText className="w-12 h-12 text-gray-300 mr-4" />
                    <div>
                        <p className="font-medium">Belum ada laporan</p>
                        <p className="text-sm">Klik "Buat Laporan Baru" untuk memulai</p>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
