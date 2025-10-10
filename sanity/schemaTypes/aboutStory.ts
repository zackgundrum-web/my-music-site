import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutStory',
  title: 'About Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'The main heading for the story section',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Story Content',
      type: 'array',
      description: 'Add multiple paragraphs for your story',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' }
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' }
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
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only one story should be active at a time',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'isActive'
    },
    prepare(selection) {
      const { title, active } = selection
      return {
        title: title,
        subtitle: active ? '✅ Active' : '❌ Inactive'
      }
    }
  }
})