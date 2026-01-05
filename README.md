# Backend ECD - Portafolio de Servicios

Este es el backend oficial para el Portafolio de Servicios ECD. Está construido con **Node.js**, **Express** y **PostgreSQL** para manejar la recepción y administración de mensajes de contacto.

## 🚀 Requisitos Previos

- **Node.js** (v18 o superior recomendado)
- **PostgreSQL** (base de datos relacional)

## 🛠️ Configuración Inicial

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar Variables de Entorno:**
   Crea un archivo `.env` en la raíz (basado en el ejemplo provisto) con tus credenciales:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=portafolio_ecd
   DB_USER=postgres
   DB_PASSWORD=tu_password
   NODE_ENV=development
   ```

3. **Base de Datos:**
   Asegúrate de tener PostgreSQL corriendo. El servidor intentará crear la tabla `messages` automáticamente al iniciar, pero la base de datos `portafolio_ecd` debe existir previamente.

##  ▶️ Cómo Iniciar y Detener (Día a Día)

### Iniciar el Servidor (Modo Desarrollo)
Este comando usa `nodemon`, por lo que el servidor se reiniciará automáticamente si haces cambios en el código.
```bash
npm run dev
```
*Verás un mensaje indicando que el servidor corre en `http://localhost:5000` y que está conectado a PostgreSQL.*

### Detener el Servidor
En la terminal donde se está ejecutando el proceso, presiona:
`Ctrl + C`

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura **MVC** (Modelo-Vista-Controlador):

- **`server.js`**: Punto de entrada. Inicializa el servidor y la conexión a la BD.
- **`src/app.js`**: Configuración de Express (middlewares, CORS).
- **`src/config/database.js`**: Gestión de la conexión `Pool` a PostgreSQL.
- **`src/models/Message.js`**: Lógica de base de datos (SQL Queries).
- **`src/controllers/messageController.js`**: Lógica de negocio y validaciones.
- **`src/routes/messages.js`**: Definición de endpoints de la API.

## 🔗 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **POST** | `/api/messages` | Crear un nuevo mensaje de contacto |
| **GET** | `/api/messages` | Obtener todos los mensajes (Admin) |
| **PUT** | `/api/messages/:id/read` | Marcar un mensaje como leído |
| **DELETE** | `/api/messages/:id` | Eliminar un mensaje |

## 📝 Historial de Cambios (Log)

- **Creación de Estructura**: Se inicializó el proyecto separando `backend-ecd` del frontend.
- **Base de Datos**: Implementación de `pg` para conectar con PostgreSQL.
- **Endpoints**: Creación del CRUD completo para la entidad `Messages`.
- **Seguridad**: Implementación básica de CORS y variables de entorno con `dotenv`.
