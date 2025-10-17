// schemas/video.js
export default {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'featured',
      title: 'Featured (Hero Video)',
      type: 'boolean',
      description: 'Set as the hero background video',
      initialValue: false
    },
    {
      name: 'loopStart',
      title: 'Loop Start Time (seconds)',
      type: 'number',
      description: 'When the video should start looping (in seconds)',
      validation: Rule => Rule.min(0).precision(2),
      initialValue: 0
    },
    {
      name: 'loopEnd',
      title: 'Loop End Time (seconds)',
      type: 'number',
      description: 'When the video should loop back to start (in seconds)',
      validation: Rule => Rule.min(0).precision(2).custom((loopEnd, context) => {
        const loopStart = context.document?.loopStart || 0
        if (loopEnd && loopEnd <= loopStart) {
          return 'Loop end must be greater than loop start'
        }
        return true
      })
    },
    {
      name: 'thumbnail',
      title: 'Video Thumbnail',
      type: 'image',
      description: 'Fallback image for browsers that do not support video or while video loads',
      options: {
        hotspot: true
      }
    },
    {
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the video content for accessibility'
    },
    {
      name: 'volume',
      title: 'Volume',
      type: 'number',
      description: 'Video volume (0-1)',
      validation: Rule => Rule.min(0).max(1).precision(2),
      initialValue: 0
    },
    {
      name: 'playbackSpeed',
      title: 'Playback Speed',
      type: 'number',
      description: 'Video playback speed (0.5 = half speed, 2 = double speed)',
      validation: Rule => Rule.min(0.25).max(4).precision(2),
      initialValue: 1
    }
  ],
  preview: {
    select: {
      title: 'title',
      featured: 'featured',
      media: 'thumbnail'
    },
    prepare(selection) {
      const { title, featured, media } = selection
      return {
        title: title,
        subtitle: featured ? '⭐ Featured Hero Video' : 'Video',
        media: media
      }
    }
  }
}