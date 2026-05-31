import { type SchemaTypeDefinition } from 'sanity'

import {portfolioProjectType}   from './portfolioProjectType'
import {homepageType}           from './homepageType'
import {aboutType}              from './aboutType'
import {servicesPageType}       from './servicesPageType'
import {postType}               from './postType'
import {newsPageType}           from './newsPageType'
import {contactPageType}        from './contactPageType'
import {contactSubmissionType}  from './contactSubmissionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    portfolioProjectType,
    homepageType,
    aboutType,
    servicesPageType,
    postType,
    newsPageType,
    contactPageType,
    contactSubmissionType,
  ],
}
