import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  access: {
    create: anyone, // Public
    read: authenticated, // Admin only
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
  ],
}
