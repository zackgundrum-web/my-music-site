import { client, urlFor } from '@/lib/sanity'

async function getAlbums() {
  return client.fetch(`*[_type == "album"] | order(releaseDate desc)`)
}

export default async function MusicPage() {
  const albums = await getAlbums()

  return (
    <main className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">Music</h1>
          <p className="text-lg md:text-xl text-gray-400">
            Explore our complete discography
          </p>
        </div>
        
        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {albums.map((album: any) => (
            <div key={album._id} className="group cursor-pointer">
              {/* Album Cover */}
              <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-900 shadow-xl">
                <img
                  src={urlFor(album.coverImage).width(500).url()}
                  alt={album.title}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Album Info */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-gray-300 transition">
                  {album.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  {album.artist}
                </p>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {new Date(album.releaseDate).getFullYear()}
                </p>
                {album.description && (
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                    {album.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {albums.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl md:text-2xl text-gray-500">
              No albums yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  )
}