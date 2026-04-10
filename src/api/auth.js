// Auth routes — login and register.
//
// DEMO 2 TARGET: This file uses setTimeout callbacks internally.
// The refactor task is to convert to async/await (matching CLAUDE.md conventions).

const express = require('express');
const router = express.Router();
const { validate, loginSchema, registerSchema } = require('../validators/auth');
const db = require('../db');

// POST /api/auth/login
router.post('/login', validate(loginSchema), function (req, res, next) {
  const { email } = req.validated;

  // Simulates an async DB call with old-style callback pattern.
  // CLAUDE.md says: use async/await, not callbacks.
  setTimeout(function () {
    const user = db.users.find(function (u) { return u.email === email; });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    setTimeout(function () {
      const token = Buffer.from(email + ':' + Date.now()).toString('base64');
      res.json({
        token,
        user: { id: user.id, name: user.name, role: user.role },
      });
    }, 5);
  }, 5);
});

// POST /api/auth/register
router.post('/register', validate(registerSchema), function (req, res, next) {
  const { name, email, role } = req.validated;

  setTimeout(function () {
    const existing = db.users.find(function (u) { return u.email === email; });

    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const newUser = { id: db.nextUserId(), name, email, role };
    db.users.push(newUser);
    res.status(201).json(newUser);
  }, 5);
});

module.exports = router;
