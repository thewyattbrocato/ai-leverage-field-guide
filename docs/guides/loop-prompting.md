# Loop Prompting

*Run the same prompt repeatedly to converge on quality. The capture → structure → judgment loop.*

## Old way

You open the chat, type a vague ask ("draft a status update"), get something generic, paste
it, and move on feeling vaguely guilty that it's not great but it's "good enough." Or you
write one giant prompt, get one giant answer, and accept it because re-prompting feels like
wasted effort.

## Swap

Treat the prompt like a **rep**, not a request. You run the same core prompt across your
raw material multiple times, each pass tightening one thing, until the output clears your
bar. The machine is the practice partner; you are the coach with the standard.

This is the same mechanism Anders Ericsson describes in **Peak**: expertise is built through
deliberate practice — repeated, focused reps with immediate feedback — not through one
heroic effort. A single prompt is a single rep. The loop is the practice.

## The loop

```
1. CAPTURE  — dump the messy raw material (notes, bullets, a messy doc, the meeting transcript).
2. STRUCTURE — run the prompt to organize it (summarize, group, draft, rank).
3. JUDGMENT  — you mark what's wrong, missing, or off-voice.
4. RE-RUN    — feed the judgment back in ("drop point 3, sharpen the opening, the tone is too soft").
5. REPEAT    — until it clears your bar. Usually 2–4 passes, not 20.
```

The key is step 3. Most people skip their own judgment and wonder why the output is mid.
The loop only works because a human keeps raising the standard each pass.

## Copy-paste template

```
CONTEXT: I'm a [role] writing a [status update / follow-up / brief] for [audience].
RAW MATERIAL:
[paste your messy notes]

TASK: Draft a tight version. Then, in a separate section, list the 3 weakest parts of
your own draft and exactly what would make each stronger.

CONSTRAINTS: Plain language. No jargon. Under [X] words.
```

Run it. Read the "weakest parts" section. Then run again with that feedback pasted in.
That second pass is where the quality lives.

## What changes

- Generic first drafts become specific, usable ones.
- You stop blaming the tool ("AI is dumb") and start coaching it.
- The same prompt becomes reusable — save it (see Recurring Prompts).

## Tradeoff

It costs more turns and a little patience than the one-and-done habit. The discipline is
knowing when to stop: once the output is *correct and usable for its purpose*, ship it.
Loop prompting is for work that matters enough to be good — not for a throwaway Slack line.
Cal Newport's point in **Deep Work** applies here too: the focus you bring to the
judgment step is the scarce resource, so spend it where the output gets used.

---

*Written with AI assistance, edited and verified by Wyatt.*
