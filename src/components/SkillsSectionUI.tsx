'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Code, Container, Database, Palette, Server } from 'lucide-react'
import { ContentSection, Skill } from '@/types'
import MotionContainer from '@/components/MotionContainer'
import { Marquee } from './ui/marquee'
import Link from 'next/link'

const ICONS: Record<string, React.ReactNode> = {
  FRONTEND: <Code className="h-5 w-5" />,
  BACKEND: <Server className="h-5 w-5" />,
  DATABASE: <Database className="h-5 w-5" />,
  DEVOPS: <Container className="h-5 w-5" />,
  OTHER: <Palette className="h-5 w-5" />,
}

export type SkillsProps = {
  content: ContentSection
  skills: Skill[]
}

const CategoryCard = ({ category }: { category: string }) => {
  return (
    <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm mx-2">
      <div className="text-primary">{ICONS[category.toUpperCase()] || ICONS['OTHER']}</div>
      <span className="font-bold text-lg whitespace-nowrap dark:text-white uppercase tracking-wider">
        {category}
      </span>
    </div>
  )
}

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <Link href={skill.website || '#'} target="_blank" className="block mx-2">
      <div className="group/skill relative flex items-center gap-3 px-5 py-4 w-48 rounded-xl border border-border bg-card/50 backdrop-blur-md transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <div
          className="h-2 w-2 rounded-full shrink-0"
          style={{ backgroundColor: skill.color || 'var(--primary)' }}
        />

        <span className="font-medium text-sm dark:text-white truncate">{skill.name}</span>

        {/* Subtle background glow on hover */}

        <div
          className="absolute inset-0 -z-10 opacity-0 group-hover/skill:opacity-10 transition-opacity rounded-xl"
          style={{ backgroundColor: skill.color || 'var(--primary)' }}
        />
      </div>
    </Link>
  )
}

export default function SkillsSectionUI({ content, skills }: SkillsProps) {
  if (!Array.isArray(skills) || skills.length === 0) {
    return null
  }

  const categories = [...new Set(skills.map((s) => s.category || 'Other'))]

  // For a nicer marquee when items are few, we can repeat them
  const repeatedCategories = [...categories, ...categories]
  const repeatedSkills = [...skills, ...skills]

  return (
    <section id="skills" className="py-20 lg:py-28 px-4 sm:px-8 bg-transparent overflow-hidden">
      <MotionContainer useInView={true} once={true} viewportAmount={0.2} animation="slideUp">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-3 text-primary dark:text-white border-primary/20 bg-primary/5 px-4 py-1"
            >
              {content.title}
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              {content.shortDescription}
            </h2>
            <Separator className="w-20 h-1 mx-auto bg-primary/50" />
          </div>

          <div className="relative flex flex-col gap-10">
            {/* Top Row: Categories (Faster) */}
            <Marquee pauseOnHover className="[--duration:30s]">
              {repeatedCategories.map((cat, idx) => (
                <CategoryCard key={`cat-${idx}`} category={cat} />
              ))}
            </Marquee>

            {/* Bottom Row: Specific Skills (Slower, Reverse) */}
            <Marquee reverse pauseOnHover className="[--duration:50s]">
              {repeatedSkills.map((skill, idx) => (
                <SkillCard key={`skill-${idx}`} skill={skill} />
              ))}
            </Marquee>

            {/* Side Fades for smooth transitions */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent z-10"></div>
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
