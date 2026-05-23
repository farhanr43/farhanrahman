"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/api";
import { Plus, Edit, Trash2, Star } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "", slug: "", description: "", image: "", tags: "", link: "", featured: false
  });

  useEffect(() => {
    fetch("/api/projects").then(res => res.json()).then(setProjects);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    if (editingProject) {
      await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingProject.id, ...payload }),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    const updated = await fetch("/api/projects").then(res => res.json());
    setProjects(updated);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      const updated = await fetch("/api/projects").then(res => res.json());
      setProjects(updated);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      image: project.image,
      tags: project.tags.join(", "),
      link: project.link,
      featured: project.featured,
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingProject(null);
    setForm({ title: "", slug: "", description: "", image: "", tags: "", link: "", featured: false });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-semibold text-primary">Projects</h1>
        <button onClick={handleNew} className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg hover:bg-accent-hover">
          <Plus size={18} /> Add Project
        </button>
      </div>

      {showForm && (
        <div className="bg-surface border border-border p-6 rounded-xl mb-8">
          <h2 className="font-heading text-xl font-semibold text-primary mb-4">
            {editingProject ? "Edit Project" : "New Project"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input required placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary" />
            <input required placeholder="Slug" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary" />
            <textarea required placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary min-h-[100px]" />
            <input required placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary" />
            <input placeholder="Tags (comma separated)" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary" />
            <input placeholder="Project Link" value={form.link} onChange={e => setForm({...form, link: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary" />
            <label className="flex items-center gap-2 text-primary">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
              Featured
            </label>
            <div className="flex gap-2">
              <button type="submit" className="bg-accent text-background px-4 py-2 rounded-lg hover:bg-accent-hover">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="text-secondary px-4 py-2 hover:text-primary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-secondary">Title</th>
              <th className="px-4 py-3 text-left text-secondary">Slug</th>
              <th className="px-4 py-3 text-left text-secondary">Tags</th>
              <th className="px-4 py-3 text-left text-secondary">Featured</th>
              <th className="px-4 py-3 text-right text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-border">
                <td className="px-4 py-3 text-primary">{project.title}</td>
                <td className="px-4 py-3 text-secondary">{project.slug}</td>
                <td className="px-4 py-3 text-secondary text-sm">{project.tags.slice(0, 2).join(", ")}</td>
                <td className="px-4 py-3">{project.featured && <Star className="text-accent" size={18} />}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(project)} className="text-secondary hover:text-accent mr-3"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(project.id)} className="text-secondary hover:text-red-500"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}