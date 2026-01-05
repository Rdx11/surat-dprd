import { Link } from '@inertiajs/react';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';

export default function Hero({ officeInfo }) {
    return (
        <section className="relative bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm mb-6">
                            <span className="w-2 h-2 bg-sky-300 rounded-full mr-2 animate-pulse"></span>
                            Portal Informasi alur SOP Perjalanan Komisi II DPRD Sumbawa
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Komisi II DPRD<br />
                            <span className="text-sky-200">Kabupaten Sumbawa</span>
                        </h1>
                        <p className="text-lg text-sky-100 mb-8 max-w-lg">
                            Bidang Ekonomi Keuangan dan Industri
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/layanan"
                                className="inline-flex items-center px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
                            >
                                Lihat Layanan
                                <ArrowRight size={18} className="ml-2" />
                            </Link>
                            <Link
                                href="/kontak"
                                className="inline-flex items-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Jam Operasional</h3>
                                    <p className="text-sm text-sky-100 whitespace-pre-line">
                                        {officeInfo?.working_hours || 'Senin - Kamis: 08.00 - 14.00 WITA\nJumat: 08.00 - 16.00 WITA'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Alamat Kantor</h3>
                                    <p className="text-sm text-sky-100">
                                        {officeInfo?.address || 'Jl. Lintas Sumbawa-Bima Km.5 Boak, Unter Iwes, Kab Sumbawa'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Kontak</h3>
                                    <p className="text-sm text-sky-100">
                                        {officeInfo?.phone || '(0371) 2020020, 2020021'}<br />
                                        {officeInfo?.email || 'dprd@sumbawakab.go.id'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
