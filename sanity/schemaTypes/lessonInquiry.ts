import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lessonInquiry',
  title: 'Lesson Inquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' }
        ]
      }
    }),
    defineField({
      name: 'lessonType',
      title: 'Lesson Type Preference',
      type: 'string',
      options: {
        list: [
          { title: 'In-Person', value: 'in-person' },
          { title: 'Online (Zoom/Skype)', value: 'online' },
          { title: 'Either', value: 'either' }
        ]
      }
    }),
    defineField({
      name: 'goals',
      title: 'What are your musical goals?',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'availability',
      title: 'Preferred Days/Times',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'message',
      title: 'Additional Information',
      type: 'text',
      rows: 4
    }),
    defineField({
      name: 'status',
      title: 'Inquiry Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Declined', value: 'declined' }
        ]
      },
      initialValue: 'new'
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes for tracking this inquiry',
      rows: 3
    })
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      status: 'status',
      date: 'submittedAt'
    },
    prepare(selection) {
      const { name, email, status, date } = selection
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: name,
        subtitle: `${email} - ${status} (${formattedDate})`
      }
    }
  },
  orderings: [
    {
      title: 'Submission Date, New',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }]
    }
  ]
})