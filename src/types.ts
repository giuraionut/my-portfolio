export interface SocialLink {
  id?: string
  name: string
  url: string
}

export interface ContentSection {
  shortDescription?: string | null
  bodies: string[]
  title?: string | null
}

export interface Skill {
  id?: string
  name: string
  category: string
  icon?: string | null
  website?: string | null
  color?: string | null
}

export interface Project {
  id?: string
  title: string
  description: string
  imageUrl?: string | null
  videoUrl?: string | null
  liveUrl?: string | null
  githubUrl?: string | null
  featured: boolean
  skills: Skill[]
  longDescription?: string | null
  order?: number
}

export interface PersonalInfo {
  title: string
  location?: string | null
  name: string
  avatarUrl?: string | null
  resumeUrl?: string | null
}
