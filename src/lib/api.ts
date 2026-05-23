export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured: boolean;
  createdAt: string;
}

export interface Profile {
  name: string;
  logo: string;
  image?: string;
  title: string;
  bio: string;
  email: string;
  social: {
    github: string;
    linkedin: string;
    facebook: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
}

export interface ThemeConfig {
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    borderHover: string;
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    accentHover: string;
    accentMuted: string;
    accentSubtle: string;
    success: string;
    successBg: string;
    warning: string;
    warningBg: string;
    danger: string;
    dangerBg: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    containerWidth: number;
    borderRadius: number;
    sectionPadding: number;
  };
  colorPreset: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  greeting: string;
  heroRoles: string[];
  stats: { label: string; value: string; icon: string }[];
  aboutHeading: string;
  aboutHighlight: string;
  aboutHighlights: { text: string; icon: string }[];
  skillsSectionTitle: string;
  skillsSectionSubtitle: string;
  projectsSectionTitle: string;
  projectsSectionSubtitle: string;
  contactHeading: string;
  contactText: string;
  contactCtaText: string;
  footerText: string;
  showSectionHero: boolean;
  showSectionAbout: boolean;
  showSectionSkills: boolean;
  showSectionProjects: boolean;
  showSectionContact: boolean;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects", { cache: "no-store" });
  return res.json();
}

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch("/api/profile", { cache: "no-store" });
  return res.json();
}

export async function fetchSkills(): Promise<Skill[]> {
  const res = await fetch("/api/skills", { cache: "no-store" });
  return res.json();
}

export async function fetchSettings(): Promise<SiteSettings> {
  const res = await fetch("/api/settings", { cache: "no-store" });
  return res.json();
}

export async function fetchTheme(): Promise<ThemeConfig> {
  const res = await fetch("/api/theme", { cache: "no-store" });
  return res.json();
}