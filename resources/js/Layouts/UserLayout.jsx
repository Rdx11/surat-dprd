import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Menu, X, Home, FileText, LogOut, ChevronDown, User
} from 'lucide-react';

export default function UserLayout({ children, header }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/user/dashboard', icon: Home },
        { name: 'Laporan Saya', href: '/user/reports', icon: FileText },
    ];

    const isActive = (href) => url.startsWith(href);

    return (
        <div className="min-h-screen bg-gray-100">
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 transform transition-transform lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <Link href="/user/dashboard" className="flex items-center space-x-2">
                        <img 
                            src="/logo/logo.jpeg" 
                            alt="Logo" 
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="font-bold text-gray-900">User Panel</span>
                    </Link>
                    <button 
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive(item.href)
                                    ? 'bg-sky-50 text-sky-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <item.icon size={18} className="mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
                    <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                        <Home size={18} className="mr-3" />
                        Kembali ke Website
                    </Link>
                </div>
            </aside>

            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 bg-white shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex-1 lg:flex-none">
                            {header && (
                                <h1 className="text-lg font-semibold text-gray-900">{header}</h1>
                            )}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-sky-600" />
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                                        {auth.user.name}
                                    </span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </button>

                                {userMenuOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-10"
                                            onClick={() => setUserMenuOpen(false)}
                                        />
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
                                            <div className="px-4 py-3 border-b">
                                                <p className="text-sm font-medium text-gray-900">{auth.user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{auth.user.email}</p>
                                            </div>
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut size={16} className="mr-3" />
                                                Logout
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {flash?.success && (
                    <div className="mx-4 lg:mx-8 mt-4">
                        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                            {flash.success}
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="mx-4 lg:mx-8 mt-4">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {flash.error}
                        </div>
                    </div>
                )}

                <main className="p-4 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
