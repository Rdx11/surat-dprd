import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmModal from '@/Components/ConfirmModal';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function GalleryIndex({ galleries }) {
    const [deleteModal, setDeleteModal] = useState({ open: false, gallery: null });
    const [processing, setProcessing] = useState(false);

    const openDeleteModal = (gallery) => setDeleteModal({ open: true, gallery });
    const closeDeleteModal = () => setDeleteModal({ open: false, gallery: null });

    const handleDelete = () => {
        if (!deleteModal.gallery) return;
        setProcessing(true);
        router.delete(`/admin/gallery/${deleteModal.gallery.id}`, {
            onSuccess: () => { closeDeleteModal(); setProcessing(false); },
            onError: () => setProcessing(false)
        });
    };

    return (
        <AdminLayout header="Kelola Galeri">
            <Head title="Kelola Galeri - Admin" />

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Daftar Foto</h2>
                    <Link href="/admin/gallery/create" className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600">
                        <Plus size={18} className="mr-2" />Tambah Foto
                    </Link>
                </div>

                {galleries.data.length > 0 ? (
                    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleries.data.map((gallery) => (
                            <div key={gallery.id} className="group relative rounded-xl overflow-hidden border">
                                <div className="aspect-square">
                                    <img src={`/storage/${gallery.image_path}`} alt={gallery.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3">
                                    <p className="font-medium text-gray-900 truncate">{gallery.title}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        {gallery.is_active ? (
                                            <span className="inline-flex items-center text-xs text-green-600"><Eye size={12} className="mr-1" />Aktif</span>
                                        ) : (
                                            <span className="inline-flex items-center text-xs text-gray-500"><EyeOff size={12} className="mr-1" />Nonaktif</span>
                                        )}
                                        <div className="flex space-x-1">
                                            <Link href={`/admin/gallery/${gallery.id}/edit`} className="p-1.5 text-sky-600 hover:bg-sky-50 rounded"><Edit size={16} /></Link>
                                            <button onClick={() => openDeleteModal(gallery)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada foto. Klik tombol "Tambah Foto" untuk menambahkan.</p>
                    </div>
                )}

                {galleries.last_page > 1 && (
                    <div className="px-6 py-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-500">Menampilkan {galleries.from} - {galleries.to} dari {galleries.total} foto</p>
                        <div className="flex space-x-2">
                            {galleries.links.map((link, index) => (
                                <Link key={index} href={link.url || '#'}
                                    className={`px-3 py-1 text-sm rounded ${link.active ? 'bg-sky-500 text-white' : link.url ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ConfirmModal isOpen={deleteModal.open} onClose={closeDeleteModal} onConfirm={handleDelete}
                title="Hapus Foto" message={`Apakah Anda yakin ingin menghapus foto "${deleteModal.gallery?.title}"?`} processing={processing} />
        </AdminLayout>
    );
}
