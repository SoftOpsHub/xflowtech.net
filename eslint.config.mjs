import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'coverage/**']),
  {
    // Keep the stack consistent for every contributor (human or AI).
    // UI is Tailwind + shadcn/Radix only; client state is Zustand.
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'axios', message: 'Use native fetch.' },
            { name: 'jotai', message: 'Client state is Zustand only.' },
            { name: '@reduxjs/toolkit', message: 'Client state is Zustand only.' },
            { name: 'react-redux', message: 'Client state is Zustand only.' },
            { name: 'antd', message: 'UI is Tailwind + shadcn/Radix only.' },
            { name: 'bootstrap', message: 'UI is Tailwind + shadcn/Radix only.' },
            { name: 'styled-components', message: 'UI is Tailwind + shadcn/Radix only.' },
          ],
          patterns: [
            { group: ['@mui/*'], message: 'UI is Tailwind + shadcn/Radix only.' },
            { group: ['@chakra-ui/*'], message: 'UI is Tailwind + shadcn/Radix only.' },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
