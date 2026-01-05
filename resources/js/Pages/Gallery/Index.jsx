import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import GalleryGrid from '@/Components/GalleryGrid';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryIndex({ galleries }) {
    return (
        <PublicLayout title="Galeri">
            <Head title="Galeri - DPRD Sumbawa" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Galeri Kegiatan</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Dokumentasi kegiatan dan aktivitas DPRD Kabupaten Sumbawa
                    </p>
                </div>

                {/* Gallery Grid */}
                {galleries.data.length > 0 ? (
                    <>
                        <GalleryGrid galleries={galleries.data} />

                        {/* Pagination */}
                        {galleries.last_page > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-10">
                                {galleries.prev_page_url && (
                                    <Link
                                        href={galleries.prev_page_url}
                                        className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                                    >
                                        <ChevronLeft size={18} className="mr-1" />
                                        Sebelumnya
                                    </Link>
                                )}
                                
                                <span className="px-4 py-2 text-gray-600">
                                    Halaman {galleries.current_page} dari {galleries.last_page}
                                </span>

                                {galleries.next_page_url && (
                                    <Link
                                        href={galleries.next_page_url}
                                        className="flex items-center px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                                    >
                                        Selanjutnya
                                        <ChevronRight size={18} className="ml-1" />
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada foto</h3>
                        <p className="text-gray-500">Galeri foto akan segera tersedia</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
