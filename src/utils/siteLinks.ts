export const BOOK_DIRECT_URL =
  "https://book-directonline.com/properties/cumberlandmotorinndirect";

export function openBookDirect(target: "_blank" | "_self" = "_blank"): void {
  if (typeof window === "undefined") return;
  if (target === "_self") {
    window.location.href = BOOK_DIRECT_URL;
    return;
  }
  window.open(BOOK_DIRECT_URL, "_blank", "noopener,noreferrer");
}
