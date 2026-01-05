import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function BannersIndex({ banners }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, banner: null });
    const [processing, setProcessing] = useState(false);

    const openDeleteModal = (banner) => {
        setDeleteModal({ open: true, banner });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, banner: null });
    };

    const handleDelete = () => {
        if (!deleteModal.banner) return;
        
        setProcessing(true);
        router.delete(`/admin/banners/${deleteModal.banner.id}`, {
            onSuccess: () => {
                closeDeleteModal();
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            }
        });
    };

    return (
        <AdminLayout header="Kelola Banner">
            <Head title="Kelola Banner - Admin" />

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Banner</h2>
                    <Link
                        href="/admin/banners/create"
                        className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600"
                    >
                        <Plus size={18} className="mr-2" />
                        Tambah Banner
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Preview
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Judul
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                                    Urutan
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
                            {banners.data.map((banner) => (
                                <tr key={banner.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img
                                            src={`/storage/${banner.image_path}`}
                                            alt={banner.title || 'Banner'}
                                            className="w-32 h-16 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{banner.title || '-'}</p>
                                            <p className="text-sm text-gray-500">{banner.subtitle || '-'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {banner.order}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {banner.is_active ? (
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
                                            <Link
                                                href={`/admin/banners/${banner.id}/edit`}
                                                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(banner)}
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

                {banners.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada banner. Klik tombol "Tambah Banner" untuk menambahkan.</p>
                    </div>
                )}

                {banners.last_page > 1 && (
                    <div className="px-6 py-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Menampilkan {banners.from} - {banners.to} dari {banners.total} banner
                        </p>
                        <div className="flex space-x-2">
                            {banners.links.map((link, index) => (
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
                title="Hapus Banner"
                message={`Apakah Anda yakin ingin menghapus banner ini?`}
                processing={processing}
            />
        </AdminLayout>
    );
}
