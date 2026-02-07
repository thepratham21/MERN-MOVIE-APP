
# Stage 1: Dependencies

FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production


# Stage 2: App Packaging

FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .


# Stage 3: Production Runtime

FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy app with correct ownership
COPY --from=builder --chown=app:app /app .

USER app

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
