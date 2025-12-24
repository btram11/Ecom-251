import { APIResponse } from "./types";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  throwOnError?: boolean;
  errorMessage?: string; 
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
      cache = "no-store",
      next,
      throwOnError = false,
      errorMessage,
    } = options;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      cache,
      next,
    });

    const json = (await res.json()) as APIResponse<T>;
    if (!res.ok) {
      const message =
        errorMessage ?? json?.message ?? `HTTP ${res.status}`;

      if (throwOnError) {
        throw new Error(message);
      }

      return {
        success: false,
        message,
        data: null,
      };
    }

    return json;
  } catch (e: any) {
    // Network / CORS / timeout
    return {
      success: false,
      message: e?.message ?? "Network error",
      data: null,
    };
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
