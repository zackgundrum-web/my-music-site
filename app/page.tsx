import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import NewsletterForm from '@/components/NewsletterForm'
import HeroVideo from '@/components/HeroVideo'

interface Album {
  _id: string
  title: string
  artist: string
  coverImage: any
  spotifyLink?: string
  releaseDate: string
}

interface HeroVideoType {
  _id: string
  title: string
  videoUrl: string
  loopStart?: number
  loopEnd?: number
  volume?: number
  playbackSpeed?: number
  thumbnail?: any
  altText?: string
}

async function getAlbums(): Promise<Album[]> {
  return client.fetch(`*[_type == "album"] | order(releaseDate desc)[0...3]`)
}

async function getHeroVideo(): Promise<HeroVideoType | null> {
  return client.fetch(`*[_type == "video" && featured == true][0]{
    _id,
    title,
    "videoUrl": videoFile.asset->url,
    loopStart,
    loopEnd,
    volume,
    playbackSpeed,
    thumbnail,
    altText
  }`)
}

export default async function Home() {
  const albums = await getAlbums()
  const heroVideo = await getHeroVideo()

  return (
    <main className="min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center bg-black px-4">
        {/* Background Video */}
        {heroVideo && (
          <>
            <HeroVideo video={heroVideo} />
            {/* Dark overlay for screens smaller than 1080p */}
            <div className="absolute inset-0 bg-black/50 z-[1]" />
          </>
        )}

        {/* Hero Content */}
        <div className="text-center max-w-4xl relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6">
            Cody Nierstedt
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 px-4">
            Guitarist, songwriter, producer, and Film score Composer known for his dynamic collaborations with hip-hop's most legendary artists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link 
              href="/about" 
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition text-center"
            >
              About Me
            </Link>
            <Link 
              href="/lessons" 
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition text-center"
            >
              Book a Lesson
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {albums.map((album) => (
              <div key={album._id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={urlFor(album.coverImage).width(400).url()}
                    alt={album.title}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {album.spotifyLink ? (
                      <a 
                        href={album.spotifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform"
                      >
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </a>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl">
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-semibold">{album.title}</h2>
                <p className="text-gray-400">{album.artist}</p>
                {album.spotifyLink && (
                  <a 
                    href={album.spotifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm text-green-500 hover:text-green-400 transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Play on Spotify
                  </a>
                )}
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