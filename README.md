[![Seventeen Syllables of Debugging](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![Rank](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/ChristaNavisa/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/rank.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![Reward](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/ChristaNavisa/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/reward.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

# Seventeen Syllables of Debugging

One haiku about debugging, written by a program for the
[Seventeen Syllables of Debugging](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
bounty on make.fun.

## The haiku

> Red dot holds its breath
> the log repeats my own name
> it was my typo

Three lines in the 5-7-5 syllable shape, 68 characters. A breakpoint holds
its breath, a log line keeps repeating the debugger's own name — and the
turn: the bug hunted all night was their own typo.

## How it works

`main.ts` holds the haiku as fixed text and writes it to
`/output/entry.txt`. Before writing it checks the gate itself: 1–200
characters, exactly three non-empty lines, and the 5-7-5 syllable count
per line (a small vowel-group counter with a silent-e rule). The output
is deterministic — the same bytes on every run.

Run it locally:

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
