import type { GlobalConfig } from 'payload'
import { anyone } from '../access/anyone'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'shortDescription', type: 'text' },
        { 
          name: 'keywords', 
          type: 'array', 
          admin: {
            components: {
              RowLabel: '@/globals/KeywordRowLabel#KeywordRowLabel',
            },
          },
          fields: [{ name: 'keyword', type: 'text' }] 
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'shortDescription', type: 'text' },
        { name: 'longDescription', type: 'textarea', label: 'About Me Body Text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'skills',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'shortDescription', type: 'textarea' },
      ],
    },
    {
      name: 'projects',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'shortDescription', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'shortDescription', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
