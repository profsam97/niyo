module.exports = {
    "src/**/*.ts": [
      "eslint --fix",
      "prettier --write"
    ],
    "test/**/*.ts": [
      "eslint --fix",
      "prettier --write"
    ]
  };
  