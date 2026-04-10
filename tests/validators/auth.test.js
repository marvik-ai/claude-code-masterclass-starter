// Unit tests for auth validators.
// This file is the pattern reference for Demo 3 — new validator tests should look like this.

const { loginSchema, registerSchema } = require('../../src/validators/auth');

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({
      email: 'alice@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.email).toBeDefined();
  });

  it('rejects passwords shorter than 8 characters', () => {
    const result = loginSchema.safeParse({
      email: 'alice@example.com',
      password: 'short',
    });
    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.password).toBeDefined();
  });
});

describe('registerSchema', () => {
  it('accepts valid registration data', () => {
    const result = registerSchema.safeParse({
      name: 'Carol',
      email: 'carol@example.com',
      password: 'securepass',
    });
    expect(result.success).toBe(true);
    expect(result.data.role).toBe('user'); // default applied
  });

  it('rejects names shorter than 2 characters', () => {
    const result = registerSchema.safeParse({
      name: 'A',
      email: 'a@example.com',
      password: 'securepass',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid roles', () => {
    const result = registerSchema.safeParse({
      name: 'Carol',
      email: 'carol@example.com',
      password: 'securepass',
      role: 'superadmin',
    });
    expect(result.success).toBe(false);
    expect(result.error.flatten().fieldErrors.role).toBeDefined();
  });

  it('allows explicit admin role', () => {
    const result = registerSchema.safeParse({
      name: 'Dave',
      email: 'dave@example.com',
      password: 'adminpass1',
      role: 'admin',
    });
    expect(result.success).toBe(true);
    expect(result.data.role).toBe('admin');
  });
});
