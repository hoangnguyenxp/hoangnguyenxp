"use client";

import { useMemo, useState } from "react";
import { libraryDocuments } from "@/lib/data";
import { DemoNotice, PageHeading, SearchBox, ToastButton } from "@/components/ui";

const categories = ["All resources", "PLC", "Maintenance", "Sensors", "Vision", "Facility", "Factory management", "Networking"];

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All resources");
  const [saved, setSaved] = useState<string[]>([]);
  const [fileTypes, setFileTypes] = useState<string[]>([]);
  const [sortNewest, setSortNewest] = useState(true);
  const documents = useMemo(() => {
    const filtered = libraryDocuments.filter((doc) =>
      (category === "All resources" || doc.category === category) &&
      (!fileTypes.length || fileTypes.includes(doc.type)) &&
      `${doc.title} ${doc.category} ${doc.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
    );
    return filtered.sort((left, right) => sortNewest
      ? Date.parse(right.updated) - Date.parse(left.updated)
      : left.title.localeCompare(right.title));
  }, [query, category, fileTypes, sortNewest]);
  return <>
    <PageHeading eyebrow="KNOWLEDGE AT YOUR FINGERTIPS" title="Technical library" description="The manuals, standards and practical guides your team needs to keep the factory running." action={<ToastButton className="button button-primary">＋ Upload resource</ToastButton>} />
    <DemoNotice>Search and bookmarks work with the sample catalog. Upload, download and PDF preview require the backend and file storage configured in production.</DemoNotice>
    <div className="library-toolbar"><SearchBox placeholder="Search manuals, SOPs, equipment..." value={query} onChange={setQuery} /><button className="button button-outline">☷ <span>Filters below</span></button><button className="button button-outline" onClick={() => setSortNewest((value) => !value)}>↕ <span>{sortNewest ? "Recently updated" : "Name A–Z"}</span></button></div>
    <div className="library-layout"><aside className="filter-sidebar"><div className="filter-heading">CATEGORIES <span>⌄</span></div>{categories.map((item) => <button key={item} className={`category-filter ${category === item ? "category-active" : ""}`} onClick={() => setCategory(item)}>{item}<span>{item === "All resources" ? libraryDocuments.length : libraryDocuments.filter((doc) => doc.category === item).length}</span></button>)}<div className="filter-heading format-heading">FILE TYPE <span>⌄</span></div>{["PDF", "DOCX", "PPTX", "XLSX"].map((item) => <label className="format-filter" key={item}><input type="checkbox" checked={fileTypes.includes(item)} onChange={(event) => setFileTypes((types) => event.target.checked ? [...types, item] : types.filter((type) => type !== item))} /> {item}</label>)}</aside>
      <section className="resource-section"><div className="resource-summary"><b>{documents.length} resources</b><span>Curated for Northstar Electronics</span></div><div className="resource-grid">{documents.map((doc) => <article className="resource-card" key={doc.title}><div className="resource-top"><span className={`file-icon file-${doc.type.toLowerCase()}`}>{doc.type}</span><button aria-label={saved.includes(doc.title) ? "Remove bookmark" : "Bookmark"} className={`bookmark-button ${saved.includes(doc.title) ? "bookmarked" : ""}`} onClick={() => setSaved((items) => items.includes(doc.title) ? items.filter((title) => title !== doc.title) : [...items, doc.title])}>{saved.includes(doc.title) ? "★" : "☆"}</button></div><span className="resource-category">{doc.category.toUpperCase()}</span><h3>{doc.title}</h3><div className="tag-row">{doc.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="resource-footer"><span>{doc.size} <i>·</i> Updated {doc.updated}</span><ToastButton className="download-button">↓</ToastButton></div></article>)}</div>{documents.length === 0 && <div className="empty-state"><span>⌕</span><h3>No resources found</h3><p>Try a different search or category.</p></div>}</section></div>
  </>;
}
