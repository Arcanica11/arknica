

## Plan de Acción Refinado: Arknica Web Platform v1.0 (MVP) - Documento Base

````markdown
# Plan de Acción: Arknica Web Platform v1.0 (MVP)

**Versión:** 1.0
**Fecha:** 2025-10-27
**Lead Architect:** Gema-FE
**Director:** Ivan

## 1. Resumen del Proyecto

Construiremos la plataforma web "Arknica", dividida en dos fases priorizadas:

* **Fase 1 (Pública - Prioridad Alta):** Sitio web estático/híbrido (Next.js SSG/ISR), moderno, optimizado para SEO, enfocado en marketing, presentación de servicios y **captura de leads** para emprendedores y PYMEs.
* **Fase 2 (Interna - Prioridad Media):** Dashboard/CRM privado para el equipo Arknica (Next.js App Router). MVP incluye: **Gestión de Clientes (CRM)**, **Gestión de Proyectos**, **Catálogo de Servicios**, **Gestión básica de Secretos** (API Keys, .env) y **Módulo de Contabilidad Fundamental** (ingresos, gastos, suscripciones). Se priorizará la seguridad con **Supabase RLS** y **Next.js Server Actions**.

## 2. Arquitectura Recomendada

* **Framework:** **Next.js 16+** (App Router).
* **Lenguaje:** **TypeScript**.
* **Backend & Base de Datos:** **Supabase**. **Se diseñará un nuevo esquema de base de datos y políticas RLS desde cero**, basado en los requerimientos funcionales de este plan, tomando inspiración del `manual_backedn.md` pero adaptándolo a las necesidades del MVP.
* **Estilado:** **Tailwind CSS** (Utility-first).
* **Componentes UI:** Base personalizada (`ui/` similar a shadcn) + **Mejora Premium** (Aeternity UI, Hyper UI).
* **Internacionalización (i18n):** `next-intl` (ES/EN para parte pública).
* **Formularios:** `react-hook-form`.
* **Animaciones:** `Framer Motion`.
* **Despliegue:** **Vercel**.

## 3. Estrategia de Diseño y UI 🎨

* **Método:** **Método 3: Mejora Premium**.
* **Base:** Componentes `ui/` accesibles y personalizables.
* **Mejoras:** Integración selectiva de Aeternity UI, Hyper UI.
* **Animaciones:** `Framer Motion` para interacciones fluidas/(public)/page.jsx].
* **Identidad Visual:**
    * Logos: Utilizar los proporcionados .
    * Paleta: Basada en logos (azules, grises/negros), definida en `tailwind.config.mjs`, con soporte **modo oscuro**/globals.css, arcanica11/arknica/arknica-ef5888962a7dfe472e742d70e8b8c849103dd69e/tailwind.config.mjs].
    * Tipografía: `Clash Display` (titulares), `Inter` (cuerpo) vía `next/font`/layout.jsx, arcanica11/arknica/arknica-ef5888962a7dfe472e742d70e8b8c849103dd69e/tailwind.config.mjs].
* **Sensación:** Tecnológica, moderna, confiable, sólida, creativa y ágil.

## 4. Estrategia de IA 🤖

* **Formulario Inteligente (Fase 2):** Implementación con **API de Gemini** vía **Server Action** para procesar la entrada del cliente, resumir necesidades y sugerir servicios.

## 5. Estructura de Base (Archivos y Carpetas)

```plaintext
src/
├── app/
│   ├── [locale]/
│   │   ├── (public)/           # Rutas públicas
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx       # Landing
│   │   │   ├── login/
│   │   │   │   └── page.jsx
│   │   │   ├── servicios/
│   │   │   │   └── page.jsx
│   │   │   ├── nosotros/
│   │   │   │   └── page.jsx
│   │   │   └── contacto/
│   │   │       └── page.jsx
│   │   ├── (protected)/        # Rutas protegidas (Dashboard)
│   │   │   ├── layout.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── page.jsx   # Vista general
│   │   │   │   ├── clientes/ # CRUD Clientes
│   │   │   │   ├── proyectos/ # CRUD Proyectos
│   │   │   │   ├── servicios/ # CRUD Servicios (Admin)
│   │   │   │   ├── finanzas/  # CRUD Contabilidad (Admin)
│   │   │   │   ├── secretos/  # CRUD Secretos (Admin)
│   │   │   │   └── equipo/    # Gestión Usuarios (Admin)
│   │   ├── layout.jsx         # Layout Raíz
│   │   └── globals.css
│   ├── api/                   # Opcional, preferir Server Actions
│   └── actions/               # Server Actions
│       ├── auth-actions.js
│       ├── client-actions.js  # CRUD Clientes
│       ├── project-actions.js # CRUD Proyectos
│       └── ...                # Otros módulos
├── components/
│   ├── ui/                    # Atómicos: Button, Input, Card...
│   └── modules/               # Compuestos: LoginForm, DataTable...
├── config/                    # i18n locales, Supabase client config
├── hooks/                     # Custom Hooks
├── lib/                       # Utilidades (cn, Supabase helpers...)
├── services/                  # Lógica de datos reutilizable (alternativa a actions)
├── styles/                    # Estilos adicionales
└── middleware.js              # i18n & Auth routing
````

## 6\. Pasos de Implementación (Revisados)

**Fase 0: Backend Setup (Nuevo)**

1.  **Diseño de Esquema Supabase:** Definir tablas (usuarios, clientes, proyectos, servicios, secretos\_basicos, transacciones, etc.) y relaciones basadas en los requisitos del MVP.
2.  **Implementación RLS:** Escribir y aplicar políticas de Row Level Security en Supabase para `admin` y `miembro`, siguiendo la lógica de acceso definida (especialmente para `servicios`, `secretos`, `finanzas` y `equipo`).

**Fase 1: Sitio Público (ASAP)**

3.  **Setup Frontend:** Confirmar Next.js 16+, TS, Tailwind, `next-intl`.
4.  **Layout Público:** Header y Footer/(public)/layout.jsx, arcanica11/arknica/arknica-ef5888962a7dfe472e742d70e8b8c849103dd69e/src/components/modules/PublicHeader.jsx, arcanica11/arknica/arknica-ef5888962a7dfe472e742d70e8b8c849103dd69e/src/components/modules/PublicFooter.jsx].
5.  **Página Principal:** Implementar secciones (Hero, Servicios, etc.) con componentes premium/(public)/page.jsx].
6.  **Páginas Secundarias:** Crear `/servicios`, `/nosotros`.
7.  **Formulario Contacto:** Implementar `/contacto` con Server Action para captura de lead.
8.  **Responsividad y SEO:** Optimizar para móviles y metadatos.
9.  **Despliegue Vercel (Fase 1):** Publicar sitio web.

**Fase 2: Plataforma Interna**

10. **Autenticación:** Implementar Login UI/(public)/login/page.js] y lógica (`auth-actions.js`) + `middleware.js`.
11. **Layout Protegido:** Crear `(protected)/layout.jsx`.
12. **Módulos CRUD (Clientes, Proyectos, Servicios):** Implementar interfaces y Server Actions correspondientes, respetando RLS.
13. **Módulos Admin (Secretos, Contabilidad, Equipo):** Implementar interfaces y Server Actions, asegurando protección por rol `admin`.
14. **Integración IA (Opcional MVP):** Desarrollar formulario inteligente.
15. **Pruebas y Despliegue Continuo (Fase 2).**

## 7\. Seguimiento y Actualización

  * Este documento (`PLAN_ACCION_ARKNICA.md`) se añadirá a la raíz del repositorio.
  * Se actualizará después de cada ciclo de revisión (**Paso 4**) para reflejar el progreso y los cambios.
  * El análisis del repositorio actual servirá como punto de partida para identificar qué componentes existentes podemos reutilizar o refactorizar.

