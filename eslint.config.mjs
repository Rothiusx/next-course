import antfu from '@antfu/eslint-config'
import next from '@next/eslint-plugin-next'
import drizzle from 'eslint-plugin-drizzle'
import prettier from 'eslint-plugin-prettier/recommended'

const config = antfu(
  {
    react: true,
    plugins: {
      '@next/next': next,
      drizzle,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      'drizzle/enforce-delete-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
      'drizzle/enforce-update-with-where': [
        'error',
        { drizzleObjectName: ['db'] },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/no-array-index-key': 'off',
      'react/no-unstable-context-value': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['package.json', 'tsconfig.json'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,mjs,js,json}'],
    ...prettier,
  },
)

export default config
