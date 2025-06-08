import { DesafioPage } from '../../e2e/pages/desafioPage';
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const desafioPage = new DesafioPage();

Given("que o usuário acessa a página inicial", () => {
  cy.visit('/');
});

Then("fecha os avisos da tela, se presentes", () => {
  desafioPage.fecharBannerPromocionalSeExistir();
  desafioPage.fecharBannerCookies(); 
});

When("faço a pesquisa pelo produto", () => {
  desafioPage.pesquisarProduto();
});

When("filtro pelo preço", () => {
  desafioPage.filtrarPreco();
});

Then("listar produtos que atendem os critérios", () => {
  desafioPage.listarProdutos();
});




