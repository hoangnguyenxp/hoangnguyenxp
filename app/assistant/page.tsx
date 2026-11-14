"use client";

import { useState } from "react";
import { DemoNotice, PageHeading } from "@/components/ui";

const prompts = ["Why is my servo drive showing AL.52?", "How do I check a PNP sensor output?", "Explain a safe PLC input troubleshooting flow"];

export default function AssistantPage() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(false);
  const ask = (value: string) => {
    if (!value.trim()) return;
    setQuestion(value);
    setAsked(true);
  };
  return <>
    <PageHeading eyebrow="YOUR FACTORY KNOWLEDGE PARTNER" title="Ask Forge" description="Get clear, practical guidance grounded in your factory's documents and troubleshooting history." />
    <DemoNotice>This is a UI prototype with sample responses only. Azure OpenAI, Azure AI Search, citations, confidence scoring and knowledge ingestion are not connected.</DemoNotice>
    <div className="assistant-layout"><section className="assistant-chat panel"><div className="chat-header"><span className="assistant-avatar">✳</span><div><b>Forge assistant <span className="online-indicator">● Demo</span></b><small>Answers will be grounded in approved factory knowledge when configured</small></div><button aria-label="More options">···</button></div><div className="chat-body">{!asked ? <div className="assistant-welcome"><div className="large-assistant-mark">✳</div><h2>Hi Thanh, what are we working on?</h2><p>Ask a question about equipment, alarms, SOPs or factory practices.</p><div className="prompt-grid">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}<span>↗</span></button>)}</div></div> : <div className="conversation"><div className="user-message">{question}</div><div className="bot-message"><span className="assistant-avatar">✳</span><div className="bot-copy"><small>DEMO RESPONSE · NOT CONNECTED TO YOUR FACTORY KNOWLEDGE</small><p>For <b>{question.toLowerCase().includes("al.52") ? "AL.52 on an MR-J4 servo drive" : "this equipment question"}</b>, start by confirming the exact model and alarm definition in the manufacturer's manual. Follow your site's LOTO procedure before inspection.</p><h4>Suggested checks</h4><ol><li>Record the alarm and operating conditions when it occurs.</li><li>Inspect the machine load and mechanical movement for binding or obstruction.</li><li>Verify relevant wiring and parameter settings against the approved manual.</li><li>Escalate to a qualified engineer if the cause is not confirmed.</li></ol><div className="answer-confidence"><span>ⓘ</span> Example answer · No documents retrieved · Confidence unavailable</div><div className="answer-feedback"><button>👍 Helpful</button><button>👎 Not helpful</button><button>↗ Share feedback</button></div></div></div></div>}</div><form className="chat-input" onSubmit={(event) => { event.preventDefault(); ask(question); }}><input aria-label="Ask Forge" value={question} onChange={(event) => { setQuestion(event.target.value); setAsked(false); }} placeholder="Describe an alarm, issue or question..." /><button type="submit" disabled={!question.trim()}>↑</button><small>AI can make mistakes. Verify critical maintenance instructions before acting.</small></form></section>
    <aside className="assistant-side"><section className="panel sources-panel"><h3>Knowledge sources</h3><p>In production, answers can reference approved content from:</p>{["Technical manuals & PDFs", "SOPs and work instructions", "Troubleshooting guides", "Factory case studies"].map((item) => <div className="source-row" key={item}><span>▤</span>{item}<b>—</b></div>)}<span className="configuration-tag">NOT CONNECTED</span></section><section className="assistant-safety"><span>⚠</span><div><b>Safety matters</b><p>Forge is an assistive tool, not a substitute for approved procedures or qualified engineering judgment.</p></div></section></aside></div>
  </>;
}
