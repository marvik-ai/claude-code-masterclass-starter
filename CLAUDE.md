# Workshop API

A Node.js + Express REST API used as the live demo project for the Claude Code Masterclass.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express 4
- **Validation**: Zod — always use Zod, never `joi`, `yup`, or manual checks
- **Testing**: Jest + Supertest

## Commands

```bash
npm start          # Start the server (port 3000)
npm run dev        # Start with hot-reload (node --watch)
npm test           # Run all tests
```

## Conventions

- **Async style**: Use `async/await` — never callbacks or `.then()` chains
- **Validation**: Use Zod. Follow the pattern in `src/validators/auth.js`
- **Error handling**: Always pass errors to `next(err)` — never respond with 500 directly in a handler
- **Routes**: One file per resource in `src/api/`. Register new routers in `src/app.js`
- **Tests**: Integration tests in `tests/*.test.js`, unit tests in `tests/validators/`

## Project Structure

```
src/
  api/           # Route handlers — one file per resource
  validators/    # Zod schemas + validate() middleware
  middleware/    # Express middleware (errorHandler, etc.)
  db/            # In-memory data store (acts as the database)
tests/
  validators/    # Unit tests for Zod schemas
  *.test.js      # Integration tests per endpoint
```

## Known Issues / TODOs

These are **intentional** demo targets — do not fix them proactively:

- [ ] `src/api/users.js` — uses callbacks (fix in Demo 2) and has no input validation (fix in Demo 3)
- [ ] `src/api/products.js` — uses callbacks (fix in Demo 2)
- [ ] `src/api/auth.js` — uses callbacks (fix in Demo 2)
- [ ] Missing `/api/orders` endpoint (add in Demo 1)

## Feature Request: Orders Endpoint

Add a `/api/orders` resource with these endpoints:

- `GET /api/orders` — list all orders
- `GET /api/orders/:id` — get a single order
- `POST /api/orders` — create an order

An order must have:
- `userId` (integer, must reference an existing user)
- `productId` (integer, must reference an existing product)
- `quantity` (integer, min 1)

Requirements:
- Validate with Zod following the pattern in `src/validators/auth.js`
- Use async/await (not callbacks)
- Add to `src/db/index.js` (an `orders` array)
- Mount in `src/app.js`
- Include integration tests following the pattern in `tests/users.test.js`
