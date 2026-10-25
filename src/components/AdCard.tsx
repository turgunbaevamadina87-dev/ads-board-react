import { imageSrc } from "../api";
import type { Ad } from "../types";

export default function AdCard({ ad }: { ad: Ad }) {
  const src = imageSrc(ad.image_url);
  return (
    <article className="card">
      {src ? (
        <img className="card__img" src={src} alt={ad.title} loading="lazy" />
      ) : (
        <div className="card__img card__img--empty">Нет фото</div>
      )}
      <h3 className="card__title">{ad.title}</h3>
      <p className="card__text">{ad.description}</p>
      <div className="card__footer">
        <span className="card__price">{ad.price.toLocaleString("ru-RU")} сом</span>
      </div>
    </article>
  );
}
