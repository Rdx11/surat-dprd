import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Plus, Edit, Trash2, Download, Eye, EyeOff, FileText, File } from 'lucide-react';

export default function ArchivesIndex({ archives }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, archive: null });
    const [processing, setProcessing] = useState(false);

    const openDeleteModal = (archive) => {
        setDeleteModal({ open: true, archive });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, archive: null });
    };

    const handleDelete = () => {
        if (!deleteModal.archive) return;
        
        setProcessing(true);
        router.delete(`/admin/archives/${deleteModal.archive.id}`, {
            onSuccess: () => {
                closeDeleteModal();
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    const formatFileSize = (bytes) => {
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        }
        return bytes + ' bytes';
    };

    const getFileIcon = (type) => {
        if (type === 'pdf') {
            return <FileText className="w-5 h-5 text-red-500" />;
        }
        return <File className="w-5 h-5 text-blue-500" />;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AdminLayout header="Arsip Laporan">
            <Head title="Arsip Laporan - Admin" />

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Arsip Laporan</h2>
                    <Link
                        href="/admin/archives/create"
                        className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600"
                    >
                        <Plus size={18} className="mr-2" />
                        Tambah Arsip
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    File
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Judul
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                    Tanggal Laporan
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                    Ukuran
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
                            {archives.data.map((archive) => (
                                <tr key={archive.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {getFileIcon(archive.file_type)}
                                            <span className="ml-2 text-xs text-gray-500 uppercase">{archive.file_type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{archive.title}</p>
                                            <p className="text-sm text-gray-500 truncate max-w-xs">
                                                {archive.file_name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                                        {formatDate(archive.report_date)}
                                    </td>
                                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                                        {formatFileSize(archive.file_size)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {archive.is_active ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <Eye size={12} className="mr-1" />
                                                Aktif
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                <EyeOff size={12} className="mr-1" />
                                                Nonaktif
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <a
                                                href={`/admin/archives/${archive.id}/download`}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </a>
                                            <Link
                                                href={`/admin/archives/${archive.id}/edit`}
                                                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(archive)}
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

                {archives.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada arsip laporan. Klik tombol "Tambah Arsip" untuk menambahkan.</p>
                    </div>
                )}

                {/* Pagination */}
                {archives.last_page > 1 && (
                    <div className="px-6 py-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Menampilkan {archives.from} - {archives.to} dari {archives.total} arsip
                        </p>
                        <div className="flex space-x-2">
                            {archives.links.map((link, index) => (
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

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={deleteModal.open}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Hapus Arsip"
                message={`Apakah Anda yakin ingin menghapus arsip "${deleteModal.archive?.title}"? File akan dihapus permanen.`}
                processing={processing}
            />
        </AdminLayout>
    );
}
