import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const portfolioProjectType = defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (R) => R.required()}),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
    defineField({name: 'description', title: 'Short description', type: 'text', rows: 3}),
    defineField({name: 'client', title: 'Client name', type: 'string'}),
    defineField({name: 'year',   title: 'Year',        type: 'number'}),
    defineField({name: 'url',    title: 'Live URL',    type: 'url'}),
    defineField({name: 'tags',   title: 'Tags',        type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'order',  title: 'Display order', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
