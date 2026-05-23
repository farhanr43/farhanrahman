"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/lib/api";

export default function AdminProfile() {
  const [form, setForm] = useState<Profile | null>(null);

  useEffect(() => {
    fetch("/api/profile").then(res => res.json()).then(setForm);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Profile updated!");
  };

  if (!form) return <div className="text-secondary">Loading...</div>;

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-primary mb-8">Profile</h1>

      <form onSubmit={handleSubmit} className="bg-surface border border-border p-6 rounded-xl max-w-2xl space-y-4">
        <div>
          <label className="block text-secondary mb-2">Name</label>
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
        </div>
        <div>
          <label className="block text-secondary mb-2">Logo (Brand Initials)</label>
          <input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} placeholder="e.g., AM, JD, FR" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
          <p className="text-secondary text-sm mt-1">This appears in the navbar header</p>
        </div>
        <div>
          <label className="block text-secondary mb-2">Profile Image URL</label>
          <input value={form.image || ""} onChange={e => setForm({...form, image: e.target.value})} placeholder="https://example.com/your-photo.jpg" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
          <p className="text-secondary text-sm mt-1">Leave empty to show initials (FR, etc.) instead of image</p>
        </div>
        <div>
          <label className="block text-secondary mb-2">Title</label>
          <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
        </div>
        <div>
          <label className="block text-secondary mb-2">Bio</label>
          <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary min-h-[150px]" />
        </div>
        <div>
          <label className="block text-secondary mb-2">Email</label>
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
        </div>
        <div>
          <label className="block text-secondary mb-2">GitHub URL</label>
          <input value={form.social.github} onChange={e => setForm({...form, social: {...form.social, github: e.target.value}})} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
        </div>
        <div>
          <label className="block text-secondary mb-2">LinkedIn URL</label>
          <input value={form.social.linkedin} onChange={e => setForm({...form, social: {...form.social, linkedin: e.target.value}})} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
        </div>
        <div>
          <label className="block text-secondary mb-2">Facebook URL</label>
          <input value={form.social.facebook} onChange={e => setForm({...form, social: {...form.social, facebook: e.target.value}})} placeholder="https://facebook.com/yourpage" className="w-full px-4 py-2 bg-background border border-border rounded-lg text-primary" />
        </div>
        <button type="submit" className="bg-accent text-background px-6 py-3 rounded-lg hover:bg-accent-hover">Save Changes</button>
      </form>
    </div>
  );
}