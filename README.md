# Prueba Técnica - CRUD de Productos

Este proyecto es una aplicación de Next.js para realizar un CRUD de productos

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [PostgreSQL](https://www.postgresql.org/download/)

## Configuración del Proyecto

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/pgap22/prueba-tecnica
   cd prueba-tecnica
   ```
2.  **Instalar las Dependencias:**
Asegúrate de estar en la carpeta del proyecto y ejecuta:
	```bash
	npm install
	# o
	yarn install
	```
3. **Configurar Prisma y la BD:** Crea un archivo `.env` en la raíz del proyecto y añade la URL de tu base de datos:

	```plaintext
	DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"	
	```
	Luego, inicializa la Base de Datos
	```bash
	npx prisma migrate deploy
	```
	Luego ejecuta el siguiente script para rellenar la bd con algunas categorias
	```bash
	npm run seed

## Ejecución de la aplicación

### Modo de desarrollo

Para iniciar la aplicación en modo de desarrollo, usa:

bash

Copiar código

`npm run dev` 

Esto levantará un servidor en `http://localhost:3000` donde puedes ver y desarrollar la aplicación.

### Construcción para producción

Para construir la aplicación para producción, ejecuta:

bash

Copiar código

`npm run build` 

Esto generará una carpeta `.next` con todos los archivos optimizados para producción.

### Ejecución en producción

Después de construir la aplicación, puedes iniciarla en modo de producción usando:

bash

Copiar código

`npm start` 

La aplicación estará disponible en `http://localhost:3000`.


## Estructura del Proyecto
- **`/actions`**: Contiene los server actions para interactuar acciones del servidor con la UI.
- **`/app`**: Contiene las páginas de la aplicación y el enrutamiento.
- **`/components`**: Contiene los componentes reutilizables de la UI.
- **`/config`**: Contiene archivos de configuración (por el momento solo la inicialización del cliente de Prisma).
- **`/helpers`**: Archivos varios de ayuda.
- **`/lib`**: Contiene los servicios para interactuar con Prisma.
- **`/prisma`**: Contiene el esquema de Prisma (`schema.prisma`) y el archivo `seed.ts` para poblar la base de datos.
- **`/public`**: Almacena archivos estáticos que se sirven directamente, como imágenes y fuentes.
- **`/schema`**: Contiene el esquema para las validaciones
- **`/types`**: Define tipos personalizados y interfaces TypeScript que se utilizan en toda la aplicación.


## Scripts disponibles

-   **`npm run dev`**: Inicia la aplicación en modo desarrollo.
-   **`npm run build`**: Construye la aplicación para producción.
-   **`npm run start`**: Inicia la aplicación en modo producción.
-   **`npm run seed`**: Población inicial de la base de datos.
-   **`npm run lint`**: Linter para revisar y corregir problemas en el código.

## Tecnologías usadas

-   **Next.js**: Framework de React para aplicaciones web.
-   **Prisma**: ORM para manejar la base de datos.
-   **TypeScript**: Lenguaje de programación para garantizar la tipificación estática.
-   **React Hook Form**: Librería para manejar formularios en React.
-   **Zod**: Librería para validación de datos.
-   **TailwindCSS**: Framework de CSS para estilos rápidos y consistentes.