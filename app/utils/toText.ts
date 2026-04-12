import { asText } from "@prismicio/client";
import type { RichTextField } from "@prismicio/client";

/**
 * Safely converts a Prismic field to plain text.
 * Handles both KeyTextField (string) and legacy RichTextField data
 * during the transition period after field type changes.
 */
export function toText(
  field: string | null | undefined | RichTextField,
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  return asText(field as RichTextField);
}
