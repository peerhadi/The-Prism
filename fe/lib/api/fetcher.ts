// lib/api/fetcher.ts

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions = {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
};

export async function fetcher<T = any>(
  url: string,
  options: FetchOptions = {},
): Promise<{ data: T | null; error: string | null }> {
  const { method = "GET", body, headers = {} } = options;

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const contentType = res.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      return {
        data: null,
        error: (data && data.message) || "Request failed",
      };
    }

    return {
      data,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err?.message || "Network error",
    };
  }
}
