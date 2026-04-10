---
name: commit
description: Create a conventional commit for this project. Use when the user says "commit", "create a commit", or asks to save changes to git. Stages relevant files, writes a conventional commit message, and runs the test suite first.
---

# Commit Skill

Before committing, always run `npm test` to confirm nothing is broken.

## Commit message format

Use Conventional Commits:

```
<type>(<scope>): <short summary>

[optional body]
```

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

**Scope:** the resource name — `users`, `products`, `auth`, `orders`, `validators`, `middleware`

**Examples:**

```
feat(orders): add POST /api/orders with zod validation
fix(users): return 404 instead of 500 for missing user
refactor(auth): convert callbacks to async/await
test(validators): add edge cases for registerSchema
```

## Steps

1. Run `npm test` — stop and report if any test fails
2. Run `git diff --stat` to see what changed
3. Stage the relevant files with `git add <files>` (never `git add .` blindly)
4. Write the commit message following the format above
5. Commit with `git commit -m "<message>"`
