import { calculateWordFrequency, sortWordFrequency } from "../src/word-frequency";

const text = "the quick brown fox jumped over the lazy dog. The dog is lazy.";
const textReversed = text.split(" ").reverse().join(" ");

const sortByWordAscendingExpected = [
  { word: "brown", count: 1 },
  { word: "dog", count: 2 },
  { word: "fox", count: 1 },
  { word: "is", count: 1 },
  { word: "jumped", count: 1 },
  { word: "lazy", count: 2 },
  { word: "over", count: 1 },
  { word: "quick", count: 1 },
  { word: "The", count: 1 },
  { word: "the", count: 2 },
];

const sortByWordDescendingExpected = [
  { word: "the", count: 2 },
  { word: "The", count: 1 },
  { word: "quick", count: 1 },
  { word: "over", count: 1 },
  { word: "lazy", count: 2 },
  { word: "jumped", count: 1 },
  { word: "is", count: 1 },
  { word: "fox", count: 1 },
  { word: "dog", count: 2 },
  { word: "brown", count: 1 },
];

const sortByCountAscendingExpected = [
  { word: "quick", count: 1 },
  { word: "brown", count: 1 },
  { word: "fox", count: 1 },
  { word: "jumped", count: 1 },
  { word: "over", count: 1 },
  { word: "The", count: 1 },
  { word: "is", count: 1 },
  { word: "the", count: 2 },
  { word: "lazy", count: 2 },
  { word: "dog", count: 2 },
]

const sortByCountDescendingExpected = [
  { word: "the", count: 2 },
  { word: "lazy", count: 2 },
  { word: "dog", count: 2 },
  { word: "quick", count: 1 },
  { word: "brown", count: 1 },
  { word: "fox", count: 1 },
  { word: "jumped", count: 1 },
  { word: "over", count: 1 },
  { word: "The", count: 1 },
  { word: "is", count: 1 },
]

describe("Test calculation of word frequencies", () => {
  it("Should return null when the input text is null", () => {
    expect(calculateWordFrequency(null)).toBe(null);
  });

  it("Should return null when the input text is empty spaces only", () => {
    expect(calculateWordFrequency("        ")).toBe(null);
  });
});

describe("Test sorting", () => {

  it("Should return word frequencies sorted by default in ascending order by word, when no sort order is specified", () => {

    const wordFrequency = calculateWordFrequency(text);
    const sortedWordFrequency = sortWordFrequency(wordFrequency);

    expect(sortedWordFrequency).toStrictEqual(sortByWordAscendingExpected);
  });

  it("Should return word frequencies sorted in ascending order by word, when sort is by 'word' and sort order is ascending", () => {

    const wordFrequency = calculateWordFrequency(text);
    const sortedWordFrequency = sortWordFrequency(wordFrequency, { sortBy: "word", sortOrder: "asc" });

    const textReversedFrequency = calculateWordFrequency(textReversed);
    const sortedTextReversedFrequency = sortWordFrequency(textReversedFrequency, { sortBy: "word", sortOrder: "asc" });

    expect(sortedWordFrequency).toStrictEqual(sortByWordAscendingExpected);
    expect(sortedTextReversedFrequency).toStrictEqual(sortByWordAscendingExpected);
  });

  it("Should return word frequencies sorted in descending order by word, when sort is by word and sort order is descending", () => {

    const wordFrequency = calculateWordFrequency(text);
    const sortedWordFrequency = sortWordFrequency(wordFrequency, { sortBy: "word", sortOrder: "desc" });

    const textReversedFrequency = calculateWordFrequency(textReversed);
    const sortedTextReversedFrequency = sortWordFrequency(textReversedFrequency, { sortBy: "word", sortOrder: "desc" });

    expect(sortedWordFrequency).toStrictEqual(sortByWordDescendingExpected);
    expect(sortedTextReversedFrequency).toStrictEqual(sortByWordDescendingExpected);
  });

  it("Should return word frequencies sorted in ascending order by count, when sort is by count and sort order is ascending", () => {
    const wordFrequency = calculateWordFrequency(text);
    const sortedWordFrequency = sortWordFrequency(wordFrequency, { sortBy: "count", sortOrder: "asc" });
    expect(sortedWordFrequency).toStrictEqual(sortByCountAscendingExpected);
  });

  it("Should return word frequencies sorted in descending order by count, when sort is by count and sort order is descending", () => {
    const wordFrequency = calculateWordFrequency(text);
    const sortedWordFrequency = sortWordFrequency(wordFrequency, { sortBy: "count", sortOrder: "desc" });
    expect(sortedWordFrequency).toStrictEqual(sortByCountDescendingExpected);
  });
});
