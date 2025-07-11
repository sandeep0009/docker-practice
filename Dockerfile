From oven/bun:latest

WORKDIR /app

COPY package.json ./

RUN bun install --frozen-lockfile

COPY . .


EXPOSE 3000
CMD ["bun", "run", "start"]


