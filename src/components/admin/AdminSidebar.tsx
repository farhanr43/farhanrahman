"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, User, Code, Palette, Settings, Mail, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Code },
  { href: "/admin/theme", label: "Customize", icon: Palette },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

interface AdminSidebarProps {
  onLogout: () => void;
  onNavClick?: () => void;
}

export default function AdminSidebar({ onLogout, onNavClick }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="font-heading text-xl font-semibold text-primary">Admin</h2>
        <p className="text-secondary text-sm">Dashboard</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavClick}
                  className={`flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-background"
                      : "text-secondary hover:bg-background hover:text-primary"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/"
          target="_blank"
          onClick={onNavClick}
          className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-secondary hover:bg-background hover:text-primary transition-all duration-300 w-full mb-2"
        >
          <ExternalLink size={20} />
          <span className="font-medium">View Website</span>
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-secondary hover:bg-background hover:text-primary transition-all duration-300 w-full cursor-pointer"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
