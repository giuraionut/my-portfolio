'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Download, ChevronDown, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ContentSection, SocialLink } from '@/types'
import GitHubIcon from '@/components/icons/GitHubIcon'
import LinkedInIcon from '@/components/icons/Linkedin'
import MotionContainer from '@/components/MotionContainer'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AuroraText } from './ui/aurora-text'

function useLoopedIndex(length: number, delay: number = 3000): number {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % length)
    }, delay)
    return () => clearInterval(timer)
  }, [length, delay])
  return index
}

export type HeroProps = {
  name: string
  avatarUrl: string
  content: ContentSection
  keywords: string[]
  socialLinks: SocialLink[]
  resumeUrl: string
}

export default function HeroSectionUI({
  name,
  avatarUrl,
  content,
  keywords,
  socialLinks,
  resumeUrl,
}: HeroProps) {
  const tagIndex = useLoopedIndex(keywords.length, 2500)

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const socials = () => {
    return (
      <div className="flex items-center gap-5">
        <TooltipProvider>
          {socialLinks.map((link) => {
            const isEmail = link.name.toLowerCase() === 'email'

            return (
              <Tooltip key={link.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={isEmail ? `mailto:${link.url}` : link.url}
                    target={isEmail ? '_self' : '_blank'}
                    rel={isEmail ? undefined : 'noopener noreferrer'}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span className="sr-only">{link.name}</span>
                    {link.name.toLowerCase() === 'github' && <GitHubIcon className="w-6 h-6" />}
                    {link.name.toLowerCase() === 'linkedin' && <LinkedInIcon className="w-6 h-6" />}
                    {isEmail && <Mail className="w-6 h-6" />}
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="capitalize">{link.name}</TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </div>
    )
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-20 md:px-8"
    >
      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <MotionContainer animation="slideUp" delay={0.1}>
          <span className="mb-4 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            {content.shortDescription}
          </span>
        </MotionContainer>

        <MotionContainer animation="slideUp" delay={0.2}>
          <AuroraText
            className=" mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl"
            colors={[
              'oklch(58.5% 0.233 277.117)',
              'oklch(70.2% 0.183 293.541)',
              'oklch(58.5% 0.233 277.117)',
            ]}
          >
            {name}
          </AuroraText>
        </MotionContainer>

        <div className="h-12 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={tagIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-medium text-muted-foreground sm:text-3xl lg:text-4xl"
            >
              {keywords[tagIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <MotionContainer animation="slideUp" delay={0.4}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {content.bodies[0]}
          </p>
        </MotionContainer>

        <MotionContainer animation="slideUp" delay={0.5}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <ShimmerButton onClick={scrollToProjects} className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight lg:text-lg">
                View My Work
              </span>
            </ShimmerButton>

            <Button
              variant="outline"
              size="lg"
              className="group h-11 px-8 rounded-lg border-2 border-indigo-600/20 hover:border-indigo-600/50 dark:border-indigo-400/20 dark:hover:border-indigo-400/50 transition-all"
              asChild
            >
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" download={`${name}`}>
                Download CV
                <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
            </Button>
          </div>
        </MotionContainer>
        <div className="mt-12">
          <MotionContainer animation="slideUp" delay={0.6}>
            {socials()}
          </MotionContainer>
        </div>

        <MotionContainer animation="slideUp" delay={0.7}>
          <div className="relative inline-block mt-16">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 opacity-30 blur-lg transition duration-1000 group-hover:opacity-50 group-hover:duration-200"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full border-4 border-background bg-muted">
              {avatarUrl ? (
                <Image src={avatarUrl} alt={name} fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-indigo-500">
                  {(name || 'YN')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </MotionContainer>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 transition-opacity hover:opacity-100"
        onClick={scrollToProjects}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
