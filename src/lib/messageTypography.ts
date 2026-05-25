/** Luxury letter typography — serif body, Inter for dense casual lines */
export function getMessageLineClass(line: string, index: number): string {
  if (line === "") return "message-spacer";

  if (index === 0) return "message-line-opening";

  const t = line.trim();
  if (
    t.startsWith("Our Bondd") ||
    t.startsWith("Happy Birthday To") ||
    t.startsWith("Once again,") ||
    t.startsWith("Today isn't") ||
    t.startsWith("So today,")
  ) {
    return "message-line-opening";
  }

  if (t.length < 48 && !t.includes("—")) {
    return "message-line-readable";
  }

  return "message-line";
}
