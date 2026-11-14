"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  { heading: "HOME", links: [{ href: "/landing", label: "Academy welcome", icon: "⌂" }] },
  { heading: "LEARN", links: [{ href: "/", label: "Dashboard", icon: "▦" }, { href: "/roadmap", label: "Learning roadmap", icon: "⌁" }, { href: "/library", label: "Technical library", icon: "▤" }, { href: "/troubleshooting", label: "Troubleshooting", icon: "⌕" }] },
  { heading: "PRACTICE", links: [{ href: "/assistant", label: "AI assistant", icon: "✳" }, { href: "/quiz", label: "Quizzes & certificates", icon: "◉" }] },
  { heading: "MANAGE", links: [{ href: "/admin", label: "Admin portal", icon: "⚙" }] },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, [darkMode]);

  return <div className="app-shell">
    {sidebarOpen && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Link href="/" className="brand" onClick={() => setSidebarOpen(false)}><span className="brand-mark">F</span><span className="brand-copy"><b>ForgeLearn</b><small>FACTORY ACADEMY</small></span></Link>
      <div className="workspace-select"><span className="workspace-avatar">N</span><span><b>Northstar Electronics</b><small>Plant 01 · Vietnam</small></span><span className="chevron">⌄</span></div>
      <nav className="side-nav">{navigation.map((group) => <section key={group.heading} className="nav-group"><p className="nav-heading">{group.heading}</p>{group.links.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return <Link key={item.label} href={item.href} onClick={() => setSidebarOpen(false)} className={`nav-link ${active ? "nav-active" : ""}`}><span className="nav-icon">{item.icon}</span>{item.label}{item.label === "AI assistant" && <span className="new-pill">NEW</span>}</Link>;
      })}</section>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><span className="help-icon">?</span><b>Need a hand?</b><p>Our learning team is here to help you grow.</p><a href="mailto:academy@northstar.example">Contact academy <span>↗</span></a></div><button className="user-profile"><span className="profile-avatar">TN</span><span className="profile-copy"><b>Thanh Nguyen</b><small>Maintenance Engineer</small></span><span className="chevron">···</span></button></div>
    </aside>
    <main className="main-area"><header className="topbar"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>☰</button><div className="breadcrumb"><span>Northstar Academy</span><span className="crumb-slash">/</span><b>{navigation.flatMap((group) => group.links).find((link) => link.href === pathname)?.label ?? "Learning"}</b></div><div className="topbar-actions"><div className="search-shortcut"><span>⌕</span><span>Search courses, docs, alarms...</span><kbd>⌘ K</kbd></div><button className="icon-button theme-toggle" aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"} aria-pressed={darkMode} onClick={() => setDarkMode((mode) => !mode)}>{darkMode ? "☀" : "☾"}</button><button className="icon-button notification-button" aria-label="Notifications">♧<i /></button><span className="profile-avatar small-avatar">TN</span></div></header><div className="page-content">{children}</div></main>
  </div>;
}
