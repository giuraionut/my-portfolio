import Link from 'next/link'

import GitHubIcon from './icons/GitHubIcon'
import { Mail } from 'lucide-react'
import LinkedInIcon from './icons/Linkedin'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import AppVersion from './AppVersion'
import { SocialLink } from '@/types'

type FooterProps = {
  name: string
  socialLinks: SocialLink[]
}

export default function Footer({ name, socialLinks }: FooterProps) {
  return (
    <footer className="py-8 px-6 sm:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              <span className="text-primary">{name}</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Creating exceptional digital experiences
            </p>
            <AppVersion />
          </div>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <TooltipProvider key={link.id || link.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.name.toLowerCase() === 'email' ? `mailto:${link.url}` : link.url}
                      target={link.name.toLowerCase() === 'email' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.name.toLowerCase() === 'github' && <GitHubIcon size={18} />}
                      {link.name.toLowerCase() === 'linkedin' && <LinkedInIcon size={18} />}
                      {link.name.toLowerCase() === 'email' && <Mail size={18} />}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent className="capitalize">{link.name}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
