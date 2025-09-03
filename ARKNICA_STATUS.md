# Documento Maestro: Plantilla "Arknica"

**Versión:** 1.0
**Estado:** En Progreso 🏗️
**Misión:** Construir un núcleo de aplicación autenticada (Authenticated App Core), robusto, escalable y seguro que sirva como la base para todos los futuros proyectos de la startup. Este documento es la guía para su construcción y replicación.

-----

## 1\. Filosofía y Principios de Arquitectura

Todo el código y las decisiones técnicas dentro de esta plantilla se rigen por los siguientes principios:

  * **Reusabilidad Primero:** Cada componente y lógica se construye pensando en su uso en múltiples contextos y proyectos futuros.
  * **Seguridad por Diseño:** La seguridad no es una capa adicional, es la base. Se implementa desde el `middleware` y a nivel de base de datos (RLS) desde el inicio.
  * **Código Limpio y Consistente:** Nos adherimos a estándares estrictos de nomenclatura y estructura para que cualquier desarrollador pueda entender y mantener el código fácilmente.
  * **Rendimiento Optimizado:** Se priorizan las técnicas de renderizado de Next.js (SSR, SSG) y las prácticas de código eficientes para garantizar una experiencia de usuario fluida.
  * **Documentación como Parte del Proceso:** Este documento es un artefacto vivo. Cada decisión de arquitectura se registra y justifica aquí.

-----

## 2\. Stack Tecnológico (La "Gema")

La selección de cada herramienta está justificada para cumplir con nuestros principios. Esta es nuestra pila tecnológica no negociable para la plantilla.

| Categoría | Herramienta | Justificación |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Renderizado híbrido (SSR/SSG), optimizaciones automáticas y un ecosistema robusto. El estándar de facto para aplicaciones React de producción. |
| **Backend (BaaS)** | Supabase | Solución integral que nos provee Base de Datos (PostgreSQL), Autenticación, Almacenamiento y Funciones Serverless, todo bajo una API unificada. |
| **Lenguaje** | JavaScript (ES6+) | Flexibilidad y rapidez en el desarrollo. Se considera TypeScript para proyectos cliente complejos que se construyan sobre esta plantilla. |
| **Estilos** | Tailwind CSS | Framework "Utility-First" que permite construir diseños complejos y consistentes directamente en el HTML, sin salir del contexto. |
| **UI Primitives** | Radix UI | Componentes "headless" que nos dan toda la funcionalidad y accesibilidad (WAI-ARIA) sin imponer estilos, permitiéndonos construir nuestro propio diseño sobre ellos. |
| **Utilitarios UI** | `cva`, `clsx`, `tailwind-merge`| La combinación perfecta para crear componentes de UI reutilizables, componibles y con variantes, siguiendo las mejores prácticas de la industria. |
| **Internacionalización** | `next-intl` | La librería estándar para i18n en el App Router, diseñada para una integración perfecta con el `middleware` y las Server Actions/Components. |
| **Formularios** | `react-hook-form` | Optimiza el rendimiento de los formularios controlando los re-renders y simplifica la validación y el manejo de estados. |
| **Iconos** | `lucide-react` | Librería de iconos ligera, consistente y altamente personalizable. |
| **Despliegue** | Vercel | Plataforma optimizada para Next.js, con despliegue continuo (CI/CD) integrado, funciones serverless y escalabilidad global. |

-----

## 3\. Estándares y Convenciones (Alineamientos)

Para mantener la consistencia y la calidad del código, se establecen las siguientes reglas:

### Nomenclatura

  * **Componentes:** `PascalCase` (ej. `Button.jsx`, `UserProfile.jsx`).
  * **Archivos (no componentes):** `kebab-case` (ej. `db-client.js`, `auth-helpers.js`).
  * **Variables y Funciones:** `camelCase` (ej. `const userName`, `function getUserProfile()`).
  * **Variables de Entorno:** `SCREAMING_SNAKE_CASE` (ej. `NEXT_PUBLIC_SUPABASE_URL`).

### Estructura de Carpetas (`src`)

```
src/
├── app/                  # Rutas, páginas y layouts (App Router)
│   └── [locale]/         # Segmento dinámico para i18n
│       ├── (private)/    # Grupo de rutas para el dashboard (protegido)
│       └── (public)/     # Grupo de rutas para la web pública
├── components/           # Componentes React reutilizables
│   ├── ui/               # Átomos de UI (Button, Input, Card...)
│   ├── icons/            # Componentes de iconos personalizados
│   └── modules/          # Moléculas/Organismos (ej. UserProfileCard)
├── lib/                  # Funciones de utilidad, helpers, cliente de Supabase
├── hooks/                # Hooks de React personalizados (ej. useUser)
└── styles/               # Archivos CSS globales si son necesarios
```

### Principios de Componentes

1.  **Atomic Design:** Se sigue una filosofía de Atomic Design.
      * **Átomos (`/ui`):** Componentes base indivisibles (`Button`, `Input`, `Label`).
      * **Moléculas (`/modules`):** Combinaciones de átomos que forman una unidad funcional (ej. un campo de búsqueda con un `Input` y un `Button`).
      * **Organismos (dentro de las páginas):** Secciones completas de la UI compuestas por moléculas (ej. el `Navbar`, el `Footer`).
2.  **Variantes con CVA:** Todos los componentes atómicos en `/ui` que tengan variantes visuales (color, tamaño) **deben** usar `class-variance-authority` (cva).
3.  **Props para Datos:** Los componentes no deben obtener datos por sí mismos. Deben recibir datos a través de `props` para maximizar su reusabilidad.

-----

## 4\. Plan de Construcción - FASE 1: Creación de la Plantilla

Este es el checklist de tareas para completar el templete.

### Sub-Fase 1.0: Cimentación (Setup)

  * [✅] Inicializar proyecto Next.js con App Router y Tailwind CSS.
  * [✅] Instalar todas las dependencias de la "Gema".
  * [✅] Configurar variables de entorno (`.env.local`).
  * [✅] Configurar internacionalización (`i18n.js`, `messages/`).
  * [✅] Implementar `middleware` base para i18n y autenticación de Supabase.

### Sub-Fase 1.1: Sistema de Diseño (UI Kit - Átomos) 🎨

  * [✅] `Button` (Botón) - ✅ **En progreso**
  * [ ] `Input` (Campo de texto)
  * [ ] `Label` (Etiqueta para formularios)
  * [ ] `Card` (Tarjeta contenedora)
  * [ ] `Select` (Menú desplegable)
  * [ ] `Dialog` (Ventana modal)
  * [ ] `Badge` (Insignia)
  * [ ] `Avatar` (Imagen de perfil)
  * [ ] `Table` (Tabla de datos base)
  * [ ] `Textarea` (Área de texto)

### Sub-Fase 1.2: Fachada Pública

  * [ ] Maquetar Layout Público (Navbar y Footer).
  * [ ] Construir componentes para la Landing Page (Hero, Features, CTA).
  * [ ] Ensamblar la Landing Page.
  * [ ] Crear página de ejemplo `Servicios`.
  * [ ] Implementar Selector de Idioma funcional en el Navbar.

### Sub-Fase 1.3: Flujo de Acceso

  * [ ] Maquetar la página de `Login`.
  * [ ] Maquetar la página de `Captura de Leads`.

### Sub-Fase 1.4: Núcleo Privado (App Shell)

  * [ ] Maquetar Layout Privado (Sidebar y Header).
  * [ ] Crear la página de bienvenida del `Dashboard`.

### Sub-Fase 1.5: Conexión y Lógica (Backend) 🔐

  * [ ] Implementar la lógica de inicio de sesión con Supabase Auth.
  * [ ] Implementar la lógica de cierre de sesión.
  * [ ] Conectar el formulario de Leads a una tabla en Supabase.
  * [ ] Asegurar las rutas del Núcleo Privado a través del `middleware`.

-----

## 5\. Modelo de Datos Inicial (Supabase)

Se define la estructura inicial de las tablas requeridas por la plantilla.

### Tabla: `leads`

  * **Propósito:** Almacenar los prospectos capturados desde el formulario público.
  * **Columnas:**
      * `id` (uuid, primary key)
      * `created_at` (timestamp with time zone)
      * `name` (text)
      * `email` (text, not null)
      * `message` (text, optional)
      * `source` (text, optional, ej: 'social-media-form')
  * **Seguridad (RLS):** Deshabilitada. Esta tabla debe ser públicamente escribible para que cualquiera pueda enviar el formulario.