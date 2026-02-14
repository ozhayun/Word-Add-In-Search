/// <reference types="office-js" />

/**
 * Word document search helper using Word.run.
 * Uses context.document.body.search(query, { matchCase }) and returns
 * the text of the first 3 matches only (results.items.slice(0, 3)).
 * context.sync() is called after loading items and again after loading
 * each range's "text" so data is available before updating state.
 */
const MAX_RESULTS = 3;

export async function searchInDocument(
  query: string,
  isCaseSensitive: boolean
): Promise<string[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  return Word.run(async (context: Word.RequestContext) => {
    const results: Word.RangeCollection = context.document.body.search(trimmed, {
      matchCase: isCaseSensitive,
    });

    results.load("items");
    await context.sync();

    const topThree = results.items.slice(0, MAX_RESULTS);
    if (topThree.length === 0) {
      return [];
    }

    topThree.forEach((item: Word.Range) => item.load("text"));
    await context.sync();

    return topThree.map((item: Word.Range) => item.text);
  });
}
