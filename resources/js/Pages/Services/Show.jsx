import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FileText, ArrowLeft, ChevronRight } from 'lucide-react';

export default function ServiceShow({ service }) {
    return (
        <PublicLayout>
            <Head title={`${service.name} - DPRD Sumbawa`} />

            {/* Breadcrumb */}
            <div className="bg-white border-b">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-sky-600">Beranda</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link href="/layanan" className="hover:text-sky-600">Alur SOP</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="text-gray-900 font-medium">{service.name}</span>
                    </nav>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    href="/layanan"
                    className="inline-flex items-center text-gray-600 hover:text-sky-600 mb-6"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Kembali ke Daftar Alur SOP
                </Link>

                {/* Service Header */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileText className="w-7 h-7 text-sky-600" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                {service.name}
                            </h1>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-sky max-w-none">
                        <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {service.description}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
