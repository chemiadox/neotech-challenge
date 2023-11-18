FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build application
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:processor

# Run application
FROM base as runner
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/dist/wallet-processor ./
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "main.js"]
