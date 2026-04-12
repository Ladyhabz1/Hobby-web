FROM node:20-alpine AS builder

WORKDIR /app

RUN echo "BUILD_MARKER_2026_04_13"

# Use the repo's package manager version via Corepack.
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

RUN pnpm prune --prod


FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/index.js"]