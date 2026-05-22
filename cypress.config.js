const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '14t71x',
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://ecommerce-playground.lambdatest.io'

  }
});
