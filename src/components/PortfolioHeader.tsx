'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShinyButton } from './ui/shiny-button'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
const SCROLL_THRESHOLD = 50

type HeaderProps = {
  name: string
}
export default function Header({ name }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }

    // run once on mount to pick up initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/30 dark:bg-slate-950/30 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl text-slate-900 dark:text-white hover:text-primary transition-colors"
        >
          <span className="text-primary">{name}</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {['about', 'projects', 'skills', 'contact'].map((id) => (
              <Button key={id} variant="link" onClick={() => scrollToSection(id)}>
                {id[0].toUpperCase() + id.slice(1)}
              </Button>
            ))}
          </nav>

          <div className="flex gap-2 items-center">
            {/* <ModeToggle /> */}
            <AnimatedThemeToggler />
            <ShinyButton className="px-4 py-1.5 text-xs" onClick={() => scrollToSection('contact')}>
              Get In Touch
            </ShinyButton>
          </div>
        </div>
      </div>
    </header>
  )
}
