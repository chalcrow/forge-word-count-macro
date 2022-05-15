import { Sort } from "./index";

export interface WordFrequency {
    /**
     * word that appears in the text entered
     */
    word: string;
    /**
     * how many times the word occurs in the text
     */
    count: number;
}

/**
 * Calculates the frequency of occurrence of unique words in the text
 *
 * @param text the input text (string)
 * @returns Map<string, number> with unique words and their frequency within the text, returns null if text is null
 */
export const calculateWordFrequency = (
    text: string
): Map<string, number> | null => {
    // if the text is white spaces or null return null
    if (!text || !text.trim()) {
        return null;
    }

    const words = text.replace(/[.]/g, "").split(/\s/);
    const wordFrequencyMap = new Map();

    for (const word of words) {
        wordFrequencyMap[word] = wordFrequencyMap[word] + 1 || 1;
    }

    return wordFrequencyMap;
};

/**
 * Sorts the word frequencies by a specified key and direction
 * if no order is provided, it is sorted based on word in ascending order
 * default locale is 'en-US'
 *
 * @param wordFrequencyMap the Map of calculated word frequencies
 * @param sort a sorting object that specifies the sort key and order
 * @param locale the international locale on which sort ordering is based
 * @returns Array<WordFrequency> a sorted array of word frequencies, returns null if the Map is null
 */
export const sortWordFrequency = (
    wordFrequencyMap: Map<string, number>,
    sort: Sort = { sortBy: "word", sortOrder: "asc" },
    locale: string = 'en-US',
): Array<WordFrequency> | null => {

    const { sortBy, sortOrder } = sort;

    const wordFrequency = Object.keys(wordFrequencyMap).map((word) => ({
        word,
        count: wordFrequencyMap[word],
    }));

    const collator = new Intl.Collator(locale, {
        numeric: true,
        caseFirst: "upper",
    });

    return wordFrequency.sort((a, b) => {
        if (sortOrder === "asc") {
            return collator.compare(a[sortBy], b[sortBy]);
        } else {
            return collator.compare(b[sortBy], a[sortBy]);
        }
    });
}
