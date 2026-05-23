"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { SiteSettings } from "@/lib/api";

const defaultSettings: SiteSettings = {
  siteName: "",
  siteDescription: "",
  greeting: "",
  heroRoles: [],
  stats: [],
  aboutHeading: "",
  aboutHighlight: "",
  aboutHighlights: [],
  skillsSectionTitle: "",
  skillsSectionSubtitle: "",
  projectsSectionTitle: "",
  projectsSectionSubtitle: "",
  contactHeading: "",
  contactText: "",
  contactCtaText: "",
  footerText: "",
  showSectionHero: true,
  showSectionAbout: true,
  showSectionSkills: true,
  showSectionProjects: true,
  showSectionContact: true,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(setSettings)
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-primary">Settings</h1>
          <p className="text-secondary text-sm mt-1">Customize your entire site without touching code</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-accent text-background px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 cursor-pointer sm:w-auto w-full"
        >
          <Save size={18} />
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-8">
        {/* SEO / Site Identity */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-heading text-xl font-semibold text-primary mb-1">Site Identity</h2>
          <p className="text-secondary text-sm mb-6">Browser tab title, search engine description</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary text-sm mb-2">Site Name (SEO Title)</label>
              <input
                value={settings.siteName}
                onChange={e => update("siteName", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm mb-2">Site Description (SEO Meta)</label>
              <input
                value={settings.siteDescription}
                onChange={e => update("siteDescription", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary">Hero Section</h2>
              <p className="text-secondary text-sm">Greeting text, role titles, stats</p>
            </div>
            <button
              onClick={() => update("showSectionHero", !settings.showSectionHero)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.showSectionHero
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface-hover text-secondary border border-border"
              }`}
            >
              {settings.showSectionHero ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.showSectionHero ? "Visible" : "Hidden"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-secondary text-sm mb-2">Greeting Text</label>
              <input
                value={settings.greeting}
                onChange={e => update("greeting", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-secondary text-sm mb-2">
                Role Titles (typing effect cycles through these)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {settings.heroRoles.map((role, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm">
                    {role}
                    <button
                      onClick={() => update("heroRoles", settings.heroRoles.filter((_, j) => j !== i))}
                      className="hover:text-danger transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="Add a role..."
                  id="new-role"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent text-sm"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      const input = e.target as HTMLInputElement;
                      if (input.value.trim()) {
                        update("heroRoles", [...settings.heroRoles, input.value.trim()]);
                        input.value = "";
                      }
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.getElementById("new-role") as HTMLInputElement;
                    if (input.value.trim()) {
                      update("heroRoles", [...settings.heroRoles, input.value.trim()]);
                      input.value = "";
                    }
                  }}
                  className="px-3 py-2 bg-accent/10 border border-accent/20 rounded-xl text-accent hover:bg-accent/20 transition-all cursor-pointer"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-secondary text-sm mb-2">Statistics Cards</label>
              {settings.stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <input
                    value={stat.label}
                    onChange={e => {
                      const newStats = [...settings.stats];
                      newStats[i] = { ...newStats[i], label: e.target.value };
                      update("stats", newStats);
                    }}
                    placeholder="Label"
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent text-sm"
                  />
                  <input
                    value={stat.value}
                    onChange={e => {
                      const newStats = [...settings.stats];
                      newStats[i] = { ...newStats[i], value: e.target.value };
                      update("stats", newStats);
                    }}
                    placeholder="Value (e.g. 5+)"
                    className="w-24 px-4 py-2 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent text-sm text-center"
                  />
                  <button
                    onClick={() => update("stats", settings.stats.filter((_, j) => j !== i))}
                    className="p-2 text-secondary hover:text-danger transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => update("stats", [...settings.stats, { label: "", value: "", icon: "Zap" }])}
                className="flex items-center gap-2 text-accent text-sm hover:text-accent-hover transition-colors cursor-pointer"
              >
                <Plus size={16} /> Add Stat
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary">About Section</h2>
              <p className="text-secondary text-sm">Heading text and highlight cards</p>
            </div>
            <button
              onClick={() => update("showSectionAbout", !settings.showSectionAbout)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.showSectionAbout
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface-hover text-secondary border border-border"
              }`}
            >
              {settings.showSectionAbout ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.showSectionAbout ? "Visible" : "Hidden"}
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary text-sm mb-2">Heading</label>
              <input
                value={settings.aboutHeading}
                onChange={e => update("aboutHeading", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm mb-2">Highlight Word (gradient text)</label>
              <input
                value={settings.aboutHighlight}
                onChange={e => update("aboutHighlight", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-secondary text-sm mb-2">Highlight Cards</label>
            <div className="grid grid-cols-2 gap-2">
              {settings.aboutHighlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={h.text}
                    onChange={e => {
                      const newHighlights = [...settings.aboutHighlights];
                      newHighlights[i] = { ...newHighlights[i], text: e.target.value };
                      update("aboutHighlights", newHighlights);
                    }}
                    className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent text-sm"
                  />
                  <button
                    onClick={() => update("aboutHighlights", settings.aboutHighlights.filter((_, j) => j !== i))}
                    className="p-2 text-secondary hover:text-danger transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => update("aboutHighlights", [...settings.aboutHighlights, { text: "", icon: "Code" }])}
              className="flex items-center gap-2 text-accent text-sm hover:text-accent-hover transition-colors mt-2 cursor-pointer"
            >
              <Plus size={16} /> Add Card
            </button>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary">Skills Section</h2>
              <p className="text-secondary text-sm">Section title and subtitle</p>
            </div>
            <button
              onClick={() => update("showSectionSkills", !settings.showSectionSkills)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.showSectionSkills
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface-hover text-secondary border border-border"
              }`}
            >
              {settings.showSectionSkills ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.showSectionSkills ? "Visible" : "Hidden"}
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary text-sm mb-2">Section Title</label>
              <input
                value={settings.skillsSectionTitle}
                onChange={e => update("skillsSectionTitle", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm mb-2">Section Subtitle</label>
              <input
                value={settings.skillsSectionSubtitle}
                onChange={e => update("skillsSectionSubtitle", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary">Projects Section</h2>
              <p className="text-secondary text-sm">Section title and subtitle</p>
            </div>
            <button
              onClick={() => update("showSectionProjects", !settings.showSectionProjects)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.showSectionProjects
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface-hover text-secondary border border-border"
              }`}
            >
              {settings.showSectionProjects ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.showSectionProjects ? "Visible" : "Hidden"}
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary text-sm mb-2">Section Title</label>
              <input
                value={settings.projectsSectionTitle}
                onChange={e => update("projectsSectionTitle", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm mb-2">Section Subtitle</label>
              <input
                value={settings.projectsSectionSubtitle}
                onChange={e => update("projectsSectionSubtitle", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary">Contact Section</h2>
              <p className="text-secondary text-sm">Heading, text, and CTA</p>
            </div>
            <button
              onClick={() => update("showSectionContact", !settings.showSectionContact)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                settings.showSectionContact
                  ? "bg-accent/10 text-accent border border-accent/20"
                  : "bg-surface-hover text-secondary border border-border"
              }`}
            >
              {settings.showSectionContact ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.showSectionContact ? "Visible" : "Hidden"}
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-secondary text-sm mb-2">Heading</label>
              <input
                value={settings.contactHeading}
                onChange={e => update("contactHeading", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm mb-2">Description Text</label>
              <textarea
                value={settings.contactText}
                onChange={e => update("contactText", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
            <div>
              <label className="block text-secondary text-sm mb-2">CTA Link Text</label>
              <input
                value={settings.contactCtaText}
                onChange={e => update("contactCtaText", e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <section className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-heading text-xl font-semibold text-primary mb-1">Footer</h2>
          <p className="text-secondary text-sm mb-6">Footer tagline text</p>
          <div>
            <label className="block text-secondary text-sm mb-2">Footer Tagline</label>
            <input
              value={settings.footerText}
              onChange={e => update("footerText", e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent transition-all"
            />
          </div>
        </section>
      </div>

      <div className="mt-8 flex sm:justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-accent text-background px-8 py-4 rounded-xl font-semibold hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 cursor-pointer text-lg sm:w-auto w-full"
        >
          <Save size={20} />
          {saving ? "Saving..." : saved ? "All Changes Saved!" : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
