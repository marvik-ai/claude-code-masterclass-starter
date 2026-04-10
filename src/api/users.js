// Users routes — CRUD for user records.
//
// DEMO 2 TARGET: Uses setTimeout callbacks — needs async/await refactor.
// DEMO 3 TARGET: POST and PUT have no input validation — needs zod validation
//                following the pattern in src/validators/auth.js.
// DEMO 1 CONTEXT: This file is a model for how routes are structured;
//                 the orders route (added in Demo 1) should follow this same shape.

const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/users
router.get('/', function (req, res, next) {
  setTimeout(function () {
    res.json(db.users);
  }, 5);
});

// GET /api/users/:id
router.get('/:id', function (req, res, next) {
  setTimeout(function () {
    const user = db.users.find(function (u) {
      return u.id === parseInt(req.params.id);
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  }, 5);
});

// POST /api/users — no validation! any data gets saved.
router.post('/', function (req, res, next) {
  setTimeout(function () {
    const { name, email, role } = req.body;
    const newUser = { id: db.nextUserId(), name, email, role: role || 'user' };
    db.users.push(newUser);
    res.status(201).json(newUser);
  }, 5);
});

// PUT /api/users/:id — no validation! any data gets merged.
router.put('/:id', function (req, res, next) {
  setTimeout(function () {
    const idx = db.users.findIndex(function (u) {
      return u.id === parseInt(req.params.id);
    });

    if (idx === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(db.users[idx], req.body);
    res.json(db.users[idx]);
  }, 5);
});

// DELETE /api/users/:id
router.delete('/:id', function (req, res, next) {
  setTimeout(function () {
    const idx = db.users.findIndex(function (u) {
      return u.id === parseInt(req.params.id);
    });

    if (idx === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    const deleted = db.users.splice(idx, 1)[0];
    res.json(deleted);
  }, 5);
});

module.exports = router;
