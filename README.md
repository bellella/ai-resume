# AI Resume

This is a [Turborepo](https://turbo.build/repo) monorepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org) app
- `api`: a [NestJS](https://nestjs.com) app
- `ui`: a stub React component library shared by both `web` and `api` applications
- `eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `typescript-config`: `typescript` configurations
- `types`: shared types between apps
- `database`: shared database schema and client

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org) for code linting
- [Prettier](https://prettier.io) for code formatting

## Setup

This repository is used in the `npx create-turbo@latest` command, and selected when choosing which package manager you wish to use with your monorepo (Yarn, npm, or pnpm).

If you didn't use the `create-turbo` CLI to create this repository, you might need to install the dependencies:

```bash
npm install
```

### Build

To build all apps and packages, run the following command:

```bash
npm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
npm run dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

More information about the used packages can be found in their respective documentation.

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Turborepo Documentation](https://turbo.build/repo/docs)
