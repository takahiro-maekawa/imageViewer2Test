# ビルドステージ
FROM node:20-buster-slim as builder

WORKDIR /build

COPY . .
RUN rm -rf node_modules
RUN npm ci

COPY . .
RUN rm -rf .next
RUN npm run build 

# -----------------------------
FROM node:20-buster-slim

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT=3030
ENV NODE_ENV=production
ENV READINESS_CHECK_PATH=/healthcheck

WORKDIR /app
COPY --from=builder /build/node_modules node_modules 
COPY --from=builder /build/package.json . 
COPY --from=builder /build/.next .next 
COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/run.sh ./run.sh
RUN ln -s /tmp/cache ./.next/cache

# 環境変数を設定
ARG NEXTAUTH_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG NEXTAUTH_SECRET

ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV AUTH_TRUST_HOST=TRUE

EXPOSE 3030
RUN chmod +x ./run.sh

CMD ["sh", "-c", "./run.sh"]

# docker build -t my-favorite-docker-image . でイメージをビルド
# docker run -dit -p 3030:3030 my-favorite-docker-image でコンテナを起動