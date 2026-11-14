"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoNotice, PageHeading } from "@/components/ui";

const questions = [
  { prompt: "For a typical PNP sensor output, what does the output provide when ON?", options: ["A path to 0 V", "Positive voltage to the input", "An Ethernet message", "A dry contact only"], answer: 1 },
  { prompt: "Before inspecting or changing field wiring, what comes first?", options: ["Force the PLC input", "Reset the alarm", "Follow site isolation and verify the safe state", "Increase the sensor sensitivity"], answer: 2 },
  { prompt: "What is the best first reference for a specific PLC input module's common wiring?", options: ["A generic wiring color chart", "The exact manufacturer's hardware manual", "A forum post", "A previous machine's drawing"], answer: 1 },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = answers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0);
  return <>
    <PageHeading eyebrow="PLC FUNDAMENTALS · KNOWLEDGE CHECK" title="Check your understanding" description="A short review on PLC input signals and safe troubleshooting practice." />
    <DemoNotice>This quiz is a local demo. Your score, progress and certificate are not saved to an account.</DemoNotice>
    <div className="quiz-layout"><main className="panel quiz-main">{questions.map((question, index) => <section className="quiz-question" key={question.prompt}><div className="quiz-question-number">QUESTION {String(index + 1).padStart(2, "0")} <span>{index + 1} of {questions.length}</span></div><h2>{question.prompt}</h2><div className="quiz-options">{question.options.map((option, optionIndex) => <label key={option} className={`quiz-option ${submitted && optionIndex === question.answer ? "correct-option" : ""} ${submitted && answers[index] === optionIndex && optionIndex !== question.answer ? "wrong-option" : ""}`}><input type="radio" name={`question-${index}`} checked={answers[index] === optionIndex} disabled={submitted} onChange={() => setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? optionIndex : value))} /><span>{option}</span>{submitted && optionIndex === question.answer && <b>Correct answer</b>}</label>)}</div></section>)}{submitted ? <div className={`quiz-result ${score === questions.length ? "quiz-pass" : ""}`}><b>{score === questions.length ? "Excellent work — all correct!" : `You scored ${score} of ${questions.length}`}</b><span>{score === questions.length ? "This demo assessment is passed." : "Review the lesson and try again."}</span><button className="button button-outline" onClick={() => { setAnswers(questions.map(() => null)); setSubmitted(false); }}>Try again</button></div> : <div className="quiz-submit"><span>{answers.filter((value) => value !== null).length} of {questions.length} answered</span><button className="button button-primary" disabled={answers.some((value) => value === null)} onClick={() => setSubmitted(true)}>Submit answers <span>→</span></button></div>}<div className="quiz-back"><Link href="/lesson">← Back to lesson</Link></div></main><aside className="panel quiz-info"><span className="quiz-icon">◉</span><h3>Knowledge check</h3><p>Review the key ideas from the digital input lesson.</p><div><span>QUESTIONS</span><b>3</b></div><div><span>PASS MARK</span><b>100% in this demo</b></div><small>Answers are scored locally in your browser and are not retained.</small></aside></div>
  </>;
}
