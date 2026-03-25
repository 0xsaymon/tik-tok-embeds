import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default defineConfig([
  // shadcn-generated files — skip all linting
  globalIgnores([
    'dist',
    'src/shared/ui-kit/lib/**',
    'src/shared/ui-kit/hooks/**',
    'src/shared/ui-kit/components/**',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
      '@tanstack/query': pluginQuery,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Known limitation: TanStack Virtual's useVirtualizer returns functions that React Compiler
      // cannot safely memoize. This is expected behavior documented by TanStack Virtual.
      'react-hooks/incompatible-library': 'off',

      'max-len': [
        1,
        {
          code: 100,
          comments: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
          ignoreTrailingComments: true,
        },
      ],

      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      '@tanstack/query/exhaustive-deps': 'error',
    },
  },
  prettier,
]);
