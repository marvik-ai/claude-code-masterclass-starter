---
globs: ["tests/**/*.test.js", "*.test.js"]
---

# Test File Rules

You are writing integration or unit tests for a Node.js/Express API using Jest and Supertest.

## Structure

Each test file maps to one resource or module:
- `tests/users.test.js` → integration tests for `/api/users`
- `tests/validators/auth.test.js` → unit tests for `src/validators/auth.js`

Group tests with `describe()` blocks per endpoint or schema, one assertion per `it()`.

## Integration tests (route files)

Use Supertest against the Express app — never start a real server:

```js
const request = require('supertest');
const app = require('../src/app');

describe('POST /api/resource', () => {
  it('creates a record and returns 201', async () => {
    const res = await request(app).post('/api/resource').send({ ... });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('returns 400 when required field is missing', async () => {
    const res = await request(app).post('/api/resource').send({});
    expect(res.status).toBe(400);
    expect(res.body.details).toBeDefined();
  });
});
```

## Unit tests (validator files)

Use the schema directly — no HTTP layer:

```js
const { mySchema } = require('../../src/validators/my-resource');

it('rejects invalid input', () => {
  const result = mySchema.safeParse({ ... });
  expect(result.success).toBe(false);
  expect(result.error.flatten().fieldErrors.fieldName).toBeDefined();
});
```

## Coverage expectations

Every route handler needs at least:
- Happy path (valid input → correct status + shape)
- Missing required field → 400 with `details`
- Not found → 404

Every Zod schema needs at least:
- Valid input accepted
- Each required field missing → rejected
- Invalid enum value → rejected
