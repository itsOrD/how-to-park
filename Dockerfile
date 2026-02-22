# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build:once

# ---- Production stage ----
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server/ ./server/
COPY db/ ./db/
COPY --from=builder /app/public/dist ./public/dist

ENV NODE_ENV=production
ENV PORT=1111

EXPOSE 1111

CMD ["node", "server/index.js"]
