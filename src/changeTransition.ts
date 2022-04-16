export function changeTransition(value: string): string {
  const [h = "", m = ""] = value.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}
