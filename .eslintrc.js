module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'google',
    'airbnb/base',
    'prettier',
  ],
  plugins: ['chai-friendly'],
  rules: {
    'semi': [2, 'never'],
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 0,
    'max-len': [2, 200],
    'no-console': 0,
  },
}
