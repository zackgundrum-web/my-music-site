// sanity/schemaTypes/photo.ts
export default {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 3
    },
    {
      name: 'date',
      title: 'Date Taken',
      type: 'date'
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Featured photos appear first in gallery',
      initialValue: false
    },
    {
      name: 'lessonsBackground',
      title: 'Lessons Page Background',
      type: 'boolean',
      description: 'Use this photo as the background for the lessons page hero section',
      initialValue: false
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first'
    }
  ],
  orderings: [
    {
      title: 'Featured, then Order',
      name: 'featuredOrder',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'order', direction: 'asc'},
        {field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Date (Newest First)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'image',
      featured: 'featured',
      lessonsBackground: 'lessonsBackground'
    },
    prepare(selection: any) {
      const { title, subtitle, featured, lessonsBackground } = selection
      const badges = []
      if (featured) badges.push('⭐ Featured')
      if (lessonsBackground) badges.push('🎸 Lessons BG')
      
      return {
        title: title,
        subtitle: badges.length > 0 ? `${subtitle || ''} ${badges.join(' ')}` : subtitle
      }
    }
  }
}