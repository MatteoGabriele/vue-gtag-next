module.exports = {
  root: true,
  env: {
    node: true,
    "jest/globals": true
  },
  plugins: [
    "jest"
  ],
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "prettier/vue",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    parser: "babel-eslint"
  }
};