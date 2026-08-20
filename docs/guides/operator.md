# Operator Track

*Build a status→follow-up→handoff pipeline that never drops the ball.*

---

## Why This Track

Operators run the weekly rhythm: status, follow-ups, handoffs between teams/shifts.
The pipeline turns "what did I miss?" into "nothing drops."

**Guides:** [Stop Conditions](../guides/stop-conditions.md) + [Recurring Prompts](../guides/recurring-prompts.md)

**Time:** 3 weeks (Weeks 6–8)  
**Outcome:** A weekly rhythm pipeline you run every week.

---

## The Pipeline

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

---

## Your 3 Required Prompts (build these)

| # | Prompt | Purpose | Stop Condition |
|---|--------|---------|----------------|
| 1 | **Status Update** | Messy notes → clean update | Every number traced; ask explicit in first 2 sentences |
| 2 | **Follow-up** | Thread + intent → crisp nudge | Decision needed / blocked / FYI format clear |
| 3 | **Handoff** | Open items → clean handoff | What's done / what's next / who owns / risks / links |

---

## Prompt Templates

### 1. Status Update
```
CONTEXT: I'm a [role] updating [manager/team] on [project/area].
RAW MATERIAL:
[paste this week's raw notes: tickets, meetings, blockers, wins]

OUTPUT:
- First 2 lines: the status in one breath + the decision/ask.
- Then 3 bullets: what moved, what's blocked, what's next.
- Plain language. No hedge words. Under 200 words.
STOP WHEN: every number traces to a doc/source I trust, and the ask is explicit in the first 2 sentences.
```

### 2. Follow-up
```
CONTEXT: I'm following up on [topic] with [person/team].
RAW MATERIAL:
[paste: original ask, their reply (if any), new context, deadline]

OUTPUT FORMAT (pick one):
- DECISION NEEDED: [one clear ask] + [context] + [deadline]
- BLOCKED: [what's stuck] + [what I need from you] + [by when]
- FYI: [what changed] + [no action needed]

STOP WHEN: the format matches the intent; the ask is explicit; deadline clear.
```

### 3. Handoff
```
CONTEXT: Handing off [item] to [person/team].
RAW MATERIAL:
[paste: current state, open items, links, risks, contacts]

OUTPUT:
- What's Done: [completed items with links]
- What's Next: [next 3 actions with owners]
- Who Owns: [name + contact for each]
- Risks: [what could go wrong + mitigation]
- Links: [all relevant docs/tickets/threads]

STOP WHEN: every open item has an owner; risks named; links live.
```

---

## The Project (Weeks 6–8)

**Week 6:** Build all 3 prompts. Run Mon–Thu pipeline. Retro Thursday.
**Week 7:** Run Mon–Thu pipeline. Retro Thursday.
**Week 8:** Retro on both weeks. What dropped? What stop condition saved you? What prompt needs fixing?

---

## Thursday Retro Template

```
WEEK: ___________

What dropped? _________________________________________
What stop condition saved me? __________________________
What was unclear in a handoff/follow-up? _______________
What prompt needs fixing? ______________________________
```

---

## Required Prompts (add to your library)

1. **Status Update** — with your stop condition (every number traced; ask explicit in first 2 sentences)
2. **Follow-up** — decision needed / blocked / FYI format
3. **Handoff** — what's done / what's next / who owns / risks / links

---

## Deliverable

- 3 prompts in library
- 2 weeks of Mon–Thu pipeline runs
- Retro identifying v2.0 candidates

---

## Retro Questions

- What dropped?
- What stop condition saved you?
- What prompt needs fixing?

---

## Next Step

**Start Week 6:** Build the Status Update prompt with your stop condition. Run Monday's status. Send it.

---

*No AI disclosures. No affiliate links. No pirate sources. CC-BY-4.0.*