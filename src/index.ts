import adjectives from './adjectives'
import nouns from './nouns'

type PhraseConfig = {
    template?: string
    length?: number
    delimiter?: string
}

const adjectivesLength = adjectives.length
const nounsLength = nouns.length

const randomIndex = (arrayLength: number) => Math.floor(Math.random() * arrayLength)

export const randomAdjective = () => adjectives[randomIndex(adjectivesLength)]

export const randomNoun = () => nouns[randomIndex(nounsLength)]

const randomWordFunctions = [ randomAdjective, randomNoun ]
const randomWordFunctionsLength = randomWordFunctions.length

export const randomWord = () => randomWordFunctions[randomIndex(randomWordFunctionsLength)]()

const DEFAULT_PHRASE_TEMPLATE = '[adjective]-[word]-[noun]'
const DEFAULT_PHRASE_LENGTH = 3 // In number of words
const DEFAULT_PHRASE_DELIMITER = '-'

// The length and delimiter options are ignored if the template option is used.
// If no options are provided, will default to the DEFAULT_PHRASE_TEMPLATE.
export const randomPhrase = ({
    template,
    length,
    delimiter,
}: PhraseConfig = {}) => {
    let phrase = ''

    if (template || (!length && !delimiter)) {
        phrase = (template || DEFAULT_PHRASE_TEMPLATE).replace(/\[adjective\]/g, randomAdjective)
        phrase = phrase.replace(/\[noun\]/g, randomNoun)
        phrase = phrase.replace(/\[word\]/g, randomWord)
        return phrase
    }

    length = length || DEFAULT_PHRASE_LENGTH
    delimiter = delimiter || DEFAULT_PHRASE_DELIMITER

    for (let i = 0; i < length; i++) {
        phrase += (i === 0 ? '' : delimiter) + randomWord()
    }

    return phrase
}