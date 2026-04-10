// Products routes — CRUD for product catalog.
//
// DEMO 2 TARGET: Uses setTimeout callbacks — needs async/await refactor.

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products
router.get('/', function (req, res, next) {
  setTimeout(function () {
    res.json(db.products);
  }, 5);
});

// GET /api/products/:id
router.get('/:id', function (req, res, next) {
  setTimeout(function () {
    const product = db.products.find(function (p) {
      return p.id === parseInt(req.params.id);
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  }, 5);
});

// POST /api/products
router.post('/', function (req, res, next) {
  setTimeout(function () {
    const { name, price, stock } = req.body;
    const newProduct = {
      id: db.nextProductId(),
      name,
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
    };
    db.products.push(newProduct);
    res.status(201).json(newProduct);
  }, 5);
});

module.exports = router;
