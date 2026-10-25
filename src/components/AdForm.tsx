import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { NewAd } from "../types";

interface Props {
  onSubmit: (ad: NewAd) => Promise<void>;
}

export default function AdForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setImage(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const priceNum = Number(price);
    if (!title.trim() || !description.trim()) {
      setError("Заполните заголовок и описание");
      return;
    }
    if (price === "" || Number.isNaN(priceNum) || priceNum < 0) {
      setError("Укажите корректную цену");
      return;
    }
    if (!image) {
      setError("Выберите изображение");
      return;
    }
    setSending(true);
    setError(null);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        price: priceNum,
        image,
      });
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Подать объявление</h2>
      <input
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Описание"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        min="0"
        step="any"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={sending}>
        {sending ? "Отправка…" : "Опубликовать"}
      </button>
    </form>
  );
}
