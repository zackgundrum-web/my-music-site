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
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'}
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'}
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL'
              }
            ]
          }
        ]
      }
    }
  ]
},
    {
      name: 'spotifyLink',
      title: 'Spotify Link',
      type: 'url',
      description: 'Link to this album on Spotify',
    },
  ],
}