import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';

export default function GalleryEdit({ gallery }) {
    const [preview, setPreview] = useState(`/storage/${gallery.image_path}`);
    const { data, setData, post, processing, errors } = useForm({
        title: gallery.title || '', description: gallery.description || '', image: null, is_active: gallery.is_active ?? true, _method: 'PUT',
    });

    const handleSubmit = (e) => { e.preventDefault(); post(`/admin/gallery/${gallery.id}`); };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) { setData('image', file); setPreview(URL.createObjectURL(file)); }
    };
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout header="Edit Foto">
            <Head title="Edit Foto - Admin" />

            <div className="mb-6">
                <Link href="/admin/gallery" className="inline-flex items-center text-gray-600 hover:text-sky-600">
                    <ArrowLeft size={18} className="mr-2" />Kembali
                </Link>
            </div>

            {hasErrors && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800">Terdapat kesalahan pada form</h3>
                            <p className="text-sm text-red-600 mt-1">Silakan periksa dan perbaiki field yang ditandai merah.</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
                        <div className="flex items-start gap-4">
                            <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-lg" />
                            <label className="flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-colors">
                                <Upload size={24} className="text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Ganti foto</span>
                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                        {errors.image && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.image}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul <span className="text-red-500">*</span></label>
                        <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        {errors.title && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" />
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">Aktif (tampilkan di website)</label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Link href="/admin/gallery" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Update Foto'}</button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
