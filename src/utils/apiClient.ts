export interface ApiClientOptions extends RequestInit {
  auth?: boolean;
}

interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

type WindowWithNextData = typeof window & {
  __NEXT_DATA__?: {
    props?: {
      pageProps?: {
        apiBase?: string;
      };
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function apiFetch(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<any> {
  let base: string | undefined;
  if (typeof window !== "undefined") {
    const w = window as WindowWithNextData;
    base = w.__NEXT_DATA__?.props?.pageProps?.apiBase;
  }
  if (!base) {
    base =
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_API_BASE_URL
        : undefined;
  }
  if (!base) base = "http://localhost:5000/api";

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${base}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

  const isMultipart =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  const headers: Record<string, string> = {};
  if (!isMultipart) headers["Content-Type"] = "application/json";

  if (options.headers) {
    const incoming = options.headers as Record<string, string>;
    Object.keys(incoming).forEach((k) => {
      headers[k] = incoming[k];
    });
  }

  if (isMultipart && headers["Content-Type"]) delete headers["Content-Type"];

  let currentToken: string | null = null;
  if (options.auth && typeof window !== "undefined") {
    const token = window.localStorage.getItem("cumberland_admin_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      currentToken = token;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  let data: unknown = null;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const expired =
      res.status === 401 &&
      options.auth &&
      typeof window !== "undefined";
    if (expired) {
      try {
        window.localStorage.removeItem("cumberland_admin_token");
        window.localStorage.removeItem("cumberland_admin_user");
      } catch {
        // ignore storage errors
      }
      const event = new CustomEvent("cumberland:unauthorized", {
        detail: { redirect: "/admin/login" },
      });
      window.dispatchEvent(event);
      if (typeof location !== "undefined") {
        const next = encodeURIComponent(location.pathname + location.search);
        location.href = `/admin/login?next=${next}`;
      }
    }
    const dataAsRecord = data as { message?: string; expired?: boolean } | undefined | null;
    const msg =
      dataAsRecord?.message ||
      (res.status === 401 && options.auth
        ? "Session expired. Redirecting to sign in..."
        : `Request failed (${res.status})`);
    const err: ApiError = new Error(msg);
    err.status = res.status;
    err.data = data;
    if (expired && dataAsRecord) dataAsRecord.expired = true;
    throw err;
  }

  void currentToken;
  return data;
}
