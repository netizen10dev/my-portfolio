import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const newsPageType = defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero heading',
      type: 'string',
      description: 'Override the default hero text.',
    }),
  ],
  preview: {
    prepare: () => ({title: 'News Page'}),
  },
})
