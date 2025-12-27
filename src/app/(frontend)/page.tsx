import { getPortfolioData } from '@/lib/data'
import HeroSectionUI from '@/components/HeroSectionUI'
import AboutSectionUI from '@/components/AboutSectionUI'
import SkillsSectionUI from '@/components/SkillsSectionUI'
import ProjectsSectionUI from '@/components/ProjectsSectionUI'
import ContactSectionUI from '@/components/ContactSectionUI'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { personalInfo, heroContent } = await getPortfolioData()
  return {
    title: `${personalInfo.name} | ${personalInfo.title}`,
    description: heroContent.shortDescription || 'Portfolio',
  }
}

export default async function Page() {
  const data = await getPortfolioData()
  const {
    personalInfo,
    socialLinks,
    heroContent,
    keywords,
    aboutContent,
    skillsContent,
    projectsContent,
    contactContent,
    skills,
    projects,
  } = data

  if (!personalInfo.name) {
    redirect('/admin')
  }

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <HeroSectionUI
        name={personalInfo.name}
        avatarUrl={personalInfo.avatarUrl || ''}
        content={heroContent}
        keywords={keywords}
        socialLinks={socialLinks}
        resumeUrl={personalInfo.resumeUrl || ''}
      />
      <AboutSectionUI content={aboutContent} personalInfo={personalInfo} />
      <SkillsSectionUI content={skillsContent} skills={skills} />
      <ProjectsSectionUI content={projectsContent} projects={projects} />
      <ContactSectionUI content={contactContent} socialLinks={socialLinks} />
    </main>
  )
}
