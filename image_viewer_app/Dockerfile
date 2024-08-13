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

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT 3030
ENV READINESS_CHECK_PATH /healthcheck

WORKDIR /app
COPY --from=builder /build/node_modules node_modules 
COPY --from=builder /build/package.json . 
COPY --from=builder /build/.next .next 

EXPOSE 3030
CMD [ "npm", "start" ]

# docker build -t my-favorite-docker-image . でイメージをビルド
# docker run -p 3000:3000 my-favorite-docker-image でコンテナを起動