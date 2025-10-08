import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import NewsletterForm from '@/components/NewsletterForm'

async function getAlbums() {
  return client.fetch(`*[_type == "album"] | order(releaseDate desc)[0...3]`)
}

export default async function Home() {
  const albums = await getAlbums()

  return (
    <main className="min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-black px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
            Cody Nierstedt
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 px-4">
            short description
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link 
              href="/about" 
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition text-center"
            >
              About Me
            </Link>
            <Link 
              href="/music" 
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition text-center"
            >
              Listen Now
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Music Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            Latest Releases
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {albums.map((album: any) => (
              <div key={album._id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-900 shadow-lg">
                  <img
                    src={urlFor(album.coverImage).width(600).url()}
                    alt={album.title}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-1">{album.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{album.artist}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/music" 
              className="text-base md:text-lg text-gray-300 hover:text-white underline inline-block"
            >
              View All Music →
            </Link>
          </div>
        </div>
      </section>


<section className="py-12 md:py-20 px-4 bg-gradient-to-b from-black to-purple-900/20">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
      Join Our Community
    </h2>
    <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 px-4">
      Get exclusive updates, early access to tickets, and more
    </p>
    <NewsletterForm source="homepage" buttonColor="white" />
  </div>
</section>
    </main>
  )
}