# ビルドステージ
FROM public.ecr.aws/docker/library/node:20.9.0-slim as builder

WORKDIR /build

COPY . .
RUN rm -rf node_modules
RUN npm ci

COPY . .
RUN rm -rf .next
RUN npm run build 

# -----------------------------
FROM public.ecr.aws/docker/library/node:20.9.0-slim

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT 3030 ENV NODE_ENV=production
ENV READINESS_CHECK_PATH /healthcheck

WORKDIR /app
COPY --from=builder /build/node_modules node_modules 
COPY --from=builder /build/package.json . 
COPY --from=builder /build/.next .next 
COPY --from=builder /build/next.config.js ./
COPY --from=builder /build/run.sh ./run.sh
RUN ln -s /tmp/cache ./.next/cache

EXPOSE 3030
CMD [ "exec", "./run.sh" ]

# docker build -t my-favorite-docker-image . でイメージをビルド
# docker run -p 3000:3000 my-favorite-docker-image でコンテナを起動