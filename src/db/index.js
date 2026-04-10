// In-memory data store — stands in for a real database.
// Restart the server to reset all state.

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
];

const products = [
  { id: 1, name: 'Widget', price: 9.99, stock: 100 },
  { id: 2, name: 'Gadget', price: 24.99, stock: 50 },
];

let _nextUserId = 3;
let _nextProductId = 3;

module.exports = {
  users,
  products,
  nextUserId: () => _nextUserId++,
  nextProductId: () => _nextProductId++,
};
