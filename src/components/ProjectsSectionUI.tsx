'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ContentSection, Project } from '@/types'
import MotionContainer from '@/components/MotionContainer'
import MotionItem from '@/components/MotionItem'
import ProjectCard from '@/components/ProjectCard'
import MyCarousel from '@/components/MyCarousel'

export type ProjectWithSkills = Project

export type ProjectProps = {
  content: ContentSection
  projects: ProjectWithSkills[]
}

export default function ProjectsSectionUI({ content, projects }: ProjectProps) {
  const FEATURED_STAGGER_DELAY = 0.15
  const SECTION_BASE_DELAY = 0.2
  const otherProjects = projects.filter((project) => !project.featured)
  return (
    <section id="projects" className="py-10 lg:py-14 px-6 sm:px-4 bg-transparent">
      <MotionContainer useInView={true} once={true} viewportAmount={0.1} animation="slideUp">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-3 text-primary dark:text-white">
              {content.title}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
              {content.shortDescription}
            </h2>
            <Separator className="w-20 h-1 mx-auto bg-primary" />
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {content.bodies[0]}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {projects
              .filter((project) => project.featured)
              .map((project, index) => (
                <MotionItem
                  key={project.id}
                  index={index}
                  useInView={true}
                  once={true}
                  viewportAmount={0.2}
                  animation="fadeUp"
                  delay={SECTION_BASE_DELAY + index * FEATURED_STAGGER_DELAY}
                >
                  <ProjectCard project={project} cardStyle="featured" />
                </MotionItem>
              ))}
          </div>

          <MotionContainer
            useInView={true}
            once={true}
            viewportAmount={0.2}
            animation="fadeIn"
            delay={
              SECTION_BASE_DELAY +
              projects.filter((project) => !project.featured).length * FEATURED_STAGGER_DELAY +
              0.1
            }
          >
            <div className="max-w-6xl mx-auto">
              {otherProjects.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      More Projects
                    </h3>
                  </div>

                  <MyCarousel
                    data={otherProjects}
                    renderItem={(project) => (
                      <div className="p-2 h-full">
                        <ProjectCard project={project} cardStyle="compact" />
                      </div>
                    )}
                    itemsPerView={{
                      mobile: 1,
                      tablet: 2,
                      desktop: 3,
                    }}
                    autoplayDelay={5000}
                  />
                </>
              )}
            </div>
          </MotionContainer>
        </div>
      </MotionContainer>
    </section>
  )
}
