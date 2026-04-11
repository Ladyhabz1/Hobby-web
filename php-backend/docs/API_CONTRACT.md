# API Contract (Frontend-Compatible)

## Public Endpoints

### GET /api/blog

- 200

```json
{
  "posts": [
    { "id": "1", "title": "Breathing Rhythm Update", "summary": "Worked on bilateral breathing..." }
  ]
}
```

### POST /api/blog

Request:

```json
{ "title": "My new entry", "summary": "Session notes" }
```

Response:

- 201

```json
{ "id": "123", "message": "created" }
```

### GET /api/gallery

- 200

```json
{
  "images": [
    { "id": "11", "title": "Morning Lanes", "url": "https://..." }
  ]
}
```

### POST /api/contact

Request:

```json
{ "name": "Habiba", "email": "habiba@example.com", "message": "Hello" }
```

Response:

- 201

```json
{ "message": "received", "ticket": "CT-2026-AB12CD" }
```

## Auth Endpoints

### POST /api/auth/login

Request:

```json
{ "email": "admin@example.com", "password": "secret" }
```

Response:

- 200 `{ "message": "authenticated" }`
- 422 `{ "message": "Invalid credentials." }`

### POST /api/auth/logout

- 200 `{ "message": "logged_out" }`

### GET /api/auth/me

- 200

```json
{
  "user": {
    "id": "1",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## Error Contract

- 422 Validation:

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field": ["Validation message"]
  }
}
```

- 401 Unauthorized:

```json
{ "message": "Unauthenticated." }
```

- 403 Forbidden:

```json
{ "message": "Forbidden." }
```
