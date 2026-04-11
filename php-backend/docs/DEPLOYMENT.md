# Deployment Blueprint

## Runtime Topology

- Nginx (edge)
- PHP-FPM (Laravel API)
- MySQL
- Redis (cache + queue + limiter)

## Nginx Example (high level)

1. `location /api/` -> pass to Laravel public index.
2. `location /sanctum/` -> pass to Laravel.
3. `location /` -> serve frontend static assets and fallback to SPA index.

## Production Settings

- `APP_DEBUG=false`
- `SESSION_SECURE_COOKIE=true`
- `LOG_LEVEL=info`
- strict CORS origin list
- queue worker process enabled

## Scalability Notes

- Cache public list endpoints (`/api/blog`, `/api/gallery`) in Redis.
- Invalidate cache on admin writes.
- Use pagination for large datasets.
- Move media to object storage + CDN.
- Add DB read replica once read traffic grows.
