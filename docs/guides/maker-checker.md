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

