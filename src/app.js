const express = require('express');
const errorHandler = require('./middleware/errorHandler');

const authRouter = require('./api/auth');
const usersRouter = require('./api/users');
const productsRouter = require('./api/products');
// orders router will be added here during Demo 1

const app = express();

app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
// app.use('/api/orders', ordersRouter);  ← Demo 1 adds this

// Central error handler — must be last
app.use(errorHandler);

module.exports = app;
