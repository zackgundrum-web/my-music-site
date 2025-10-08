import { client, urlFor } from '@/lib/sanity'
import ExpandableDescription from '@/components/ExpandableDescription'

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div key={album._id} className="group bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800 hover:border-purple-600 transition">
              {/* Album Cover */}
              <div className="relative overflow-hidden bg-gray-900">
                <img
                  src={urlFor(album.coverImage).width(500).url()}
                  alt={album.title}
                  className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Spotify Play Button Overlay */}
                {album.spotifyLink && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    
                      <a href={album.spotifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform"
                    >
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Album Info */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-purple-400 transition">
                  {album.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base mb-1">
                  {album.artist}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(album.releaseDate).getFullYear()}
                </p>

               {/* Expandable Description */}
{album.description && album.description.length > 0 && (
  <ExpandableDescription description={album.description} />
)}

                {/* Spotify Link */}
                {album.spotifyLink && (
                  
                    <a href={album.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm md:text-base text-green-500 hover:text-green-400 transition font-semibold"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Listen on Spotify
                  </a>
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