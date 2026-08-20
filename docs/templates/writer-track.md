# Writer Track Template

**Copy this into your notes. Use for every piece of content.**

---

## Weekly Content Pipeline

```
MONDAY — IDEATION
  Prompt: Ideation
  Output: 1 chosen angle + why

TUESDAY — DRAFT (Loop Prompting)
  Prompt: Loop Prompting template
  Run: Capture → Structure → Judgment → Re-run (2 passes)
  Stop Condition: Every claim sourced; one clear point; under word count; CTA clear

WEDNESDAY — EDIT (Maker-Checker)
  Prompt: Maker-Checker checker prompt
  Output: v2 → ready to publish

THURSDAY — PUBLISH
  Ship it.

FRIDAY — RETRO
  What worked? What was slow? What prompt needs v2.0?
```

---

## Your 5-Prompt Library (Build These)

| # | Prompt Name | Purpose | Template |
|---|-------------|---------|----------|
| 1 | **Ideation** | "10 angles on [topic] for [audience]. Rank by surprise + utility." | [Ideation Prompt](#ideation-prompt) |
| 2 | **Outline** | "Logical outline. Lead with the point. Flag gaps." | [Outline Prompt](#outline-prompt) |
| 3 | **Draft** | Loop Prompting (capture→structure→judgment) | [Loop Prompting](../guides/loop-prompting.md) |
| 4 | **Edit** | Maker-Checker checker prompt | [Maker-Checker](../guides/maker-checker.md) |
| 5 | **Headline/Subject** | "10 headlines. 5 direct, 3 curiosity, 2 story. <60 chars." | [Headline Prompt](#headline-prompt) |

---

## Prompt Templates

### Ideation Prompt
```
CONTEXT: I'm a [role] writing for [audience] about [topic area].
TASK: Give me 10 angles on this topic. Rank by:
1. Surprise (counter-intuitive, contrarian, overlooked)
2. Utility (reader can use this Monday)
3. Specificity (not vague advice)

OUTPUT FORMAT:
1. Angle — Why it works — One-sentence hook
2. ...
10. ...

CONSTRAINTS: Plain language. No buzzwords. Under 200 words total.
```

### Outline Prompt
```
CONTEXT: I'm writing a [piece type] for [audience] on [topic].
RAW MATERIAL: [paste your ideation choice + key points]

TASK: Turn these points into a logical outline.
- Lead with the point (not the topic)
- Flag gaps where evidence is missing
- Order by reader's journey: hook → evidence → implication → action

OUTPUT: Hierarchical outline with 3–5 main sections.
CONSTRAINTS: Plain language. Each section = one clear point.
```

### Headline/Subject Prompt
```
CONTEXT: I'm writing a [newsletter/blog/LinkedIn/email] for [audience] about [topic].
TASK: Write 10 headlines.
- 5 Direct (clear benefit, specific)
- 3 Curiosity (gap, question, unexpected)
- 2 Story (scene, character, transformation)

CONSTRAINTS: Under 60 chars. No clickbait. Accurate to content.
OUTPUT: Numbered list with type label.
```

---

## Weekly Retro Template (Friday)

```
PIECE: ____________________________
DATE: ___________

Which prompt saved the most time? _______________________
Where did the checker catch a real issue? ________________
What prompt needs a version 2.0? ________________________
What felt slow this week? _______________________________
What would I change in the pipeline? _____________________
```

---

## Prompt Library Entries (Copy Format)

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

---

## v2.0 Upgrade Template (After 5+ Runs)

```
# [Prompt Name] — v2.0 — [Date]

## ROLE
You are a [specific role] with [years] experience in [domain].
You [specific strength: catch unverified claims / spot logical gaps / sharpen prose].

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

- [ ] Monday: Ideation prompt → pick angle
- [ ] Tuesday: Draft loop (2 passes) → save draft
- [ ] Wednesday: Maker-Checker edit → finalize
- [ ] Thursday: Publish
- [ ] Friday: Retro → update prompts
- [ ] Update prompt library metadata

---

*Copy this entire file to your notes. Use for every piece of content.*