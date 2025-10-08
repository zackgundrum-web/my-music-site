export default {
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Album Title',
      type: 'string',
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'string',
    },
    {
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}