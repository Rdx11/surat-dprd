import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Upload, X, AlertCircle } from 'lucide-react';

export default function GalleryCreate() {
    const [preview, setPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        title: '', description: '', image: null, is_active: true,
    });

    const handleSubmit = (e) => { e.preventDefault(); post('/admin/gallery'); };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) { setData('image', file); setPreview(URL.createObjectURL(file)); }
    };
    const removeImage = () => { setData('image', null); setPreview(null); };
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout header="Tambah Foto">
            <Head title="Tambah Foto - Admin" />

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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto <span className="text-red-500">*</span></label>
                        {preview ? (
                            <div className="relative inline-block">
                                <img src={preview} alt="Preview" className="w-64 h-64 object-cover rounded-lg" />
                                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"><X size={16} /></button>
                            </div>
                        ) : (
                            <label className={`flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-sky-500 hover:bg-sky-50'}`}>
                                <Upload size={32} className={errors.image ? 'text-red-400 mb-2' : 'text-gray-400 mb-2'} />
                                <span className={`text-sm ${errors.image ? 'text-red-500' : 'text-gray-500'}`}>Klik untuk upload</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 2MB)</span>
                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                            </label>
                        )}
                        {errors.image && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.image}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul <span className="text-red-500">*</span></label>
                        <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="Judul foto" />
                        {errors.title && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500" placeholder="Deskripsi foto (opsional)" />
                    </div>

                    <div className="flex items-center">
                        <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500" />
                        <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">Aktif (tampilkan di website)</label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Link href="/admin/gallery" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Simpan Foto'}</button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
