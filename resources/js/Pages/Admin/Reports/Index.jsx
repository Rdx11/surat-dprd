import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Eye, Trash2, Clock, CheckCircle, Loader, Filter } from 'lucide-react';

export default function ReportsIndex({ reports, bidangOptions, filters }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, report: null });
    const [processing, setProcessing] = useState(false);

    const openDeleteModal = (report) => {
        setDeleteModal({ open: true, report });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, report: null });
    };

    const handleDelete = () => {
        if (!deleteModal.report) return;
        
        setProcessing(true);
        router.delete(`/admin/reports/${deleteModal.report.id}`, {
            onSuccess: () => {
                closeDeleteModal();
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const handleFilter = (status) => {
        router.get('/admin/reports', status ? { status } : {}, { preserveState: true });
    };

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
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout header="Kelola Laporan">
            <Head title="Kelola Laporan - Admin" />

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Laporan Masuk</h2>
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-gray-400" />
                        <select
                            value={filters.status || ''}
                            onChange={(e) => handleFilter(e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-sky-500"
                        >
                            <option value="">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="diproses">Diproses</option>
                            <option value="selesai">Selesai</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Tanggal
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Pelapor
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
                                        <div>
                                            <p className="font-medium text-gray-900">{report.nama}</p>
                                            <p className="text-sm text-gray-500">NIK: {report.nik}</p>
                                        </div>
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
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link
                                                href={`/admin/reports/${report.id}`}
                                                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(report)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reports.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada laporan masuk.</p>
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

            <ConfirmModal
                isOpen={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Hapus Laporan"
                message={`Apakah Anda yakin ingin menghapus laporan dari "${deleteModal.report?.nama}"?`}
                processing={processing}
            />
        </AdminLayout>
    );
}
