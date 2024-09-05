module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    '.turbo',
    'tsconfig.tsbuildinfo',
    '**/node_modules/*',
    '**/dist/*',
    '**/.next/*',
    '**/generated/*',
    '**/codepush/*',
    '**/ios/*',
    '**/android/*',
    '**/assets/*.json',
  ],
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: [
    '@typescript-eslint',
    // We enforce certain rules on how imports are handled
    'import',
    // Remove Unused Imports
    'unused-imports',
    // All packages in this monorepo use Prettier
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 100, // https://github.com/airbnb/javascript#19.13
        tabWidth: 2, // https://github.com/airbnb/javascript#19.1
        useTabs: false, // https://github.com/airbnb/javascript#19.1
        semi: true, // https://github.com/airbnb/javascript#21.1
        singleQuote: true, // https://github.com/airbnb/javascript#6.1
        trailingComma: 'all', // https://github.com/airbnb/javascript#20.2
      },
    ],
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
    /**
     * The default setting for Prettier is 'warn' because then it shows as yellow squiggly lines
     * in the VS Code IDE. However, it means `eslint` will not have an error code if there is warning
     * due to prettier unless you also add the `--max-warnings=0` flag in front of it. So, in the `lint-staged`
     * scripts in the packages within this monorepo, we add that flag so that the precommit hooks
     * associated with that script will fail when run.
     */
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
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
    'no-constant-condition': ['error', { checkLoops: false }],
  },
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
    },
  ],
  overrides: [
    // {
    //   files: ['**/*.graphql'],
    //   extends: 'plugin:@graphql-eslint/schema-recommended',
    // },
  ],
};
