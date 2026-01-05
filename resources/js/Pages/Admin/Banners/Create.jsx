import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, AlertCircle, Upload, X } from 'lucide-react';

export default function BannerCreate() {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        subtitle: '',
        image: null,
        link: '',
        order: 0,
        is_active: true,
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/banners');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file maksimal 5MB');
                return;
            }
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setData('image', null);
        setPreview(null);
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout header="Tambah Banner">
            <Head title="Tambah Banner - Admin" />

            <div className="mb-6">
                <Link href="/admin/banners" className="inline-flex items-center text-gray-600 hover:text-sky-600">
                    <ArrowLeft size={18} className="mr-2" />
                    Kembali
                </Link>
            </div>

            {hasErrors && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800">Terdapat kesalahan pada form</h3>
                            <p className="text-sm text-red-600 mt-1">Silakan periksa dan perbaiki field yang ditandai merah.</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Banner</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gambar Banner <span className="text-red-500">*</span>
                            </label>
                            <p className="text-sm text-gray-500 mb-3">Ukuran yang disarankan: 1920x600 pixel (rasio 16:5)</p>
                            
                            {!preview ? (
                                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-2">Drag & drop gambar atau klik untuk memilih</p>
                                    <p className="text-sm text-gray-500 mb-4">Format: JPG, PNG, WebP (max 5MB)</p>
                                    <input
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/jpeg,image/png,image/jpg,image/webp"
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="inline-flex items-center px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-lg hover:bg-sky-600 cursor-pointer"
                                    >
                                        Pilih Gambar
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            {errors.image && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.image}</p>}
                            
                            {progress && (
                                <div className="mt-2">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div className="bg-sky-500 h-2 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    placeholder="Judul banner"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    placeholder="Subtitle banner"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Link (Opsional)</label>
                                <input
                                    type="text"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                    placeholder="/layanan atau https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Urutan</label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                            />
                            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">Aktif (tampilkan di website)</label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/banners" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                    <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">
                        {processing ? 'Menyimpan...' : 'Simpan Banner'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
