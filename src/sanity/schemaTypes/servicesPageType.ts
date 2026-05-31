import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const servicesPageType = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: StarIcon,
  groups: [
    {name: 'content',  title: 'Content'},
    {name: 'services', title: 'Services'},
    {name: 'process',  title: 'Process Steps'},
    {name: 'media',    title: 'Media'},
  ],
  fields: [
    defineField({name: 'introQuote', title: 'Intro Quote', type: 'text', rows: 2, group: 'content', description: 'Text fill scroll quote shown at the top of the page.'}),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'services',
      description: 'The services listed on this page, shown in order.',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title',       type: 'string', title: 'Title',       validation: (R) => R.required()}),
          defineField({name: 'description', type: 'text',   title: 'Description', rows: 5}),
          defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
            description: 'Square image displayed at 180×180 px on desktop.',
            options: {hotspot: true},
            fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
          }),
        ],
        preview: {select: {title: 'title', media: 'image'}},
      }],
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      group: 'process',
      description: '"How we work" steps shown at the bottom of the services page.',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title',       type: 'string', title: 'Step Title'}),
          defineField({name: 'description', type: 'text',   title: 'Description', rows: 3}),
        ],
        preview: {select: {title: 'title'}},
      }],
    }),
    defineField({
      name: 'photographerImage',
      title: 'Full-Width Image',
      type: 'image',
      group: 'media',
      description: 'Full-bleed image shown between the services list and process steps.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Services Page'}
    },
  },
})
