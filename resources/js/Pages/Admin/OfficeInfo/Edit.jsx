import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { AlertCircle } from 'lucide-react';

export default function OfficeInfoEdit({ officeInfo }) {
    const { data, setData, put, processing, errors } = useForm({
        office_name: officeInfo?.office_name || 'Sekretariat DPRD Kabupaten Sumbawa',
        address: officeInfo?.address || '', phone: officeInfo?.phone || '', email: officeInfo?.email || '',
        working_hours: officeInfo?.working_hours || '', maps_embed: officeInfo?.maps_embed || '',
    });

    const handleSubmit = (e) => { e.preventDefault(); put('/admin/office-info'); };
    const hasErrors = Object.keys(errors).length > 0;

    return (
        <AdminLayout header="Informasi Kantor">
            <Head title="Informasi Kantor - Admin" />

            {hasErrors && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 max-w-3xl">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-medium text-red-800">Terdapat kesalahan pada form</h3>
                            <p className="text-sm text-red-600 mt-1">Silakan periksa dan perbaiki field yang ditandai merah.</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-3xl">
                <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kantor <span className="text-red-500">*</span></label>
                        <input type="text" value={data.office_name} onChange={(e) => setData('office_name', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.office_name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} />
                        {errors.office_name && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.office_name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alamat <span className="text-red-500">*</span></label>
                        <textarea value={data.address} onChange={(e) => setData('address', e.target.value)} rows={3}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="Alamat lengkap kantor" />
                        {errors.address && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.address}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Telepon <span className="text-red-500">*</span></label>
                            <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="(0371) 21234" />
                            {errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                            <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="kantah.sumbawa@atrbpn.go.id" />
                            {errors.email && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jam Operasional <span className="text-red-500">*</span></label>
                        <textarea value={data.working_hours} onChange={(e) => setData('working_hours', e.target.value)} rows={3}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${errors.working_hours ? 'border-red-500 bg-red-50' : 'border-gray-300'}`} placeholder="Senin - Jumat: 08.00 - 16.00 WIB" />
                        {errors.working_hours && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle size={14} className="mr-1" />{errors.working_hours}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed</label>
                        <textarea value={data.maps_embed} onChange={(e) => setData('maps_embed', e.target.value)} rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 font-mono text-sm"
                            placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>' />
                        <p className="mt-1 text-xs text-gray-500">Paste kode embed dari Google Maps (opsional)</p>
                    </div>

                    {data.maps_embed && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Preview Peta</label>
                            <div className="w-full h-64 rounded-lg overflow-hidden border" dangerouslySetInnerHTML={{ __html: data.maps_embed }} />
                        </div>
                    )}

                    <div className="flex justify-end pt-4 border-t">
                        <button type="submit" disabled={processing} className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
