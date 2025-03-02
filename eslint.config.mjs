import antfu from '@antfu/eslint-config'
import next from '@next/eslint-plugin-next'
import drizzle from 'eslint-plugin-drizzle'

const config = antfu(
  {
    typescript: true,
    react: true,
    ignores: ['**/*.json'],
    stylistic: {
      overrides: {
        'style/arrow-parens': 'error',
        'style/multiline-ternary': ['error', 'never'],
      },
    },
    plugins: {
      '@next/next': next,
      'drizzle': drizzle,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      'react/no-array-index-key': 'off',
      'react/no-unstable-context-value': 'off',
      'react-refresh/only-export-components': 'off',
      'drizzle/enforce-delete-with-where': ['error', { drizzleObjectName: ['db'] }],
      'drizzle/enforce-update-with-where': ['error', { drizzleObjectName: ['db'] }],
    },
  },
)

export default config
