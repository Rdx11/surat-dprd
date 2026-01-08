import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, Home, FileText, Image, Phone, ChevronRight, MessageSquare } from 'lucide-react';

export default function PublicLayout({ children, title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { url } = usePage();
    const { auth } = usePage().props;

    const navigation = [
        { name: 'Beranda', href: '/', icon: Home },
        { name: 'Alur SOP', href: '/layanan', icon: FileText },
        { name: 'Pelaporan', href: auth?.user ? '/user/reports' : '/login', icon: MessageSquare },
        { name: 'Galeri', href: '/galeri', icon: Image },
        { name: 'Kontak', href: '/kontak', icon: Phone },
    ];

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3">
                                <img 
                                    src="/logo/logo.jpeg" 
                                    alt="Logo DPRD Sumbawa" 
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div className="hidden sm:block">
                                    <p className="font-bold text-gray-900 text-sm">DPRD Sumbawa</p>
                                    <p className="text-xs text-gray-500">Komisi II</p>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive(item.href)
                                            ? 'bg-sky-50 text-sky-600'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 border-t">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                                        isActive(item.href)
                                            ? 'bg-sky-50 text-sky-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <item.icon size={18} className="mr-3" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>
            </header>

            {/* Breadcrumb */}
            {title && (
                <div className="bg-white border-b">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                        <nav className="flex items-center text-sm text-gray-500">
                            <Link href="/" className="hover:text-sky-600">Beranda</Link>
                            <ChevronRight size={14} className="mx-2" />
                            <span className="text-gray-900 font-medium">{title}</span>
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <img 
                                    src="/logo/logo.jpeg" 
                                    alt="Logo DPRD Sumbawa" 
                                    className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                    <p className="font-bold">DPRD Sumbawa</p>
                                    <p className="text-sm text-gray-400">Komisi II</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Portal informasi alur SOP perjalanan dinas Komisi II DPRD Kabupaten Sumbawa.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Navigasi</h3>
                            <ul className="space-y-2">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-400 hover:text-white text-sm">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Kontak</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Jl. Lintas Sumbawa-Bima Km.5 Boak, Unter Iwes</li>
                                <li>Telp: (0371) 2020020, 2020021</li>
                                <li>Email: dprd@sumbawakab.go.id</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; {new Date().getFullYear()} DPRD Kabupaten Sumbawa. Hak Cipta Dilindungi.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
