"use client";

import { useState, useEffect } from "react";
import { Skill } from "@/lib/api";
import { Plus, Trash2 } from "lucide-react";

const iconOptions = ["code", "box", "file-code", "server", "binary", "database", "leaf", "cloud", "container", "network", "pen-tool", "git-branch"];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [form, setForm] = useState({ name: "", icon: "code" });

  useEffect(() => {
    fetch("/api/skills").then(res => res.json()).then(setSkills);
  }, []);

  const handleAdd = async () => {
    if (!form.name) return;
    const newSkill: Skill = { id: Date.now().toString(), ...form };
    await fetch("/api/skills", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([...skills, newSkill]),
    });
    setForm({ name: "", icon: "code" });
    const updated = await fetch("/api/skills").then(res => res.json());
    setSkills(updated);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this skill?")) {
      await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skills.filter(s => s.id !== id)),
      });
      const updated = await fetch("/api/skills").then(res => res.json());
      setSkills(updated);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-primary mb-8">Skills</h1>

      <div className="bg-surface border border-border p-6 rounded-xl mb-8 max-w-md">
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">Add New Skill</h2>
        <div className="flex gap-2 mb-4">
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Skill name" className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-primary" />
          <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="px-4 py-2 bg-background border border-border rounded-lg text-primary">
            {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
          </select>
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-accent text-background px-4 py-2 rounded-lg hover:bg-accent-hover">
          <Plus size={18} /> Add
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-secondary">Name</th>
              <th className="px-4 py-3 text-left text-secondary">Icon</th>
              <th className="px-4 py-3 text-right text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill.id} className="border-b border-border">
                <td className="px-4 py-3 text-primary">{skill.name}</td>
                <td className="px-4 py-3 text-secondary">{skill.icon}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(skill.id)} className="text-secondary hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
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