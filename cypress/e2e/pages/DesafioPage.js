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

}
