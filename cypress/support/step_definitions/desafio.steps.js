import { DesafioPage } from '../../e2e/pages/desafioPage';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const desafioPage = new DesafioPage();

Given("que o usuário acessa a página inicial", () => {
  cy.visit('/');
});

Then("o usuário fecha os avisos da tela, se presentes", () => {
  desafioPage.fecharBannerCookies();
  desafioPage.fecharBannerPromocionalSeExistir();
});

