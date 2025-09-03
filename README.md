# Arknica Core: Plantilla de Aplicación Web Acelerada

**Arknica Core** es una plantilla de nivel de producción para Next.js, diseñada para acelerar el desarrollo de aplicaciones web modernas, seguras y escalables. Provee una base sólida con las mejores prácticas de la industria, permitiendo a los desarrolladores enfocarse en la lógica de negocio en lugar de la configuración inicial.

-----

## Características Principales

Esta plantilla viene pre-configurada con todo lo necesario para construir una aplicación robusta desde el día uno:

  * **🚀 Framework Moderno:** Construido sobre **Next.js 14+** con el **App Router**.
  * **🔒 Autenticación Segura:** Gestión de sesiones del lado del servidor con **Supabase Auth** y protección de rutas a través de `middleware`.
  * **🎨 Sistema de Diseño Integrado:** Componentes de UI reutilizables construidos con **Tailwind CSS**, **Radix UI** para accesibilidad, y `cva` para variantes.
  * **🌍 Internacionalización (i18n):** Soporte bilingüe (español/inglés) desde el inicio con `next-intl`.
  * **⚙️ Backend como Servicio (BaaS):** Integración completa con **Supabase** para base de datos (PostgreSQL), autenticación, y almacenamiento.
  * **📝 Formularios de Alto Rendimiento:** Gestión de formularios optimizada con `react-hook-form`.
  * **📦 Estructura de Proyecto Lógica:** Organización de archivos y carpetas pensada para la escalabilidad y mantenibilidad.

-----

## Stack Tecnológico

| Categoría | Herramienta |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Backend (BaaS)**| Supabase |
| **Estilos** | Tailwind CSS |
| **UI Primitives**| Radix UI |
| **Formularios** | `react-hook-form` |
| **i18n** | `next-intl` |
| **Iconos** | `lucide-react` |
| **Despliegue** | Vercel |

-----

## Cómo Empezar

Para poner en marcha una copia local de este proyecto, sigue estos pasos.

### Prerrequisitos

  * **Node.js** (versión 18 o superior)
  * **npm** o un gestor de paquetes compatible
  * Una cuenta de **Supabase** para obtener las claves de API

### Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone [URL_DEL_REPOSITORIO] nombre-del-proyecto
    cd nombre-del-proyecto
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar las variables de entorno:**

      * Crea una copia del archivo de ejemplo `.env.example` y renómbrala a `.env.local`.
        ```bash
        cp .env.example .env.local
        ```
      * Abre el archivo `.env.local` y añade tus credenciales de Supabase. Puedes encontrarlas en tu panel de Supabase en `Settings > API`.
        ```env
        NEXT_PUBLIC_SUPABASE_URL="TU_URL_DE_SUPABASE"
        NEXT_PUBLIC_SUPABASE_ANON_KEY="TU_ANON_KEY_DE_SUPABASE"
        ```

4.  **Ejecutar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

5.  **Abrir la aplicación:**
    Abre [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) en tu navegador para ver el resultado.

-----

## Estructura del Proyecto

La estructura de carpetas está diseñada para ser intuitiva y escalable:

```
src/
├── app/                  # Rutas y páginas (App Router)
├── components/           # Componentes React reutilizables
│   ├── ui/               # Componentes atómicos de UI (Button, Input)
│   └── modules/          # Componentes más complejos (moléculas)
├── lib/                  # Funciones de utilidad y helpers
└── hooks/                # Hooks de React personalizados
```

-----

## Licencia

Este proyecto es de propiedad privada y está destinado a ser utilizado como base para los proyectos de la startup Arknica.