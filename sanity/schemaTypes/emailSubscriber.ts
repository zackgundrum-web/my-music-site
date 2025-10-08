export default {
  name: 'emailSubscriber',
  title: 'Email Subscriber',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where did they subscribe from?',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Tour Page', value: 'tour' },
          { title: 'About Page', value: 'about' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
        ],
      },
      initialValue: 'active',
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt',
      status: 'status',
    },
    prepare(selection: any) {
      const { title, subscribedAt, status } = selection
      const date = subscribedAt ? new Date(subscribedAt).toLocaleDateString() : 'Unknown'
      return {
        title: title,
        subtitle: `${status} - ${date}`,
      }
    },
  },
}