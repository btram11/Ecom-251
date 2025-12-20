import { APIResponse } from "./types";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<APIResponse<T>> {
  try {
    const {
      method = "GET",
      headers = {},
      body,
      cookie,
      params,
      cache = "no-store",
      next,
    } = options;

    const hasRevalidate = typeof next?.revalidate === "number";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
        // ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      ...(hasRevalidate ? { next } : { cache: cache ?? "no-store", next }),
    });
    const status = res.status;

    if (!res.ok) {
      let msg = `HTTP ${status}`;
      try {
        const j = await res.json();
        if (typeof j?.err === "string") msg = j.err;
        else if (typeof j?.error === "string") msg = j.error;
      } catch {
        try {
          msg = await res.text();
        } catch {}
      }
      return { status, err: msg || "Request failed" };
    }

    const json = await res.json();

    return json as APIResponse<T>;
  } catch (e: any) {
    return { status: 0, err: e?.message ?? "Network error" };
  }
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<APIResponse<T>> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<APIResponse<T>> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<APIResponse<T>> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
