export type FastApiDetailItem = {
  loc?: (string | number)[];
  msg?: string;
  type?: string;
};

export type FastApiErrorBody = {
  detail?: string | FastApiDetailItem[];
};

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function formatFastApiError(body: any): string | null {
  const detail = body?.detail;

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    // join các msg
    const msgs = detail.map((x: any) => x?.msg).filter(Boolean);
    if (msgs.length) return msgs.join("; ");
  }

  return null;
}

async function readBodySafe(res: Response): Promise<any> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text; // fallback plain text
  }
}

export async function fetchJson<T>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const body = await readBodySafe(res);

  if (!res.ok) {
    const msg =
      formatFastApiError(body) ??
      (typeof body === "string" ? body : null) ??
      `Request failed: ${res.status} ${res.statusText}`;

    throw new ApiError(msg, res.status, body);
  }

  return body as T;
}
