# 🚀 Botón de Pago Web - Servidor

Servidor intermediario para pagos Visa/Niubiz construido con Node.js, Express y ES Modules.

## 📁 Estructura del Proyecto

```
boton_pago_web_server/
├── src/
│   ├── controllers/         # Controladores de Express
│   │   ├── auth_controller.js
│   │   ├── payment_controller.js
│   │   └── index.js        # Barrel export
│   ├── services/           # Lógica de negocio
│   │   ├── visa_service.js
│   │   ├── payment_service.js
│   │   └── index.js        # Barrel export
│   ├── routes/             # Definición de rutas
│   │   ├── auth_routes.js
│   │   ├── payment_routes.js
│   │   └── index.js        # Barrel export
│   ├── types/              # Definiciones de tipos JSDoc
│   │   └── index.js
│   ├── utils/              # Utilidades
│   │   └── index.js
│   └── app.js             # Configuración de Express
├── config/
│   └── index.js           # Configuración de Visa
├── server.js              # Punto de entrada
├── package.json
└── README.md
```

## 🛠️ Tecnologías

- **Node.js** con **ES Modules**
- **Express.js** para el servidor HTTP
- **Axios** para peticiones HTTP
- **CORS** para manejo de CORS
- **JSDoc** para documentación de tipos

## 📋 Características

- ✅ **Arquitectura modular** con separación de responsabilidades
- ✅ **ES Modules** en lugar de CommonJS
- ✅ **Estructura snake_case** para archivos y carpetas
- ✅ **Archivos barril** para exportaciones limpias
- ✅ **Documentación JSDoc** para tipos
- ✅ **Manejo de errores** centralizado
- ✅ **Validación de datos** robusta

## 🚀 Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

## 📡 Endpoints

### Autenticación

#### `GET /token`

Genera un token de acceso para las APIs de Visa.

**Respuesta:**

```
Token string
```

#### `POST /token/session`

Genera una sesión de pago.

**Body:**

```json
{
  "token": "string",
  "amount": "number",
  "purchaseNumber": "string (opcional)"
}
```

**Respuesta:**

```json
{
  "sessionKey": "string",
  "purchaseNumber": "string|null"
}
```

### Pagos

#### `POST /visa-callback`

Recibe el callback de Niubiz, procesa el pago y redirige al frontend.

**Query Parameters:**

- `amount`: Monto de la transacción
- `purchaseNumber`: Número de compra

**Body:**

```json
{
  "transactionToken": "string"
}
```

**Respuesta:**
Redirección 302 a `http://localhost:5173/finalizar?purchaseNumber={purchaseNumber}`

#### `GET /payment-result/:purchaseNumber`

Obtiene el resultado de un pago procesado.

**Parámetros:**

- `purchaseNumber`: Número de compra

**Respuesta:**

```json
{
  "success": "boolean",
  "message": "string",
  "purchaseNumber": "string",
  "transactionDate": "string",
  "card": "string (opcional)",
  "brand": "string (opcional)",
  "amount": "number",
  "currency": "string",
  "rawData": "object (opcional)"
}
```

## 🔧 Configuración

El archivo `config/index.js` contiene toda la configuración de Visa/Niubiz:

- **URLs de desarrollo y producción**
- **Credenciales de comercio**
- **Configuración de ambiente**

Para cambiar entre desarrollo y producción, modifica la variable `VISA_DEVELOPMENT` en el archivo de configuración.

## 📚 Arquitectura

### Servicios

- **`visa_service.js`**: Operaciones con APIs de Visa (tokens, sesiones, autorizaciones)
- **`payment_service.js`**: Lógica de procesamiento de pagos y almacenamiento

### Controladores

- **`auth_controller.js`**: Manejo de tokens y sesiones
- **`payment_controller.js`**: Procesamiento de callbacks y consulta de resultados

### Rutas

- **`auth_routes.js`**: Endpoints de autenticación
- **`payment_routes.js`**: Endpoints de pagos

### Utilidades

- Obtención de IP del cliente
- Codificación de credenciales
- Creación de headers HTTP
- Manejo de errores
- Validación de campos requeridos

## 🔍 Flujo de Pago

1. **Frontend** solicita token → `GET /token`
2. **Frontend** crea sesión → `POST /token/session`
3. **Usuario** completa pago en Visa
4. **Visa** envía callback → `POST /visa-callback`
5. **Backend** procesa pago y guarda resultado
6. **Backend** redirige al frontend
7. **Frontend** consulta resultado → `GET /payment-result/:purchaseNumber`

## 🐛 Manejo de Errores

El servidor incluye:

- **Middleware de errores** centralizado
- **Validación de datos** en todos los endpoints
- **Logging** detallado para debugging
- **Respuestas de error** consistentes

## 🔒 Seguridad

- **Validación** de datos de entrada
- **Manejo seguro** de credenciales
- **CORS** configurado correctamente
- **Headers** de seguridad apropiados

## 📝 Tipos

El proyecto utiliza JSDoc para documentar tipos:

- `PaymentData`: Datos de entrada del pago
- `PaymentResult`: Resultado del procesamiento
- `VisaAuthorizationRequest/Response`: Estructuras de Visa
- `SessionData/Response`: Datos de sesión

## 🏗️ Desarrollo

Para agregar nuevas funcionalidades:

1. **Servicios**: Añadir lógica en `src/services/`
2. **Controladores**: Crear controladores en `src/controllers/`
3. **Rutas**: Definir endpoints en `src/routes/`
4. **Tipos**: Documentar en `src/types/index.js`
5. **Exports**: Actualizar archivos barril (`index.js`)

## 📄 Licencia

ISC
