module.exports = {
  extends: [
    'plugin:@gentlepeople/react',
    'plugin:react/jsx-runtime',
    'plugin:@next/next/recommended',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: __dirname,
      }, // this loads <rootdir>/tsconfig.json to eslint
      node: {
        extensions: ['.ts', '.web.ts', '.tsx', '.web.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      parser: 'yaml-eslint-parser',
    },
  ],
  rules: {
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-empty': 'off',
    // Need to remove these rules
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'import/export': 0,
    // '@typescript-eslint/no-unused-vars': [
    //   2,
    //   {
    //     argsIgnorePattern: '^_',
    //   },
    // ],
    'no-console': [
      1,
      {
        allow: ['warn', 'error'],
      },
    ],
  },
};
