---
globs: ["src/db/**/*.js"]
---

# Database Rules

This project uses an in-memory data store (`src/db/index.js`) that acts as the database layer.

## Structure

Each resource gets an array and an auto-increment ID counter:

```js
const orders = [];
let _nextOrderId = 1;

module.exports = {
  // existing exports...
  orders,
  nextOrderId: () => _nextOrderId++,
};
```

## Rules

- Add new resource arrays at the bottom, before `module.exports`
- Seed arrays with 2–3 realistic sample records so demos have data to show
- ID counters start at `(seed_length + 1)` — if you seed 2 records, counter starts at 3
- Counter functions are closures — use the `let _nextXxxId` + `() => _nextXxxId++` pattern
- Never add persistence logic — this is intentionally in-memory; restarts reset state

## Seeding example

```js
const orders = [
  { id: 1, userId: 1, productId: 1, quantity: 2 },
  { id: 2, userId: 2, productId: 2, quantity: 1 },
];
let _nextOrderId = 3;
```
