# Stop Conditions

*Define when AI work is done before you start. "Until every claim has a source" beats "until I'm confident."*

## Old way

You ask the model to write something and keep tweaking until it "feels right." The problem:
"feels right" has no finish line. You either stop too early (it's still wrong) or too late
(spinning on phrasing that was fine at pass two). Confidence is a terrible stop signal. The model sounds confident whether or not it's correct.

## Swap

Set the stop condition **up front**, as a measurable check, not a feeling. A stop condition
is the single sentence that means "ship it." Most of the time it's about evidence, not prose.

Julia Galef's **The Scout Mindset** is the backbone here: the scout wants to see the
terrain clearly, not to feel convinced. "Until I'm confident" is soldier mindset, defending
a position. "Until every claim has a source" is scout mindset, checking the map. Annie Duke's
**Thinking in Bets** makes the same move: decide what would change your mind *before* you
start, so you're not negotiating with yourself mid-stream.

## Copy-paste stop conditions

Pick the one that fits the job:

```
FOR A RESEARCH BRIEF:
Stop when: every factual claim links to a source I can name, and I've flagged the
2 claims I could NOT verify.

FOR A STATUS UPDATE:
Stop when: every number traces to a doc/source I trust, and the ask is explicit in
the first 2 sentences.

FOR A DRAFT EMAIL:
Stop when: it says one clear thing, the recipient knows exactly what to do, and I'd
be comfortable with my manager reading it.

FOR A SUMMARY:
Stop when: nothing important from the source is missing, and nothing in the summary
isn't in the source.
```

The pattern: a stop condition is **observable and falsifiable**. "Good tone" is not. "Opens
with the decision, under 150 words, no new claims" is.

## How to use it

1. Write the stop condition as the last line of your prompt.
2. When the output arrives, check it like a checklist, not like a vibe.
3. If it fails, say which line failed and re-run. If it passes, ship. No "one more polish."

## What changes

- You stop over-iterating on things that were already fine.
- Outputs get more correct and less confident-for-no-reason.
- Reviews get faster because the bar was stated, not implied.

## Tradeoff

Writing the stop condition takes 30 seconds you'll swear you don't have. And sometimes the
real job is creative, where "good" is a taste call, in that case your stop condition is
"time-boxed: 3 passes, then decide." The discipline is the same: decide the finish before
you run, so the machine doesn't decide it for you.

---

*Written with AI assistance, edited and verified by Wyatt.*
