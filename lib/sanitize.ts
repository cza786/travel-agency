/**
 * Escapes characters for safe inclusion in HTML templates.
 * Prevents HTML injection, XSS, and script execution in email clients or browser rendering.
 */
export function escapeHtml(input: unknown): string {
  if (input === null || input === undefined) {
    return "";
  }
  const str = String(input);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
