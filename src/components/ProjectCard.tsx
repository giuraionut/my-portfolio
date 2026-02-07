// components/projects/ProjectCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AuroraText } from '@/components/ui/aurora-text'
import SkillBadge from './SkillBadge'
import { Project } from '@/types'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import GitHubIcon from './icons/GitHubIcon'

interface ProjectCardProps {
  project: Project
  cardStyle?: 'default' | 'compact' | 'featured'
}

export default function ProjectCard({ project, cardStyle = 'default' }: ProjectCardProps) {
  return (
    <div className="group relative h-full">
      {/* Animated Border Glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-300/60 to-indigo-500/60 opacity-0 blur transition duration-500 group-hover:opacity-20"></div>

      <Card className="relative h-full flex flex-col overflow-hidden border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-primary/10">
        <CardContent className="p-0 flex flex-col flex-grow">
          {/* Media Container */}
          <div
            className={cn(
              'relative overflow-hidden w-full',
              cardStyle === 'featured' ? 'aspect-video' : 'h-52',
            )}
          >
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                poster={project.imageUrl || undefined}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              project.imageUrl && (
                <Image
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )
            )}
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60"></div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <CardHeader className="p-0 mb-3">
              <CardTitle className="text-2xl font-bold tracking-tight">
                <AuroraText colors={['#6366f1', '#a855f7', '#3b82f6']}>{project.title}</AuroraText>
              </CardTitle>
            </CardHeader>

            <CardDescription className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
              {project.description}
            </CardDescription>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.skills.slice(0, 5).map((skill) => (
                <SkillBadge key={`${project.id}-${skill.name}`} skill={skill} />
              ))}
              {project.skills.length > 5 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{project.skills.length - 5} more
                </span>
              )}
            </div>

            <div className="mt-auto flex flex-row gap-3">
              {project.liveUrl ? (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <ShimmerButton className="w-full h-10 px-0">View Live</ShimmerButton>
                </Link>
              ) : (
                project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <ShimmerButton className="w-full h-10 px-0">
                      <span className="flex items-center justify-center gap-2 text-sm font-semibold">
                        View Code
                        <GitHubIcon className="h-4 w-4" />
                      </span>
                    </ShimmerButton>
                  </Link>
                )
              )}

              {project.githubUrl && project.liveUrl && (
                <Button
                  variant="outline"
                  className="px-3 rounded-xl border-border/50 hover:bg-accent/50"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
