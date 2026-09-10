FROM node:24-bookworm-slim AS build

WORKDIR /app

RUN npm install --global pnpm@12.3.4

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY tsconfig.json ./
COPY src ./src
RUN pnpm build

FROM node:24-bookworm-slim AS production

ENV NODE_ENV=production
ENV PORT=5001

WORKDIR /app

RUN npm install --global pnpm@12.3.4

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts \
    && pnpm store prune

COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node src/swagger/*.swagger.yml ./src/swagger/

USER node

EXPOSE 5001

CMD ["node", "dist/index.js"]
