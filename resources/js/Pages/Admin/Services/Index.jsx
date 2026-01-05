import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function ServicesIndex({ services }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, service: null });
    const [processing, setProcessing] = useState(false);

    const openDeleteModal = (service) => {
        setDeleteModal({ open: true, service });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, service: null });
    };

    const handleDelete = () => {
        if (!deleteModal.service) return;
        
        setProcessing(true);
        router.delete(`/admin/services/${deleteModal.service.id}`, {
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
        <AdminLayout header="Kelola Alur SOP">
            <Head title="Kelola Alur SOP - Admin" />

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Alur SOP Perjalanan Dinas</h2>
                    <Link
                        href="/admin/services/create"
                        className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600"
                    >
                        <Plus size={18} className="mr-2" />
                        Tambah Alur SOP
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                    Nama Alur SOP
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
                            {services.data.map((service) => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{service.name}</p>
                                            <p className="text-sm text-gray-500 truncate max-w-md">
                                                {service.description}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {service.is_active ? (
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
                                                href={`/admin/services/${service.id}/edit`}
                                                className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => openDeleteModal(service)}
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

                {services.data.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada alur SOP. Klik tombol "Tambah Alur SOP" untuk menambahkan.</p>
                    </div>
                )}

                {/* Pagination */}
                {services.last_page > 1 && (
                    <div className="px-6 py-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Menampilkan {services.from} - {services.to} dari {services.total} alur SOP
                        </p>
                        <div className="flex space-x-2">
                            {services.links.map((link, index) => (
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
                title="Hapus Alur SOP"
                message={`Apakah Anda yakin ingin menghapus alur SOP "${deleteModal.service?.name}"?`}
                processing={processing}
            />
        </AdminLayout>
    );
}
