"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Menu, X } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const ADMIN_EMAIL = "farhanrahman0043@gmail.com";
const ADMIN_PASSWORD = "FarhanR43@";

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("admin_auth") : null;
    if (stored === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-surface border border-border p-8 rounded-xl w-full max-w-md">
          <h1 className="font-heading text-2xl font-semibold text-primary mb-6 text-center">
            Admin Login
          </h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-primary placeholder:text-secondary focus:outline-none focus:border-accent mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-primary placeholder:text-secondary focus:outline-none focus:border-accent mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-accent text-background py-3 rounded-lg font-medium hover:bg-accent-hover transition-colors cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-surface border-b border-border">
        <h2 className="font-heading text-lg font-semibold text-primary">Admin</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-11 h-11 flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-background transition-colors cursor-pointer"
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - desktop fixed, mobile overlay */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-surface border-r border-border z-50 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onLogout={handleLogout} onNavClick={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="lg:ml-64 pt-14 lg:pt-0 p-4 md:p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
