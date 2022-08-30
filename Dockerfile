FROM ghcr.io/architecture-it/react:node-16 as builder
WORKDIR /app
COPY . .
RUN npm ci --no-audit --silent --no-optional
RUN npm run build && \
    npm install --production --ignore-scripts --prefer-offline

FROM ghcr.io/architecture-it/nginx:latest
COPY --from=builder /app/build .
CMD ["/bin/sh", "-c", "react-env -d ./ -- && nginx -g \"daemon off;\""]
