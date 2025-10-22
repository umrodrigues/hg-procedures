FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/

RUN pnpm install

COPY . .

RUN pnpm build --filter=backend

EXPOSE 3001

CMD ["pnpm", "start", "--filter=backend"]
