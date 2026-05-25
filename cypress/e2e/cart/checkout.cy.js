import * as LoginPage from '../../support/selectores/login-page';
import * as CheckoutPage from '../../support/selectores/checkout-page';
const { faker } = require('@faker-js/faker');
describe('Comprar productos', () => {
   // Este test verifica que un producto se pueda agregar al carrito correctamente
    it('Comprar un producto al carrito desde el detalle sin loguearse', () => {
        const password = faker.internet.password();
        
        cy.visit('/index.php?route=product/product&product_id=58');
        cy.get(CheckoutPage.BUY_BUTTON).contains('Buy now').click();

        cy.get(CheckoutPage.FIRST_NAME_INPUT).type(faker.person.firstName());
        cy.get(CheckoutPage.LAST_NAME_INPUT).type(faker.person.lastName());
        cy.get(CheckoutPage.EMAIL_INPUT).type(faker.internet.email());
        cy.get(CheckoutPage.TELEPHONE_INPUT).type(faker.phone.number('1122223333'));
        cy.get(CheckoutPage.PASSWORD_INPUT).type(password);
        cy.get(CheckoutPage.CONFIRM_PASSWORD_INPUT).type(password);

        cy.get(CheckoutPage.COMPANY_INPUT).type(faker.company.name());
        cy.get(CheckoutPage.ADDRESS_1_INPUT).type(faker.location.streetAddress());
        cy.get(CheckoutPage.CITY_INPUT).type(faker.location.city());
        cy.get(CheckoutPage.POSTCODE_INPUT).type(faker.location.zipCode('#####'));
        cy.get(CheckoutPage.COUNTRY_SELECT).select('Argentina');
        cy.get(CheckoutPage.ZONE_SELECT).select('Buenos Aires');

        cy.get(CheckoutPage.COMMENT_TEXTAREA).type('Por favor, entregar entre las 9am y 5pm.');
        cy.get(CheckoutPage.AGREE_TyC_CHECKBOX).click();
        cy.get(CheckoutPage.AGREE_POLICY_CHECKBOX).click();
        cy.get(CheckoutPage.SUBMIT_BUTTON).contains('Continue').click();

        //COnfirmar orden
        cy.contains('Confirm Order').should('be.visible');

        cy.get(CheckoutPage.CONFIRM_ORDER_BUTTON).contains('Confirm Order').click();

        // Validar que se muestre el mensaje de éxito
        cy.contains('Your order has been placed!').should('be.visible');     
    });

    it('Comprar un producto al carrito desde el detalle logueado', () => {
        const email = 'ralta@yopmail.com';
        const password = '1q2w3e4r5t';
        cy.login(email, password);

        cy.visit('/index.php?route=product/product&product_id=58');

        cy.get(CheckoutPage.BUY_BUTTON).contains('Buy now').click();

        cy.get(CheckoutPage.COMMENT_TEXTAREA).type('Por favor, entregar entre las 9am y 5pm.');
        cy.get(CheckoutPage.AGREE_TyC_CHECKBOX).click();
        cy.get(CheckoutPage.SUBMIT_BUTTON).contains('Continue').click();

        //Confirmar orden
        cy.contains('Confirm Order').should('be.visible');

        cy.get(CheckoutPage.CONFIRM_ORDER_BUTTON).contains('Confirm Order').click();

        // Validar que se muestre el mensaje de éxito
        cy.contains('Your order has been placed!').should('be.visible');  

    });

})