# Cocos Challenge — App Fintech

App móvil desarrollada con **Expo / React Native** para el challenge técnico de Cocos Capital. Permite visualizar instrumentos del mercado, consultar el portafolio personal, enviar órdenes de compra y venta, y gestionar carteras personalizadas.

> Las decisiones de arquitectura y diseño están documentadas en [DECISIONS.md](./DECISIONS.md).

---

## Requisitos previos

| Herramienta | Versión mínima | Cómo instalar                   |
| ----------- | -------------- | ------------------------------- |
| Node.js     | 20 LTS         | [nodejs.org](https://nodejs.org) |
| pnpm        | 10             | `npm install -g pnpm`           |

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd cocos-challenge

# 2. Instalar dependencias
pnpm install
```

---

## Ejecutar en desarrollo

### Opción A — Expo Go (más rápida, sin compilación nativa)

```bash
npx expo start
```

Escaneá el QR con la cámara del celular (iOS) o desde la app Expo Go (Android). No requiere Xcode ni Android Studio.

> **Limitación:** Expo Go solo incluye los módulos nativos que trae de fábrica. Si la app usa módulos extra con código nativo (ej. `expo-splash-screen` con configuración custom), algunos comportamientos pueden diferir del build real.

---

### Opción B — Dev build nativo (recomendada para iOS/Android)

Genera un build de desarrollo que incluye todos los módulos nativos del proyecto.

#### Prerrequisitos iOS

| Herramienta | Cómo instalar                                                        |
| ----------- | -------------------------------------------------------------------- |
| Xcode       | App Store (incluye el simulador de iPhone)                           |
| CocoaPods   | `sudo gem install cocoapods --no-document`                           |

#### Prerrequisitos Android

| Herramienta   | Cómo instalar                             |
| ------------- | ----------------------------------------- |
| Android Studio | [developer.android.com/studio](https://developer.android.com/studio) — incluye el SDK y el AVD manager |

#### Comandos

```bash
# iOS (simulador)
npx expo run:ios

# Android (emulador)
npx expo run:android
```

El primer build tarda varios minutos porque compila el código nativo. Los rebuilds siguientes son incrementales y mucho más rápidos.

> **Nota:** Si los directorios `ios/` y `android/` no existen, Expo los genera automáticamente antes de compilar (Continuous Native Generation). No los edites manualmente — cualquier configuración nativa va en `app.json` y config plugins.

---

## Scripts útiles

```bash
# Ejecutar tests unitarios
pnpm test

# Ejecutar tests en modo watch
pnpm test --watch

# Lint
npx expo lint

# Typecheck
npx tsc --noEmit

# Diagnóstico de dependencias
npx expo-doctor
```

---

## Variables de entorno

Copiá el archivo de ejemplo y completá los valores:

```bash
cp .env.example .env
```

| Variable                   | Descripción             | Valor por defecto                    |
| -------------------------- | ----------------------- | ------------------------------------ |
| `EXPO_PUBLIC_API_BASE_URL` | URL base de la REST API | `https://dummy-api-topaz.vercel.app` |

> El prefijo `EXPO_PUBLIC_` es requerido por Expo para exponer la variable al bundle del cliente. El archivo `.env` está en `.gitignore`; `.env.example` sí se versiona como referencia.

Los endpoints de la API están centralizados en `src/constants/api-endpoints.ts`. Los headers de autenticación (`X-Enable-Bugs`, `X-Candidate-Id`) se envían automáticamente desde `src/services/api-client.ts`.

---

## Estructura del proyecto

```
cocos-challenge/
├── .env.example                    # Variables de entorno de referencia (se versiona)
├── src/
│   ├── app/                        # Pantallas (Expo Router — file-based routing)
│   │   ├── _layout.tsx             # Root layout (splash screen, providers)
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
│   ├── domain/
│   │   ├── entities/               # Tipos e interfaces del negocio
│   │   ├── interfaces/             # ApiError, resolveErrorMessage, isUserError
│   │   └── use-cases/              # Lógica de negocio pura (cálculos)
│   ├── features/
│   │   ├── market/                 # Componentes, servicio e hook de instrumentos/búsqueda
│   │   ├── order/                  # Modal de orden, store, servicio, contexto, utils y tests
│   │   ├── portfolio/              # Componentes y estilos de la pantalla Portfolio
│   │   └── wallets/                # Carteras: componentes, hooks, store (AsyncStorage)
│   ├── hooks/                      # Hooks compartidos entre features (usePortfolio)
│   ├── services/                   # api-client + portfolio.service
│   └── utils/                      # Formatters (moneda, porcentaje, fecha)
└── ui-kit/                         # Design system interno
    ├── components/                 # Button, Text, TextInput, Icon, Skeleton
    └── foundations/                # Colors, typography, spacing, borderRadius
```

> **Principio de colocation:** los servicios, hooks y stores propios de una feature viven dentro de `src/features/<nombre>/`. El nivel global (`src/services/`, `src/hooks/`) solo contiene código consumido por dos o más features. Ver [DECISIONS.md §28](./DECISIONS.md).

---

## Funcionalidades implementadas

### Mercado
- **Listado de instrumentos** con ticker, nombre, último precio y retorno del día
- **Búsqueda en tiempo real** por ticker con debounce de 400 ms

### Portfolio
- **Resumen de cartera** con valor total y variación del día
- **Lista de posiciones** con valor de mercado y rendimiento por instrumento

### Órdenes de compra y venta
- **Flujo en 4 pasos**: selección de acción → formulario → presupuesto → resultado
- **Dos modos de ingreso**: monto en AR$ o cantidad de títulos, con conversión automática
- **"Usar todo"**: completa el campo con el máximo disponible según contexto (efectivo o títulos)
- **Tipo de orden**: Mercado o Límite (con campo de precio límite)
- **Restricción de venta**: el botón Vender se deshabilita si no hay posición en el instrumento
- **Validación en tiempo real**: bloquea el botón Siguiente si el monto supera el efectivo o las acciones disponibles
- **Manejo de errores**: errores de usuario (4xx) mostrados en el formulario; errores de sistema (5xx / red) mostrados como banner

### Carteras personalizadas
- **Crear carteras** con nombre personalizado, persistidas localmente con AsyncStorage
- **Agregar instrumentos** a una cartera con la cantidad deseada
- **Detalle de cartera**: valor total valorizado al precio de mercado actual, lista de allocations con rendimiento individual
- **Eliminar instrumentos** de una cartera con swipe o selección múltiple
- **Renombrar y eliminar** carteras

---

## Tests

El proyecto tiene dos tipos de tests:

### Tests unitarios (lógica pura)

| Archivo                                           | Qué cubre                                                                                  |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/__tests__/calculations.test.ts`              | Cálculos de retorno y valor de mercado                                                     |
| `src/features/order/__tests__/order-form.test.ts` | `computeUseAllValue` (BUY/SELL × monto/títulos), `isUseAllAvailable`, validación de inputs |

### Tests de componentes (React Native Testing Library)

| Archivo                                                      | Componente           | Casos cubiertos                                                           |
| ------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------- |
| `src/features/order/__tests__/SelectStep.test.tsx`           | `SelectStep`         | Botones Buy/Sell/Cancel, Sell deshabilitado sin posición                  |
| `src/features/order/__tests__/FormStep.test.tsx`             | `FormStep`           | Submit deshabilitado, "Usar todo", errores de validación, excede efectivo |
| `src/features/wallets/__tests__/WalletAssetItem.test.tsx`    | `WalletAssetItem`    | Render de ticker/cantidad/valor, precio de holding, singular/plural       |
| `src/features/wallets/__tests__/WalletEmptyContent.test.tsx` | `WalletEmptyContent` | Estado vacío, navegación a add-asset                                      |
| `src/features/wallets/__tests__/WalletAssetList.test.tsx`    | `WalletAssetList`    | Total valorizado, lista de allocations, navegación                        |
| `src/features/wallets/__tests__/QuantityInputCard.test.tsx`  | `QuantityInputCard`  | Cantidad disponible, "Usar todo", error por exceso, hint de precio        |

### Setup de tests

La configuración vive en `src/test-utils/`:

- **`setup.ts`** — inicializa i18n globalmente para todos los tests
- **`mocks/reanimated.ts`** — stub de `react-native-reanimated` (la versión nativa no corre en Jest)
- **`mocks/vector-icons.ts`** — stub de `@expo/vector-icons` (evita carga de fuentes en `componentDidMount`)

> **Nota:** `render` de RNTL v14 es async → siempre usar `await render(...)` en los tests de componentes.
