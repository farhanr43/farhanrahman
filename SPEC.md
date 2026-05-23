# Portfolio Website Specification

## Project Overview
- **Project Name**: Portfolio with Admin Dashboard
- **Type**: Full-stack web application
- **Core Functionality**: A modern portfolio website with a CMS-powered admin dashboard for managing content
- **Target Users**: Professionals showcasing their work, potential employers/clients

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Storage**: Local JSON files (simulated database for simplicity)
- **Icons**: Lucide React

## UI/UX Specification

### Layout Structure

**Public Pages:**
1. **Home Page** (`/`)
   - Hero section with name, title, and CTA
   - About section with brief bio
   - Projects showcase grid
   - Skills/tools section
   - Contact section
   - Footer with social links

2. **Projects Page** (`/projects`)
   - Filterable project grid
   - Project cards with hover effects

3. **Single Project** (`/projects/[slug]`)
   - Project details with images
   - Technologies used
   - Live demo/link buttons

**Admin Dashboard** (`/admin`):
1. **Dashboard Home**
   - Overview stats (projects count, views, etc.)
   - Quick actions

2. **Projects Management**
   - List all projects
   - Add/Edit/Delete projects
   - Form with: title, description, image, tags, link, featured

3. **About Section Management**
   - Edit bio, name, title, social links

4. **Skills Management**
   - Add/Remove skills with icons

### Visual Design

**Color Palette:**
- Background: `#0a0a0a` (near black)
- Surface: `#141414` (dark gray)
- Border: `#262626` (subtle gray)
- Primary: `#fafafa` (white)
- Secondary: `#a1a1aa` (muted gray)
- Accent: `#22d3ee` (cyan)
- Accent Hover: `#06b6d4`

**Typography:**
- Headings: `Outfit` (Google Font) - geometric, modern
- Body: `DM Sans` (Google Font) - clean, readable
- Sizes: H1: 48px, H2: 36px, H3: 24px, Body: 16px

**Spacing:**
- Section padding: 80px vertical
- Container max-width: 1200px
- Card gap: 24px

**Visual Effects:**
- Subtle glow on accent elements
- Smooth hover transitions (300ms)
- Fade-in animations on scroll

### Components

1. **Navbar**
   - Fixed top
   - Transparent with blur backdrop
   - Logo + navigation links
   - Admin link (only visible on desktop)

2. **Hero Section**
   - Large animated text reveal
   - Typing effect for role/title
   - Floating decorative elements

3. **Project Card**
   - Image with overlay on hover
   - Title, description preview
   - Tech tags
   - Scale + shadow on hover

4. **Admin Sidebar**
   - Fixed left sidebar
   - Navigation items with icons
   - Active state indicator

5. **Admin Content Area**
   - Table views for lists
   - Form inputs with validation
   - Save/Cancel actions

### Animations (Framer Motion)
- Page transitions: fade in (300ms)
- Hero text: staggered reveal (0.1s delay each)
- Cards: slide up + fade on scroll
- Buttons: scale on hover (1.02)
- Loading states: pulse effect

## Functionality Specification

### Core Features

1. **Portfolio Display**
   - Responsive design (mobile-first)
   - Dark theme throughout
   - Smooth page navigation

2. **Admin CMS**
   - Authentication (simple password - stored in env)
   - CRUD operations for all content types
   - Real-time preview of changes

3. **Data Management**
   - JSON-based local storage
   - Auto-save on edits
   - Image URL handling (external URLs)

### Data Models

**Project:**
```
{
  id: string,
  title: string,
  slug: string,
  description: string,
  image: string,
  tags: string[],
  link: string,
  featured: boolean,
  createdAt: string
}
```

**Profile:**
```
{
  name: string,
  title: string,
  bio: string,
  email: string,
  social: { github, linkedin, twitter }
}
```

**Skill:**
```
{
  id: string,
  name: string,
  icon: string
}
```

## Acceptance Criteria

1. ✅ Home page loads with hero, projects, skills, contact sections
2. ✅ Projects page shows all projects in filterable grid
3. ✅ Single project pages display full details
4. ✅ Admin dashboard accessible at /admin with password protection
5. ✅ Can create, read, update, delete projects from admin
6. ✅ Can update profile information from admin
7. ✅ Can manage skills from admin
8. ✅ All animations work smoothly
9. ✅ Responsive on mobile, tablet, desktop
10. ✅ No console errors on page load