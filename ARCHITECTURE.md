# Arquitectura — Cocos Challenge

> Las decisiones que explican el **por qué** de cada elección están en [DECISIONS.md](./DECISIONS.md).

---

## Stack

| Capa | Tecnología |
| ---- | ---------- |
| Framework | Expo SDK 58 / React Native 0.88 |
| Lenguaje | TypeScript (modo `strict`) |
| Navegación | Expo Router (file-based routing) |
| Server state | React Query v5 (TanStack Query) |
| UI state | Zustand v5 |
| Persistencia local | AsyncStorage |
| Tests | Jest + React Native Testing Library |
| Design system | UI Kit interno (`ui-kit/`) |
| i18n | i18next |

---

## Estructura de carpetas

```
cocos-challenge/
├── src/
│   ├── app/                        # Pantallas (Expo Router — cada archivo es una ruta)
│   │   ├── _layout.tsx             # Root layout: splash screen, providers globales
│   │   ├── (tabs)/
│   │   │   ├── index.tsx           # Tab Portfolio
│   │   │   └── market.tsx          # Tab Mercado
│   │   └── wallets/                # Stack independiente de Carteras
│   │       ├── index.tsx           # Lista de carteras
│   │       ├── new.tsx             # Crear cartera
│   │       └── [id]/
│   │           ├── index.tsx       # Detalle de cartera
│   │           ├── add-asset.tsx   # Picker de instrumentos
│   │           ├── [ticker].tsx    # Ingreso de cantidad
│   │           ├── remove-assets.tsx
│   │           └── rename.tsx
│   ├── constants/
│   │   └── api-endpoints.ts        # Todos los paths de la API centralizados
│   ├── domain/                     # Sin dependencias de React ni de UI
│   │   ├── entities/               # Tipos e interfaces del negocio
│   │   ├── interfaces/             # ApiError, resolveErrorMessage, isUserError
│   │   └── use-cases/              # Lógica de negocio pura (cálculos financieros)
│   ├── features/
│   │   ├── market/                 # Componentes, servicio e hooks de instrumentos/búsqueda
│   │   ├── order/                  # Modal de orden, store, servicio, contexto, utils y tests
│   │   ├── portfolio/              # Componentes, hook y estilos de la pantalla Portfolio
│   │   └── wallets/                # Carteras: componentes, hooks, store (AsyncStorage)
│   ├── hooks/                      # Hooks compartidos entre 2+ features
│   ├── services/                   # api-client + portfolio.service
│   ├── i18n/                       # Configuración de i18next y archivos de traducción
│   └── utils/                      # Formatters (moneda, porcentaje, fecha)
└── ui-kit/                         # Design system interno
    ├── components/                 # Button, Text, TextInput, Icon, Skeleton
    └── foundations/                # Colors, typography, spacing, borderRadius
```

---

## Capas

### `domain/`

Lógica de negocio pura: tipos, reglas y cálculos financieros sin ninguna dependencia de React, React Native ni de la API. Se puede testear con Jest puro. Incluye la clasificación de errores (`ApiError`) y los cálculos de retorno, valor de mercado y desglose de órdenes.

### `features/<nombre>/`

Cada feature es autónoma: agrupa sus componentes, hooks, servicios, stores y tests. El código que solo usa una feature vive adentro; el código compartido entre dos o más sube al nivel global (`src/hooks/`, `src/services/`). Ver [DECISIONS.md §28](./DECISIONS.md).

### `app/`

Solo pantallas. Las rutas no contienen lógica: delegan en hooks y componentes de `features/`. Expo Router convierte cada archivo en una ruta automáticamente.

### `ui-kit/`

Design system interno con tokens semánticos de color, tipografía y espaciado. Ningún archivo fuera de `ui-kit/` usa colores hardcodeados.

---

## Flujo de datos

```
API REST
  └── service (fetch + tipado)
        └── React Query hook (caché, loading, error)
              └── pantalla / componente
                    └── Zustand (UI state: modal abierto, instrumento seleccionado)
```

Los errores de red y HTTP se clasifican en `domain/interfaces/` antes de llegar a la UI: errores 4xx se muestran en el formulario; 5xx y errores de red se muestran como banner informativo.
