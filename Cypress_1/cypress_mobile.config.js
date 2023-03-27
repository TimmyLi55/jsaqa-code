const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl: "http://localhost:3000/",
    retries: {
      // openMode: 1,
    },
    viewportWidth: 720,
    viewportHeight: 1280,
  },
});
