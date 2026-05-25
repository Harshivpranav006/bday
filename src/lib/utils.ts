export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
