# PULSE WEAR - Street Essentials Ecommerce

Ecommerce de indumentaria urbana con enfoque en diseño minimalista y alto rendimiento. Construido con una arquitectura de componentes atómicos y gestión de estado global para máxima escalabilidad.

## 🚀 Tecnologías
- **React 18** (TypeScript)
- **React Router 6** (Navegación SPA)
- **Context API** (State Management)
- **Tailwind CSS** (Styling)
- **Axios** (HTTP Client con variables de entorno)
- **Vite** (Build Tool)
- **Lucide / FontAwesome** (Icons)

## 🏗️ Arquitectura
El proyecto sigue una estructura modular y reactiva para facilitar su mantenimiento como plantilla base:
- `pages/`: Vistas principales (Home, Productos) que orquestan los componentes.
- `context/`: Gestión de estado global (Carrito, Órdenes y datos de API).
- `components/ui`: Átomos y componentes de interfaz pura (Modales, Buttons).
- `components/layout`: Secciones estructurales y organismos (Header, Grid, Footer).
- `components/cart`: Lógica y componentes específicos del sistema de ventas.



## ✅ Logros y Avances
- [x] **Navegación Robusta:** Implementación de React Router con configuración de `basename` para despliegues.
- [x] **Estado Global:** Migración exitosa a Context API para desacoplar la lógica del carrito de la UI.
- [x] **Conexión API:** Integración de Axios para consumo de datos dinámicos de backend.
- [x] **UX Improvements:** Sincronización reactiva de modales y flujos de usuario (QuickView & Cart).

## 🛠️ Próximos Pasos
- [ ] **Mapeo Dinámico:** Reemplazar `MOCK_PRODUCTS` por el feed de la API de Pulso Wear.
- [ ] **Filtros Avanzados:** Lógica de filtrado dinámico basada en categorías de la base de datos.
- [ ] **Checkout integration:** Finalización del flujo de pago y validación de órdenes.