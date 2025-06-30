# Sistema de Gestión de Inventario - Frontend

Aplicación web desarrollada en Vue.js para la gestión integral de inventarios, productos, lotes y alertas de stock. Incluye sistema de autenticación, gestión de usuarios y funcionalidades avanzadas de control de inventario.

## Descripción

Este frontend proporciona una interfaz moderna y responsiva para gestionar todos los aspectos de un sistema de inventario empresarial, incluyendo:

- Gestión de productos y lotes
- Control de stock y alertas
- Historial de movimientos
- Sistema de autenticación y perfiles de usuario
- Gestión de kits de productos
- Dashboard principal con métricas

## Requisitos previos

- Node.js (v16 o superior)
- npm (v8 o superior)
- Servidor backend ejecutándose (ver carpeta `/server`)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno (si es necesario):
   - Edita `api.config.js` para configurar la URL del backend

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Funcionalidades principales

### 🔐 Autenticación y Usuarios
- **Login/Registro**: Sistema completo de autenticación
- **Perfiles de usuario**: Gestión de información personal
- **Selección de planes**: Diferentes niveles de servicio

### 📦 Gestión de Productos
- **Agregar productos**: Formularios completos para nuevos productos
- **Lista de productos**: Vista organizada con filtros y búsqueda
- **Edición y eliminación**: Operaciones CRUD completas

### 📋 Gestión de Inventario
- **Control de lotes**: Seguimiento de lotes por producto
- **Stock en tiempo real**: Monitoreo de cantidades disponibles
- **Comentarios en lotes**: Sistema de notas y observaciones

### ⚠️ Alertas de Stock
- **Notificaciones**: Alertas cuando el stock es bajo
- **Configuración**: Personalización de umbrales de alerta
- **Dashboard de alertas**: Vista centralizada de todas las alertas

### 📊 Historial y Reportes
- **Historial de movimientos**: Registro completo de transacciones
- **Reportes de stock**: Análisis de tendencias y métricas
- **Exportación de datos**: Funcionalidad para exportar reportes

### 🧩 Kits de Productos
- **Creación de kits**: Agrupación de productos relacionados
- **Gestión de kits**: Administración completa de paquetes

### 🌐 Internacionalización
- **Múltiples idiomas**: Soporte para español e inglés
- **Configuración i18n**: Sistema de localización completo

## Estructura del proyecto

```
src/
├── app/                    # Módulos de la aplicación
│   ├── add-products/      # Gestión de productos
│   ├── history/          # Historial y reportes
│   ├── iam/              # Autenticación y usuarios
│   ├── inventory/        # Control de inventario
│   ├── kit-products/     # Gestión de kits
│   ├── product-management/ # Dashboard principal
│   ├── shared/           # Componentes compartidos
│   └── stock-alert/      # Sistema de alertas
├── assets/               # Recursos estáticos
├── router/               # Configuración de rutas
├── stores/               # Estado global (Pinia)
├── style/                # Estilos globales
└── locals/               # Archivos de internacionalización
```

## Tecnologías utilizadas

- **Vue.js 3**: Framework principal
- **Vite**: Herramienta de construcción
- **Pinia**: Gestión de estado
- **Vue Router**: Enrutamiento
- **Axios**: Cliente HTTP
- **i18n**: Internacionalización

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
