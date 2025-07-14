# 1. Base Image: Use a lightweight Node.js image
FROM node:20-alpine AS base

# 2. Set Working Directory
WORKDIR /app

# 3. Install pnpm - a faster package manager
RUN npm install -g pnpm

# 4. Builder Stage
FROM base AS builder
WORKDIR /app

# Copy dependency definition files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN pnpm run build

# 5. Production Stage
FROM base AS runner
WORKDIR /app

# Copy environment variables
COPY --from=builder /app/.env.production.local ./.env.production.local
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/.env ./.env

# Copy built assets from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
