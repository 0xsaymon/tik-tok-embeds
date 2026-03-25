const TIKTOK_URL_PATTERNS = [
  /tiktok\.com\/@.+\/video\/(\d+)/,
  /tiktok\.com\/t\/(\d+)/,
  /vm\.tiktok\.com\/(\w+)/,
];

export function parseTikTokUrl(input: string): string | null {
  for (const pattern of TIKTOK_URL_PATTERNS) {
    const match = input.match(pattern);
    if (match) return match[1];
  }
  if (/^\d+$/.test(input)) return input;
  return null;
}
