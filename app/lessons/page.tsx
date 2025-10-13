import { Metadata } from 'next'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import LessonInquiryForm from '@/components/LessonInquiryForm'

export const metadata: Metadata = {
  title: 'Guitar Lessons with Cody Nierstedt | Professional Guitarist & Educator',
  description: 'Take your playing to the next level with guitar lessons from Cody Nierstedt — guitarist for Wu-Tang Clan. Perfect for intermediate, beginner, and advanced players.',
}

async function getLessonsBackgroundPhoto() {
  return client.fetch(`*[_type == "photo" && lessonsBackground == true][0]`)
}

export default async function LessonsPage() {
  const backgroundPhoto = await getLessonsBackgroundPhoto()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero + Main Content Section with Background */}
      <div className="relative">
        {/* Background Image */}
        {backgroundPhoto && (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                src={urlFor(backgroundPhoto.image).width(2000).url()}
                alt={backgroundPhoto.title || 'Guitar lessons background'}
                fill
                className="object-cover opacity-40 [1893px]:opacity-100"
                priority
              />
            </div>
            {/* Dark overlay for screens smaller than 1893px */}
            <div className="absolute inset-0 bg-black/60 z-0 [1893px]:hidden" />
          </>
        )}
        
        {/* Fallback gradient if no image */}
        {!backgroundPhoto && (
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
        )}

        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
              Guitar Lessons with Cody Nierstedt
            </h1>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-8 md:p-12">
              <div className="text-gray-300 leading-relaxed space-y-6 text-lg">
                <p>
                  Take your playing to the next level with professional guitarist and producer{' '}
                  <strong className="text-white">Cody Nierstedt</strong>, known for his work with the{' '}
                  <strong className="text-white">Wu-Tang Clan</strong>, <em>Flatbush Zombies</em>, and more.
                  Cody combines formal training in <strong className="text-white">classical and jazz guitar</strong>{' '}
                  with real-world touring and recording experience to help players refine
                  their technique, creativity, and confidence.
                </p>
                <p>
                  These <strong className="text-white">private guitar lessons</strong> are ideal for{' '}
                  <strong className="text-white">intermediate guitarists</strong> looking to expand their tone,
                  theory, and improvisation—but also support <strong className="text-white">beginners</strong>{' '}
                  building fundamentals and <strong className="text-white">advanced players</strong> mastering
                  stage and studio performance.
                </p>
                <p>
                  Whether you're focused on <strong className="text-white">rock, hip-hop, metal, or film scoring</strong>,
                  Cody's lessons adapt to your goals and style. Start improving your technique,
                  writing, and sound today.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Inquiry Form */}
      <section className="py-12 md:py-20 border-t border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and I'll get back to you within 24-48 hours to discuss your goals and schedule your first lesson.
            </p>
          </div>
          <LessonInquiryForm />
        </div>
      </section>
    </main>
  )
}