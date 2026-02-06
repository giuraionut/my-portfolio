'use client'

import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ContentSection, PersonalInfo } from '@/types'
import MotionContainer from '@/components/MotionContainer'
import { Terminal, AnimatedSpan, TypingAnimation } from './ui/terminal'
import { ShinyButton } from './ui/shiny-button'

export type AboutProps = {
  content: ContentSection
  personalInfo: PersonalInfo
  resumeUrl: string
}

export default function AboutSectionUI({ content, personalInfo, resumeUrl }: AboutProps) {
  const [firstParagraph, ...otherParagraphs] = content.bodies

  return (
    <section
      id="about"
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent px-4 py-20 md:px-8"
    >
      <MotionContainer useInView={true} once={true} viewportAmount={0.3} animation="slideUp">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-3 text-primary dark:text-white border-primary/20 bg-primary/5"
            >
              {content.title}
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              {content.shortDescription}
            </h2>
            <Separator className="w-20 h-1 mx-auto bg-primary/50" />
          </div>

          <div className="relative group max-w-5xl mx-auto">
            {/* Decorative background glow for terminal */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative space-y-8">
              <Terminal className="w-full font-vt323 text-lg md:text-2xl bg-indigo-950/50 text-slate-200 border-slate-800 backdrop-blur-md shadow-2xl min-h-[300px]">
                <TypingAnimation>&gt; whoami</TypingAnimation>

                <AnimatedSpan className="text-indigo-400">
                  <span>✔ Initializing portfolio context...</span>
                </AnimatedSpan>

                <AnimatedSpan className="text-emerald-400">
                  <span>✔ Identity: {personalInfo.title}</span>
                </AnimatedSpan>

                {/* <AnimatedSpan className="text-amber-400">
                  <span>✔ Location: {personalInfo.location}</span>
                </AnimatedSpan> */}

                <TypingAnimation delay={1000}>&gt; cat about_me.txt</TypingAnimation>

                <AnimatedSpan className="whitespace-pre-wrap leading-relaxed">
                  <span className="text-slate-300">{firstParagraph}</span>
                </AnimatedSpan>

                {otherParagraphs.map((para, i) => (
                  <AnimatedSpan key={i} className="whitespace-pre-wrap leading-relaxed mt-2">
                    <span className="text-slate-400 italic">{para}</span>
                  </AnimatedSpan>
                ))}

                <TypingAnimation delay={2000}>&gt; ls skills/</TypingAnimation>

                <AnimatedSpan className="text-blue-400">
                  <span>React, Node.js, Angular, C, MATLAB, PostgreSQL</span>
                </AnimatedSpan>

                <TypingAnimation delay={3500}>
                  &gt; echo &quot;Ready to collaborate!&quot;
                </TypingAnimation>
              </Terminal>

              <div className="flex justify-center pt-4">
                <MotionContainer useInView={true} once={true} animation="fadeIn" delay={0.5}>
                  <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                    <ShinyButton className="px-10 py-3 text-base">View Full Resume</ShinyButton>
                  </Link>
                </MotionContainer>
              </div>
            </div>
          </div>
        </div>
      </MotionContainer>
    </section>
  )
}
