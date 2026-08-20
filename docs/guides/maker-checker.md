# Maker-Checker

*Split drafting (machine) from checking (human judgment). Keep the human side sharp.*

## Old way

You ask the model to "write the thing," then you send the thing. The machine did the making
*and* the checking, and you were a rubber stamp. When it's wrong, wrong fact, wrong tone,
wrong call, it's your name on it anyway.

## Swap

Run two separate roles on purpose:

- **Maker** = the model. Fast, tireless drafting, structuring, summarizing.
- **Checker** = you. The only one who owns accuracy, taste, context, risk, and the final call.

Peter Drucker's **The Effective Executive** is the root idea: the executive's job is to be
*effective*, to make the right decisions and be accountable for them, not to do all the
making. The machine is brilliant at making; it is not accountable. You are.

## The split, concretely

```
MAKER (model):
  - Turn messy notes into a draft
  - Summarize the long doc into 5 points
  - Generate 3 options for the wording

CHECKER (you), run this checklist every time:
  [ ] Is every factual claim true, or sourced and labeled?
  [ ] Does it match the audience and the relationship?
  [ ] Does it say the right thing, or just a plausible thing?
  [ ] What's the risk if this is slightly wrong? (email vs. board deck = different bar)
  [ ] Would I defend this out loud in the meeting?
```

The maker can be wrong and fast. The checker must be slow enough to catch it. If you skip the
checklist, you've outsourced the one part you can't outsource.

## Copy-paste checker prompt

Flip the model into the checker seat so it audits its own draft before you do:

```
Read the draft below as a skeptical reviewer. List every claim that is unverified,
every sentence that could be read the wrong way by [audience], and one thing a
competitor or critic would pounce on. Be specific. Then suggest fixes.

DRAFT:
[paste]
```

## What changes

- Wrong outputs get caught by you, before they're sent, not after.
- You spend your scarce attention on judgment, where it compounds, not on typing.
- The model becomes a junior associate, not a co-signer.

## Tradeoff

The checker step is real work and real time. The lever is matching the bar to the stakes:
a Slack reply gets a 5-second scan; a customer-facing doc gets the full checklist. The risk
you're avoiding is the quiet one, looking careless because you trusted a plausible draft.
Judgment is the product. Don't ship it unchecked.

---

## Exercises

> **These use real work from your week. No toy examples.**

### Exercise 1: Maker-Checker Run (Week 4)

Run the maker/checker split on one real deliverable this week.

**Maker Prompt:**
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

**Checker Prompt:**
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

Run it once on a real deliverable. Save both prompts.

**Deliverable:** Checked artifact + 1-paragraph retro: "Where did the checker catch something I would have shipped wrong?"

**Stop condition:** One complete maker/checker run logged + retro written.
See [exercises.md](docs/exercises.md#exercise-22-maker-checker-run-week-4) for full template.

