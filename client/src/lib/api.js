const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/+$/, "");

function normalizeApiPath(path) {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    if (path.startsWith("/api/")) {
        return path;
    }

    const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
    return `/api${withLeadingSlash}`;
}

export function buildApiUrl(path) {
    const normalized = normalizeApiPath(path);

    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
        return normalized;
    }

    return API_BASE_URL ? `${API_BASE_URL}${normalized}` : normalized;
}

export async function apiFetch(path, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await fetch(buildApiUrl(path), {
            credentials: "include",
            ...options,
            signal: options.signal ?? controller.signal,
            headers: {
                Accept: "application/json",
                ...(options.headers ?? {}),
            },
        });

        const contentType = response.headers.get("content-type") ?? "";
        const payload = contentType.includes("application/json")
            ? await response.json()
            : { message: await response.text() };

        if (!response.ok) {
            throw new Error(payload?.message || `Request failed (${response.status})`);
        }

        return payload;
    }
    finally {
        clearTimeout(timeoutId);
    }
}
