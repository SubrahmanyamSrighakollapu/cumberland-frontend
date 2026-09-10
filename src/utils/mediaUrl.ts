const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const BACKEND_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

export function normalizeAssetUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) {
    try {
      const u = new URL(url);
      const backend = BACKEND_ORIGIN ? new URL(BACKEND_ORIGIN) : null;
      if (
        backend &&
        u.origin === backend.origin &&
        u.pathname.startsWith("/uploads/")
      ) {
        return u.pathname + u.search + u.hash;
      }
    } catch {
      // fall through
    }
    return url;
  }
  if (url.startsWith("//")) return url;
  return url;
}

export function backendOrigin(): string {
  return BACKEND_ORIGIN;
}
