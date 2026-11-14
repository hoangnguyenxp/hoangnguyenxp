"use client";

import { useState } from "react";
import { DemoNotice, PageHeading, ToastButton } from "@/components/ui";

const resources = [
  { title: "PLC Fundamentals: From I/O to Ladder", type: "Course", owner: "Learning team", status: "Published", updated: "Nov 12, 2026" },
  { title: "FX5U Series User's Manual — Hardware", type: "Document", owner: "T. Nguyen", status: "Published", updated: "Nov 08, 2026" },
  { title: "MR-J4 AL.52 overload guide", type: "Alarm guide", owner: "P. Le", status: "In review", updated: "Nov 07, 2026" },
  { title: "OEE loss tree workshop", type: "Case study", owner: "L. Tran", status: "Draft", updated: "Nov 02, 2026" },
];

export default function AdminPage() {
  const [tab, setTab] = useState("Content");
  return <>
    <PageHeading eyebrow="ACADEMY MANAGEMENT" title="Admin portal" description="Manage learning content and knowledge for your factory teams." action={<ToastButton className="button button-primary">＋ Create content</ToastButton>} />
    <DemoNotice>Admin controls are a non-persistent demo UI. User management, publishing workflows, uploads, Entra ID roles and AI knowledge indexing are not wired up.</DemoNotice>
    <div className="admin-stats"><div><span>ACTIVE LEARNERS</span><b>248</b><small>↑ 12% this month</small></div><div><span>COURSES PUBLISHED</span><b>32</b><small>4 in draft</small></div><div><span>KNOWLEDGE DOCUMENTS</span><b>1,284</b><small>Last indexed — demo</small></div><div><span>COMPLETION RATE</span><b>76%</b><small>↑ 5.3% this quarter</small></div></div>
    <div className="admin-tabs">{["Content", "Users & roles", "AI knowledge base", "Settings"].map((item) => <button className={tab === item ? "admin-tab-active" : ""} onClick={() => setTab(item)} key={item}>{item}</button>)}</div>
    <section className="panel admin-content"><div className="admin-content-head"><div><h2>{tab === "Content" ? "Content library" : tab}</h2><p>{tab === "Content" ? "Review and manage courses, documents and troubleshooting guides." : "This section is a prototype. Connect the .NET API and Entra ID to enable management."}</p></div><span className="admin-search">⌕ <input aria-label="Search admin records" placeholder="Search content..." /></span></div>{tab === "Content" ? <div className="admin-table"><div className="table-row table-header"><span>NAME</span><span>TYPE</span><span>OWNER</span><span>STATUS</span><span>UPDATED</span><span /></div>{resources.map((item) => <div className="table-row" key={item.title}><b>{item.title}</b><span>{item.type}</span><span>{item.owner}</span><span><i className={`content-status ${item.status.toLowerCase().replace(" ", "-")}`} />{item.status}</span><span>{item.updated}</span><button aria-label={`More actions for ${item.title}`}>···</button></div>)}</div> : <div className="admin-placeholder"><span>⚙</span><b>{tab} will appear here</b><p>Configure this area when the platform API is connected.</p></div>}</section>
    <div className="admin-footnote">Demo workspace · No real learners or content are being managed</div>
  </>;
}
