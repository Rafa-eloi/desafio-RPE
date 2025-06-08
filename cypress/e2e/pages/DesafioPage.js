import { elements } from '../elements/desafioElements';

export class DesafioPage {
  
  // Método para fechar o banner promocional, caso ele exista na página
  fecharBannerPromocionalSeExistir() {
    cy.get('body').then(($body) => {
      // Verifica se o banner promocional está presente e depois clica para fechar
      if ($body.find(elements.bannerPromocional).length > 0) {
        cy.get(elements.fecharBannerPromocional).click();
      }
    });
  }

  // Método para fechar os cookies
  fecharBannerCookies() {
    cy.get(elements.bannerCookies).click();
  }

  // Método para realizar a busca de um produto com o termo "Smart TV"
  pesquisarProduto() {
    cy.get(elements.campoPesquisa).should('be.visible').clear().type('Smart TV');
    cy.get(elements.botaoPesquisar).should('be.visible').click({ force: true });
  }

  // Método para aplicar filtro de preço na lista de produtos
  filtrarPreco() {
    cy.get(elements.botaoMostrarTodosPrecos).click();
    cy.get(elements.checkboxFaixaPreco).check();
  }

  // Método para listar produtos caros (com preço maior que R$ 3.500) em todas as páginas
  listarProdutos() {
    const produtosCaros = [];

    // Função auxiliar que carrega todas as páginas clicando no botão de paginação até o fim
    function carregarTodasAsPaginas() {
      return new Cypress.Promise((resolve) => {
        function clicarEnquantoExistir() {
          cy.get('body').then(($body) => {
            // Verifica se o botão de paginação existe na página atual
            if ($body.find(elements.botaoPaginacao).length > 0) {
              cy.get(elements.botaoPaginacao, { timeout: 10000 })
                .should('exist')
                .should('be.visible')
                .should('not.be.disabled')
                .then(($btn) => {
                  cy.wrap($btn).click({ force: true });
                  cy.wait(1500);
                  cy.document().its('readyState').should('eq', 'complete');
                  clicarEnquantoExistir();
                });
            } else {
              // Resolve a Promise quando não houver mais páginas para clicar
              resolve();
            }
          });
        }
        clicarEnquantoExistir();
      });
    }

    // Depois que todas as páginas forem carregadas, percorre os cards de produtos para filtrar os caros
    carregarTodasAsPaginas().then(() => {
      cy.get(elements.cardProduto).each(($el) => {
        // Extrai nome, preço e avaliação de cada produto no card
        const nome = $el.find(elements.nomeProduto).text().trim();
        const precoTexto = $el.find(elements.precoProduto).text().trim();
        const rating = $el.find(elements.ratingProduto).text().trim() || 'N/A';

        // Converte o preço para número (considerando vírgula decimal e símbolos)
        const precoNumerico = parseFloat(precoTexto.replace(/[^\d,]/g, '').replace(',', '.'));

        // Se o preço for maior que 3500, adiciona o produto na lista de produtos caros
        if (precoNumerico > 3500) {
          produtosCaros.push({
            Produto: nome,
            Preço: `R$ ${precoNumerico.toFixed(2)}`,
            Rating: rating,
          });
        }
      }).then(() => {
        // Após listar, exibe os produtos caros no console e envia para uma task Cypress
        console.log('Produtos com preço > R$ 3.500:');
        cy.task('logProdutosCaros', produtosCaros);
        console.table(produtosCaros);
      });
    });
  }
}