# Integration Notes (Laravel + Frontend)

## 1) Frontend Compatibility Mapping

Current frontend pages call:

- `GET /api/blog` from blog page load
- `POST /api/blog` from blog submission form
- `GET /api/gallery` from gallery page load
- `POST /api/contact` from contact form

These are implemented in `routes/api.php` and public controllers in this blueprint.

## 2) Middleware Registration

Register `RoleMiddleware` alias in your Laravel app bootstrap:

```php
// bootstrap/app.php (Laravel 11 style)
->withMiddleware(function ($middleware) {
    $middleware->alias([
        'role' => \App\Http\Middleware\RoleMiddleware::class,
    ]);
})
```

Load custom rate limit definitions during app boot (for `login`, `contact`, `blog-submissions`).

## 3) Sanctum + SPA Cookies

1. Install and configure Sanctum.
2. Ensure `supports_credentials` is true in CORS.
3. Frontend should first call `/sanctum/csrf-cookie` before login.
4. Use same-site domain setup for local dev.

## 4) Nginx Routing

- Route `/api/*` to Laravel `public/index.php`
- Route all non-file SPA routes to built frontend `index.html`
- Keep `/api` route precedence higher than SPA catch-all

## 5) Error Contract

Use consistent JSON errors:

```json
{
  "message": "Validation failed.",
  "errors": {
    "field": ["message"]
  }
}
```

## 6) Security Checklist

- Keep `.env` secrets out of VCS
- Enable HTTPS in production
- Set cookies `Secure` + `HttpOnly`
- Enforce throttle middleware on write/login routes
- Add spam controls (honeypot and/or captcha) for public forms
- Log admin mutations into `audit_logs`
