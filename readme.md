# @i/random-phrase

Random phrase generator for Node.js using local JSON dictionaries

* 1010 unique adjectives with 3 - 6 characters
* 2508 unique nouns with 3 - 6 characters
<br>



### Usage

This module currently exports the following functions:

```ts
type PhraseConfig = { template?: string, length?: number, delimiter?: string }

type randomPhrase = (config?: PhraseConfig) => string // Returns a random phrase with optional config
type randomAdjective = () => string // Returns a random adjective
type randomNoun = () => string // Returns a random noun
type randomWord = () => string // Returns a random adjective or noun

```

The `randomPhrase` function's config object supports three options:

* `template` - If this option is passed, `length` and `delimiter` options are ignored. The returned phrase will be generated by replacing every occurence of `[adjective]`, `[noun]`, or `[word]` appearing in this string. This is probably the most useful way to use this library, and allows more fine grained control over how each type of word is used (adjectives, nouns, etc). Defaults to the string `[adjective]-[word]-[noun]`.

These next two options allow you to generate phrases based on a phrase length (in words) and a delimiting character. These options can only be used if you are not using the `template` option. When using these options you do not have control over what types of words are used (adjectives, nouns, etc).

* `length` - Desired phrase length in number of words, defaults to `3`.
* `delimiter` - Desired delimiter between words in phrase, defaults to hyphen `-`.

Calling `randomPhrase` without any config options will use the default template option. Generated phrases are not checked for duplicate words.

```js
import { randomPhrase, randomAdjective, randomNoun, randomWord } from '@i/random-phrase'

const phrase1 = randomPhrase() // Uses the template '[adjective]-[word]-[noun]' by default
const phrase2 = randomPhrase({ length: 5, delimiter: '+' })
const phrase3 = randomPhrase({ template: 'Hello [adjective] world!' })

const adjective = randomAdjective()
const noun = randomNoun()
const word = randomWord()
```
<br>



### Calculating Phrase Collision Chances

Probability of collision between phrase pairs containing X number of words from a Y length word dictionary is calculated as:

`Number of permutations = (Word dictionary length)! / (Word dictionary length - Number of words in phrase)!`

If word dictionary has 100 unique words and phrase contains 3 random words:
`100! / (100 - 3)! = about 970,200 permutations`


Number of unique phrase pairs for comparison is calulated as:

`Number of pairs = ((Total number of phrases) * (Total number of phrases - 1)) / 2`

If 120 phrases are generated, number of pairs is:
`(120 * (120 - 1)) / 2 = 7,140`


Chance of a pair not colliding is calculated as:

`Chance of pair not colliding = 1 - (1 / Number of permutations)`

Using 970,200 permutations from above, chance of a pair not colliding is:
`1 - (1 / 970,200) = 0.999998969284684 or 99.9998969%`


Chance of no two pairs colliding is calculated as:

`Chance of no pairs colliding = (Chance of pair not colliding) ^ Number of pairs`

Using 0.999998969284684 chance of pair not colliding and 7,140 pairs from above, chance of no collisions is:
`0.999998969284684 ^ 7,140 = 0.992667702274027 or 99.26677% chance`


At 500 phrases generated with 3 random words per phrase chosen from 100 word dictionary, chance of no collisions drops to 77%