const request = require('supertest');
const app = require('../src/app');

describe('GET /api/users', () => {
  it('returns all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/users/:id', () => {
  it('returns a user by id', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.name).toBe('Alice');
  });

  it('returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
  });
});

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Carol', email: 'carol@example.com' });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Carol');
    expect(res.body.id).toBeDefined();
  });

  // TODO (Demo 3): Add validation tests once zod validation is implemented.
  // Expected: POST with missing name should return 400 with validation details.
});
