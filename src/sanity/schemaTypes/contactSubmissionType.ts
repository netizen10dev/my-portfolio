import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Contact Submissions',
  type: 'document',
  icon: EnvelopeIcon,
  readOnly: true,
  fields: [
    defineField({name: 'name',        type: 'string'}),
    defineField({name: 'email',       type: 'string'}),
    defineField({name: 'message',     type: 'text'}),
    defineField({name: 'submittedAt', type: 'datetime'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'email'},
  },
})
