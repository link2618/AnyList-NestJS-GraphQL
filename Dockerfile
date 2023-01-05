ARG NODEJS=node:18-alpine3.15
# Install dependencies only when needed
FROM ${NODEJS} AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci


# Build the app with cache dependencies
FROM ${NODEJS} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM ${NODEJS} AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main" ]

# docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
