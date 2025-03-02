import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

const config = antfu(
  {
    typescript: true,
    react: true,
    stylistic: {
      overrides: {
        'style/arrow-parens': 'error',
      },
    },
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react/no-array-index-key': 'off',
      'react/no-unstable-context-value': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },
)

export default config
