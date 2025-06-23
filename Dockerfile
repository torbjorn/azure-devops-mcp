FROM mcr.microsoft.com/devcontainers/javascript-node:22 AS builder
COPY . /app

WORKDIR /app
RUN npm install

FROM mcr.microsoft.com/azurelinux/base/nodejs:20.14 AS runner
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

CMD ["node", "dist/http.js"]
