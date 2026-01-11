import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Clock, CheckCircle, Loader, FileText, User } from 'lucide-react';

export default function ReportShow({ report, bidangOptions }) {
    const { data, setData, put, processing } = useForm({
        status: report.status,
        catatan_admin: report.catatan_admin || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/reports/${report.id}`);
    };

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
        <AdminLayout header="Detail Laporan">
            <Head title="Detail Laporan - Admin" />

            <div className="mb-6">
                <Link href="/admin/reports" className="inline-flex items-center text-gray-600 hover:text-sky-600">
                    <ArrowLeft size={18} className="mr-2" />
                    Kembali
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Laporan</h2>
                            {getStatusBadge(report.status)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                                <p className="text-gray-500">Tanggal Dibuat</p>
                                <p className="font-medium text-gray-900">{formatDate(report.created_at)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Terakhir Diupdate</p>
                                <p className="font-medium text-gray-900">{formatDate(report.updated_at)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Pelapor</h2>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-sky-600" />
                            </div>
                            <div className="flex-1 grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nama Lengkap</p>
                                    <p className="font-medium text-gray-900">{report.nama}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">NIK</p>
                                    <p className="font-medium text-gray-900">{report.nik}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email Akun</p>
                                    <p className="font-medium text-gray-900">{report.user?.email || '-'}</p>
                                </div>
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

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="diproses">Diproses</option>
                                    <option value="selesai">Selesai</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan Admin</label>
                                <textarea
                                    value={data.catatan_admin}
                                    onChange={(e) => setData('catatan_admin', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    placeholder="Tambahkan catatan untuk pelapor..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
