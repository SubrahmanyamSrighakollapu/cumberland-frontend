import { RoomDetail, apiRoomToDetail } from "./roomDataClient";

export class BackendUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BackendUnavailableError";
  }
}

function getInternalBackendUrl(endpoint: string): string {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000/api";
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  if (apiBase.startsWith("http")) {
    return `${apiBase.replace(/\/api\/?$/, "")}/api${cleanEndpoint}`;
  }
  return `http://127.0.0.1:5000/api${cleanEndpoint}`;
}

/**
 * Retrieves a single published room from the CMS backend.
 *
 * Contract:
 * 1. Published room found -> returns RoomDetail.
 * 2. API confirms room is missing (404) or unpublished -> returns null (triggers notFound()).
 * 3. Network failure, timeout, 5xx error or invalid payload -> throws BackendUnavailableError.
 */
export async function getPublishedRoomBySlugServer(
  slug: string
): Promise<RoomDetail | null> {
  if (!slug) return null;

  let res: Response;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const url = getInternalBackendUrl(`/rooms/${encodeURIComponent(slug)}`);

    res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
    });
    clearTimeout(timeoutId);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new BackendUnavailableError(
      `CMS Backend API network error or timeout for slug "${slug}": ${msg}`
    );
  }

  // 404 response confirms the room slug does not exist or is unpublished in MariaDB CMS
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new BackendUnavailableError(
      `CMS Backend API returned HTTP ${res.status} for room slug "${slug}"`
    );
  }

  try {
    const data = await res.json();
    const item = data?.data ?? data;

    if (!item || !item.slug) {
      return null;
    }

    if (item.published === false || item.is_published === false) {
      return null;
    }

    return apiRoomToDetail(item);
  } catch {
    throw new BackendUnavailableError(
      `Invalid JSON payload returned from CMS Backend API for room slug "${slug}"`
    );
  }
}

/**
 * Retrieves all published rooms from the CMS backend using reliable pagination.
 *
 * Contract:
 * 1. Retrieves all published rooms page-by-page using backend offset/limit parameters until finished.
 * 2. Deduplicates records by unique slug and guarantees forward offset progress.
 * 3. Successful response with 0 published rooms -> returns [].
 * 4. Network failure, timeout, 5xx error or invalid payload -> throws BackendUnavailableError.
 */
export async function getAllPublishedRoomsServer(): Promise<RoomDetail[]> {
  const allRooms: RoomDetail[] = [];
  const roomSlugsSeen = new Set<string>();
  let offset = 0;
  const limit = 50;
  let hasMore = true;

  while (hasMore) {
    let res: Response;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const url = getInternalBackendUrl(
        `/rooms?published_only=true&limit=${limit}&offset=${offset}`
      );

      res = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 60 },
      });
      clearTimeout(timeoutId);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new BackendUnavailableError(
        `CMS Backend API network error or timeout when listing rooms: ${msg}`
      );
    }

    if (!res.ok) {
      throw new BackendUnavailableError(
        `CMS Backend API returned HTTP ${res.status} when listing rooms`
      );
    }

    let payload: any;
    try {
      const data = await res.json();
      payload = data?.data ?? data;
    } catch {
      throw new BackendUnavailableError(
        "Invalid JSON payload returned from CMS Backend API when listing rooms"
      );
    }

    const items = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload)
      ? payload
      : null;

    if (items === null) {
      throw new BackendUnavailableError(
        "Unexpected data format returned from CMS Backend API when listing rooms"
      );
    }

    if (items.length === 0) {
      hasMore = false;
      break;
    }

    let newItemsInBatch = 0;
    for (const item of items) {
      const detail = apiRoomToDetail(item);
      if (detail && detail.slug && !roomSlugsSeen.has(detail.slug)) {
        roomSlugsSeen.add(detail.slug);
        allRooms.push(detail);
        newItemsInBatch++;
      }
    }

    // Stop if batch returned no new unique items to prevent infinite loops
    if (newItemsInBatch === 0) {
      hasMore = false;
      break;
    }

    offset += items.length;

    if (typeof payload?.total === "number") {
      hasMore = allRooms.length < payload.total && items.length > 0;
    } else {
      hasMore = items.length > 0;
    }
  }

  return allRooms;
}
