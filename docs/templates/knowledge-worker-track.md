# Knowledge Worker Track Template

**Copy this into your notes. Use for every research brief.**

---

## Research→Synthesis→Brief Pipeline

```
DAY 1 — METALARN + CAPTURE
  Topic: ___________________________
  Metalearn: What does a "good brief" look like? Sub-skills?
  Capture: Dump sources, links, notes, hunches, questions

DAY 2 — STRUCTURE (Loop Prompting)
  Prompt: Research Brief template
  Loop: Capture→Structure→Judgment→Re-run (2 passes)
  Stop Condition: Every claim sourced; 2 unverified flagged; implications clear

DAY 3 — MAKER-CHECKER
  Maker: You wrote the brief
  Checker: You verify every claim, trace numbers, check tone
  Output: Final brief

DAY 4 — RETRO + LIBRARY
  What worked? What was slow? What prompt needs v2.0?
  Add brief to your prompt library as a template
```

---

## Research Brief Prompt

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

---

## Metalearn Template (Day 1)

```
TOPIC: ___________________________

WHAT "GOOD BRIEF" LOOKS LIKE:
- One clear point in first sentence
- Every claim sourced
- Decision implications explicit
- Actionable ask at the end

SUB-SKILLS TO EXTRACT:
1. Source evaluation (credibility, recency, bias)
2. Synthesis (patterns across sources)
3. Gap identification (what's missing)
4. Implication mapping (so what?)
5. Ask formulation (clear, actionable)

SOURCES TO CAPTURE:
- [ ] Primary sources (docs, data, transcripts)
- [ ] Secondary sources (analysis, commentary)
- [ ] Expert contacts
- [ ] Internal data
```

---

## Retrieval Loop for Source Material (Day 2–3)

**For each key source, run:**
```
CONTEXT: I'm learning from [source title] for [topic].
TASK: Quiz me. Ask 5 questions that force retrieval:
  - 3 recall (define / explain / steps)
  - 2 applied (scenario → what do you do?)
After I answer, grade me, point to exact gap, give tomorrow's retrieval prompt.
CONSTRAINTS: Don't tell me the answer up front. Make me produce it.
```

**Schedule:** Day 0 → Day 1 → Day 3 → Day 7

---

## Maker-Checker for Briefs

**Maker Prompt:** (Use Research Brief prompt above)

**Checker Prompt:**
```
CONTEXT: You are a rigorous checker. The brief below is for [decision-maker] to [decide/act].
BRIEF:
[paste brief]

TASK: Run this checklist:
1. Every factual claim → source or flagged unverified
2. Every number → traceable to a doc I trust
3. The Point → one sentence, in first paragraph?
4. Implications → explicit for the decision?
5. The Ask → clear, actionable, deadline if relevant?
6. Tone → matches decision-maker's style?
7. Would I send this to my VP?

OUTPUT:
[CHECKER REPORT]
- Pass/Fail each item
- Specific fixes (line-level)
- Verdict: READY / NEEDS REWORK
```

---

## Weekly Project (Weeks 6–8)

**Week 6:** Build Research Brief prompt. Run pipeline on Topic 1. Deliver brief. Retro.
**Week 7:** Run pipeline on Topic 2. Deliver brief. Retro.
**Week 8:** Retro on both. What worked? What slow? What needs v2.0?

---

## Retro Template (Day 4)

```
BRIEF: ____________________________
DATE: ___________

What worked? _________________________________________
What was slow? _______________________________________
What prompt needs a version 2.0? _____________________
What source was most valuable? ________________________
What would I change in the pipeline? ___________________
```

---

## Required Prompts (Add to Library)

1. **Research Brief** — with stop condition (every claim sourced; 2 unverified flagged; implications clear)
2. **Quiz Prompt** — from [Learning Paths](../guides/learning-paths.md) (metalearn → retrieve → feedback → space)

---

## Prompt Library Entries (Copy Format)

```
# [Prompt Name] — v1.0 — [Date]

## CONTEXT
Role: [your role]
Audience: [who reads the output]
Task type: [research brief / synthesis / briefing / etc.]

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

---

## v2.0 Upgrade Template (After 2 Briefs)

```
# [Prompt Name] — v2.0 — [Date]

## ROLE
You are a [specific role: strategic analyst / senior researcher / etc.]
with [years] experience in [domain]. You [specific strength: catch unverified claims / spot logical gaps / synthesize across sources].

## FEW-SHOT EXAMPLES (3–5 from your best runs)
### Example 1
INPUT: [raw material]
OUTPUT: [ideal output]

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
- Avg quality (1–10): ____
- Next review: [date + 30 days]
```

---

## Weekly Checklist

- [ ] Day 1: Metalearn + Capture
- [ ] Day 2: Loop Prompting (2 passes)
- [ ] Day 3: Maker-Checker
- [ ] Day 4: Retro → update prompt library
- [ ] Update prompt library metadata

---

*Copy this entire file to your notes. Use for every research brief.*