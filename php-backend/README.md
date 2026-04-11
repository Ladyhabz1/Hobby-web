# PHP Backend Architecture (Frontend-Compatible)

This backend blueprint is designed to be fully compatible with the existing frontend routes and payloads in this repository.

## 1) Compatibility Contract

These endpoints and response shapes are required by the current frontend:

- `GET /api/blog`
  - Response: `{ "posts": [{ "id": "...", "title": "...", "summary": "..." }] }`
- `POST /api/blog`
  - Request: `{ "title": "...", "summary": "..." }`
  - Response: `{ "id": "...", "message": "created" }`
- `GET /api/gallery`
  - Response: `{ "images": [{ "id": "...", "title": "...", "url": "..." }] }`
- `POST /api/contact`
  - Request: `{ "name": "...", "email": "...", "message": "..." }`
  - Response: `{ "message": "received", "ticket": "CT-..." }`

## 2) Recommended Stack

- Laravel 11 (API-first)
- PHP 8.3
- MySQL 8+
- Redis for cache, queues, and rate limit store
- Laravel Sanctum for SPA cookie-based auth

## 3) Route Groups

- Public API routes: `/api/blog`, `/api/gallery`, `/api/contact`
- Auth routes: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- Admin routes: `/api/admin/*` protected by Sanctum + role middleware

## 4) Security Baseline

- Validate all input via Form Requests
- CSRF protection for cookie-authenticated writes
- Secure cookies: `HttpOnly`, `Secure`, `SameSite=Lax`
- Strong password hashing (`Argon2id`)
- Role-based authorization on admin routes
- Per-route throttling (`contact`, `login`, and submission routes)
- CORS restricted to allowed frontend origin(s)
- Audit logs for privileged actions

## 5) Scalability Baseline

- Pagination on list endpoints
- Redis caching for public GET endpoints
- Queue for emails/notifications/moderation jobs
- Read replicas for DB scaling
- CDN for gallery assets
- Structured JSON logs

## 6) Migration Strategy From Current Frontend

The frontend can continue to call `POST /api/blog` in public mode initially. This route should save into `blog_submissions` (moderation queue), while admin publishing creates records in `blog_posts`.

## 7) Suggested Bootstrapping Steps

1. Create a Laravel project.
2. Copy the files from this blueprint (`routes`, `controllers`, `requests`, `migrations`).
3. Configure `.env` from `.env.example` in this folder.
4. Run migrations and seed an admin user.
5. Configure Nginx to route `/api/*` to Laravel and static SPA to frontend build output.
