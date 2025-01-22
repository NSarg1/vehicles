import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintPluginPrettierRecommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2021, globals: globals.browser },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // ---- Import sort ----
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$', '^react-.*|$', '^@?\\w'],
            ['^(views|pages|components)(/.*|$)'],
            ['^(store|hooks|utils|services)(/.*|$)'],
            ['^(dto)(/.*|$)'],
            ['^(styles|public|assets)(/.*|$)', '.*\\.module\\.scss|$', '.*\\.svg|$'],
            ['^\\.', '^(types)(/.*|$)'],
            ['^(data)(/.*|$)'],
            ['^\\u0000'],
          ],
        },
      ],
    },
  },
);
