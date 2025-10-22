FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install

COPY . .

RUN pnpm build --filter=frontend

EXPOSE 3000

CMD ["pnpm", "start", "--filter=frontend"]
