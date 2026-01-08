import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';
import { Plus, Eye, Clock, CheckCircle, Loader } from 'lucide-react';

export default function ReportsIndex({ reports, bidangOptions }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock size={12} className="mr-1" />
                        Pending
                    </span>
                );
            case 'diproses':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Loader size={12} className="mr-1" />
                        Diproses
                    </span>
                );
            case 'selesai':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
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

    return (
        <UserLayout header="Laporan Saya">
            <Head title="Laporan Saya - User" />

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Laporan</h2>
                    <Link
                        href="/user/reports/create"
                        className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600"
                    >
                        <Plus size={18} className="mr-2" />
                        Buat Laporan
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Tanggal
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Laporan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Bidang
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {reports.data.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(report.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-900 truncate max-w-xs">
                                            {report.laporan.substring(0, 100)}...
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {report.bidang.slice(0, 2).map((b) => (
                                                <span key={b} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                                    {bidangOptions[b]?.split(' ')[0] || b}
                                                </span>
                                            ))}
                                            {report.bidang.length > 2 && (
                                                <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                                    +{report.bidang.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {getStatusBadge(report.status)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/user/reports/${report.id}`}
                                            className="inline-flex items-center p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reports.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada laporan. Klik "Buat Laporan" untuk membuat laporan baru.</p>
                    </div>
                )}

                {reports.last_page > 1 && (
                    <div className="px-6 py-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Menampilkan {reports.from} - {reports.to} dari {reports.total} laporan
                        </p>
                        <div className="flex space-x-2">
                            {reports.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${
                                        link.active
                                            ? 'bg-sky-500 text-white'
                                            : link.url
                                            ? 'text-gray-600 hover:bg-gray-100'
                                            : 'text-gray-300 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
