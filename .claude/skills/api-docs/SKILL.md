---
name: api-docs
description: Generate or update API documentation for this project. Use when the user asks to "document the API", "write docs", "generate a README for the endpoints", or "add JSDoc". Reads the route files and produces structured documentation.
---

# API Docs Skill

Generate clean, accurate API documentation by reading the actual route files — never guess at endpoint behaviour.

## Process

1. Read `src/app.js` to get the full route map
2. Read each route file in `src/api/` to understand request/response shapes
3. Read the matching validator in `src/validators/` for the accepted schema
4. Read existing tests in `tests/` to confirm edge cases

## Output format

Choose the right format based on the request:

- **In-file JSDoc** → add `@route`, `@param`, `@returns` to each handler
- **README section** → markdown table of endpoints with method, path, body, response
- **OpenAPI stub** → YAML block for the resource (see `references/openapi-template.yaml`)

Read `references/openapi-template.yaml` when generating OpenAPI output.

## Endpoint table template

```markdown
## Users API

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | /api/users | — | 200 `User[]` |
| GET | /api/users/:id | — | 200 `User` / 404 |
| POST | /api/users | `{ name, email, role? }` | 201 `User` / 400 |
| PUT | /api/users/:id | `{ name?, email?, role? }` | 200 `User` / 404 |
| DELETE | /api/users/:id | — | 200 `User` / 404 |
```

## Rules

- Document what the code actually does — not what it should do
- If validation is missing (e.g. POST /users has no zod schema), note it explicitly: `⚠️ No input validation`
- Keep it short: one line per field, no prose padding
