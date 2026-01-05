import { Link } from '@inertiajs/react';
import { FileText, FileCheck, Search, Shield, Home, RefreshCw, Database, ArrowRight } from 'lucide-react';

const iconMap = {
    FileText,
    FileCheck,
    Search,
    Shield,
    Home,
    RefreshCw,
    Database,
};

export default function ServiceCard({ service }) {
    const IconComponent = iconMap[service.icon] || FileText;

    return (
        <Link
            href={`/layanan/${service.slug}`}
            className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-sky-200 transition-all duration-300"
        >
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-sky-500 transition-colors">
                <IconComponent className="w-6 h-6 text-sky-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                {service.name}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                {service.description}
            </p>
            <div className="flex items-center text-sky-600 text-sm font-medium">
                <span>Lihat Detail</span>
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}
