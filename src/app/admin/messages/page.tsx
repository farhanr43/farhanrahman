"use client";

import { useState, useEffect } from "react";
import { Mail, ChevronDown, ChevronUp, Inbox } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then(res => res.json())
      .then(setMessages)
      .catch(() => {});
  }, []);

  const markAsRead = async (id: string) => {
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const getTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-primary">Messages</h1>
          <p className="text-secondary text-sm mt-1">
            {unread > 0 ? `${unread} unread message${unread > 1 ? "s" : ""}` : "All messages read"}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-16 text-center">
          <Inbox size={48} className="text-muted mx-auto mb-4" />
          <h3 className="font-heading text-xl font-semibold text-primary mb-2">No messages yet</h3>
          <p className="text-secondary">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`bg-surface border rounded-2xl overflow-hidden transition-all ${
                msg.read ? "border-border" : "border-accent/40"
              }`}
            >
              <button
                onClick={() => {
                  setExpanded(expanded === msg.id ? null : msg.id);
                  if (!msg.read) markAsRead(msg.id);
                }}
                className="w-full flex items-center gap-4 p-5 text-left cursor-pointer hover:bg-surface-hover transition-colors"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.read ? "bg-background" : "bg-accent/20"
                }`}>
                  <Mail size={18} className={msg.read ? "text-muted" : "text-accent"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`font-medium truncate ${msg.read ? "text-primary" : "text-primary font-semibold"}`}>
                      {msg.name}
                    </span>
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    )}
                  </div>
                  <p className={`text-sm truncate ${msg.read ? "text-secondary" : "text-secondary font-medium"}`}>
                    {msg.subject}
                  </p>
                </div>
                <span className="text-xs text-secondary whitespace-nowrap flex-shrink-0">{getTime(msg.createdAt)}</span>
                {expanded === msg.id ? <ChevronUp size={18} className="text-muted flex-shrink-0" /> : <ChevronDown size={18} className="text-muted flex-shrink-0" />}
              </button>

              {expanded === msg.id && (
                <div className="px-5 pb-5 pt-2 border-t border-border">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-secondary">From:</span>
                      <p className="text-primary font-medium">{msg.name}</p>
                    </div>
                    <div>
                      <span className="text-secondary">Email:</span>
                      <p className="text-primary font-medium">{msg.email}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-secondary">Subject:</span>
                      <p className="text-primary font-medium">{msg.subject}</p>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4">
                    <p className="text-primary whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-end">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="bg-accent text-background px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
