import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Only admins can access the admin panel
    admin: ({ req: { user } }) => user?.['role'] === 'admin',
    // Only admins can create new users
    create: ({ req: { user } }) => user?.['role'] === 'admin',
    // Only admins can read user data
    read: ({ req: { user } }) => user?.['role'] === 'admin',
    // Only admins can update user data
    update: ({ req: { user } }) => user?.['role'] === 'admin',
    // Only admins can delete user data
    delete: ({ req: { user } }) => user?.['role'] === 'admin',
  },
  fields: [
    // Email is included by default because of auth: true
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
      saveToJWT: true, // Important: allows we check role immediately on login
    },
  ],
}