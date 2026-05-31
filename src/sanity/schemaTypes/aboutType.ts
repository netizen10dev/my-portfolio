import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'bio',        title: 'Bio & Story'},
    {name: 'philosophy', title: 'Philosophy'},
    {name: 'expertise',  title: 'Expertise'},
    {name: 'stats',      title: 'Stats'},
    {name: 'media',      title: 'Media'},
  ],
  fields: [
    defineField({name: 'bioBackground',  title: 'Bio — Background', type: 'text', rows: 4, group: 'bio'}),
    defineField({name: 'bioApproach',    title: 'Bio — Approach',   type: 'text', rows: 4, group: 'bio'}),
    defineField({name: 'bioVision',      title: 'Bio — Vision',     type: 'text', rows: 4, group: 'bio'}),
    defineField({name: 'pullQuote',      title: 'Philosophy Pull Quote',          type: 'text', rows: 3, group: 'philosophy'}),
    defineField({name: 'philosophyDetail1', title: 'Philosophy Detail — Paragraph 1', type: 'text', rows: 4, group: 'philosophy'}),
    defineField({name: 'philosophyDetail2', title: 'Philosophy Detail — Paragraph 2', type: 'text', rows: 4, group: 'philosophy'}),
    defineField({
      name: 'expertise',
      title: 'Expertise Items',
      type: 'array',
      group: 'expertise',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title',       type: 'string', title: 'Title'}),
          defineField({name: 'description', type: 'text',   title: 'Description', rows: 3}),
        ],
        preview: {select: {title: 'title'}},
      }],
    }),
    defineField({name: 'yearsExperience',  title: 'Years of Experience', type: 'number', group: 'stats', description: 'Shown as "X+ years in industry".'}),
    defineField({name: 'projectsCompleted', title: 'Projects Completed', type: 'number', group: 'stats', description: 'Shown as "X+ projects completed".'}),
    defineField({name: 'clientsServed',    title: 'Clients Served',     type: 'number', group: 'stats'}),
    defineField({name: 'awardsWon',        title: 'Awards Won',         type: 'number', group: 'stats'}),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      group: 'media',
      description: 'Used on the About page portrait + CTA section.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
    defineField({
      name: 'photographerImage',
      title: 'Full-Width Photographer Image',
      type: 'image',
      group: 'media',
      description: 'Full-bleed image shown on the About page.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Alternative text'})],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
