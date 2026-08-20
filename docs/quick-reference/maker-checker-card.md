# Quick Reference Card — Maker-Checker

**Print this. Keep at your desk. Use every deliverable.**

---

## The Split

```
MAKER (Model)          CHECKER (You)
─────────────────────────────────────
Produce best draft     Every claim → source
Don't self-edit        Every number → trace
Flag uncertainties     Tone = audience?
                       One clear point?
                       Jargon stripped?
                       Verdict: READY / REWORK
```

**The maker can be wrong and fast. The checker must be slow enough to catch it.**

---

## Maker Prompt

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

---

## Checker Prompt

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

---

## Checker Checklist (Mental or Written)

```
☐ Every factual claim → source or flagged unverified
☐ Every number → traceable to a doc I trust
☐ The ask/decision → explicit in first 2 sentences?
☐ Tone → matches audience? (formal/casual/direct)
☐ Jargon → stripped or defined?
☐ One clear thing? Or multiple mixed?
☐ Would I be comfortable with my manager reading this?
```

**Verdict:** ☐ READY → Ship it | ☐ NEEDS REWORK → Feed fixes back to maker

---

## Match the Bar to the Stakes

| Deliverable | Check Time | Checklist Depth |
|-------------|------------|-----------------|
| Slack reply | 5 sec | Mental: "Ask explicit? Number traced?" |
| Email to client | 30 sec | Quick scan: claims, numbers, ask |
| Status update | 1 min | Full checklist |
| Client deliverable | 5 min | Full checklist + line-level fixes |
| Board deck | 15 min | Full checklist + peer review |

---

## What Changes

- Wrong outputs get caught by **you**, before they're sent, not after
- You spend scarce attention on **judgment**, where it compounds, not on typing
- The model becomes a **junior associate**, not a co-signer

---

## The Tradeoff

The checker step is real work and real time. The lever is matching the bar to the stakes:
a Slack reply gets a 5-second scan; a customer-facing doc gets the full checklist. The risk
you're avoiding is the quiet one: looking careless because you trusted a plausible draft.

**Judgment is the product. Don't ship it unchecked.**

---

*CC-BY-4.0 • Print this card • Keep at your desk*