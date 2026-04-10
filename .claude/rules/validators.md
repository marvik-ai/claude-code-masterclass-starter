---
globs: ["src/validators/**/*.js"]
---

# Validator Rules

You are writing Zod validation schemas for this project.

## Reference implementation

`src/validators/auth.js` is the canonical pattern. Always follow it — read it before writing a new validator.

## Schema structure

```js
const { z } = require('zod');

const myResourceSchema = z.object({
  requiredString: z.string().min(1, 'Cannot be empty'),
  requiredEmail: z.string().email('Invalid email address'),
  optionalCount: z.number().int().min(1).optional(),
  enumField: z.enum(['optionA', 'optionB']).default('optionA'),
});

// For update operations — all fields optional
const updateMyResourceSchema = myResourceSchema.partial();
```

## The validate() middleware

Every validator file must export a `validate()` middleware using this exact pattern:

```js
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = new Error('Validation failed');
      err.name = 'ValidationError';
      err.details = result.error.flatten().fieldErrors;
      return next(err);
    }
    req.validated = result.data;
    next();
  };
}
```

Do not invent a different middleware shape — `errorHandler.js` depends on `err.name === 'ValidationError'` and `err.details`.

## Exports

```js
module.exports = { myResourceSchema, updateMyResourceSchema, validate };
```

## What not to do

- Never use `z.any()` — be explicit about types
- Never validate in the route handler itself — use the middleware
- Never read `req.body` in a handler that uses `validate()` — use `req.validated`
