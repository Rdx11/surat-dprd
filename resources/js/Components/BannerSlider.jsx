import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BannerSlider({ banners }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (banners.length === 0) {
        return (
            <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Komisi II DPRD Kabupaten Sumbawa</h1>
                    <p className="text-sky-100">Bidang Ekonomi Keuangan dan Industri</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
            {/* Slides */}
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {banners.map((banner, index) => (
                    <div key={banner.id} className="min-w-full h-full relative">
                        <img
                            src={`/storage/${banner.image_path}`}
                            alt={banner.title || `Banner ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30" />
                        
                        {/* Content */}
                        {(banner.title || banner.subtitle) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center text-white px-4 max-w-4xl">
                                    {banner.title && (
                                        <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                            {banner.title}
                                        </h2>
                                    )}
                                    {banner.subtitle && (
                                        <p className="text-lg md:text-xl text-white/90 drop-shadow-md">
                                            {banner.subtitle}
                                        </p>
                                    )}
                                    {banner.link && (
                                        <Link
                                            href={banner.link}
                                            className="inline-block mt-6 px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                                        >
                                            Selengkapnya
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {banners.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
