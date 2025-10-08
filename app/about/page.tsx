import { client, urlFor } from '@/lib/sanity'

async function getMusicians() {
  return client.fetch(`*[_type == "musician"] | order(_createdAt asc)`)
}

async function getEndorsements() {
  return client.fetch(`*[_type == "endorsement"] | order(order asc)`)
}

async function getBandCollaborations() {
  return client.fetch(`*[_type == "bandCollaboration"] | order(order asc)`)
}

export default async function AboutPage() {
  const musicians = await getMusicians()
  const endorsements = await getEndorsements()
  const bands = await getBandCollaborations()

  return (
    <main className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">Who am I, and why am I here?</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-justify">
           <b>Cody Nierstedt</b> \ˈkō-dē ˈnir-ˌsted\<i> noun.</i><br></br> : guitarist, songwriter, producer, and Film score composer known for his dynamic collaborations with hip-hop’s most legendary artists.
          </p>
        </div>

        {/* Band Story Section */}
        <section className="mb-16 md:mb-24">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-6 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-base md:text-lg">
    As the live guitarist for the Wu-Tang Clan, Cody performed on the group’s historic Las Vegas Residency — the first-ever hip-hop residency — and toured internationally on both the NY State of Mind Tour (captured for Amazon Prime) and The Final Chamber Tour, which included a milestone performance at Madison Square Garden.
Cody has shared the stage with RZA, GZA, Ghostface Killah, Method Man, Raekwon the Chef, Inspectah Deck, U-God, Masta Killa, Cappadonna, Young Dirty Bastard, Redman, DJ Mathematics, Nas, De La Soul, DJ Scratch, Dave Chapelle, Flava Flav, Mary J. Blige, LL Cool J, Havoc of Mobb Deep, Lil’ Kim, Slick Rick, The Lox, Big Daddy Kane, SWV, Freeway, Ricky Armellino (Ice Nine Kills) and HAWK. Beyond the stage, his work can be heard scoring Hulu’s Wu-Tang: An American Saga and on RZA’s Bobby Digital and the Pit of Snakes.
His playing and career highlights have been featured twice by Guitar World magazine — both in a digital spotlight and in their prestigious end-of-2024 print edition — cementing his status as one of the most versatile and respected guitarists in modern music.
              </p>

              
              <p className="text-base md:text-lg">

              </p>
            </div>
          </div>
        </section>

        {/* Musicians Worked With Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            Musicians I've Worked With
          </h2>
          {musicians.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {musicians.map((musician: any) => (
                <div 
                  key={musician._id} 
                  className="text-center group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-full mb-4 bg-gray-900 border-4 border-gray-800 group-hover:border-purple-600 transition-all mx-auto w-32 h-32 md:w-40 md:h-40">
                    {musician.image ? (
                      <img
                        src={urlFor(musician.image).width(200).url()}
                        alt={musician.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        🎵
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-purple-400 transition">
                    {musician.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-400">
                    {musician.role}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No musicians added yet. Add them in Sanity Studio!
            </p>
          )}
        </section>

        {/* Endorsements Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            Proud Endorsements
          </h2>
          {endorsements.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                {endorsements.map((endorsement: any) => (
                  <div 
                    key={endorsement._id} 
                    className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center hover:bg-gray-900 hover:border-purple-600 transition group"
                  >
                    <div className="mb-3 h-16 flex items-center justify-center">
                      {endorsement.logo ? (
                        <img
                          src={urlFor(endorsement.logo).width(200).url()}
                          alt={endorsement.brand}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="text-4xl">🎸</div>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-1">
                      {endorsement.brand}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400">
                      {endorsement.product}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 mt-8 text-sm md:text-base">
                We're honored to use and endorse the best gear in the industry
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No endorsements added yet. Add them in Sanity Studio!
            </p>
          )}
        </section>

        {/* Bands Worked With Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
            Bands I've Shared the Stage With
          </h2>
          {bands.length > 0 ? (
            <div className="space-y-4">
              {bands.map((band: any) => (
                <div 
                  key={band._id}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-900 hover:border-purple-600 transition group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Band Logo (if available) */}
                    {band.bandLogo && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-800">
                        <img
                          src={urlFor(band.bandLogo).width(100).url()}
                          alt={band.bandName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-xl md:text-2xl font-semibold group-hover:text-purple-400 transition">
                          {band.bandName}
                        </h3>
                        {band.featured && (
                          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-gray-400">
                        📍 {band.venue}
                      </p>
                      {band.type && (
                        <p className="text-xs md:text-sm text-gray-500 mt-1">
                          {band.type === 'opened' && '🎤 Opened For'}
                          {band.type === 'coheadlined' && '🎸 Co-Headlined'}
                          {band.type === 'festival' && '🎪 Festival'}
                          {band.type === 'tour' && '🚐 Tour'}
                        </p>
                      )}
                      {band.description && (
                        <p className="text-sm text-gray-500 mt-2">
                          {band.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <span className="inline-block bg-purple-900/30 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                        {band.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No band collaborations added yet. Add them in Sanity Studio!
            </p>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Work Together?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm always looking to collaborate with talented musicians, producers, 
            and venues. Get in touch with me!
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition text-base md:text-lg">
            Contact Us
          </button>
        </section>

      </div>
    </main>
  )
}