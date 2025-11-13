import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: { '@typescript-eslint': tseslint.plugin, react: pluginReact },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
]
