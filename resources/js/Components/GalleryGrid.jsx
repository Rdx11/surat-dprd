import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryGrid({ galleries }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? galleries.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === galleries.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleries.map((gallery, index) => (
                    <div
                        key={gallery.id}
                        onClick={() => openLightbox(index)}
                        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                    >
                        <img
                            src={`/storage/${gallery.image_path}`}
                            alt={gallery.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                            <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="font-medium text-sm truncate">{gallery.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                    >
                        <X size={32} />
                    </button>

                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 text-white hover:text-gray-300 p-2"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <div className="max-w-4xl max-h-[80vh] px-16">
                        <img
                            src={`/storage/${galleries[currentIndex].image_path}`}
                            alt={galleries[currentIndex].title}
                            className="max-w-full max-h-[70vh] object-contain mx-auto"
                        />
                        <div className="text-center mt-4 text-white">
                            <h3 className="font-semibold text-lg">{galleries[currentIndex].title}</h3>
                            {galleries[currentIndex].description && (
                                <p className="text-gray-300 mt-1">{galleries[currentIndex].description}</p>
                            )}
                            <p className="text-gray-400 text-sm mt-2">
                                {currentIndex + 1} / {galleries.length}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 text-white hover:text-gray-300 p-2"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>
            )}
        </>
    );
}
