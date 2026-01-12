# Stage: Development
FROM node:20-alpine

# Рабочая директория
WORKDIR /app

# Отключаем Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Копируем package.json и lock-файл
COPY package.json package-lock.json* ./

# Устанавливаем зависимости через npm
RUN npm install

# Копируем весь код
COPY . .

# Открываем порт
EXPOSE 3000

# Запуск dev-сервера
CMD ["npm", "run", "dev"]
