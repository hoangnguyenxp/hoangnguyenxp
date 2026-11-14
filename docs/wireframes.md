# UI wireframes

The implemented pages provide the visual prototype; the diagrams below describe the responsive information hierarchy.

## Shared desktop shell

```text
┌─────────────────────┬──────────────────────────────────────────────────────────┐
│ ForgeLearn          │ Northstar Academy / Page         Search  Alerts  Profile │
│ Plant switcher      ├──────────────────────────────────────────────────────────┤
│ LEARN               │ Page title + context + primary action                    │
│  Dashboard          │                                                          │
│  Learning roadmap   │  Summary cards / demo notice / search filters            │
│  Technical library  │                                                          │
│  Troubleshooting   │  Main working area                    Context panel      │
│ PRACTICE            │                                                          │
│  AI assistant       │                                                          │
│ MANAGE              │                                                          │
│  Admin portal       │                                                          │
│ Help + signed-in user│                                                          │
└─────────────────────┴──────────────────────────────────────────────────────────┘
```

## Dashboard

```text
Welcome + Continue learning
[Learning progress] [Courses] [Hours] [Skills]
[Continue learning courses + progress] [7-day streak]
[Recent lessons + history]              [Factory case studies]
[Next roadmap milestone]
```

## Key workflows

- **Roadmap:** personalized progress summary → five ordered levels → lesson topics, lock/completion state → certificates.
- **Lesson and quiz:** video placeholder, principle, wiring reference and safe field steps → three-question scored knowledge check. Score and progress remain local to the demo.
- **Library:** keyword search and category/type facets → document cards and tags → bookmark → authenticated preview/download in production.
- **Troubleshooting:** alarm/model/symptom search → family filters → result list → possible causes, safe checks, corrective/preventive actions and feedback.
- **Assistant:** suggested prompts → question/answer thread → cited sources, confidence/abstention, safety context and feedback. MVP indicates no live retrieval.
- **Admin:** learner/content/knowledge metrics → content review table → users/roles, AI knowledge and settings sections with clear integration status.

On narrow screens the left navigation becomes a dismissible drawer, summary cards stack, and result/detail content moves to a single column. Text contrast, button labels and visible focus states should be preserved when replacing demo controls with production primitives.
