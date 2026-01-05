import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FileText, Image, CheckCircle, Archive } from 'lucide-react';

export default function Dashboard({ stats }) {
    const statCards = [
        {
            title: 'Total Alur SOP',
            value: stats.totalServices,
            icon: FileText,
            color: 'bg-sky-500',
        },
        {
            title: 'Alur SOP Aktif',
            value: stats.activeServices,
            icon: CheckCircle,
            color: 'bg-emerald-500',
        },
        {
            title: 'Total Arsip',
            value: stats.totalArchives,
            icon: Archive,
            color: 'bg-amber-500',
        },
        {
            title: 'Total Galeri',
            value: stats.totalGalleries,
            icon: Image,
            color: 'bg-violet-500',
        },
    ];

    return (
        <AdminLayout header="Dashboard">
            <Head title="Dashboard - Admin" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Selamat Datang di Admin Panel</h2>
                <p className="text-gray-600">
                    Gunakan menu di sebelah kiri untuk mengelola konten website Sistem Informasi 
                    Layanan DPRD Sumbawa.
                </p>
                <div className="mt-4 grid md:grid-cols-4 gap-4">
                    <div className="p-4 bg-sky-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Kelola Alur SOP</h3>
                        <p className="text-sm text-gray-600">
                            Tambah, edit, atau hapus informasi alur SOP perjalanan dinas Komisi II.
                        </p>
                    </div>
                    <div className="p-4 bg-sky-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Arsip Laporan</h3>
                        <p className="text-sm text-gray-600">
                            Upload dan kelola arsip laporan dalam format PDF atau Word.
                        </p>
                    </div>
                    <div className="p-4 bg-sky-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Kelola Galeri</h3>
                        <p className="text-sm text-gray-600">
                            Upload dan kelola foto-foto kegiatan kantor untuk ditampilkan di website.
                        </p>
                    </div>
                    <div className="p-4 bg-sky-50 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Info Kantor</h3>
                        <p className="text-sm text-gray-600">
                            Update informasi kontak, alamat, dan jam operasional kantor.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
