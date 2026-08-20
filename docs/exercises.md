# Exercise Templates — Copy, Paste, Do

**Every exercise uses real work from your week. No toy examples.**

---

## Module 1 Exercises

### Exercise 1.1: Leverage Map (20 minutes)

**Goal:** Identify 3 weekly tasks where the leverage loop gives you the biggest return.

**Instructions:**
1. List every recurring task you do in a typical work week (meetings, status updates, follow-ups, research, drafting, reviews, planning, etc.)
2. For each task, score 1–5 on:
   - **Frequency** (how often you do it)
   - **Pain** (how much you dread / procrastinate / rework it)
   - **Leverage potential** (how much better/faster it could be with a system)
3. Pick the top 3 by total score.
4. Write your Leverage Map:

```
MY LEVERAGE MAP
Week of: ___________

1. [Task name]
   Frequency: ___/5  Pain: ___/5  Leverage: ___/5  Total: ___/15
   Current time: _____  Target time: _____
   Stop condition I'll use: ___________________________________

2. [Task name]
   Frequency: ___/5  Pain: ___/5  Leverage: ___/5  Total: ___/15
   Current time: _____  Target time: _____
   Stop condition I'll use: ___________________________________

3. [Task name]
   Frequency: ___/5  Pain: ___/5  Leverage: ___/5  Total: ___/15
   Current time: _____  Target time: _____
   Stop condition I'll use: ___________________________________
```

**Stop condition for this exercise:** Map has 3 tasks with scores and stop conditions written. Time: 20 min max.

---

### Exercise 1.2: Run the Loop (3 × 15 minutes)

**Goal:** Run the Capture→Structure→Judgment→Re-run→Repeat loop on a real task 3 times this week.

**Pick one task from your Leverage Map.** Use the Loop Prompting template:

```
CONTEXT: I'm a [your role] writing a [status update / follow-up / brief] for [audience].
RAW MATERIAL:
[paste your messy notes here]

TASK: Draft a tight version. Then, in a separate section, list the 3 weakest parts of
your own draft and exactly what would make each stronger.

CONSTRAINTS: Plain language. No jargon. Under [X] words.
```

**Run it 3 times this week (Mon/Wed/Fri or Tue/Thu/Fri):**

| Run | Date | Task | Time Spent | Judgment Notes (3 weakest parts) | Stop Condition Met? |
|-----|------|------|------------|----------------------------------|---------------------|
| 1   |      |      |            | 1.                               | Y / N               |
|     |      |      |            | 2.                               |                     |
|     |      |      |            | 3.                               |                     |
| 2   |      |      |            | 1.                               | Y / N               |
|     |      |      |            | 2.                               |                     |
|     |      |      |            | 3.                               |                     |
| 3   |      |      |            | 1.                               | Y / N               |
|     |      |      |            | 2.                               |                     |
|     |      |      |            | 3.                               |                     |

**After run 3:** Save the final prompt + your judgment notes as a recurring prompt (see [Recurring Prompts](guides/recurring-prompts.md)).

**Stop condition for this exercise:** 3 runs logged with judgment notes. Final prompt saved.

---

## Module 2 Exercises

### Exercise 2.1: Stop-Condition Library (Week 3)

**Goal:** Write 3 stop conditions for your top 3 work types.

**Template per work type:**

```
WORK TYPE: [Status Update / Follow-up Email / Research Brief / Meeting Prep / Draft / etc.]

STOP CONDITION:
Stop when: [observable, falsifiable condition — see guide for examples]

WHY THIS CONDITION:
- It's observable: [yes/no — someone else could verify it]
- It's falsifiable: [yes/no — you can clearly fail it]
- It targets the real risk: [what goes wrong if you stop too early/late]

TEST RUN:
Task: ___________________
Did the condition catch a real issue?  Y / N
If yes, what did it catch? ___________________________________
Time saved vs. old way: ___________________
```

**Do this for 3 work types.** Save as `stop-conditions.md` in your prompt library.

**Stop condition for this exercise:** 3 stop conditions written, each tested once, saved in library.

---

### Exercise 2.2: Maker-Checker Run (Week 4)

**Goal:** Run the maker/checker split on one real deliverable.

**The Prompt (Maker):**
```
CONTEXT: I'm a [role] creating a [deliverable] for [audience].
RAW MATERIAL:
[paste messy notes / draft / transcript]

TASK (MAKER): Produce the best draft you can. Be thorough. Do not self-edit.

OUTPUT FORMAT:
[DRAFT]
[your draft here]

[MAKER NOTES]
- What I'm confident about:
- What I'm uncertain about:
- Where I cut corners:
```

**The Prompt (Checker):**
```
CONTEXT: You are a rigorous checker. The maker (above) produced a draft. Your job: find what the maker missed, what's wrong, what's unverified, what's off-voice.

MAKER'S DRAFT:
[paste draft]

MAKER'S NOTES:
[paste maker notes]

TASK (CHECKER): Run this checklist:
1. Every factual claim → source or flag as unverified
2. Every number → traceable to a doc I trust
3. The ask/decision → explicit in first 2 sentences?
4. Tone → matches audience? (formal/casual/direct)
5. Jargon → stripped or defined?
6. One clear thing? Or multiple mixed?
7. Would I be comfortable with my manager reading this?

OUTPUT:
[CHECKER REPORT]
- Pass / Fail on each item above
- Specific fixes needed (line-level if possible)
- Verdict: READY / NEEDS REWORK
```

**Run it once on a real deliverable this week.** Save both prompts.

**Deliverable:** Checked artifact + 1-paragraph retro: "Where did the checker catch something I would have shipped wrong?"

**Stop condition:** One complete maker/checker run logged + retro written.

---

### Exercise 2.3: Build Your 5-Prompt Library (Week 4)

**Goal:** Save your 5 most-used prompts in a reusable library.

**Format per prompt:**

```
# [Prompt Name] — v1.0 — [Date]

## CONTEXT
Role: [your role]
Audience: [who reads the output]
Task type: [status / follow-up / brief / draft / summary / etc.]

## PROMPT
```
[full prompt text here — include stop condition at the end]
```

## STOP CONDITION
Stop when: [copy from your stop-condition library]

## JUDGMENT NOTES (from last run)
- What worked:
- What needed fixing:
- Next improvement:

## METADATA
- Created: [date]
- Last run: [date]
- Runs this month: [count]
- Avg time saved: [minutes]
```

**Start with these 5 (adapt to your work):**
1. Weekly Status Update
2. Meeting Follow-up Email
3. Research Brief / Synthesis
4. Decision Brief (for a decision you need to make)
5. Meeting Prep / Agenda

**Stop condition:** 5 prompts saved with metadata, each run at least once this month.

---

### Exercise 2.4: Retrieval Log for One Book (Week 5)

**Goal:** Run the learning loop on one book from the Leverage Library.

**Pick ONE book from the [Leverage Library](library.md) Start Here list.**

**The Retrieval Loop (from Learning Paths guide):**

```
1. METALARN: Before you study, map the skill. What does "good" look like? What are the sub-skills?
2. RETRIEVE: Close the source. Write what you remember cold. Or ask the model to quiz you.
3. FEEDBACK: Compare your answer to the source. The error is the lesson.
4. SPACE: Wait. Run the same retrieval again in 1 day, 3 days, 1 week.
5. INTERLEAVE: Mix topics. The model can shuffle the quiz order.
6. CONSOLIDATE: Summarize in your own words. Sleep on it.
```

**Log Format:**

```
BOOK: [Title] — [Author]
DATE STARTED: ___________

METALARN (pre-study):
- What "good" looks like for this book's ideas:
- Sub-skills I want to extract:

SESSION 1 (Day 0) — RETRIEVE + FEEDBACK:
- What I recalled cold:
- What the source says (key differences):
- Error lesson:

SESSION 2 (Day 1) — RETRIEVE:
- What I recalled:

SESSION 3 (Day 3) — RETRIEVE:
- What I recalled:

SESSION 4 (Day 7) — RETRIEVE + CONSOLIDATE:
- What I recalled:
- My one-paragraph summary in my own words:
- How I'll use this in my work:

TIME SPENT TOTAL: ______ minutes
```

**Stop condition:** All 4 sessions logged. One-paragraph summary written. Applied once to work.

---

## Module 3 Track Exercises

### Track: Manager (Weeks 6–8)

**Guides:** [Maker-Checker](guides/maker-checker.md) + [Stop Conditions](guides/stop-conditions.md)

**Project: Decision Loop**

**Scenario:** You have a real decision to make this week (hiring, prioritization, resource allocation, vendor choice, etc.)

**The Decision Loop:**

```
1. CAPTURE: Dump the messy context (constraints, stakeholders, options, fears, data)
2. STRUCTURE: Run the "Decision Brief" prompt
3. JUDGMENT: You mark what's missing, what's biased, what's unverified
4. RE-RUN: Feed judgment back → refined brief
5. STOP CONDITION: Every claim sourced; tradeoffs explicit; downside scenario written
6. DECIDE: You make the call. Log the decision + rationale.
6. RETRO (1 week later): Was the decision sound? What would you change?
```

**Decision Brief Prompt:**
```
CONTEXT: I'm a [role] deciding on [decision] for [stakeholders].
RAW MATERIAL:
[paste: context, constraints, options, data, fears, stakeholders]

TASK: Produce a Decision Brief with:
1. The Decision (one sentence)
2. Context (what's driving this)
3. Options (2–4, with tradeoffs)
4. Data/Assumptions (what we know vs. assume)
5. Downside Scenario (what happens if wrong)
6. Stop Condition: Every claim sourced; tradeoffs explicit; downside written

CONSTRAINTS: Under 400 words. Plain language. No jargon.
```

**Run the loop 2× on the same decision.** Then decide. Log the decision.

**Retro (1 week later):**
```
DECISION: ____________________________
DATE: ___________

What happened: _________________________________________
Was the decision sound?  Y / N / Partially
What the loop caught that I would have missed: ___________
What I'd change in the loop next time: ___________________
```

**Deliverable:** Decision log + retro.

**Stop condition:** Decision made, logged, retro written.

---

### Track: Writer (Weeks 6–8)

**Guides:** [Loop Prompting](guides/loop-prompting.md) + [Recurring Prompts](guides/recurring-prompts.md)

**Project: Draft→Edit→Publish Pipeline**

**Scenario:** You produce content weekly (newsletter, blog, LinkedIn, internal docs, client deliverables).

**The Pipeline:**

```
STAGE 1 — CAPTURE (Monday): Dump topic, angle, key points, evidence, audience
STAGE 2 — DRAFT (Tuesday): Run Loop Prompting → draft v1
STAGE 3 — EDIT (Wednesday): Run Maker-Checker (you as checker) → v2
STAGE 4 — STOP CONDITION (Wednesday): Every claim sourced; one clear point; under word count; CTA clear
STAGE 5 — PUBLISH (Thursday): Ship
STAGE 6 — RETRO (Friday): What worked? What felt slow? What prompt needs fixing?
```

**Weekly Prompt Library (build these 5):**
1. **Ideation** → "Give me 10 angles on [topic] for [audience]. Rank by surprise + utility."
2. **Outline** → "Turn these points into a logical outline. Lead with the point. Flag gaps."
3. **Draft** → Loop Prompting template (capture→structure→judgment)
4. **Edit** → Maker-Checker checker prompt
5. **Headline/Subject** → "Write 10 headlines. 5 direct, 3 curiosity, 2 story. Under 60 chars."

**Deliverable:** 5-prompt library for your content type + 2 published pieces using it + retro.

**Retro questions:**
- Which prompt saved the most time?
- Where did the checker catch a real issue?
- What prompt needs a version 2.0?

---

### Track: Operator (Weeks 6–8)

**Guides:** [Stop Conditions](guides/stop-conditions.md) + [Recurring Prompts](guides/recurring-prompts.md)

**Project: Status→Follow-up→Handoff Pipeline**

**Scenario:** You run weekly status, send follow-ups, manage handoffs between teams/shifts.

**The Pipeline:**

```
MONDAY — STATUS CAPTURE
  Input: Raw notes from week (tickets, meetings, blockers, wins)
  Prompt: Status Update template + your stop condition
  Output: Clean status → send

TUESDAY — FOLLOW-UP ENGINE
  Input: Monday's status + replies + new blockers
  Prompt: Follow-up template (decision needed / blocked / FYI)
  Output: Targeted follow-ups → send

WEDNESDAY — HANDOFF PREP
  Input: Open items needing handoff (shifts, teams, vendors)
  Prompt: Handoff template (what's done / what's next / who owns / risks)
  Output: Handoff docs → send

THURSDAY — RETRO + LIBRARY UPDATE
  Review: What dropped? What was unclear? What stop condition failed?
  Update: Prompt library v+1
```

**Required Prompts (build these 3):**
1. **Status Update** — with your stop condition (every number traced; ask explicit in first 2 sentences)
2. **Follow-up** — decision needed / blocked / FYI format
3. **Handoff** — what's done / what's next / who owns / risks / links

**Deliverable:** 3 prompts in library + 2 weeks of pipeline runs + retro.

**Retro:** What dropped? What stop condition saved you? What prompt needs fixing?

---

### Track: Knowledge Worker (Weeks 6–8)

**Guides:** [Loop Prompting](guides/loop-prompting.md) + [Learning Paths](guides/learning-paths.md)

**Project: Research→Synthesis→Brief Pipeline**

**Scenario:** You need to research a topic, synthesize findings, and produce a decision-ready brief.

**The Pipeline:**

```
DAY 1 — METALARN + CAPTURE
  Topic: ___________________________
  Metalearn: What does a "good brief" look like? Sub-skills?
  Capture: Dump sources, links, notes, hunches, questions

DAY 2 — STRUCTURE (Loop Prompting)
  Prompt: Research Brief template
  Loop: Capture→Structure→Judgment→Re-run (2 passes)
  Stop Condition: Every claim sourced; 2 unverified claims flagged; decision implications clear

DAY 3 — MAKER-CHECKER
  Maker: You wrote the brief
  Checker: You verify every claim, trace numbers, check tone
  Output: Final brief

DAY 4 — RETRO + LIBRARY
  What worked? What was slow? What prompt needs v2?
  Add brief to your prompt library as a template
```

**Research Brief Prompt:**
```
CONTEXT: I'm a [role] briefing [decision-maker] on [topic] so they can [decide/act].
RAW MATERIAL:
[paste: sources, notes, data, hunches]

TASK: Produce a Research Brief:
1. The Point (one sentence — what they need to know)
2. The Evidence (3–5 bullets, each with source)
3. The Unverified (2 claims I could NOT verify — flag honestly)
4. The Implications (what this means for their decision)
5. The Ask (what you need from them)

CONSTRAINTS: Under 500 words. Every claim sourced. Plain language.
Stop when: Every claim sourced; 2 unverified flagged; implications clear.
```

**Deliverable:** 1 polished brief + prompt template saved + retro.

---

## Module 4: Mastery Exercises

### Exercise 4.1: Build an Advanced Prompt

**Goal:** Take your most-used prompt and build a v2.0 with:
- Few-shot examples (from your best runs)
- Role framing (from *Prompt Engineering for LLMs* — "playwriting")
- Explicit stop condition
- Metadata tracking

**Template:**
```
# [Prompt Name] — v2.0 — [Date]

## ROLE
You are a [specific role: senior editor / rigorous checker / strategic analyst / etc.]
with [years] experience in [domain]. You [specific strength: catch unverified claims /
spot logical gaps / sharpen prose for busy executives].

## FEW-SHOT EXAMPLES (3–5 from your best runs)
### Example 1
INPUT: [raw material]
OUTPUT: [ideal output]

### Example 2
...

## PROMPT
```
[full prompt with stop condition]
```

## STOP CONDITION
Stop when: [specific, observable, falsifiable]

## TRACKING
- Version: 2.0
- Created: [date]
- Based on: v1.0 runs [count]
- Avg quality score (1–10): ____
- Next review: [date + 30 days]
```

**Stop condition:** v2.0 prompt built, tested once, metadata complete.

---

### Exercise 4.2: Teach the Loop (Feynman Retrieval)

**Goal:** Run Module 1 for a colleague. Teaching = highest-form retrieval.

**Steps:**
1. Invite a colleague (15 min call or async)
2. Walk them through Exercise 1.1 (Leverage Map) on THEIR work
3. Have them run Exercise 1.2 (Loop) once
4. Debrief: What clicked? What was unclear? What would you explain differently?

**Log:**
```
TAUGHT TO: [name/role]
DATE: ___________

What clicked for them: ___________________________________
What was unclear: _______________________________________
What I'd explain differently: ____________________________
My own insight from teaching: ____________________________
```

**Stop condition:** One person taught, log written.

---

### Exercise 4.3: Leverage Library Monthly Deep-Dive

**Goal:** Pick ONE theme from the Leverage Library each month. Go deep.

**Process:**
1. Pick a theme from [Leverage Library](library.md) (Themes A–H)
2. Read the 2–3 "Best-supporting books" for that theme (from the library page)
3. Run the Retrieval Loop (Exercise 2.4) on ONE of those books
4. Write a one-page "Theme Application" for your work:
   - The core idea in one sentence
   - How it changes your leverage loop
   - One prompt modification to test
   - One habit to build

**Monthly Log:**
```
MONTH: ___________
THEME: [A–H] — [Theme Name]
BOOK STUDIED: ____________________________
CORE IDEA (one sentence): ___________________________________

HOW IT CHANGES MY LOOP:
_______________________________________________________________

PROMPT MODIFICATION TO TEST:
_______________________________________________________________

HABIT TO BUILD (30 days):
_______________________________________________________________

RETRO (end of month): What stuck? What didn't?
```

**Stop condition:** Theme application written, prompt mod tested, habit tracked 30 days.

---

### Exercise 4.4: Community Share + Review

**Goal:** Share one prompt, review one peer's prompt.

**Where:** GitHub Discussions on this repo, or your team Slack, or a peer 1:1.

**Share Template:**
```
PROMPT: [name] — v[version]
CONTEXT: [role, audience, task]
PROMPT: [full text]
STOP CONDITION: [text]
WHY I'M SHARING: [what problem it solves / what I want feedback on]
```

**Review Checklist (for reviewing others):**
- [ ] Clear role + audience + task?
- [ ] Stop condition observable + falsifiable?
- [ ] Few-shot examples included (if v2+)?
- [ ] One thing I'd steal for my own library:
- [ ] One suggestion to strengthen:

**Stop condition:** One prompt shared + one prompt reviewed + both logs saved.

---

### Exercise 4.5: Contribute to the Repo

**Goal:** Make the field guide better for the next person.

**Contribution Types (pick one):**
1. **Fix a link** — run lychee locally, find a dead/redirected link, PR the fix
2. **Improve a template** — your v2.0 prompt is better than the guide's; PR it
3. **Add a free resource** — found a legit free course/tool/doc; PR to README
4. **Fix a typo/clarity** — you spotted confusing language; PR the fix
5. **Write a guide** — you built a prompt pattern not covered; draft a guide

**PR Checklist:**
- [ ] Follows CONTRIBUTING.md (no copyrighted uploads, no affiliate links)
- [ ] Links verified free and live
- [ ] Voice matches: practitioner, anti-hype, copy-pasteable
- [ ] Stop condition included (for guides/templates)
- [ ] Tested on real work at least once

**Stop condition:** PR opened, merged, you're in the contributors list.

---

## Self-Assessment Rubrics

### Module 1 Checkpoint Rubric

| Criterion | Pass | Needs Work |
|-----------|------|------------|
| Leverage Map | 3 tasks scored, stop conditions written | Fewer than 3; scores missing; stop conditions vague |
| Loop Runs | 3 runs logged with judgment notes | <3 runs; judgment notes missing or vague |
| Saved Prompt | Final prompt saved with stop condition | Prompt missing stop condition or not saved |
| Self-Assessment | Honest: "I can run this loop on a new task tomorrow" | "I'm not sure I could do it alone" |

**Pass = all 4 Pass.** If any "Needs Work," repeat that exercise before Module 2.

---

### Module 2 Checkpoint Rubric

| Criterion | Pass | Needs Work |
|-----------|------|------------|
| Stop Conditions | 3 written, each tested once, observable/falsifiable | <3; untested; vague conditions |
| Maker-Checker | 1 run logged + retro identifying real catch | Run missing; retro generic ("it was good") |
| Prompt Library | 5 prompts saved with metadata; each run ≥1× this month | <5; metadata missing; unrun prompts |
| Learning Paths | 1 book retrieval log complete (4 sessions + summary) | Sessions missing; summary generic |
| Portfolio Retro | 3 artifacts + honest reflection on what's next | Artifacts missing; retro generic |

**Pass = all 5 Pass.**

---

### Module 3 Track Rubric

| Criterion | Pass | Needs Work |
|-----------|------|------------|
| Project | Deliverable produced using track's pipeline | Pipeline not followed; deliverable missing |
| Retro | Specific: what worked, what failed, what's next | Generic ("it went well") |
| Prompt Library | Track's required prompts added + run | Prompts missing or unrun |

**Pass = all 3 Pass.**

---

### Module 4 Mastery Rubric (Ongoing)

| Criterion | Pass | Needs Work |
|-----------|------|------------|
| Advanced Prompt | v2.0 built, tested, metadata complete | Untested; metadata missing |
| Teach the Loop | One person taught, log written, insight captured | Not done; log missing |
| Monthly Deep-Dive | Theme application written, prompt mod tested, habit tracked 30d | Incomplete; habit not tracked |
| Community | One share + one review, both logs saved | Missing share or review |
| Contribute | PR merged | PR not merged / not opened |

**Mastery = all 5 Pass over time.** No rush — this compounds.

---

## Quick Reference Cards

Print these. Keep at your desk.

### CARD 1: The Loop
```
CAPTURE → STRUCTURE → JUDGMENT → RE-RUN → REPEAT
  │           │           │          │         │
  └─ Dump     └─ Organize └─ You mark └─ Feed   └─ Until stop
     messy     (draft,     what's      judgment  condition
     notes     summarize,  wrong/      back      passes
               rank)       missing     as next
                                  prompt
```

### CARD 2: Stop Condition Checklist
```
☐ Observable (someone else could verify)
☐ Falsifiable (you can clearly fail it)
☐ Targets the real risk (not a proxy)
☐ Written before you start
☐ Checked like a checklist, not a vibe
```

### CARD 3: Maker-Checker Split
```
MAKER (draft)          CHECKER (verify)
─────────────────────────────────────
Produce best draft     Every claim → source
Don't self-edit        Every number → trace
Flag uncertainties     Tone = audience?
                       One clear point?
                       Jargon stripped?
                       Verdict: READY / REWORK
```

### CARD 4: Retrieval Loop (Learning)
```
1. METALARN — Map the skill before you start
2. RETRIEVE — Close source, write/quiz cold
3. FEEDBACK — Compare to source; error = lesson
4. SPACE — 1 day, 3 days, 1 week
5. INTERLEAVE — Mix topics, shuffle order
6. CONSOLIDATE — Summarize in own words, sleep
```

### CARD 5: The Lead (Great Leads)
```
The lead carries ~80% of impact.
Rule of One: One idea, one promise, one reader.
Six lead types: Direct, Indirect, Question, Tale, Proclamation, Velvet Pouch.
```

---

*All exercises use real work. No toy examples. CC-BY-4.0.*