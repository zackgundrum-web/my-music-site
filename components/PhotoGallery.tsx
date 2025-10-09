'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface Photo {
  _id: string;
  title: string;
  image: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  caption?: string;
  date?: string;
  location?: string;
  featured: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  initialDisplayCount: number;
}

export default function PhotoGallery({ photos, initialDisplayCount }: PhotoGalleryProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const displayedPhotos = photos.slice(0, displayCount);
  const hasMore = displayCount < photos.length;

  const handleViewMore = () => {
    setDisplayCount(prev => Math.min(prev + initialDisplayCount, photos.length));
  };

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(p => p._id === selectedPhoto._id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayedPhotos.map((photo) => {
          const imageUrl = urlFor(photo.image).width(600).height(600).fit('crop').url();
          
          return (
            <div
              key={photo._id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-900 transition-transform hover:scale-105"
              onClick={() => openLightbox(photo)}
            >
              <Image
                src={imageUrl}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-opacity group-hover:opacity-80"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm md:text-base truncate">
                    {photo.title}
                  </p>
                  {photo.location && (
                    <p className="text-gray-300 text-xs md:text-sm truncate">
                      {photo.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleViewMore}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            View More Photos
          </button>
        </div>
      )}

      {/* Lightbox Overlay */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 text-white text-5xl hover:text-gray-300 transition-colors z-10 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('prev');
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          
          <button
            className="absolute right-4 text-white text-5xl hover:text-gray-300 transition-colors z-10 hidden md:block"
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('next');
            }}
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-1 flex items-center justify-center min-h-0">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={urlFor(selectedPhoto.image).width(2000).url()}
                  alt={selectedPhoto.title}
                  width={2000}
                  height={2000}
                  className="max-w-full max-h-[calc(90vh-200px)] w-auto h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Photo Info */}
            <div className="bg-black/80 p-6 rounded-lg mt-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {selectedPhoto.title}
              </h3>
              {selectedPhoto.caption && (
                <p className="text-gray-300 mb-2">{selectedPhoto.caption}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {selectedPhoto.location && <span>📍 {selectedPhoto.location}</span>}
                {selectedPhoto.date && (
                  <span>📅 {new Date(selectedPhoto.date).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}