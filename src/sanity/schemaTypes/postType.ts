import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'News Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (R) => R.required()}),
    defineField({name: 'slug', type: 'slug', options: {source: 'title'}, validation: (R) => R.required()}),
    defineField({name: 'publishedAt', type: 'datetime', initialValue: () => new Date().toISOString()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3}),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({name: 'tags', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({name: 'body', title: 'Body', type: 'array', of: [defineArrayMember({type: 'block'})]}),
  ],
  preview: {
    select: {title: 'title', media: 'mainImage'},
  },
})
