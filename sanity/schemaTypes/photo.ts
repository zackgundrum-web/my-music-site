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
      description: 'Featured photos appear first',
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
      media: 'image'
    }
  }
}