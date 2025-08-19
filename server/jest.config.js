/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/tests/**/*.test.ts"],
   moduleNameMapper: {
    "^../middleware/protectedRoute$": "<rootDir>/src/tests/protectedMock.ts",
  },
};
