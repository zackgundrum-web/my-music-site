import { client, urlFor } from '@/lib/sanity'

async function getTourDates() {
  return client.fetch(`*[_type == "tourDate"] | order(date asc)`)
}

export default async function TourPage() {
  const tours = await getTourDates()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' })
    }
  }

  return (
    <main className="min-h-screen py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 md:mb-4">Tour Dates</h1>
          <p className="text-lg md:text-xl text-gray-400">
            Catch us live on the road
          </p>
        </div>

        {/* Tour Dates List */}
        {tours.length > 0 ? (
          <div className="space-y-4">
            {tours.map((tour: any) => {
              const dateInfo = formatDate(tour.date)
              const isSoldOut = tour.status === 'sold-out'
              const isCancelled = tour.status === 'cancelled'
              
              return (
                <div 
                  key={tour._id} 
                  className={`bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 hover:bg-gray-900 hover:border-gray-700 transition group ${isCancelled ? 'opacity-60' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    {/* Date Box */}
                    <div className="flex-shrink-0 text-center bg-black border border-gray-800 rounded-lg p-3 w-20">
                      <div className="text-purple-400 text-xs font-semibold">
                        {dateInfo.month}
                      </div>
                      <div className="text-3xl font-bold my-1">
                        {dateInfo.day}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {dateInfo.weekday}
                      </div>
                    </div>

                    {/* Venue Image (if available) */}
                    {tour.venueImage && (
                      <div className="hidden sm:block flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-800">
                        <img
                          src={urlFor(tour.venueImage).width(150).url()}
                          alt={tour.venue}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Venue Info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-xl md:text-2xl font-semibold group-hover:text-purple-400 transition">
                          {tour.venue}
                        </h3>
                        {tour.featured && (
                          <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                            ⭐ Special Show
                          </span>
                        )}
                        {isCancelled && (
                          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold">
                            Cancelled
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm md:text-base">
                        📍 {tour.city}
                      </p>
                      {tour.specialGuests && (
                        <p className="text-sm text-purple-400 mt-1">
                          🎤 With {tour.specialGuests}
                        </p>
                      )}
                      {tour.description && (
                        <p className="text-sm text-gray-500 mt-2">
                          {tour.description}
                        </p>
                      )}
                    </div>

                    {/* Ticket Button */}
                    <div className="flex-shrink-0">
                      {isCancelled ? (
                        <div className="bg-red-900/30 text-red-400 px-6 py-3 rounded-full font-semibold text-center">
                          Cancelled
                        </div>
                      ) : isSoldOut ? (
                        <div className="bg-gray-800 text-gray-500 px-6 py-3 rounded-full font-semibold text-center">
                          Sold Out
                        </div>
                      ) : tour.ticketLink ? (
                        
                         <a href={tour.ticketLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition text-center whitespace-nowrap"
                        >
                          {tour.status === 'few-left' ? 'Last Tickets!' : 'Get Tickets'}
                        </a>
                      ) : (
                        <div className="bg-gray-800 text-gray-400 px-6 py-3 rounded-full font-semibold text-center">
                          TBA
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No upcoming shows yet. Check back soon!</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 md:mt-16 text-center bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-800/30 rounded-lg p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Never Miss a Show
          </h2>
          <p className="text-gray-400 mb-6">
            Sign up to get notified when we announce new tour dates in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-full w-full sm:flex-1 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition w-full sm:w-auto whitespace-nowrap">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}