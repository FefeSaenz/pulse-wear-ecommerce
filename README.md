# PULSE WEAR - Street Essentials Ecommerce

Ecommerce de indumentaria urbana con enfoque en diseño minimalista y alto rendimiento. Construido con una arquitectura de componentes atómicos y gestión de estado global para máxima escalabilidad.

## 🚀 Tecnologías
- **React 19** (TypeScript)
- **React Router 7** (Navegación SPA)
- **Context API** (State Management de Carrito y Configuración Global)
- **Tailwind CSS v4** (Styling)
- **Axios 1.13** (HTTP Client centralizado con interfaces de TypeScript)
- **Vite 6** (Build Tool)
- **Lucide / FontAwesome** (Icons)

## 🏗️ Arquitectura
El proyecto sigue una estructura modular y reactiva para facilitar su mantenimiento como plantilla base:
- `types/`: Definición de interfaces para el contrato de la API (MenuItem, Banner, FrontConfig).
- `constants/`: Datos estáticos y configuraciones de negocio (MOCK_PRODUCTS, thresholds de envío).
- `api/`: Configuración de Axios para consumo de datos asíncronos.
- `styles/`: Sistema de diseño centralizado en globals.css (Tailwind v4 Layering).
- `pages/`: Vistas principales (Home, Productos) que orquestan los componentes.
- `context/`: Gestión de estado global (Carrito, Órdenes y datos de API).
- `components/`: Componentes organizados por responsabilidad (Layout, UI, Cart).


## ✅ Logros y Avances
- [x] **Navegación Robusta:** Implementación de React Router con configuración de `basename` para despliegues.
- [x] **Estado Global:** Migración exitosa a Context API para desacoplar la lógica del carrito de la UI.
- [x] **Conexión API:** Integración de Axios para consumo de datos dinámicos de backend.
- [x] **Refactorización Semántica:** Evolución de componentes (NavLink) para soportar navegación multinivel (Submenús) e iconos dinámicos.
- [x] **UX Improvements:** Sincronización reactiva de modales y flujos de usuario (QuickView & Cart). Pulido estético del Header con efectos de desenfoque y sombras integradas para una navegación fluida.
- [x] **Hero Dinámico (Carousel):** Implementación de un slider de alto impacto que consume el array de `banners` de la API.
- [x] **Experiencia de Usuario Pro:** Soporte nativo para navegación por teclado (flechas), gestos táctiles (*swipes*) en dispositivos móviles e indicadores lineales interactivos.
- [x] **Optimización de Renderizado:** Uso de `useCallback` y limpieza de efectos (`clearInterval`) para un rendimiento óptimo y sin fugas de memoria.
- [x] **Arquitectura v4:** Migración completa a Tailwind CSS v4 con integración nativa en Vite para compilación instantánea.
- [x] **Refactorización Senior:** Reorganización del árbol de archivos eliminando ruido en la raíz y centralizando la lógica en /src.
- [x] **Tipado Estricto**: Implementación de interfaces de TypeScript para todo el catálogo de productos y flujos de órdenes.

## 🛠️ Próximos Pasos
- [ ] **Mapeo Dinámico:** Reemplazar `MOCK_PRODUCTS` por el feed de la API de Pulso Wear.
- [ ] **Landing de Categorías:** Desarrollo de rutas dinámicas basadas en los Slugs de la API.
- [ ] **Filtros Avanzados:** Lógica de filtrado dinámico basada en categorías de la base de datos.
- [ ] **Checkout integration:** Finalización del flujo de pago y validación de órdenes.