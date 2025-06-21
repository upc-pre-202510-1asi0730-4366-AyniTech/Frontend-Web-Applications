# 🚀 Servidor MockAPI

Este servidor proporciona una API mock completa para el sistema de gestión de productos, similar al sistema de autenticación existente.

## 📁 Estructura de Archivos

```
server/
├── server.js          # Servidor principal con handlers personalizados
├── handlers.js        # Lógica de negocio para auth y productos
├── db.json           # Base de datos mock
├── routes.json       # Configuración de rutas
└── README.md         # Este archivo
```

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Copiar archivo de configuración:
```bash
cp env.example .env
```

## 🚀 Ejecutar el Servidor

### Opción 1: Servidor Personalizado (Recomendado)
```bash
npm run mockapi
```

### Opción 2: JSON Server Básico
```bash
npm run fake-api
```

## 📊 Endpoints Disponibles

### 🔐 Autenticación
- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario

### 📦 Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto
- `GET /api/products/filter` - Filtrar productos

### 📋 JSON Server
- `GET /` - Interfaz web de JSON Server
- `GET /users` - Lista de usuarios
- `GET /products` - Lista de productos

## 🔧 Configuración

### Variables de Entorno (.env)
```env
VITE_USE_MOCK_API=true
VITE_API_BASE_URL=http://localhost:3000
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=5000
VITE_API_MOCK=true
PORT=3000
```

## 📝 Ejemplos de Uso

### Crear Producto
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nueva Galleta",
    "category": "Golosina",
    "quantity": 25,
    "buyPrice": 0.60,
    "sellPrice": 1.20,
    "batch": "LOTE004",
    "expiryDate": "2025-03-15",
    "notes": "Galleta nueva",
    "tags": ["Dulce", "Nuevo"]
  }'
```

### Filtrar Productos
```bash
curl "http://localhost:3000/api/products/filter?category=Golosina&tags=Dulce&minStock=10"
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "example@mail.com",
    "password": "password123"
  }'
```

## 🎯 Características

- ✅ **Handlers Personalizados**: Lógica de negocio en JavaScript
- ✅ **Validaciones**: Manejo de errores y validaciones
- ✅ **Filtros Avanzados**: Filtrado por múltiples criterios
- ✅ **Persistencia**: Datos guardados en db.json
- ✅ **Compatibilidad**: Funciona con el frontend existente
- ✅ **Interfaz Web**: JSON Server UI para explorar datos

## 🔄 Flujo de Datos

1. **Frontend** → **Servidor MockAPI** → **Handlers** → **db.json**
2. Los handlers procesan la lógica de negocio
3. Los datos se persisten en db.json
4. Respuesta JSON al frontend

## 🐛 Debugging

- Revisar logs del servidor en la consola
- Usar la interfaz web de JSON Server: http://localhost:3000
- Verificar archivo db.json para datos actuales
- Revisar handlers.js para lógica de negocio

## 📞 Soporte

El servidor está configurado para funcionar automáticamente con el frontend cuando `VITE_USE_MOCK_API=true` en el archivo .env. 