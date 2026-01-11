import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { ArrowLeft, Clock, CheckCircle, Loader, FileText, Image } from 'lucide-react';

export default function ReportShow({ report, bidangOptions }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={14} className="mr-1" />
                        Pending
                    </span>
                );
            case 'diproses':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <Loader size={14} className="mr-1" />
                        Sedang Diproses
                    </span>
                );
            case 'selesai':
                return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <CheckCircle size={14} className="mr-1" />
                        Selesai
                    </span>
                );
            default:
                return null;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isImage = report.bukti_path && /\.(jpg|jpeg|png)$/i.test(report.bukti_path);

    return (
        <UserLayout header="Detail Laporan">
            <Head title="Detail Laporan - User" />

            <div className="mb-6">
                <Link href="/user/reports" className="inline-flex items-center text-gray-600 hover:text-sky-600">
                    <ArrowLeft size={18} className="mr-2" />
                    Kembali
                </Link>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Status Laporan</h2>
                        {getStatusBadge(report.status)}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-gray-500">Tanggal Dibuat</p>
                            <p className="font-medium text-gray-900">{formatDate(report.created_at)}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Terakhir Diupdate</p>
                            <p className="font-medium text-gray-900">{formatDate(report.updated_at)}</p>
                        </div>
                    </div>

                    {report.catatan_admin && (
                        <div className="mt-4 p-4 bg-sky-50 rounded-lg">
                            <p className="text-sm font-medium text-sky-800 mb-1">Catatan dari Admin:</p>
                            <p className="text-sm text-sky-700">{report.catatan_admin}</p>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Pelapor</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Nama Lengkap</p>
                            <p className="font-medium text-gray-900">{report.nama}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">NIK</p>
                            <p className="font-medium text-gray-900">{report.nik}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Bidang Laporan</h2>
                    <div className="flex flex-wrap gap-2">
                        {report.bidang.map((b) => (
                            <span key={b} className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full">
                                {bidangOptions[b] || b}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Isi Laporan</h2>
                    <div className="prose prose-sm max-w-none">
                        <p className="text-gray-700 whitespace-pre-line">{report.laporan}</p>
                    </div>
                </div>

                {report.bukti_path && (
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bukti Laporan</h2>
                        {isImage ? (
                            <img 
                                src={`/storage/${report.bukti_path}`} 
                                alt="Bukti Laporan" 
                                className="max-w-full h-auto rounded-lg"
                            />
                        ) : (
                            <a 
                                href={`/storage/${report.bukti_path}`} 
                                target="_blank"
                                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                            >
                                <FileText size={18} className="mr-2" />
                                Lihat Dokumen PDF
                            </a>
                        )}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
