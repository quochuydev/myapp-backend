export function toAscii(input: string, replacementChar = ""): string {
  return input
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/\s+/g, replacementChar)
    .toLowerCase();
}
