module.exports = {
  extends: ['plugin:@gentlepeople/react'],
  plugins: ['react-native', 'react-hooks'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: __dirname,
      }, // this loads <rootdir>/tsconfig.json to eslint
      node: {
        extensions: [
          '.ts',
          '.android.ts',
          '.ios.ts',
          '.native.ts',
          '.tsx',
          '.android.tsx',
          '.ios.tsx',
          '.native.tsx',
        ],
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
    'import/no-duplicates': 'error',
    '@typescript-eslint/ban-types': 'off',
    'comma-dangle': 0,
    'import/namespace': 0,
    'import/default': 0,
    'no-undef': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-named-as-default': 0,
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-native/no-raw-text': 0,
    'space-before-function-paren': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
    'react-hooks/exhaustive-deps': 0,
  },
};
