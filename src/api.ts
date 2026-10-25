import type { Ad, AdsResponse, NewAd } from "./types";

// Бэкенд. Можно переопределить переменной VITE_API_BASE при сборке.
export const API_BASE: string = (
  import.meta.env.VITE_API_BASE || "https://inai-col1.fishrungames.com"
).replace(/\/$/, "");

export function imageSrc(path: string | null): string | null {
  if (!path) return null;
  return /^https?:\/\//.test(path) ? path : `${API_BASE}${path}`;
}

export async function fetchAds(): Promise<Ad[]> {
  const res = await fetch(`${API_BASE}/ads`);
  if (!res.ok) {
    throw new Error(`Не удалось загрузить объявления (${res.status})`);
  }
  const data = (await res.json()) as AdsResponse;
  return data.items;
}

export async function createAd(ad: NewAd): Promise<Ad> {
  const body = new FormData();
  body.append("title", ad.title);
  body.append("description", ad.description);
  body.append("price", String(ad.price));
  body.append("image", ad.image);
  // Content-Type не задаём вручную: браузер сам добавит multipart boundary
  const res = await fetch(`${API_BASE}/ads`, { method: "POST", body });
  if (!res.ok) {
    throw new Error(`Не удалось отправить объявление (${res.status})`);
  }
  return (await res.json()) as Ad;
}
