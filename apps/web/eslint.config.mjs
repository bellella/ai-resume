// apps/web/eslint.config.js

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { nextJsConfig } from '@ai-resume/eslint-config/next-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...nextJsConfig,
  ...compat.extends(),
  {
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    ignores: ['.storybook/**', '**/*.stories.ts', '**/*.stories.tsx'],
  },
];
