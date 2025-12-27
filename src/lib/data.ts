import { getPayload } from 'payload'
import config from '@payload-config'
import type { Profile, Skill, Project, Media } from '@/payload-types'
import {
  ContentSection,
  PersonalInfo,
  Project as UIProject,
  Skill as UISkill,
  SocialLink,
} from '@/types'

// Helper to get URL from Media
const getUrl = (media: string | number | Media | null | undefined): string => {
  if (!media) return ''
  if (typeof media === 'string') return media // Should ideally not happen if populated
  if (typeof media === 'number') return '' // Can't get URL from ID alone without fetch
  return media.url || ''
}

// Mappers
const mapPersonalInfo = (profile: Profile): PersonalInfo => {
  return {
    name: profile.name,
    title: profile.title || '',
    location: profile.location,
    avatarUrl: getUrl(profile.avatar),
    resumeUrl: getUrl(profile.resume),
  }
}

const mapSocialLinks = (links: Profile['socialLinks']): SocialLink[] => {
  if (!links) return []
  return links.map((link) => ({
    id: link.id || undefined,
    name: link.name || '',
    url: link.url || '',
  }))
}

const mapContentSection = (
  section:
    | {
        title?: string | null
        shortDescription?: string | null
        bodies?: { text?: string | null }[] | null
        description?: string | null
        longDescription?: string | null
      }
    | null
    | undefined,
): ContentSection => {
  if (!section) return { bodies: [] }

  // Handle new longDescription field for About section
  if (section.longDescription) {
    return {
      title: section.title,
      shortDescription: section.shortDescription,
      bodies: [section.longDescription],
    }
  }

  // Fallback for other sections or legacy data
  return {
    title: section.title,
    shortDescription: section.shortDescription,
    bodies:
      section.bodies?.map((b) => b.text || '') ||
      (section.description ? [section.description] : []),
  }
}

const mapSkills = (skills: Skill[]): UISkill[] => {
  return skills.map((skill) => {
    let categoryTitle = 'Other'
    if (skill.category && typeof skill.category === 'object' && 'title' in skill.category) {
      categoryTitle = (skill.category as any).title || 'Other'
    }

    return {
      id: skill.id.toString(),
      name: skill.name,
      category: categoryTitle,
      icon: getUrl(skill.icon),
      website: skill.website,
      color: (skill as unknown as { color?: string }).color,
    }
  })
}

const mapProjects = (projects: Project[]): UIProject[] => {
  return projects.map((project) => ({
    id: project.id.toString(),
    title: project.title,
    description: project.description,
    imageUrl: getUrl(project.image),
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    featured: project.featured || false,
    order: project.order || 0,
    skills: project.skills ? mapSkills(project.skills as Skill[]) : [],
  }))
}

export async function getPortfolioData() {
  const payload = await getPayload({ config })

  // Fetch Globals
  const landingData = await payload.findGlobal({ slug: 'landing-page' })
  const profileData = await payload.findGlobal({ slug: 'profile' })

  // Fetch Collections
  const skillsData = await payload.find({ collection: 'skills', limit: 100, depth: 1 })
  const projectsData = await payload.find({ collection: 'projects', sort: 'order', limit: 100 })

  return {
    personalInfo: mapPersonalInfo(profileData),
    socialLinks: mapSocialLinks(profileData.socialLinks),

    heroContent: {
      shortDescription: landingData.hero?.shortDescription,
      bodies: landingData.hero?.description ? [landingData.hero.description] : [],
    },
    keywords: landingData.hero?.keywords?.map((k) => k.keyword || '') || [],

    aboutContent: mapContentSection(landingData.about),
    skillsContent: mapContentSection(landingData.skills),
    projectsContent: mapContentSection(landingData.projects),
    contactContent: mapContentSection(landingData.contact),

    skills: mapSkills(skillsData.docs),
    projects: mapProjects(projectsData.docs),
  }
}
