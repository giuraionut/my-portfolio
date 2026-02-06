'use client'

import React from 'react'
import { RetroGrid } from '@/components/ui/retro-grid'
import { Particles } from '@/components/ui/particles'

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden h-screen w-screen">
      <RetroGrid className="opacity-30 dark:opacity-20" />
      <Particles 
        className="absolute inset-0" 
        quantity={100} 
        ease={80} 
        color="#6366f1" 
        refresh 
      />
      {/* Subtle vignette to help text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-50" />
    </div>
  )
}
