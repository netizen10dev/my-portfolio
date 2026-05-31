import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'heading',    type: 'string', title: 'Section heading'}),
    defineField({name: 'subheading', type: 'text',   title: 'Subheading paragraph', rows: 3}),
    defineField({name: 'email',      type: 'string', title: 'Email address'}),
    defineField({name: 'phone',      type: 'string', title: 'Phone number'}),
    defineField({name: 'location',   type: 'string', title: 'Location / city'}),
  ],
  preview: {
    prepare: () => ({title: 'Contact Page'}),
  },
})
