import * as LoginPage from '../../support/selectores/login-page';
describe('Login de usuarios', () => {
   beforeEach(() => {
      cy.visit('/index.php?route=account/login');
   });

   it ('Login exitoso con usuario registrado', () => {
        const email = 'rociotest@yopmail.com';
        const password = 'password123';

        cy.get(LoginPage.EMAIL).type(email);
        cy.get(LoginPage.PASSWORD).type(password);
        cy.get(LoginPage.LOGIN_BUTTON).click();

        cy.contains('My Account').should('be.visible');
   });

   it('Login con email no registrado/formato de email inválido', () => {
        const email = 'rociotest1234@lala.com';
        const password = 'password123';

        cy.get(LoginPage.EMAIL).type(email);
        cy.get(LoginPage.PASSWORD).type(password);
        cy.get(LoginPage.LOGIN_BUTTON).click();
      
        cy.contains('Warning: No match for E-Mail Address and/or Password.').should('be.visible');
   });

   it('Login con password incorrecta', () => {
        const email = 'rociotest@yopmail.com';
        const password = 'wrongpassword';

        cy.get(LoginPage.EMAIL).type(email);
        cy.get(LoginPage.PASSWORD).type(password);
        cy.get(LoginPage.LOGIN_BUTTON).click();

        // Verificar que uno de estos dos mensajes aparezca
        cy.get('body').should(($body) => {
            const text = $body.text();
            const hasFirstMessage = text.includes('Warning: No match for E-Mail Address and/or Password.');
            const hasSecondMessage = text.includes('Warning: Your account has exceeded allowed number of login attempts.');
            expect(hasFirstMessage || hasSecondMessage).to.be.true;
        });
   });

})  