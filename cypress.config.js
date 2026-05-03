const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "3gjkt2",
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
