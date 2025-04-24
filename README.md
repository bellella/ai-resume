# AI Resume

This is a [Turborepo](https://turbo.build/repo) monorepo containing a full-stack AI-powered resume builder.

## 🧹 What's inside?

This Turborepo includes the following apps and packages:

### 🧪 Apps

- `web`: a [Next.js](https://nextjs.org) app (resume editor, frontend)
- `api`: a [NestJS](https://nestjs.com) app (API server)

### 📦 Packages

- `ui`: Shared React component library
- `database`: Prisma schema and database client
- `types`: Shared TypeScript types
- `eslint-config`: Shared ESLint config (uses `eslint-config-next` + `prettier`)
- `typescript-config`: Shared `tsconfig` base

All packages and apps are built with [TypeScript](https://www.typescriptlang.org).

---

## 🛠️ Development Setup

If you didn’t use `create-turbo`, install dependencies manually:

```bash
npm install
```

Then, run the following in order:

```bash
npm run db:generate   # Generate Prisma client
npm run dev           # Start both frontend and backend
```

---

## ⚙️ Environment Variables

### apps/api (`apps/api/.env`)

```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
WEB_URL=http://localhost:3000
```

### apps/web (`apps/web/.env`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> ✅ Note: `NEXT_PUBLIC_` prefix is required for frontend access in Next.js.

---

## 📆 Build

To build all apps and packages:

```bash
npm run build
```

---

## 🚀 Remote Caching

This repo supports [Turborepo Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to improve CI/CD and team productivity.

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Turborepo Docs](https://turbo.build/repo/docs)
