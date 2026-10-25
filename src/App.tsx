import { useCallback, useEffect, useState } from "react";
import { createAd, fetchAds } from "./api";
import AdCard from "./components/AdCard";
import AdForm from "./components/AdForm";
import type { Ad, NewAd } from "./types";

export default function App() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setAds(await fetchAds());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCreate(ad: NewAd) {
    await createAd(ad);
    await load();
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Доска объявлений</h1>
      </header>
      <main className="layout">
        <AdForm onSubmit={handleCreate} />
        <section className="list">
          <div className="list__head">
            <h2>Объявления</h2>
            <button className="ghost" onClick={() => void load()}>
              Обновить
            </button>
          </div>
          {loading && <p className="muted">Загрузка…</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && ads.length === 0 && (
            <p className="muted">Пока нет объявлений</p>
          )}
          <div className="grid">
            {ads.map((ad, i) => (
              <AdCard key={ad.id ?? i} ad={ad} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
