import type { GlobalConfig } from 'payload'
import { anyone } from '../access/anyone'

export const Profile: GlobalConfig = {
  slug: 'profile',
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Job Title',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'select',
          options: ['github', 'linkedin', 'email', 'twitter'],
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
