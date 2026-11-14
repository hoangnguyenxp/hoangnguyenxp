"use client";

import { useMemo, useState } from "react";
import { alarms } from "@/lib/data";
import { DemoNotice, PageHeading, SearchBox } from "@/components/ui";

const families = ["All equipment", "PLC", "Sensor", "Servo", "Inverter", "Vision"];

export default function TroubleshootingPage() {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("All equipment");
  const [selected, setSelected] = useState(alarms[0].code);
  const results = useMemo(() => alarms.filter((item) => (family === "All equipment" || item.family === family) && `${item.code} ${item.equipment} ${item.symptom} ${item.cause}`.toLowerCase().includes(query.toLowerCase())), [family, query]);
  const detail = results.find((item) => item.code === selected) ?? results[0];
  return <>
    <PageHeading eyebrow="SOLVE IT TOGETHER" title="Troubleshooting center" description="Find practical, field-tested guidance for alarms, symptoms and equipment issues." />
    <DemoNotice>Alarm records and corrective guidance are illustrative demo data. Always follow site safety procedures and the equipment manufacturer's documentation.</DemoNotice>
    <div className="trouble-search"><SearchBox placeholder="Search alarm code, model, symptom or keyword..." value={query} onChange={setQuery} /><span>⌘ K</span></div>
    <div className="filter-tabs">{families.map((item) => <button key={item} className={family === item ? "tab-active" : ""} onClick={() => setFamily(item)}>{item}</button>)}</div>
    <div className="trouble-layout"><section className="panel alarm-list-panel"><div className="alarm-list-heading"><span>{results.length} troubleshooting guides</span><button>↕ Newest</button></div>{results.map((item) => <button key={item.code} onClick={() => setSelected(item.code)} className={`alarm-row ${detail?.code === item.code ? "alarm-selected" : ""}`}><span className={`alarm-symbol severity-${item.severity.toLowerCase()}`}>!</span><span className="alarm-main"><span className="alarm-equipment">{item.equipment}</span><b>{item.symptom}</b><small>{item.code} <i>·</i> {item.family} <i>·</i> Updated {item.updated}</small></span><span className={`severity-pill severity-text-${item.severity.toLowerCase()}`}>{item.severity}</span></button>)}</section>
      {detail ? <section className="panel alarm-detail"><div className="detail-eyebrow">TROUBLESHOOTING GUIDE <span className={`severity-pill severity-text-${detail.severity.toLowerCase()}`}>{detail.severity} priority</span></div><h2>{detail.code} <span>·</span> {detail.equipment}</h2><p className="detail-symptom">{detail.symptom}</p><div className="detail-rule" /><div className="detail-block"><span className="step-number">01</span><div><h3>Possible cause</h3><p>{detail.cause}</p></div></div><div className="detail-block"><span className="step-number">02</span><div><h3>Checks to perform</h3><ul><li>Follow site LOTO and verify the machine is in a safe state before inspection.</li><li>Check the manufacturer manual and confirm the exact alarm definition for this model.</li><li>Inspect the relevant wiring, connections and operating conditions; record findings.</li></ul></div></div><div className="detail-block"><span className="step-number">03</span><div><h3>Corrective action</h3><p>Correct the confirmed root cause, then reset and test under the approved maintenance procedure. Escalate to the equipment owner if the fault persists.</p></div></div><div className="safety-note"><span>⚠</span><p><b>Safety first</b> — Use your site's approved isolation and verification procedures. Only qualified personnel should service energized equipment.</p></div><div className="detail-footer"><span>Was this guide helpful?</span><button>👍 Yes</button><button>👎 No</button></div></section> : <div className="empty-state"><h3>No matching guides</h3><p>Try a different search or equipment family.</p></div>}</div>
  </>;
}
