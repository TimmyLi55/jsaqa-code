const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 120 * 1000,
  use: {
    launchOptions: { headless: false, slowMo: 300, devtools: true },
  },
});
