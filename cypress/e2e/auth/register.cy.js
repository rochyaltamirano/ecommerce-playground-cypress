import * as RegisterPage from '../../support/selectores/register-page';
const { faker } = require('@faker-js/faker');

describe('Registro de usuario', () => {
  beforeEach(() => {
    cy.visit('/index.php?route=account/register');

  });

   it('Registro de usuario exitoso usando faker', () => {
    const password = faker.internet.password();

    cy.get(RegisterPage.FIRSTNAME).type(faker.person.firstName());
    cy.get(RegisterPage.LASTNAME).type(faker.person.lastName());
    cy.get(RegisterPage.EMAIL).type(faker.internet.email());
    cy.get(RegisterPage.TELEPHONE).type(faker.phone.number('1122223333'));
    cy.get(RegisterPage.PASSWORD).type(password);
    cy.get(RegisterPage.CONFIRM_PASSWORD).type(password);
    cy.get(RegisterPage.NEWSLETTER_YES).click();
    cy.get(RegisterPage.TERMS_CHECKBOX).click();

    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    cy.contains('Your Account Has Been Created!').should('be.visible');
   });

   it('Registro de usuario con email ya registrado', () => {
    const password = faker.internet.password();
    
    cy.get(RegisterPage.FIRSTNAME).type(faker.person.firstName());
    cy.get(RegisterPage.LASTNAME).type(faker.person.lastName());
    cy.get(RegisterPage.EMAIL).type("rociotest@yopmail.com");
    cy.get(RegisterPage.TELEPHONE).type(faker.phone.number('1122223333'));
    cy.get(RegisterPage.PASSWORD).type(password);
    cy.get(RegisterPage.CONFIRM_PASSWORD).type(password);
    cy.get(RegisterPage.NEWSLETTER_YES).click();
    cy.get(RegisterPage.TERMS_CHECKBOX).click();
    
    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    // Verificar que el registro falló
    cy.contains('Warning: E-Mail Address is already registered!').should('be.visible');
   });

   it('Registro de usuario sin aceptar términos y condiciones', () => {
    const password = faker.internet.password();

    cy.get(RegisterPage.FIRSTNAME).type(faker.person.firstName());
    cy.get(RegisterPage.LASTNAME).type(faker.person.lastName());
    cy.get(RegisterPage.EMAIL).type(faker.internet.email());
    cy.get(RegisterPage.TELEPHONE).type(faker.phone.number('1122223333'));
    cy.get(RegisterPage.PASSWORD).type(password);
    cy.get(RegisterPage.CONFIRM_PASSWORD).type(password);
    cy.get(RegisterPage.NEWSLETTER_YES).click();
    
    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    // Verificar que el registro falló
    cy.contains('Warning: You must agree to the Privacy Policy!').should('be.visible');
   });

   it('Registro de usuario con campos vacíos', () => {
    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    // Verificar que el registro falló
    cy.get(RegisterPage.TEXT_DANGER).contains('First Name must be between 1 and 32 characters!').should('be.visible');
    cy.get(RegisterPage.TEXT_DANGER).contains('Last Name must be between 1 and 32 characters!').should('be.visible');
    cy.get(RegisterPage.TEXT_DANGER).contains('E-Mail Address does not appear to be valid!').should('be.visible');
    cy.get(RegisterPage.TEXT_DANGER).contains('Telephone must be between 3 and 32 characters!').should('be.visible');
    cy.get(RegisterPage.TEXT_DANGER).contains('Password must be between 4 and 20 characters!').should('be.visible');
   });

  it('Registro de usuario con contraseñas diferentes', () => {
   cy.get(RegisterPage.FIRSTNAME).type(faker.person.firstName());
    cy.get(RegisterPage.LASTNAME).type(faker.person.lastName());
    cy.get(RegisterPage.EMAIL).type(faker.internet.email());
    cy.get(RegisterPage.TELEPHONE).type(faker.phone.number('1122223333'));
    cy.get(RegisterPage.PASSWORD).type(faker.internet.password());
    cy.get(RegisterPage.CONFIRM_PASSWORD).type(faker.internet.password());
    cy.get(RegisterPage.NEWSLETTER_YES).click();
    cy.get(RegisterPage.TERMS_CHECKBOX).click();
    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    cy.get(RegisterPage.TERMS_CHECKBOX).click();
    //Verificar que las contraseñas no coinciden
    cy.get(RegisterPage.TEXT_DANGER).contains('Password confirmation does not match password!').should('be.visible');
  })

   it('Registro de usuario con formato de email inválido', () => {
    const password = faker.internet.password();
    const invalidEmail = 'email@invalido';

    cy.get(RegisterPage.FIRSTNAME).type(faker.person.firstName());
    cy.get(RegisterPage.LASTNAME).type(faker.person.lastName());
    cy.get(RegisterPage.EMAIL).type(invalidEmail);
    cy.get(RegisterPage.TELEPHONE).type(faker.phone.number('1122223333'));
    cy.get(RegisterPage.PASSWORD).type(password);
    cy.get(RegisterPage.CONFIRM_PASSWORD).type(password);
    cy.get(RegisterPage.NEWSLETTER_YES).click();
    cy.get(RegisterPage.TERMS_CHECKBOX).click();
    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    // Verificar que el registro falló
    cy.get(RegisterPage.TEXT_DANGER).contains('E-Mail Address does not appear to be valid!').should('be.visible');
   });

  it('Registro de usuario con email sin @', () => {
    const password = faker.internet.password();
    const invalidEmail = 'emailinvalido';

    cy.get(RegisterPage.FIRSTNAME).type(faker.person.firstName());
    cy.get(RegisterPage.LASTNAME).type(faker.person.lastName());
    cy.get(RegisterPage.EMAIL).type(invalidEmail);
    cy.get(RegisterPage.TELEPHONE).type(faker.phone.number('1122223333'));
    cy.get(RegisterPage.PASSWORD).type(password);
    cy.get(RegisterPage.CONFIRM_PASSWORD).type(password);
    cy.get(RegisterPage.NEWSLETTER_YES).click();
    cy.get(RegisterPage.TERMS_CHECKBOX).click();
    cy.get(RegisterPage.SUBMIT_BUTTON).click();

    // Verificar validación nativa del input de email
    cy.get(RegisterPage.EMAIL)
      .invoke('prop', 'validationMessage')
      .should('contain', '@');
  });
});