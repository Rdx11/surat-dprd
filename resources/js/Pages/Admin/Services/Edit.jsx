import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ServiceEdit({ service }) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name || '',
        description: service.description || '',
        icon: service.icon || 'FileText',
        order: service.order || 0,
        is_active: service.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    const iconOptions = [
        'FileText', 'FileCheck', 'Search', 'Shield', 'Home', 'RefreshCw', 'Database', 'Briefcase', 'MapPin', 'Users'
    ];

    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout header="Edit Alur SOP">
            <Head title="Edit Alur SOP - Admin" />

            <div className="mb-6">
                <Link href="/admin/services" className="inline-flex items-center text-gray-600 hover:text-sky-600">
                    <ArrowLeft size={18} className="mr-2" />Kembali
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
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Alur SOP</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Alur SOP <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={(e) => setData('name', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} 
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.name}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi / Detail Informasi <span className="text-red-500">*</span></label>
                            <textarea 
                                value={data.description} 
                                onChange={(e) => setData('description', e.target.value)} 
                                rows={10}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} 
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.description}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                            <select 
                                value={data.icon} 
                                onChange={(e) => setData('icon', e.target.value)} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            >
                                {iconOptions.map((icon) => (<option key={icon} value={icon}>{icon}</option>))}
                            </select>
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
                    <Link href="/admin/services" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Batal</Link>
                    <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">{processing ? 'Menyimpan...' : 'Update Alur SOP'}</button>
                </div>
            </form>
        </AdminLayout>
    );
}
