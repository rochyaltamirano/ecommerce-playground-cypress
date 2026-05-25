import * as LoginPage from '../../support/selectores/login-page';
describe('Login de usuarios', () => {
   it ('Login exitoso con usuario registrado', () => {
        const email = 'rociotest@yopmail.com';
        const password = 'password123';
        cy.login(email, password);
   });

   it('Login con email no registrado/formato de email inválido', () => {
        const email = 'rociotest1234@lala.com';
        const password = 'password123';
        cy.login(email, password);
   });

   it('Login con password incorrecta', () => {
        const email = 'rociotest@yopmail.com';
        const password = 'wrongpassword';
        cy.login(email, password);

        // Verificar que uno de estos dos mensajes aparezca
        cy.get('body').should(($body) => {
            const text = $body.text();
            const hasFirstMessage = text.includes('Warning: No match for E-Mail Address and/or Password.');
            const hasSecondMessage = text.includes('Warning: Your account has exceeded allowed number of login attempts.');
            expect(hasFirstMessage || hasSecondMessage).to.be.true;
        });
   });

   it('Logout', () => {
     const email = 'ralta@yopmail.com';
     const password = '1q2w3e4r5t';
     cy.login(email, password);

     cy.get(LoginPage.ITEM_LIST).contains('Logout').click();
     // esperar a que el logout haya completado
     cy.contains('Account Logout').should('be.visible');
   });
});  