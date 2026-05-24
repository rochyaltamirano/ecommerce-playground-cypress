import * as LoginPage from '../../support/selectores/login-page';
import * as FavoritesPage from '../../support/selectores/favorites-page';

describe('Favoritos', () => {
    beforeEach(() => {
        cy.visit('/index.php?route=account/login');
        const email = 'ralta@yopmail.com';
        const password = '1q2w3e4r5t';

        cy.get(LoginPage.EMAIL).type(email);
        cy.get(LoginPage.PASSWORD).type(password);
        cy.get(LoginPage.LOGIN_BUTTON).click();
        // esperar a que el login haya completado
        cy.contains('My Account').should('be.visible');
    });

    it('Lista vacía', () => {
        cy.visit('/index.php?route=account/wishlist');

        cy.contains('No results!').should('be.visible');
    });

    it('Buscar un producto y agregarlo a Favoritos', () => {
        const productName = 'Apple Cinema 30"';

        cy.get(FavoritesPage.SEARCH_INPUT).first().type(productName);
        cy.get(FavoritesPage.SEARCH_BUTTON).contains('Search').click();

        cy.get(FavoritesPage.WISHLIST_BUTTON).first().scrollIntoView().click({ force: true });

        // validar que el producto se agregó a favoritos
        cy.contains('Success: You have added '+productName+' to your wish list!', { timeout: 10000 })
            .should('be.visible');

         // Ir a la página de favoritos
         cy.visit('/index.php?route=account/wishlist');

         // Validar que el producto esté en la lista de favoritos
         cy.contains(productName).should('be.visible');
    });

    it('Eliminar un producto de Favoritos', () => {
        // Ir a la página de favoritos
         cy.visit('/index.php?route=account/wishlist');

        // Eliminar el producto de favoritos
        cy.get(FavoritesPage.REMOVE_WISHLIST_BUTTON).click();
        cy.visit('/index.php?route=account/wishlist');

        //Validar que el producto se eliminó de favoritos
        cy.contains('No results!').should('be.visible');
    });

    it('Agregar un producto a favoritos sin estar logueado', () => {
        // Hacer logout
        cy.get(FavoritesPage.ITEM_LIST).contains('Logout').click();

        // Buscar un producto
        const productName = 'Apple Cinema 30"';
        cy.get(FavoritesPage.SEARCH_INPUT).first().type(productName);
        cy.get(FavoritesPage.SEARCH_BUTTON).contains('Search').click();

        // Intentar agregar a favoritos
        cy.get(FavoritesPage.WISHLIST_BUTTON).first().scrollIntoView().click({ force: true });

        // Validar que se muestre el mensaje de error
        cy.contains('You must login or create an account to save '+productName+' to your wish list!').should('be.visible');
    });

    it('Agregar y quitar un producto a favoritos desde la página de detalles del producto', () => {
        const productName = 'Canon EOS 5D';

        // Buscar el producto
        cy.get(FavoritesPage.SEARCH_INPUT).first().type(productName);
        cy.get(FavoritesPage.SEARCH_BUTTON).contains('Search').click();

        // Hacer click en el nombre del producto para ir a la página de detalles
        cy.get(FavoritesPage.CARROUSEL_INNER).first().click();

        cy.get(FavoritesPage.IMAGE_DETAILS).click();

        // Validar que se agregó a favoritos
        cy.contains('Success: You have added '+productName+' to your wish list!', { timeout: 10000 })
            .should('be.visible');
        // Esperar a que el pop-up de agregado se cierre antes de continuar
        cy.contains('Success: You have added '+productName+' to your wish list!', { timeout: 15000 })
            .should('not.exist');

        // Eliminar de favoritos
        cy.get(FavoritesPage.IMAGE_DETAILS).click();

        // Validar que se eliminó de la lista de favoritos
        cy.visit('/index.php?route=account/wishlist');
        cy.contains(productName).should('not.exist');
    });

})