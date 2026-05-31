import {HomeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'aboutParagraph',
      title: 'About Paragraph',
      type: 'text',
      rows: 4,
      description: 'Short bio shown in the About section on the homepage.',
    }),
    defineField({
      name: 'portrait',
      title: 'About Portrait',
      type: 'image',
      description: 'Portrait image shown in the homepage About section.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
    defineField({
      name: 'photographerImage',
      title: 'Full-Width Photographer Image',
      type: 'image',
      description: 'Full-bleed image shown between the About and Services sections.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
