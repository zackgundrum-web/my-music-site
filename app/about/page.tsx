import { client, urlFor } from '@/lib/sanity'
import NewsletterForm from '@/components/NewsletterForm'
import PortableText from '@/components/PortableText'

async function getMusicians() {
  return client.fetch(`*[_type == "musician"] | order(_createdAt asc)`)
}

async function getEndorsements() {
  return client.fetch(`*[_type == "endorsement"] | order(order asc)`)
}

async function getBandCollaborations() {
  return client.fetch(`*[_type == "bandCollaboration"] | order(order asc)`)
}

async function getAboutStory() {
  return client.fetch(`*[_type == "aboutStory" && isActive == true][0]`)
}

export default async function AboutPage() {
  const musicians = await getMusicians()
  const endorsements = await getEndorsements()
  const bands = await getBandCollaborations()
  const story = await getAboutStory()

  return (
    <main className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">{"Who am I, and why am I here?"}</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-justify">
           <b>Cody Nierstedt</b>  \ˈkō-dē ˈnir-ˌsted\ <i> noun.</i><br></br> : guitarist, songwriter, producer, and Film score composer known for his dynamic collaborations with hip-hop's most legendary artists.
          </p>
        </div>

        {/* Band Story Section */}
        <section className="mb-16 md:mb-24">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-6 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {story?.title || "My Story"}
            </h2>
            <div className="text-gray-300 leading-relaxed">
              {story?.content ? (
                <PortableText value={story.content} />
              ) : (
                <p className="text-gray-500">
                  No story content yet. Add it in Sanity Studio!
                </p>
              )}
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
                I'm honored to use and endorse the best gear in the industry
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No endorsements added yet. Add them in Sanity Studio!
            </p>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {"Get exclusive updates about my music, tour dates, and behind-the-scenes content"}
          </p>
          <NewsletterForm source="about" buttonColor="white" />
        </section>

      </div>
    </main>
  )
}