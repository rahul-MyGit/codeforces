# Codeforces

A full-stack competitive programming platform inspired by Codeforces. Built to learn and understand remote code execution in a fast, secure, and reliable way using micro VMs and sandboxed environments.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS |
| Code Editor | Monaco Editor with multi-language support |
| Backend | Express 5, TypeScript |
| Database | PostgreSQL with Prisma ORM |
| Auth | Better-auth (email/password + email OTP) |
| Code Execution | Judge0 (self-hosted or managed) |
| Monorepo | Turborepo + pnpm |
| Optional | Redis (queue), Firecracker / E2B (micro VMs) |

## Features

- **Code Arena** — Split-pane IDE with problem description, Monaco editor, and test case panels
- **Multi-language support** — C++, Python, Java, JavaScript, TypeScript, Go, Rust
- **Problem management** — Admin panel for creating problems with visible/hidden test cases and starter code
- **Run & Submit** — Test against sample cases instantly or submit against all hidden test cases
- **Cursor pagination** — Efficient browsing of the problem set
- **Submission verdicts** — AC, WA, TLE, MLE, RE, CE
- **Progress tracking** — See solved, attempted, and unsolved problems at a glance
- **Email OTP verification** — Powered by Resend + React Email

## Project Structure

```
apps/
  web/         → Next.js frontend
  backend/     → Express API server
  worker/      → Background job runner (Redis-based)
packages/
  database/    → Prisma schema & client
  email/       → Email templates & service
  ui/          → Shared UI components
  common/      → Shared types, schemas, constants
```

## Code Execution Options

1. **Judge0** (easiest) — Send code to a self-hosted or public Judge0 API
2. **E2B** (medium) — Run code in managed or self-hosted sandboxes
3. **Firecracker** (hard) — Spin up micro VMs natively on a worker

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env

# Push database schema
pnpm --filter database db:push

# Run the dev servers
pnpm dev
```

## API Routes

- `POST /api/auth/*` — Authentication (sign-up, sign-in, OTP)
- `GET /api/user/problems` — Browse problems with cursor pagination
- `POST /api/judge0` — Execute code & check submissions
- `CRUD /api/admin/problems` — Admin problem management
- `GET /api/tags` — List all problem tags
