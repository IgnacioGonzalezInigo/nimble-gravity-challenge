import config from "../config";

const BASE_URL = config.apiBaseUrl;

export async function apiGet(path) {
    const url = `${BASE_URL}${path}`;
    console.log("[apiGet] URL:", url);

    const res = await fetch(url);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const message = data?.message || data?.error || `Error HTTP ${res.status}`;
        throw new Error(message);
    }

    return data;
}
