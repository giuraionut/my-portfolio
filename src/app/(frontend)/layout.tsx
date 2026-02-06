import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { VT323 } from 'next/font/google'
import React from 'react'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
})

import { AdminBar } from '@/components/AdminBar'
import PortfolioHeader from '@/components/PortfolioHeader'
import PortfolioFooter from '@/components/PortfolioFooter'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const payload = await getPayload({ config })
  const profile = await payload.findGlobal({ slug: 'profile' })
  const name = profile.name || 'Portfolio'
  const socialLinks =
    profile.socialLinks?.map((link) => ({
      id: link.id || undefined,
      name: link.name || '',
      url: link.url || '',
    })) || []

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, vt323.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <PortfolioHeader name={name} />
          {children}
          <PortfolioFooter name={name} socialLinks={socialLinks} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    template: '%s | Ionut Giura', // This adds your name to the end of every page tab
    default: 'Ionut Giura | Software Engineer', // The default tab name for the home page
  },
  description:
    'Software Engineer specializing in full-stack web development and enterprise solutions.',
  openGraph: mergeOpenGraph({
    title: 'Ionut Giura',
    description: 'Software Engineer Portfolio',
  }),
}
