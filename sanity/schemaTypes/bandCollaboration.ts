export default {
  name: 'bandCollaboration',
  title: 'Band Collaboration',
  type: 'document',
  fields: [
    {
      name: 'bandName',
      title: 'Band Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Where you performed together',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'Year of the collaboration',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Full Date',
      type: 'date',
      description: 'Exact date of performance (optional)',
    },
    {
      name: 'type',
      title: 'Collaboration Type',
      type: 'string',
      options: {
        list: [
          { title: 'Opened For', value: 'opened' },
          { title: 'Co-Headlined', value: 'coheadlined' },
          { title: 'Festival', value: 'festival' },
          { title: 'Tour', value: 'tour' },
        ],
      },
    },
    {
      name: 'bandLogo',
      title: 'Band Logo/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional details about the show or collaboration',
    },
    {
      name: 'featured',
      title: 'Featured Collaboration',
      type: 'boolean',
      description: 'Highlight this as a major collaboration',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
  ],
  preview: {
    select: {
      title: 'bandName',
      subtitle: 'venue',
      media: 'bandLogo',
      year: 'year',
    },
    prepare(selection: any) {
      const { title, subtitle, media, year } = selection
      return {
        title: title,
        subtitle: `${subtitle} (${year})`,
        media: media,
      }
    },
  },
}