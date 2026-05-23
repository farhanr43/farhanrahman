import { getData, setData } from "./storage";

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

export interface ThemeConfig {
  colors: {
    background: string; surface: string; surfaceHover: string;
    border: string; borderHover: string;
    primary: string; secondary: string; muted: string;
    accent: string; accentHover: string; accentMuted: string; accentSubtle: string;
    success: string; successBg: string;
    warning: string; warningBg: string;
    danger: string; dangerBg: string;
  };
  fonts: { heading: string; body: string };
  layout: { containerWidth: number; borderRadius: number; sectionPadding: number };
  colorPreset: string;
}

const defaultSettings: SiteSettings = {
  siteName: "AM | Full Stack Developer & Designer",
  siteDescription: "Full Stack Developer & UI/UX Designer specializing in modern web applications",
  greeting: "Hello, I'm",
  heroRoles: ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"],
  stats: [
    { label: "Years Experience", value: "5+", icon: "Code2" },
    { label: "Projects Done", value: "50+", icon: "Palette" },
    { label: "Client Satisfaction", value: "100%", icon: "Zap" },
  ],
  aboutHeading: "Crafting Digital",
  aboutHighlight: "Experiences",
  aboutHighlights: [
    { text: "Clean, efficient code", icon: "Code" },
    { text: "Quality-focused development", icon: "Award" },
    { text: "User-centered design", icon: "Users" },
    { text: "Modern technologies", icon: "Globe" },
  ],
  skillsSectionTitle: "Skills & Technologies",
  skillsSectionSubtitle: "Technologies I use to bring ideas to life",
  projectsSectionTitle: "Featured Projects",
  projectsSectionSubtitle: "A selection of my recent work",
  contactHeading: "Get In Touch",
  contactText: "Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together.",
  contactCtaText: "Let's work together",
  footerText: "Built with passion & Next.js",
  showSectionHero: true, showSectionAbout: true, showSectionSkills: true,
  showSectionProjects: true, showSectionContact: true,
};

export const defaultTheme: ThemeConfig = {
  colors: {
    background: "#0a0a0a", surface: "#141414", surfaceHover: "#1a1a1a",
    border: "#262626", borderHover: "#333333",
    primary: "#fafafa", secondary: "#a1a1aa", muted: "#52525b",
    accent: "#22d3ee", accentHover: "#06b6d4", accentMuted: "#0891b2", accentSubtle: "#164e63",
    success: "#22c55e", successBg: "#052e16",
    warning: "#eab308", warningBg: "#3b2f00",
    danger: "#ef4444", dangerBg: "#450a0a",
  },
  fonts: { heading: "Outfit", body: "DM Sans" },
  layout: { containerWidth: 1200, borderRadius: 12, sectionPadding: 80 },
  colorPreset: "midnight",
};

export async function getProjects(): Promise<Project[]> {
  return getData<Project[]>("projects.json");
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

export async function getAllTags(): Promise<string[]> {
  const projects = await getProjects();
  const tags = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await setData("projects.json", projects);
}

export async function addProject(project: Omit<Project, "id" | "createdAt">): Promise<Project> {
  const projects = await getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split("T")[0],
  };
  projects.push(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updates };
  await saveProjects(projects);
  return projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  await saveProjects(filtered);
  return true;
}

export async function getProfile(): Promise<Profile> {
  return getData<Profile>("profile.json");
}

export async function saveProfile(profile: Profile): Promise<void> {
  await setData("profile.json", profile);
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    return await getData<SiteSettings>("settings.json");
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  await setData("settings.json", settings);
}

export async function getTheme(): Promise<ThemeConfig> {
  try {
    return await getData<ThemeConfig>("theme.json");
  } catch {
    return defaultTheme;
  }
}

export async function saveTheme(theme: ThemeConfig): Promise<void> {
  await setData("theme.json", theme);
}

export async function getSkills(): Promise<Skill[]> {
  return getData<Skill[]>("skills.json");
}

export async function saveSkills(skills: Skill[]): Promise<void> {
  await setData("skills.json", skills);
}
