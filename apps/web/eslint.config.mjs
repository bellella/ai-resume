// apps/web/eslint.config.js

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { nextJsConfig } from '@ai-resume/eslint-config/next-js';
import pluginStorybook from 'eslint-plugin-storybook';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...nextJsConfig,
  ...compat.extends(),
  {
    files: ['**/*.stories.@(js|jsx|ts|tsx)'],
    plugins: {
      storybook: pluginStorybook,
    },
    rules: {
      ...pluginStorybook.configs.recommended.rules,
    },
  },
  {
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    ignores: ['.storybook/**', '**/*.stories.ts', '**/*.stories.tsx'],
  },
];
