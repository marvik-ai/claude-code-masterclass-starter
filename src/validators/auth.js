// Auth validators — the gold-standard pattern for this project.
//
// HOW TO USE THIS FILE AS A REFERENCE:
//   1. Define a Zod schema for each operation
//   2. Use the validate() middleware wrapper on any route that needs input checks
//   3. Access validated data via req.validated (not req.body) in your handler
//   4. Errors are automatically forwarded to errorHandler via next(err)
//
// Demo 3 shows what happens when you prompt Claude to follow THIS pattern
// vs prompting it without any reference.

const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'user']).default('user'),
});

// validate() returns an Express middleware that:
//   - Parses req.body against the given schema
//   - Attaches the cleaned data to req.validated
//   - Calls next(err) with a ValidationError on failure
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = new Error('Validation failed');
      err.name = 'ValidationError';
      err.details = result.error.flatten().fieldErrors;
      return next(err);
    }
    req.validated = result.data;
    next();
  };
}

module.exports = { loginSchema, registerSchema, validate };
