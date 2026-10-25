# Доска объявлений (React + TypeScript + Vite)

- GET `/ads` — список, POST `/ads` — `multipart/form-data` (title, description, price, image)
- Бэкенд: https://inai-col1.fishrungames.com

## Локально
    npm install
    npm run dev

## Деплой (GitHub Pages через GitHub Actions)
1. Запушить проект в ветку `main`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` сам соберёт проект, задеплоит и проверит, что сайт открывается.
