# Cocos Challenge — App Fintech

App móvil desarrollada con **Expo / React Native** para el challenge técnico de Cocos Capital. Permite visualizar instrumentos del mercado, consultar el portafolio personal y enviar órdenes de compra y venta.

---

## Requisitos previos

| Herramienta | Versión mínima | Cómo instalar |
|---|---|---|
| Node.js | 20 LTS | [nodejs.org](https://nodejs.org) |
| pnpm | 10 | `npm install -g pnpm` |
| Expo CLI | última | `npm install -g expo-cli` (o usar `bunx`/`npx`) |
| Expo Go (dispositivo físico) | cualquiera | [App Store](https://apps.apple.com/app/expo-go/id982107779) / [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) |

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

| Opción | Cómo |
|---|---|
| **Expo Go (iOS/Android)** | Escaneá el QR que aparece en la terminal con la cámara del celular o desde la app Expo Go |
| **Simulador iOS** | Presioná `i` en la terminal (requiere Xcode) |
| **Emulador Android** | Presioná `a` en la terminal (requiere Android Studio + AVD) |
| **Web** | Presioná `w` en la terminal |

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

No se requieren variables de entorno. La URL base de la API y los headers necesarios están configurados directamente en `src/services/api-client.ts`:

- **Base URL:** `https://dummy-api-topaz.vercel.app`
- **Headers requeridos:** `X-Enable-Bugs: off` y `X-Candidate-Id: <email>`

---

## Estructura del proyecto

```
cocos-challenge/
├── src/
│   ├── app/                   # Pantallas (Expo Router — file-based routing)
│   │   └── (tabs)/
│   │       ├── index.tsx      # Pantalla Mercado
│   │       └── portfolio.tsx  # Pantalla Portfolio
│   ├── constants/
│   │   └── copy.ts            # Todos los textos de UI centralizados
│   ├── domain/
│   │   ├── entities/          # Tipos e interfaces del negocio
│   │   ├── interfaces/        # ApiError, resolveErrorMessage, isUserError
│   │   └── use-cases/         # Lógica de negocio pura (cálculos)
│   ├── features/
│   │   ├── market/            # Componentes de la pantalla Mercado
│   │   ├── order/             # Modal de orden + utils + tests
│   │   └── portfolio/         # Componentes de la pantalla Portfolio
│   ├── hooks/                 # React Query hooks (instrumentos, portfolio, search, orden)
│   ├── services/              # Capa de acceso a la API
│   ├── store/                 # Estado global (Zustand)
│   └── utils/                 # Formatters (moneda, porcentaje, fecha)
└── ui-kit/                    # Design system interno (Button, Text, TextInput, Card)
    ├── components/
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

Los tests unitarios cubren la lógica del formulario de órdenes (`src/features/order/__tests__/order-form.test.ts`):

- `computeUseAllValue`: todas las combinaciones BUY/SELL × monto/títulos
- `isUseAllAvailable`: casos de borde con efectivo o posición nula/cero
- Validación de inputs inválidos (NaN, Infinity, negativo, cero)
