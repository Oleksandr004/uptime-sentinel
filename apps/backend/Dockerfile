FROM node:20-alpine

WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем package.json и pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости внутри контейнера
RUN pnpm install --frozen-lockfile

# Копируем остальной код
COPY . .

# Порт и команда
EXPOSE 3000
CMD ["node", "dist/main.js"]
