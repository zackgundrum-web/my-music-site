import { client } from '@/lib/sanity';
import { Metadata } from 'next';
import PhotoGallery from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Gallery | I Don\'t Wanna Die Ever',
  description: 'Photos and videos from I Don\'t Wanna Die Ever',
};

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

async function getPhotos(): Promise<Photo[]> {
  const query = `*[_type == "photo"] | order(featured desc, order asc, date desc) {
    _id,
    title,
    image {
      asset-> {
        _ref,
        url
      }
    },
    caption,
    date,
    location,
    featured
  }`;
  
  return client.fetch(query);
}

export default async function GalleryPage() {
  const photos = await getPhotos();

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 text-white">
             Gallery
             </h1>
          <p className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mx-auto">
            Photos and moments from my journey
          </p>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Photos</h2>
          <PhotoGallery photos={photos} initialDisplayCount={12} />
        </div>
      </section>

      {/* Videos Section - Placeholder for now */}
      <section className="py-12 md:py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Videos</h2>
          <p className="text-gray-400 text-center py-12">Coming soon...</p>
        </div>
      </section>
    </main>
  );
}