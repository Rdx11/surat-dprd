import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import BannerSlider from '@/Components/BannerSlider';
import ServiceCard from '@/Components/ServiceCard';
import { ArrowRight, Image, Clock, MapPin, Phone } from 'lucide-react';

export default function Home({ services, galleries, officeInfo, banners }) {
    return (
        <PublicLayout>
            <Head title="Beranda - DPRD Sumbawa" />

            {/* Banner Slider */}
            <BannerSlider banners={banners} />

            {/* Info Cards */}
            <section className="py-8 bg-white border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start space-x-4 p-4 bg-sky-50 rounded-xl">
                            <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Jam Operasional</h3>
                                <p className="text-sm text-gray-600 whitespace-pre-line">
                                    {officeInfo?.working_hours || 'Senin - Kamis: 08.00 - 14.00 WITA\nJumat: 08.00 - 16.00 WITA'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-sky-50 rounded-xl">
                            <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Alamat Kantor</h3>
                                <p className="text-sm text-gray-600">
                                    {officeInfo?.address || 'Jl. Lintas Sumbawa-Bima Km.5 Boak, Unter Iwes, Kab Sumbawa'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 p-4 bg-sky-50 rounded-xl">
                            <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Kontak</h3>
                                <p className="text-sm text-gray-600">
                                    {officeInfo?.phone || '(0371) 2020020, 2020021'}<br />
                                    {officeInfo?.email || 'dprd@sumbawakab.go.id'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Alur SOP Perjalanan Dinas</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Informasi alur SOP perjalanan dinas Komisi II DPRD Kabupaten Sumbawa
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.slice(0, 8).map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>

                    {services.length > 8 && (
                        <div className="text-center mt-10">
                            <Link
                                href="/layanan"
                                className="inline-flex items-center px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                            >
                                Lihat Semua Alur SOP
                                <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Preview */}
            {galleries.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galeri Kegiatan</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Dokumentasi kegiatan dan aktivitas DPRD Kabupaten Sumbawa
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {galleries.map((gallery) => (
                                <div
                                    key={gallery.id}
                                    className="aspect-square rounded-xl overflow-hidden"
                                >
                                    <img
                                        src={`/storage/${gallery.image_path}`}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/galeri"
                                className="inline-flex items-center px-6 py-3 border-2 border-sky-500 text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
                            >
                                <Image size={18} className="mr-2" />
                                Lihat Galeri Lengkap
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-sky-500">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Butuh Bantuan?
                    </h2>
                    <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
                        Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut, 
                        jangan ragu untuk menghubungi kami.
                    </p>
                    <Link
                        href="/kontak"
                        className="inline-flex items-center px-8 py-4 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
                    >
                        Hubungi Kami
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </section>
        </PublicLayout>
    );
}
