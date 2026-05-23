"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FolderKanban, User, Code, Settings, ArrowRight, Plus, ExternalLink, Star } from "lucide-react";
import { Project } from "@/lib/api";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skillsCount, setSkillsCount] = useState(0);
  const [profile, setProfile] = useState<{ name: string; title: string; email: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then(res => res.json()),
      fetch("/api/skills").then(res => res.json()),
      fetch("/api/profile").then(res => res.json()),
    ]).then(([projectsData, skillsData, profileData]) => {
      setProjects(projectsData);
      setSkillsCount(Array.isArray(skillsData) ? skillsData.length : 0);
      setProfile(profileData);
    });
  }, []);

  const stats = [
    {
      label: "Total Projects", value: projects.length, icon: FolderKanban, color: "from-accent/20 to-accent/5", border: "border-accent/20",
      href: "/admin/projects",
    },
    {
      label: "Featured", value: projects.filter(p => p.featured).length, icon: Star, color: "from-yellow-500/20 to-yellow-500/5", border: "border-yellow-500/20",
      href: "/admin/projects",
    },
    {
      label: "Skills", value: skillsCount, icon: Code, color: "from-green-500/20 to-green-500/5", border: "border-green-500/20",
      href: "/admin/skills",
    },
  ];

  const quickActions = [
    { label: "Add Project", icon: Plus, href: "/admin/projects", desc: "Create a new portfolio project" },
    { label: "Edit Profile", icon: User, href: "/admin/profile", desc: "Update your personal info" },
    { label: "Site Settings", icon: Settings, href: "/admin/settings", desc: "Customize sections & text" },
  ];

  const recentProjects = [...projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-primary">Dashboard</h1>
        <p className="text-secondary text-sm mt-1">
          Welcome back{profile ? `, ${profile.name.split(" ")[0]}` : ""}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`bg-gradient-to-br ${stat.color} border ${stat.border} p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-background/50 rounded-xl flex items-center justify-center border border-border/50">
                  <Icon size={22} className="text-primary" />
                </div>
                <ArrowRight size={18} className="text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
              <p className="font-heading text-4xl font-bold text-primary mb-1">{stat.value}</p>
              <p className="text-secondary text-sm">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-heading text-xl font-semibold text-primary mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-4 p-4 bg-background/50 rounded-xl border border-border/50 hover:border-accent/30 hover:bg-surface transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-primary font-medium text-sm">{action.label}</p>
                    <p className="text-secondary text-xs">{action.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-secondary group-hover:text-accent transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-primary">Recent Projects</h2>
            <Link
              href="/admin/projects"
              className="text-accent text-sm hover:underline cursor-pointer"
            >
              View all
            </Link>
          </div>
          {recentProjects.length > 0 ? (
            <div className="space-y-3">
              {recentProjects.map(project => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border/50 hover:border-accent/20 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <FolderKanban size={18} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-primary font-medium text-sm truncate">{project.title}</p>
                      <p className="text-secondary text-xs">{project.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.featured && <Star size={14} className="text-yellow-500" />}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-secondary hover:text-accent transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <FolderKanban size={40} className="text-muted mx-auto mb-3" />
              <p className="text-secondary">No projects yet</p>
              <Link
                href="/admin/projects"
                className="text-accent text-sm hover:underline mt-2 inline-block cursor-pointer"
              >
                Create your first project
              </Link>
            </div>
          )}
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="bg-surface border border-border rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-xl font-semibold text-primary">Profile Preview</h2>
              <Link
                href="/admin/profile"
                className="text-accent text-sm hover:underline cursor-pointer"
              >
                Edit profile
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-background font-bold text-xl flex-shrink-0">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-primary font-semibold text-lg">{profile.name}</p>
                <p className="text-accent text-sm">{profile.title}</p>
                <p className="text-secondary text-sm">{profile.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
