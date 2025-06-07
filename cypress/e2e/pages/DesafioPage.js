export class DesafioPage {

    fecharBannerCookies() {
        cy.get('.cc-close.dp-add-listener').click();
    }

    fecharBannerPromocionalSeExistir() {
        cy.get('body').then(($body) => {
            if ($body.find('#ins-responsive-banner-15318405239990').length > 0) {
            cy.get('#close-button-1454703513200 > svg').click();
            }
        });
    }

    pesquisarProduto() {
        cy.get('[data-testid="fs-input"]').should('be.visible').clear().type('Smart TV');
        cy.get('[data-testid="fs-search-button"] > div > span').should('be.visible').click( {force: true});
    }

    filtrarPreco() {
        cy.get('.FilterFacetCheckbox_showAll__e_whq').click();
        cy.get(':nth-child(8) > label > [data-testid="fs-input"]').check();
        console.log("Filtragem feita"); //apagar
    }

    listarProdutos() {
        const produtosCaros = [];

        function carregarTodasAsPaginas() {
        return new Cypress.Promise((resolve) => {
            function clicarEnquantoExistir() {
            cy.get('body').then(($body) => {
                if ($body.find('[data-testid="pagination-button"]').length > 0) {
                // Garante que o botão esteja visível e clicável
                cy.get('[data-testid="pagination-button"]', { timeout: 10000 })
                    .should('exist')
                    .should('be.visible')
                    .should('not.be.disabled')
                    .then(($btn) => {
                    // Usa wrap para garantir que estamos clicando no elemento correto no DOM atual
                    cy.wrap($btn).click({ force: true });
                    cy.wait(1500); // Aguarda novos produtos aparecerem

                    // Aguarda o DOM atualizar antes de continuar
                    cy.document().its('readyState').should('eq', 'complete');

                    // Chama novamente a função
                    clicarEnquantoExistir();
                    });
                } else {
                resolve(); // Não há mais botão, termina
                }
            });
            }
            clicarEnquantoExistir();
        });
        }

        carregarTodasAsPaginas().then(() => {
        cy.get('a[ins-product-id]').each(($el) => {
            const nome = $el.find('.ProductCard_productName__mwx7Y').text().trim();
            const precoTexto = $el.find('.ProductCard_productPrice__XFEqu').text().trim();
            const rating = $el.find('.avg-rating').text().trim() || 'N/A';

            const precoNumerico = parseFloat(precoTexto.replace(/[^\d,]/g, '').replace(',', '.'));

            if (precoNumerico > 3500) {
                produtosCaros.push({
                    Produto: nome,
                    Preço: `R$ ${precoNumerico.toFixed(2)}`,
                    Rating: rating,
                });
                }
            }).then(() => {
                console.log('Produtos com preço > R$ 3.500:');
                console.table(produtosCaros);
            });
        });
    }

}

