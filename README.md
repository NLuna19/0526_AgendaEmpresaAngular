````md
# Agenda Empresarial

Aplicación web desarrollada en **Angular v21** orientada a la gestión de información empresarial mediante una interfaz moderna, intuitiva y escalable.

El sistema permite administrar distintas entidades relacionadas con la organización, consumiendo múltiples endpoints para realizar operaciones CRUD y aplicando un manejo básico de estado para optimizar la actualización y sincronización de datos en la interfaz.

## 🚀 Tecnologías utilizadas

- **Angular v21**
- **TypeScript**
- **PrimeNG** (componentes UI)
- **Tailwind CSS** (estilos complementarios y personalización)
- **RxJS**
- **State Management básico con Signals / manejo reactivo de estado**
- Consumo de APIs REST

---

## 📌 Funcionalidades principales

### Gestión de entidades

La aplicación permite administrar las siguientes entidades:

- **Contacto**
- **Empresa**
- **Persona**
- **Dirección**
- **Ciudad**

Cada módulo cuenta con integración mediante endpoints para operaciones como:

- Listado de registros
- Alta de nuevos registros
- Modificación de información existente
- Eliminación de registros
- Consulta individual por identificador

---

### 🔎 Buscador de personas

Actualmente, el sistema incorpora un buscador funcional dentro del módulo **Personas**, permitiendo filtrar y localizar registros de manera rápida.

Características:

- Búsqueda dinámica
- Actualización reactiva de resultados
- Integración directa con el estado de la vista

---

### ⚙️ Manejo de estado

Se implementa un manejo básico de estado para:

- Centralizar información de vistas
- Reducir renderizados innecesarios
- Mantener sincronización entre componentes
- Mejorar la experiencia de usuario ante cambios de datos

---

## 🎨 Interfaz de usuario

La UI fue construida combinando:

### **PrimeNG**

### **Tailwind CSS**

---

## 🏗️ Arquitectura del proyecto

El proyecto sigue una estructura modular orientada a escalabilidad, separando responsabilidades entre:

### Estructura de carpetas

```
src/
├── app/
│   ├── core/                         # Funcionalidad central reutilizable
│   │   ├── config/
│   │   │   └── api.config.ts         # Configuración de endpoints API
│   │   └── interceptors/
│   │       └── api.interceptor.ts    # Interceptor HTTP global
│   │
│   ├── features/                     # Módulos de negocio (lazy-loadable)
│   │   ├── address/
│   │   │   ├── components/           # Componentes de UI (form, table)
│   │   │   ├── models/               # Interfaces y tipos
│   │   │   ├── pages/                # Componentes de página
│   │   │   ├── services/             # Lógica de negocio
│   │   │   └── states/               # Gestión de estado con Signals
│   │   ├── city/
│   │   ├── company/
│   │   ├── contact/
│   │   ├── person/
│   │   └── home/                     # Página principal
│   │
│   ├── shared/                        # Componentes y servicios compartidos
│   │   ├── components/
│   │   │   ├── button/               # Botones reutilizables
│   │   │   ├── search/               # Componentes de búsqueda
│   │   │   │   ├── search.component.ts          # Búsqueda simple
│   │   │   │   └── advanced-search/            # Búsqueda con multiselect
│   │   │   ├── reactive-form/        # Componentes de formulario
│   │   │   └── sort-table/           # Tabla con ordenamiento
│   │   └── models/
│   │
│   └── app.ts                         # Componente raíz
├── assets/                            # Archivos estáticos (imágenes, iconos)
├── environments/                      # Configuración por entorno
│   ├── environment.ts
│   ├── environment.development.ts
│   └── environment.prod.ts
└── styles.css                         # Estilos globales
```

### Patrones de arquitectura

- **Feature-based modules**: Cada módulo (address, company, person, etc.) es independiente y contiene toda su lógica
- **Separation of concerns**:
  - `components/` → UI sin lógica de negocio
  - `services/` → Lógica de negocio y comunicación con API
  - `states/` → Gestión de estado reactivo con Signals
  - `models/` → Tipado TypeScript
- **Shared components**: Componentes reutilizables centralizados (botones, tablas, búsqueda)
- **Core utilities**: Configuración global, interceptores, servicios únicos

---

## 📈 Próximas mejoras

- Extender el buscador al resto de entidades
- Mejorar el manejo global de estados
- Incorporar paginación y filtros avanzados
- Mejora de validaciones (más robustas)
- Optimización de experiencia responsive
- Asignacion de contacto a empresa con drag&drop

---

## ▶️ Ejecución del proyecto

Instalar dependencias:

```bash
npm install
```
````

Iniciar entorno de desarrollo:

```bash
npm run start
```

La aplicación estará disponible en:

```bash
http://localhost:4200
```

---

## 👨‍💻 Autor

Nicolas Omar Luna

```

```
