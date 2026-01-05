import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import ContactInfo from '@/Components/ContactInfo';

export default function ContactIndex({ officeInfo }) {
    return (
        <PublicLayout title="Kontak">
            <Head title="Kontak - DPRD Sumbawa" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut, 
                        silakan hubungi kami melalui kontak di bawah ini
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">
                            Informasi Kontak
                        </h2>
                        <ContactInfo officeInfo={officeInfo} />
                    </div>

                    {/* Map */}
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                        {officeInfo?.maps_embed ? (
                            <div 
                                className="w-full h-full min-h-[400px]"
                                dangerouslySetInnerHTML={{ __html: officeInfo.maps_embed }}
                            />
                        ) : (
                            <div className="w-full h-full min-h-[400px] bg-gray-100 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <p>Peta lokasi akan ditampilkan di sini</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 bg-sky-50 rounded-2xl p-6 lg:p-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Informasi Penting
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                        <div>
                            <h3 className="font-medium mb-2">Sebelum Berkunjung</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Pastikan membawa dokumen yang diperlukan</li>
                                <li>Datang sesuai jam operasional kantor</li>
                                <li>Ambil nomor antrian di loket</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium mb-2">Layanan Online</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Pengecekan status permohonan</li>
                                <li>Informasi persyaratan layanan</li>
                                <li>Pengaduan dan saran</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
