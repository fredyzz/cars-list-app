module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testMatch: ["**/*.test.ts", "**/*.test.tsx"],
    testPathIgnorePatterns: ["/node_modules/", "settings.ts"],
  };