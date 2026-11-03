# Cocos Challenge — App Fintech

App móvil desarrollada con **Expo / React Native** para el challenge técnico de Cocos Capital. Permite visualizar instrumentos del mercado, consultar el portafolio personal y enviar órdenes de compra y venta.

---

## Requisitos previos

| Herramienta                  | Versión mínima | Cómo instalar                                                                                                                               |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js                      | 20 LTS         | [nodejs.org](https://nodejs.org)                                                                                                            |
| pnpm                         | 10             | `npm install -g pnpm`                                                                                                                       |
| Expo CLI                     | última         | `npm install -g expo-cli` (o usar `bunx`/`npx`)                                                                                             |
| Expo Go (dispositivo físico) | cualquiera     | [App Store](https://apps.apple.com/app/expo-go/id982107779) / [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) |

> **Simulador (alternativa a Expo Go):** para iOS necesitás Xcode instalado; para Android, Android Studio con un AVD configurado.

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

```bash
# Inicia el servidor de desarrollo (Metro Bundler)
npx expo start
```

Luego elegí cómo correr la app:

| Opción                    | Cómo                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------- |
| **Expo Go (iOS/Android)** | Escaneá el QR que aparece en la terminal con la cámara del celular o desde la app Expo Go |
| **Simulador iOS**         | Presioná `i` en la terminal (requiere Xcode)                                              |
| **Emulador Android**      | Presioná `a` en la terminal (requiere Android Studio + AVD)                               |
| **Web**                   | Presioná `w` en la terminal                                                               |

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
├── .env.example               # Variables de entorno de referencia (se versiona)
├── src/
│   ├── app/                   # Pantallas (Expo Router — file-based routing)
│   │   ├── (tabs)/
│   │   │   ├── index.tsx      # Tab Portfolio
│   │   │   └── market.tsx     # Tab Mercado
│   │   └── wallets/           # Pantallas de carteras
│   ├── constants/
│   │   └── api-endpoints.ts   # Todos los paths de la API centralizados
│   ├── domain/
│   │   ├── entities/          # Tipos e interfaces del negocio
│   │   ├── interfaces/        # ApiError, resolveErrorMessage, isUserError
│   │   └── use-cases/         # Lógica de negocio pura (cálculos)
│   ├── features/
│   │   ├── market/            # Componentes de la pantalla Mercado
│   │   ├── order/             # Modal de orden + utils + tests
│   │   ├── portfolio/         # Componentes de la pantalla Portfolio
│   │   └── wallets/           # Carteras: componentes, hooks, store
│   ├── hooks/                 # React Query hooks (instrumentos, portfolio, search, orden)
│   ├── services/              # Capa de acceso a la API
│   ├── store/                 # Estado global (Zustand)
│   └── utils/                 # Formatters (moneda, porcentaje, fecha)
└── ui-kit/                    # Design system interno
    ├── components/            # Button, Text, TextInput, Icon, Skeleton
    └── foundations/           # Colors, typography, spacing
```

---

## Funcionalidades implementadas

- **Listado de instrumentos** con ticker, nombre, último precio y retorno del día
- **Búsqueda de instrumentos** por ticker en tiempo real (debounce 400 ms)
- **Portfolio** con valor de mercado, ganancia absoluta y rendimiento porcentual por posición
- **Modal de orden** con flujo en pasos:
  1. Selección de acción (Comprar / Vender)
  2. Formulario (monto en AR$ o cantidad de títulos, tipo Mercado o Límite)
  3. Pantalla de presupuesto con desglose de comisiones e impuestos estimados
  4. Resultado (estado FILLED / PENDING / REJECTED)
- **"Usar todo"**: completa automáticamente el campo con el máximo disponible
- **Restricción de venta**: el botón Vender queda deshabilitado si no hay posición en el instrumento
- **Validación en tiempo real**: bloquea el botón Siguiente si el monto supera el efectivo o las acciones disponibles
- **Manejo robusto de errores**: errores de usuario (4xx) mostrados en el formulario; errores de sistema (5xx / red) mostrados como banner

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
