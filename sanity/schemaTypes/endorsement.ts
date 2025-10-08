export default {
  name: 'endorsement',
  title: 'Endorsement',
  type: 'document',
  fields: [
    {
      name: 'brand',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'product',
      title: 'Product/Category',
      type: 'string',
      description: 'e.g., Guitars, Amplifiers, Cymbals',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional details about the endorsement',
    },
    {
      name: 'website',
      title: 'Brand Website',
      type: 'url',
      description: 'Optional link to brand website',
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
      title: 'brand',
      subtitle: 'product',
      media: 'logo',
    },
  },
}