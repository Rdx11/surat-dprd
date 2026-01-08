import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '@/Layouts/UserLayout';
import { ArrowLeft, AlertCircle, Upload, X, Check } from 'lucide-react';

export default function ReportCreate({ bidangOptions }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        nama: '',
        nim: '',
        laporan: '',
        bukti: null,
        bidang: [],
    });

    const [preview, setPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user/reports');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Ukuran file maksimal 5MB');
                return;
            }
            setData('bukti', file);
            if (file.type.startsWith('image/')) {
                setPreview(URL.createObjectURL(file));
            } else {
                setPreview(null);
            }
        }
    };

    const removeFile = () => {
        setData('bukti', null);
        setPreview(null);
    };

    const toggleBidang = (key) => {
        if (data.bidang.includes(key)) {
            setData('bidang', data.bidang.filter(b => b !== key));
        } else {
            setData('bidang', [...data.bidang, key]);
        }
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <UserLayout header="Buat Laporan">
            <Head title="Buat Laporan - User" />

            <div className="mb-6">
                <Link href="/user/reports" className="inline-flex items-center text-gray-600 hover:text-sky-600">
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Pelapor</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                                    errors.nama ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Masukkan nama lengkap"
                            />
                            {errors.nama && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.nama}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                NIM <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nim}
                                onChange={(e) => setData('nim', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                                    errors.nim ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Masukkan NIM"
                            />
                            {errors.nim && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.nim}</p>}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Bidang Laporan <span className="text-red-500">*</span></h2>
                    <p className="text-sm text-gray-500 mb-4">Pilih satu atau lebih bidang yang terkait dengan laporan Anda</p>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                        {Object.entries(bidangOptions).map(([key, label]) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => toggleBidang(key)}
                                className={`flex items-center p-4 border rounded-lg text-left transition-colors ${
                                    data.bidang.includes(key)
                                        ? 'border-sky-500 bg-sky-50 text-sky-700'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                                    data.bidang.includes(key)
                                        ? 'bg-sky-500 border-sky-500'
                                        : 'border-gray-300'
                                }`}>
                                    {data.bidang.includes(key) && <Check size={14} className="text-white" />}
                                </div>
                                <span className="text-sm">{label}</span>
                            </button>
                        ))}
                    </div>
                    {errors.bidang && <p className="mt-2 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.bidang}</p>}
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Isi Laporan</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Laporan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.laporan}
                                onChange={(e) => setData('laporan', e.target.value)}
                                rows={8}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                                    errors.laporan ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                                placeholder="Tuliskan laporan Anda secara detail..."
                            />
                            {errors.laporan && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.laporan}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bukti Laporan (Opsional)
                            </label>
                            <p className="text-sm text-gray-500 mb-3">Upload gambar atau PDF sebagai bukti pendukung (max 5MB)</p>
                            
                            {!data.bukti ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600 mb-2">Drag & drop file atau klik untuk memilih</p>
                                    <p className="text-sm text-gray-500 mb-3">Format: JPG, PNG, PDF (max 5MB)</p>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png,image/jpg,application/pdf"
                                        className="hidden"
                                        id="bukti-upload"
                                    />
                                    <label
                                        htmlFor="bukti-upload"
                                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 cursor-pointer"
                                    >
                                        Pilih File
                                    </label>
                                </div>
                            ) : (
                                <div className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {preview ? (
                                                <img src={preview} alt="Preview" className="w-16 h-16 object-cover rounded mr-3" />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center mr-3">
                                                    <span className="text-xs text-gray-500">PDF</span>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900">{data.bukti.name}</p>
                                                <p className="text-sm text-gray-500">{(data.bukti.size / 1024).toFixed(2)} KB</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {errors.bukti && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.bukti}</p>}
                            
                            {progress && (
                                <div className="mt-2">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div className="bg-sky-500 h-2 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/user/reports" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                    <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">
                        {processing ? 'Mengirim...' : 'Kirim Laporan'}
                    </button>
                </div>
            </form>
        </UserLayout>
    );
}
