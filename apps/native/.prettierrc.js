module.exports = {
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.sol',
      options: {
        tabWidth: 4,
      },
    },
  ],
};
