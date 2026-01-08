import { Head, router, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import ServiceCard from '@/Components/ServiceCard';
import { Search, X, MessageSquare, ArrowRight } from 'lucide-react';

export default function ServicesIndex({ services, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/layanan', { search }, { preserveState: true });
    };

    const clearSearch = () => {
        setSearch('');
        router.get('/layanan', {}, { preserveState: true });
    };

    return (
        <PublicLayout title="Alur SOP">
            <Head title="Alur SOP Perjalanan Dinas - DPRD Sumbawa" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Alur SOP Perjalanan Dinas Komisi II</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Informasi lengkap tentang alur SOP perjalanan dinas Komisi II DPRD Kabupaten Sumbawa
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-10">
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari alur SOP..."
                            className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </form>
                </div>

                {/* Services Grid */}
                {services.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Alur SOP tidak ditemukan</h3>
                        <p className="text-gray-500">Coba gunakan kata kunci lain untuk pencarian</p>
                    </div>
                )}

                {/* Reporting Section */}
                <div className="mt-16 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 md:p-12 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold mb-2">Layanan Pelaporan Masyarakat</h3>
                                <p className="text-sky-100 max-w-xl">
                                    Sampaikan laporan, aspirasi, atau pengaduan Anda terkait bidang Keuangan Daerah, 
                                    Perindustrian dan Perdagangan, Koperasi dan UMKM, Energi dan Sumber Daya Mineral, 
                                    serta Pariwisata dan Ekonomi Kreatif.
                                </p>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            {auth.user ? (
                                <Link
                                    href="/user/reports/create"
                                    className="inline-flex items-center px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl hover:bg-sky-50 transition-colors"
                                >
                                    Buat Laporan
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    href="/register"
                                    className="inline-flex items-center px-6 py-3 bg-white text-sky-600 font-semibold rounded-xl hover:bg-sky-50 transition-colors"
                                >
                                    Daftar untuk Melapor
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
