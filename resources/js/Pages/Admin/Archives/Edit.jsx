import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, AlertCircle, Upload, FileText, File, X } from 'lucide-react';

export default function ArchiveEdit({ archive }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        title: archive.title || '',
        description: archive.description || '',
        file: null,
        report_date: archive.report_date ? archive.report_date.split('T')[0] : '',
        is_active: archive.is_active ?? true,
        _method: 'PUT',
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/archives/${archive.id}`);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                alert('Hanya file PDF dan Word yang diperbolehkan');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                alert('Ukuran file maksimal 10MB');
                return;
            }
            setSelectedFile(file);
            setData('file', file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setData('file', null);
    };

    const getFileIcon = (type) => {
        if (type === 'pdf' || type === 'application/pdf') {
            return <FileText className="w-8 h-8 text-red-500" />;
        }
        return <File className="w-8 h-8 text-blue-500" />;
    };

    const formatFileSize = (bytes) => {
        if (bytes >= 1048576) {
            return (bytes / 1048576).toFixed(2) + ' MB';
        } else if (bytes >= 1024) {
            return (bytes / 1024).toFixed(2) + ' KB';
        }
        return bytes + ' bytes';
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout header="Edit Arsip Laporan">
            <Head title="Edit Arsip - Admin" />

            <div className="mb-6">
                <Link
                    href="/admin/archives"
                    className="inline-flex items-center text-gray-600 hover:text-sky-600"
                >
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Arsip</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Judul Arsip <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                                    errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tanggal Laporan
                            </label>
                            <input
                                type="date"
                                value={data.report_date}
                                onChange={(e) => setData('report_date', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                File Dokumen
                            </label>
                            
                            {/* Current File */}
                            <div className="border rounded-lg p-4 bg-gray-50 mb-4">
                                <p className="text-sm text-gray-500 mb-2">File saat ini:</p>
                                <div className="flex items-center">
                                    {getFileIcon(archive.file_type)}
                                    <div className="ml-3">
                                        <p className="font-medium text-gray-900">{archive.file_name}</p>
                                        <p className="text-sm text-gray-500">{formatFileSize(archive.file_size)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* New File Upload */}
                            {!selectedFile ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600 mb-2">Upload file baru untuk mengganti (opsional)</p>
                                    <p className="text-sm text-gray-500 mb-3">Hanya file PDF dan Word (max 10MB)</p>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 cursor-pointer"
                                    >
                                        Pilih File Baru
                                    </label>
                                </div>
                            ) : (
                                <div className="border rounded-lg p-4 bg-sky-50">
                                    <p className="text-sm text-sky-600 mb-2">File baru yang akan diupload:</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            {getFileIcon(selectedFile.type)}
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                                                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
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
                            {errors.file && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.file}</p>}
                            
                            {progress && (
                                <div className="mt-2">
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-sky-500 h-2 rounded-full transition-all" 
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{progress.percentage}% uploaded</p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                            />
                            <label htmlFor="is_active" className="ml-2 text-sm text-gray-700">Aktif</label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/archives" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                    <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">
                        {processing ? 'Menyimpan...' : 'Update Arsip'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
