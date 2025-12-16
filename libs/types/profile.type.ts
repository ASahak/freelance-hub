export enum AvailabilityStatus {
  available = 'available',
  open = 'open',
  busy = 'busy',
}

export enum Gender {
  male = 'male',
  woman = 'woman',
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  repoUrl: string;
  technologies: string[];
  profileId: string;
  createdAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Profile {
  id: string;
  userId: string;
  headline: string | null;
  bio: string | null;
  hourlyRate: number | null;
  currency: string;
  availabilityStatus: AvailabilityStatus;
  country: string | null;
  city: string | null;
  timezone: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string | null;
  gender: Gender | null;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  createdAt: Date;
}
