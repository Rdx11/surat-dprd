import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactInfo({ officeInfo }) {
    return (
        <div className="space-y-6">
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600">{officeInfo?.address || 'Jl. Lintas Sumbawa-Bima Km.5 Boak, Unter Iwes, Kabupaten Sumbawa'}</p>
                </div>
            </div>

            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
                    <p className="text-gray-600">{officeInfo?.phone || '(0371) 2020020, 2020021'}</p>
                </div>
            </div>

            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">{officeInfo?.email || 'dprd@sumbawakab.go.id'}</p>
                </div>
            </div>

            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Jam Operasional</h3>
                    <p className="text-gray-600 whitespace-pre-line">
                        {officeInfo?.working_hours || 'Senin - Kamis: 08.00 - 14.00 WITA\nJumat: 08.00 - 16.00 WITA'}
                    </p>
                </div>
            </div>
        </div>
    );
}
