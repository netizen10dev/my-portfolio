import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('H.Studio')
    .items([
      S.listItem()
        .title('Homepage')
        .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage')),
      S.listItem()
        .title('About Page')
        .child(S.document().schemaType('about').documentId('about').title('About Page')),
      S.listItem()
        .title('Services Page')
        .child(S.document().schemaType('servicesPage').documentId('servicesPage').title('Services Page')),
      S.listItem()
        .title('News Page')
        .child(S.document().schemaType('newsPage').documentId('newsPage').title('News Page')),
      S.listItem()
        .title('Contact Page')
        .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact Page')),
      S.divider(),
      S.documentTypeListItem('portfolioProject').title('Portfolio Projects'),
      S.documentTypeListItem('post').title('News Posts'),
      S.divider(),
      S.documentTypeListItem('contactSubmission').title('Contact Submissions'),
    ])
