# Ecommerce Playground Cypress

Este proyecto contiene pruebas end-to-end para una tienda de ejemplo usando Cypress.

## Descripción general

El repositorio incluye escenarios de prueba para:

- Login y registro (`cypress/e2e/auth/`)
- Favoritos (`cypress/e2e/favorites/`)
- Carrito de compras (`cypress/e2e/cart/`)

Las pruebas interactúan con la interfaz de la aplicación en `https://ecommerce-playground.lambdatest.io` y validan comportamientos como agregar a favoritos, eliminar favoritos y agregar productos al carrito.

## Prerrequisitos

Antes de ejecutar el proyecto necesitas:

- Node.js 18+ instalado
- npm o yarn disponible
- Navegador Chrome o Chromium para ejecutar Cypress en modo GUI
- Acceso a internet para la aplicación de prueba

## Instalación de Cypress

Si aún no tienes `package.json`, crea uno en la raíz del proyecto:

```bash
cd /Users/rocioaltamirano/Documents/ecommerce-playground-cypress
npm init -y
```

Luego instala Cypress como dependencia de desarrollo:

```bash
npm install cypress --save-dev
```

Si prefieres `yarn`:

```bash
yarn add cypress --dev
```

## Configuración

Este proyecto ya incluye la configuración básica de Cypress en `cypress.config.js`.

Asegúrate de que las rutas de los tests sean válidas y que el proyecto web de prueba esté accesible desde tu red.

## Cómo correr el proyecto

### Abrir Cypress Studio / GUI

```bash
npx cypress open
```

### Ejecutar un spec específico

```bash
npx cypress run --spec "cypress/e2e/favorites/favorites.cy.js"
```

### Ejecutar todos los tests

```bash
npx cypress run
```

## Estructura del proyecto

- `cypress/e2e/` - especificaciones de prueba
- `cypress/support/` - comandos y utilidades de Cypress
- `cypress.config.js` - configuración principal de Cypress

## Buenas prácticas

- Usa selectores estables, preferiblemente `data-*` o IDs específicos
- Evita seleccionar elementos por texto dinámico cuando sea posible
- Prefiere `cy.contains()` solo para validaciones de texto visibles
- Usa `cy.wait()` con cuidado; prefiere validar elementos y estados
