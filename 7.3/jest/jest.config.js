module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/coverage/"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
