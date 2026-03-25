/**
 * Returns the correct noun form based on a count.
 *
 * Supports both 2-form (English) and 3-form (Slavic languages) pluralization rules.
 *
 * **2 forms** `[singular, plural]`:
 * - 1 → singular
 * - 2+ → plural
 *
 * **3 forms** `[singular, few, many]` (Ukrainian, Russian, etc.):
 * - 1, 21, 31... → singular (1 яблуко)
 * - 2–4, 22–24... → few (2 яблука)
 * - 5–20, 25–30... → many (5 яблук)
 *
 * @param count - The number to determine the noun form for.
 * @param forms - Tuple of noun forms: `[singular, plural]` or `[singular, few, many]`.
 * @returns The appropriate noun form for the given count.
 *
 * @example
 * // English (2 forms)
 * getNoun(1, ['item', 'items'])  // 'item'
 * getNoun(5, ['item', 'items'])  // 'items'
 *
 * @example
 * // Ukrainian (3 forms)
 * getNoun(1,  ['яблуко', 'яблука', 'яблук'])  // 'яблуко'
 * getNoun(2,  ['яблуко', 'яблука', 'яблук'])  // 'яблука'
 * getNoun(5,  ['яблуко', 'яблука', 'яблук'])  // 'яблук'
 * getNoun(11, ['яблуко', 'яблука', 'яблук'])  // 'яблук'
 * getNoun(21, ['яблуко', 'яблука', 'яблук'])  // 'яблуко'
 */
export function getNoun(count: number, forms: string[]): string {
  if (forms.length < 3) {
    return count === 1 ? forms[0] : (forms[1] ?? forms[0]);
  }

  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod100 >= 11 && mod100 <= 19) return forms[2];
  if (mod10 === 1) return forms[0];
  if (mod10 >= 2 && mod10 <= 4) return forms[1];

  return forms[2];
}
