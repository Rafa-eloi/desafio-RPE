const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const path = require("path");

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 10000, // 10 segundos para comandos (cy.get, cy.contains, etc.)
  pageLoadTimeout: 60000,       // 60 segundos para carregamento de páginas
  requestTimeout: 10000,        // 10 segundos para requests XHR
  responseTimeout: 30000,       // 30 segundos para esperar resposta
  e2e: {

    baseUrl: "https://www.americanas.com.br/",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    specPattern: "cypress/e2e/features/**/*.feature",
    
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});

