export default {
  name: 'tourDate',
  title: 'Tour Date',
  type: 'document',
  fields: [
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'venue',
      title: 'Venue Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'city',
      title: 'City/Location',
      type: 'string',
      description: 'e.g., Los Angeles, CA or Brooklyn, NY',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'Link to buy tickets',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'On Sale', value: 'on-sale' },
          { title: 'Few Tickets Left', value: 'few-left' },
          { title: 'Sold Out', value: 'sold-out' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'on-sale',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'venueImage',
      title: 'Venue Image',
      type: 'image',
      description: 'Optional image of the venue',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'specialGuests',
      title: 'Special Guests',
      type: 'string',
      description: 'Supporting acts or special guests',
    },
    {
      name: 'featured',
      title: 'Featured Show',
      type: 'boolean',
      description: 'Highlight this as a special show',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Show Description',
      type: 'text',
      description: 'Optional details about the show',
    },
  ],
  preview: {
    select: {
      title: 'venue',
      subtitle: 'city',
      date: 'date',
      media: 'venueImage',
    },
    prepare(selection: any) {
      const { title, subtitle, date } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${subtitle} - ${formattedDate}`,
      }
    },
  },
}