# FAQ — Stuck Points & Solutions

**Real questions from real users. If you're stuck, start here.**

---

## Getting Started

### "The prompt didn't work well — what now?"
**Most common issue:** The prompt is too vague or missing context.
- Add your **role** and **audience** to the CONTEXT line
- Paste **messier** raw material — more context = better output
- Run the loop **again** with your judgment notes as the next prompt
- The second pass is where quality lives (see [Loop Prompting](guides/loop-prompting.md))

### "My stop condition feels too strict / too loose"
**Too strict:** You'll never ship. Relax to "time-boxed: 3 passes, then decide" for creative work.
**Too loose:** You'll ship garbage. Add one concrete check: "every number traces to a doc" or "ask explicit in first 2 sentences."

### "I'm not a writer/manager/operator — can I still do this?"
Yes. The **leverage loop** (Capture→Structure→Judgment→Re-run) works for any knowledge work.
- Pick the track closest to your work
- The loop is the same; only the templates change
- Generalist path: complete Modules 1–2, then pick a track

### "How much time does this really take?"
| Module | Weekly Time | Fits Into |
|----------|-------------|-----------|
| Module 1 | 2–3 hrs | Your existing work (status, follow-ups) |
| Module 2 | 3–4 hrs | Your existing work (briefs, reviews, reading) |
| Module 3 | 3–5 hrs | Your actual projects |
| Module 4 | 1–2 hrs/month | Ongoing habit |

**Key insight:** Exercises use **your real work**. You're not adding hours; you're changing *how* you do existing work.

### "What if I miss a week?"
The system waits for you. No streaks to break. Pick up where you left off.
- Module checkpoints are pass/fail, not time-gated
- Your prompt library saves your progress
- The Leverage Library is always there when you return

---

## During the Exercises

### "The AI gave me a generic answer"
**Fix:** Add more raw material. The model can only structure what you give it.
- Paste meeting transcripts, raw notes, email threads, data dumps
- The messier the input, the more value the loop adds
- Specificity in → specificity out

### "I keep re-running past the stop condition"
**Fix:** Write the stop condition as the **last line of your prompt**. When output arrives, check it like a checklist. If it passes → ship. No "one more polish."

### "My judgment notes are vague"
**Template for judgment notes:**
```
3 Weakest Parts:
1. [Specific claim] — needs source / is unverified
2. [Specific sentence] — tone too [casual/formal/vague]
3. [Missing element] — need [data point / example / ask]
```
Be specific enough that you could hand it to someone else and they'd make the same fix.

### "The Maker-Checker feels like double work"
**It's not double work — it's split work.**
- Maker (model): Fast, tireless drafting
- Checker (you): Slow, sharp judgment
- The maker *can be wrong fast*. The checker *must be slow enough to catch it*.
- Match the bar to the stakes: Slack reply = 5-sec scan. Board deck = full checklist.

### "I'm not learning from the books — it's not sticking"
**You're likely rereading, not retrieving.** Use the [Learning Paths](guides/learning-paths.md) retrieval loop:
1. **Metalearn** — map the skill before you start
2. **Retrieve** — close the book, write/quiz cold
3. **Feedback** — compare to source; error = lesson
4. **Space** — repeat in 1 day, 3 days, 1 week
5. **Interleave** — mix topics, don't block
6. **Consolidate** — summarize in your own words, sleep

**The discomfort of retrieval IS the learning happening.**

---

## Track-Specific

### Manager: "My decisions don't feel more rigorous"
- Use the **Decision Brief prompt** every time (see [Manager Track](guides/manager.md))
- Run the loop 2× on the same decision before deciding
- Log the decision + rationale. Retro in 1 week.
- The loop catches: missing tradeoffs, unverified assumptions, missing downside scenarios

### Writer: "My drafts still feel generic"
- Build the **5-prompt library** (Ideation, Outline, Draft, Edit, Headline)
- Run the **Draft loop** 2 passes minimum
- Use **Maker-Checker** for the edit pass — the checker catches what you miss
- Retro every Friday: which prompt saved time? Which needs v2.0?

### Operator: "Things still drop"
- Build the **3-prompt pipeline**: Status → Follow-up → Handoff
- Run Mon–Thu religiously for 2 weeks
- Thursday retro: "What dropped? What stop condition saved me?"
- Update prompts weekly (v1.1, v1.2...)

### Knowledge Worker: "My briefs are too long / unfocused"
- Use the **Research Brief prompt** with the stop condition: "Every claim sourced; 2 unverified flagged; implications clear"
- Metalearn first: map what "good brief" looks like for your audience
- Maker-Checker on the brief: checker verifies every claim, traces every number
- Retro: which source was most valuable? What prompt needs v2.0?

---

## Technical / Workflow

### "Which AI tool should I use?"
| Tool | Best For |
|------|----------|
| **ChatGPT** | General, coding, analysis |
| **Claude** | Long docs, careful writing, nuance |
| **Gemini** | Deep Google Workspace integration |
| **Copilot** | Web-grounded, Microsoft ecosystem |
| **Perplexity** | Research with citations |
| **NotebookLM** | Ground in YOUR documents |

**Use whatever's free and handy.** The prompts are tool-agnostic.

### "How do I save/organize my prompts?"
**Simple system:**
```
prompts/
├── status-update.md
├── follow-up.md
├── research-brief.md
├── decision-brief.md
├── meeting-prep.md
└── learning-quiz.md
```
Each file: prompt + stop condition + judgment notes + metadata (version, date, runs, time saved).
Store in Obsidian, Notion, Notepad, GitHub — whatever you open daily.

### "The link check failed on my PR"
- The lychee CI runs on every push. Check the Actions tab.
- Common: gemini.google.com (excluded), LinkedIn (excluded), Wolfram (excluded).
- If it's a real dead link: fix the URL or replace with a working source.
- The config is in `lychee.toml` — add exclusions there if needed.

### "I want to contribute a guide/resource"
See [CONTRIBUTING.md](../CONTRIBUTING.md). Two rules:
1. No copyrighted uploads (no pirate links)
2. No affiliate links
3. Disclose AI assistance in your PR

---

## Philosophy / Mindset

### "Why 'more leverage, not more AI'?"
AI is a leverage layer, not a trend. The point isn't to use more AI tools — it's to get more output per hour without adding hours, and keep your judgment in the loop where it matters.

**The loop is the product. The prompt library is the byproduct.**

### "Why no AI disclosure on the content?"
The repo's stance: human judgment is the product. AI is the practice partner. You don't credit your calculator for the math; you own the answer.

### "Why no pirate links / Z-Library?"
Two reasons: legal and principle. The Leverage Library cites every source so you can pursue it legally — buy, borrow, or read free public domain. The reading sheet *is* the public proof.

---

## Still Stuck?

1. **Check the guides** — each has exercises + troubleshooting
2. **Check exercises.md** — self-assessment rubrics tell you exactly what "pass" looks like
3. **Open an issue** — we read everything. Tag `@thewyattbrocato`
4. **Discussion tab** — ask the community

**You're not behind. You're exactly where you need to be. Pick up where you left off.**