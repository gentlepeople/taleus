module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import', 'unused-imports', 'react-native', 'react'],
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:yml/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    'import/ignore': [
      'node_modules/react-native/index\\.js$',
      'node_modules/react-native-keychain/index\\.js$',
    ],
    'import/resolver': {
      typescript: {
        project: __dirname,
      }, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
    },
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
  ignorePatterns: ['/*.*'],
  rules: {
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/newline-after-import': [1],
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
          extendDefaults: true,
          types: {
              '{}': false
          }
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-empty-pattern': 'off',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['export'],
      },
      {
        blankLine: 'any',
        prev: ['export'],
        next: ['export'],
      },
    ],
    'comma-dangle': 0,
    'import/namespace': 0,
    'import/default': 0,
    'no-undef': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 0,
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-native/no-raw-text': 0,
    'space-before-function-paren': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-unresolved': ['error', { ignore: ['^@'] }],
  },
};