---
paths: ["src/api/**/*.js"]
---

# API Route Rules

You are writing Express route handlers for this project.

## Async style

All handlers must use `async/await`. Never use callbacks or `.then()` chains:

```js
// correct
router.get('/', async (req, res, next) => {
  try {
    const items = await db.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// wrong — callbacks
router.get('/', function(req, res) {
  setTimeout(function() { res.json(...) }, 10);
});
```

## Error handling

Always pass errors to `next(err)`. Never send a 500 directly from a handler:

```js
// correct
} catch (err) { next(err); }

// wrong
} catch (err) { res.status(500).json({ error: err.message }); }
```

## Validation

If the route accepts a body, it must use the `validate()` middleware from `src/validators/`.
Read from `req.validated`, not `req.body`, inside validated handlers.

```js
// correct
router.post('/', validate(mySchema), async (req, res, next) => {
  const { field } = req.validated;
  ...
});
```

## Route file structure

One file per resource. Register the router in `src/app.js`.

```js
const express = require('express');
const router = express.Router();
const db = require('../db');

// route handlers here

module.exports = router;
```

## ID parsing

Always parse `:id` params as integers: `parseInt(req.params.id, 10)`.
Return 404 if the record is not found — never 500.
