"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Palette, Type, Layout, Eye, RotateCcw, Check, RefreshCw } from "lucide-react";

type ColorKey = "background" | "surface" | "surfaceHover" | "border" | "borderHover" | "primary" | "secondary" | "muted" | "accent" | "accentHover" | "accentMuted" | "accentSubtle" | "success" | "successBg" | "warning" | "warningBg" | "danger" | "dangerBg";

type ThemeGroup = { label: string; keys: ColorKey[] };

const colorGroups: ThemeGroup[] = [
  { label: "Backgrounds", keys: ["background", "surface", "surfaceHover"] },
  { label: "Borders", keys: ["border", "borderHover"] },
  { label: "Text", keys: ["primary", "secondary", "muted"] },
  { label: "Accent", keys: ["accent", "accentHover", "accentMuted", "accentSubtle"] },
  { label: "Semantic", keys: ["success", "successBg", "warning", "warningBg", "danger", "dangerBg"] },
];

const colorLabels: Record<ColorKey, string> = {
  background: "Background",
  surface: "Surface",
  surfaceHover: "Surface Hover",
  border: "Border",
  borderHover: "Border Hover",
  primary: "Primary Text",
  secondary: "Secondary Text",
  muted: "Muted Text",
  accent: "Accent",
  accentHover: "Accent Hover",
  accentMuted: "Accent Muted",
  accentSubtle: "Accent Subtle",
  success: "Success",
  successBg: "Success BG",
  warning: "Warning",
  warningBg: "Warning BG",
  danger: "Danger",
  dangerBg: "Danger BG",
};

interface ThemeConfig {
  colors: Record<ColorKey, string>;
  fonts: { heading: string; body: string };
  layout: { containerWidth: number; borderRadius: number; sectionPadding: number };
  colorPreset: string;
}

interface Preset {
  name: string;
  label: string;
  colors: Partial<Record<ColorKey, string>>;
  desc: string;
}

const presets: Preset[] = [
  {
    name: "midnight", label: "Midnight",
    desc: "Dark cyan tech aesthetic",
    colors: { background: "#0a0a0a", surface: "#141414", border: "#262626", primary: "#fafafa", accent: "#22d3ee", accentHover: "#06b6d4", accentMuted: "#0891b2", accentSubtle: "#164e63" },
  },
  {
    name: "cyberpunk", label: "Cyberpunk",
    desc: "Neon pink on deep black",
    colors: { background: "#0a0015", surface: "#150020", border: "#2a0040", primary: "#fafafa", accent: "#ff00ff", accentHover: "#e000e0", accentMuted: "#b000b0", accentSubtle: "#3a003a" },
  },
  {
    name: "forest", label: "Forest",
    desc: "Earthy green vibes",
    colors: { background: "#0a1205", surface: "#0f1a08", border: "#1a2e10", primary: "#f0fdf0", accent: "#22c55e", accentHover: "#16a34a", accentMuted: "#15803d", accentSubtle: "#0a2e10" },
  },
  {
    name: "ocean", label: "Ocean",
    desc: "Deep blue waters",
    colors: { background: "#050d1a", surface: "#0a1628", border: "#14263d", primary: "#f0f8ff", accent: "#38bdf8", accentHover: "#0ea5e9", accentMuted: "#0284c7", accentSubtle: "#0a2e4a" },
  },
  {
    name: "sunset", label: "Sunset",
    desc: "Warm orange glow",
    colors: { background: "#140a05", surface: "#1a0f08", border: "#2e1a10", primary: "#fef3e0", accent: "#f97316", accentHover: "#ea580c", accentMuted: "#c2410c", accentSubtle: "#3a1a0a" },
  },
  {
    name: "monochrome", label: "Monochrome",
    desc: "Clean black & white",
    colors: { background: "#000000", surface: "#0f0f0f", border: "#1f1f1f", primary: "#ffffff", secondary: "#a0a0a0", muted: "#505050", accent: "#ffffff", accentHover: "#e0e0e0", accentMuted: "#808080", accentSubtle: "#2a2a2a" },
  },
  {
    name: "royal", label: "Royal",
    desc: "Purple elegance",
    colors: { background: "#0a0514", surface: "#120820", border: "#201040", primary: "#f5f0ff", accent: "#a78bfa", accentHover: "#8b5cf6", accentMuted: "#7c3aed", accentSubtle: "#2a1050" },
  },
  {
    name: "crimson", label: "Crimson",
    desc: "Bold red drama",
    colors: { background: "#140505", surface: "#1a0808", border: "#2e1010", primary: "#fef0f0", accent: "#ef4444", accentHover: "#dc2626", accentMuted: "#b91c1c", accentSubtle: "#3a0a0a" },
  },
];

const fontOptions = ["Outfit", "DM Sans", "Inter", "Poppins", "Plus Jakarta Sans", "Space Grotesk"] as const;

const defaultTheme: ThemeConfig = {
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

export default function ThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [activeTab, setActiveTab] = useState<"colors" | "fonts" | "layout">("colors");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/theme").then(res => res.json()).then(setTheme).catch(() => {});
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const c = theme.colors;
    Object.entries(c).forEach(([key, val]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      root.style.setProperty(`--${cssKey}`, val);
    });
    root.style.setProperty("--font-heading", `var(--font-${theme.fonts.heading.toLowerCase().replace(/\s+/g, "-")})`);
    root.style.setProperty("--font-body", `var(--font-${theme.fonts.body.toLowerCase().replace(/\s+/g, "-")})`);
  }, [theme]);

  const updateColor = useCallback((key: ColorKey, value: string) => {
    setTheme(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
      colorPreset: "",
    }));
  }, []);

  const applyPreset = useCallback((preset: Preset) => {
    setTheme(prev => {
      const merged = { ...prev.colors, ...preset.colors } as Record<ColorKey, string>;
      return { ...prev, colors: merged, colorPreset: preset.name };
    });
  }, []);

  const updateFont = useCallback((type: "heading" | "body", value: string) => {
    setTheme(prev => ({ ...prev, fonts: { ...prev.fonts, [type]: value } }));
  }, []);

  const updateLayout = useCallback((key: keyof ThemeConfig["layout"], value: number) => {
    setTheme(prev => ({ ...prev, layout: { ...prev.layout, [key]: value } }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/theme", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    applyPreset(presets[0]);
  };

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-primary">Design Customizer</h1>
          <p className="text-secondary text-sm mt-1">Visually customize every aspect of your site — no code needed</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={resetTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-secondary hover:text-primary hover:border-border-hover transition-all cursor-pointer"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-accent text-background px-6 py-2.5 rounded-xl font-semibold hover:bg-accent-hover transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {saving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Theme"}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tab Bar */}
          <div className="flex gap-1 bg-surface border border-border rounded-2xl p-1.5">
            {[
              { id: "colors" as const, label: "Colors", icon: Palette },
              { id: "fonts" as const, label: "Typography", icon: Type },
              { id: "layout" as const, label: "Layout", icon: Layout },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all flex-1 justify-center cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-accent text-background shadow-lg shadow-accent/20"
                      : "text-secondary hover:text-primary hover:bg-background/50"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Color Panel */}
          {activeTab === "colors" && (
            <div className="space-y-6">
              {/* Presets */}
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Color Presets</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {presets.map(preset => {
                    const isActive = theme.colorPreset === preset.name;
                    const accentColor = preset.colors.accent || theme.colors.accent;
                    const bgColor = preset.colors.background || theme.colors.background;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className={`relative p-4 rounded-xl border text-left transition-all cursor-pointer group ${
                          isActive
                            ? "border-accent bg-accent/5 ring-1 ring-accent/30"
                            : "border-border hover:border-border-hover bg-background/50"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-2 right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                            <Check size={12} className="text-background" />
                          </span>
                        )}
                        <div className="flex gap-1.5 mb-3">
                          {[bgColor, (preset.colors.surface || theme.colors.surface), accentColor, (preset.colors.primary || theme.colors.primary)].map((color, i) => (
                            <div key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ background: color }} />
                          ))}
                        </div>
                        <p className="text-primary text-sm font-medium">{preset.label}</p>
                        <p className="text-secondary text-xs mt-0.5">{preset.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Colors */}
              <div className="bg-surface border border-border rounded-2xl p-6">
                <h3 className="font-heading text-lg font-semibold text-primary mb-4">Custom Colors</h3>
                <div className="space-y-3">
                  {colorGroups.map(group => {
                    const isExpanded = expandedGroups[group.label] !== false;
                    return (
                      <div key={group.label} className="border border-border rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleGroup(group.label)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-background/30 hover:bg-background/50 transition-colors cursor-pointer"
                        >
                          <span className="text-primary font-medium text-sm">{group.label}</span>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1">
                              {group.keys.map(key => (
                                <div key={key} className="w-4 h-4 rounded-full border border-white/10" style={{ background: theme.colors[key] }} />
                              ))}
                            </div>
                            <svg
                              className={`w-4 h-4 text-secondary transition-transform ${isExpanded ? "rotate-180" : ""}`}
                              fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="p-4 space-y-3">
                            {group.keys.map(key => (
                              <div key={key} className="flex items-center gap-3">
                                <div className="relative">
                                  <input
                                    type="color"
                                    value={theme.colors[key]}
                                    onChange={e => updateColor(key, e.target.value)}
                                    className="w-10 h-10 rounded-xl border border-border cursor-pointer bg-transparent p-0.5 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={theme.colors[key]}
                                  onChange={e => updateColor(key, e.target.value)}
                                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-primary text-sm font-mono focus:outline-none focus:border-accent transition-colors"
                                />
                                <label className="text-secondary text-xs w-24 text-right">{colorLabels[key]}</label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Fonts Panel */}
          {activeTab === "fonts" && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-primary mb-1">Typography</h3>
              <p className="text-secondary text-sm mb-6">Choose fonts for headings and body text</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-secondary text-sm mb-2 font-medium">Heading Font</label>
                  <select
                    value={theme.fonts.heading}
                    onChange={e => updateFont("heading", e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer appearance-none"
                    style={{ fontFamily: `var(--font-${theme.fonts.heading.toLowerCase().replace(/\s+/g, "-")})` }}
                  >
                    {fontOptions.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <div className="mt-3 p-3 bg-background/50 rounded-xl border border-border/50">
                    <p className="text-lg font-semibold text-primary" style={{ fontFamily: `var(--font-${theme.fonts.heading.toLowerCase().replace(/\s+/g, "-")})` }}>
                      The quick brown fox
                    </p>
                    <p className="text-sm text-secondary">Heading preview</p>
                  </div>
                </div>
                <div>
                  <label className="block text-secondary text-sm mb-2 font-medium">Body Font</label>
                  <select
                    value={theme.fonts.body}
                    onChange={e => updateFont("body", e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer appearance-none"
                    style={{ fontFamily: `var(--font-${theme.fonts.body.toLowerCase().replace(/\s+/g, "-")})` }}
                  >
                    {fontOptions.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <div className="mt-3 p-3 bg-background/50 rounded-xl border border-border/50">
                    <p className="text-sm" style={{ fontFamily: `var(--font-${theme.fonts.body.toLowerCase().replace(/\s+/g, "-")})` }}>
                      The quick brown fox jumps over the lazy dog. This is a preview of your body text style.
                    </p>
                    <p className="text-xs text-secondary mt-1">Body preview</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Layout Panel */}
          {activeTab === "layout" && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-primary mb-1">Layout</h3>
              <p className="text-secondary text-sm mb-6">Adjust spacing and container dimensions</p>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-secondary text-sm font-medium">Container Width</label>
                    <span className="text-primary text-sm font-mono bg-background px-2 py-1 rounded-lg border border-border">{theme.layout.containerWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min={960}
                    max={1440}
                    step={10}
                    value={theme.layout.containerWidth}
                    onChange={e => updateLayout("containerWidth", Number(e.target.value))}
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent/30"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>960px</span>
                    <span>1440px</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-secondary text-sm font-medium">Border Radius</label>
                    <span className="text-primary text-sm font-mono bg-background px-2 py-1 rounded-lg border border-border">{theme.layout.borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={32}
                    step={1}
                    value={theme.layout.borderRadius}
                    onChange={e => updateLayout("borderRadius", Number(e.target.value))}
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent/30"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>0px (Sharp)</span>
                    <span>32px (Rounded)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-secondary text-sm font-medium">Section Padding</label>
                    <span className="text-primary text-sm font-mono bg-background px-2 py-1 rounded-lg border border-border">{theme.layout.sectionPadding}px</span>
                  </div>
                  <input
                    type="range"
                    min={40}
                    max={160}
                    step={8}
                    value={theme.layout.sectionPadding}
                    onChange={e => updateLayout("sectionPadding", Number(e.target.value))}
                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent/30"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>40px (Compact)</span>
                    <span>160px (Spacious)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-2xl sticky top-8 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/30">
              <Eye size={16} className="text-accent" />
              <span className="text-primary text-sm font-medium flex-1">Live Preview</span>
              <span className="text-secondary text-xs">Updates in real-time</span>
            </div>
            <div className="p-4 space-y-6" style={{ "--preview-radius": `${theme.layout.borderRadius}px` } as React.CSSProperties}>
              {/* Preview Header */}
              <div className="flex items-center justify-between p-4 border" style={{ background: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.layout.borderRadius }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-background text-xs font-bold" style={{ background: theme.colors.accent }}>
                    A
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.colors.primary, fontFamily: `var(--font-${theme.fonts.heading.toLowerCase().replace(/\s+/g, "-")})` }}>Portfolio</p>
                    <p className="text-xs" style={{ color: theme.colors.secondary }}>Preview</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {["Home", "Projects", "Contact"].map(item => (
                    <span key={item} className="px-3 py-1 text-xs rounded-lg" style={{ background: theme.colors.background, color: theme.colors.secondary, border: `1px solid ${theme.colors.border}` }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview Hero */}
              <div className="p-6 text-center" style={{ background: `linear-gradient(to bottom, ${theme.colors.background}, ${theme.colors.surface})`, borderRadius: theme.layout.borderRadius, border: `1px solid ${theme.colors.border}` }}>
                <p className="text-sm mb-2" style={{ color: theme.colors.secondary }}>Hello, I&apos;m</p>
                <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.primary, fontFamily: `var(--font-${theme.fonts.heading.toLowerCase().replace(/\s+/g, "-")})` }}>
                  Your Name
                </h2>
                <p className="text-base" style={{ color: theme.colors.accent }}>Full Stack Developer</p>
                <div className="flex justify-center gap-3 mt-4">
                  {["5+ Years", "50+ Projects", "100%"].map(s => (
                    <div key={s} className="px-3 py-2 rounded-lg text-center" style={{ background: theme.colors.background, border: `1px solid ${theme.colors.border}` }}>
                      <p className="text-sm font-bold" style={{ color: theme.colors.primary }}>{s}</p>
                      <p className="text-xs" style={{ color: theme.colors.secondary }}>Stat</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Card */}
              <div className="p-4" style={{ background: theme.colors.surface, borderRadius: theme.layout.borderRadius, border: `1px solid ${theme.colors.border}` }}>
                <h3 className="font-semibold text-base mb-2" style={{ color: theme.colors.primary, fontFamily: `var(--font-${theme.fonts.heading.toLowerCase().replace(/\s+/g, "-")})` }}>
                  Preview <span style={{ color: theme.colors.accent }}>{">"}</span>
                </h3>
                <p className="text-sm" style={{ color: theme.colors.secondary }}>
                  This is a live preview of your current theme. Colors, fonts, and layout reflect in real-time.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2.5 py-1 rounded text-xs font-medium" style={{ background: theme.colors.accent + "20", color: theme.colors.accent, border: `1px solid ${theme.colors.accent}30` }}>
                    Click Save Theme
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs" style={{ background: theme.colors.accentSubtle, color: theme.colors.accentMuted }}>
                    to publish
                  </span>
                </div>
              </div>

              {/* Preview Color Swatches */}
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: theme.colors.secondary }}>Color Palette</p>
                <div className="flex gap-1.5">
                  {(["background", "surface", "border", "primary", "secondary", "accent", "accentHover", "success", "warning", "danger"] as ColorKey[]).map(key => (
                    <div key={key} className="flex-1 h-8 rounded-lg" style={{ background: theme.colors[key], borderRadius: Math.min(theme.layout.borderRadius, 8) }} title={colorLabels[key]} />
                  ))}
                </div>
                <div className="flex gap-1.5 mt-1">
                  {(["background", "surface", "border", "primary", "secondary", "accent", "accentHover", "success", "warning", "danger"] as ColorKey[]).map(key => (
                    <p key={key} className="flex-1 text-center text-[10px]" style={{ color: theme.colors.secondary }}>{key.slice(0, 4)}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
