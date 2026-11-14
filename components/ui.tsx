"use client";

import { useState } from "react";

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>;
}

export function ProgressBar({ value, color = "blue" }: { value: number; color?: string }) {
  return <div className={`progress-track ${color}`}><span style={{ width: `${value}%` }} /></div>;
}

export function DemoNotice({ children }: { children: React.ReactNode }) {
  return <div className="demo-notice"><span>i</span><p>{children}</p></div>;
}

export function SearchBox({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (value: string) => void }) {
  return <label className="input-search"><span>⌕</span><input aria-label={placeholder} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />{value && <button type="button" aria-label="Clear search" onClick={() => onChange("")}>×</button>}</label>;
}

export function ToastButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [message, setMessage] = useState("");
  return <span className="toast-wrap"><button className={className} onClick={() => { setMessage("Demo action — backend integration is not configured."); window.setTimeout(() => setMessage(""), 3200); }}>{children}</button>{message && <span className="toast-message" role="status">{message}</span>}</span>;
}
