# Decisiones técnicas

Este documento registra las decisiones de arquitectura y diseño tomadas durante el desarrollo del challenge. Cada sección explica el **qué**, el **por qué** y el **trade-off** considerado.

---

## 1. Stack base: Expo SDK 58 + React Native 0.88 + TypeScript estricto

**Decisión:** Usar Expo con Expo Router (file-based routing) y TypeScript en modo `strict`.

**Por qué:** Expo acelera el setup multiplataforma (iOS, Android, Web) sin necesidad de Xcode o Android Studio para desarrollo, y Expo Router elimina boilerplate de navegación. TypeScript estricto fuerza correctitud en tiempo de compilación, especialmente útil en un dominio financiero donde los tipos de datos son críticos.

**Trade-off:** Expo impone restricciones en módulos nativos personalizados. Para este challenge, todo lo necesario está cubierto por los módulos del SDK.

---

## 2. Arquitectura modular por features

**Decisión:** La carpeta `src/features/` agrupa todo el código de una funcionalidad (componentes, hooks locales, utils, tests) en un solo lugar. La lógica de negocio pura vive en `src/domain/`.

```
src/
├── domain/          # Entidades, interfaces, casos de uso (sin deps de UI)
├── features/
│   ├── market/      # Todo lo de la pantalla Mercado
│   ├── order/       # Modal + utils + tests
│   └── portfolio/   # Todo lo de la pantalla Portfolio
├── hooks/           # Hooks de datos compartidos entre features
├── services/        # Acceso a API
└── store/           # Estado global
```

**Por qué:** Escala bien: agregar una feature nueva no requiere tocar carpetas existentes. El dominio sin dependencias de React permite testearlo en aislamiento con tests puros (sin mocks de componentes).

**Trade-off:** Más carpetas que una estructura plana. Se justifica porque el proyecto modela un dominio real (fintech) con reglas de negocio propias.

---

## 3. Server state: React Query v5 / TanStack Query

**Decisión:** Toda la data del servidor (instruments, portfolio, search, submit order) se maneja con React Query. No hay estado de servidor en Zustand ni en `useState`.

**Por qué:** React Query resuelve caching, loading/error states, refetch on focus, y deduplicación de requests sin código adicional. En una app fintech donde los precios cambian frecuentemente, el refresco automático es valioso.

**Detalle importante (React 19 + React Query v5):** La opción `select` de `useQuery` causa un loop infinito en React 19 porque React compara referencias en cada render. Se reemplazó con `useMemo` sobre `query.data` como solución estable.

```ts
// ❌ Causa loop en React 19
useQuery({ queryFn: fetchPortfolio, select: (data) => transform(data) });

// ✅ Estable
const query = useQuery({ queryFn: fetchPortfolio });
const result = useMemo(() => transform(query.data), [query.data]);
```

---

## 4. Global UI state: Zustand v5

**Decisión:** Zustand maneja únicamente el estado global de UI: qué modal está abierto y qué instrumento está seleccionado (`useOrderModalStore`).

**Por qué:** Zustand v5 tiene una API mínima (sin boilerplate), es compatible con React 19, y no requiere providers. Se separó del estado de servidor (React Query) para mantener cada herramienta en su rol.

**Sintaxis de Zustand v5:**

```ts
// ✅ Curried form requerida en v5
const useStore = create<State>()((set) => ({ ... }));
```

---

## 5. UI Kit interno como design system

**Decisión:** Se creó un `ui-kit/` propio con `Button`, `Text`, `TextInput`, `Card` y foundations (`colors`, `typography`, `spacing`).

**Por qué:** En una app fintech la consistencia visual no es opcional. Un design system centralizado evita colores hardcodeados, tamaños inconsistentes, y hace que cualquier cambio de marca se aplique en un solo lugar.

**Tokens de color semánticos:**

```ts
colors.success; // Verde: BUY, ganancias
colors.error; // Rojo: SELL, pérdidas, alertas
colors.textBrand; // Primario de marca: links, acciones
colors.warning; // Naranja: banners de error de sistema
```

---

## 6. Fuente única de verdad para textos: `copy.ts`

**Decisión:** Ningún string visible al usuario está hardcodeado en componentes. Todo vive en `src/constants/copy.ts`.

**Por qué:** Facilita internacionalización futura, testing de copy, y revisiones de UX sin tocar componentes. También previene inconsistencias (ej: "Cancelar" vs "Cerrar" vs "Salir" en distintos lugares).

---

## 7. Clasificación de errores de API

**Decisión:** Se creó `ApiError` con tres tipos (`http`, `network`, `parse`) y dos funciones clave: `resolveErrorMessage()` y `isUserError()`.

**Por qué:** Los errores 4xx son corregibles por el usuario (fondos insuficientes, cantidad inválida) y deben mostrarse en el formulario. Los errores 5xx, de red o de parseo son problemas del sistema y se muestran como banner informativo sin bloquear el flujo.

```
4xx (user error)   → validationError → mostrado en el formulario, el usuario puede corregir
5xx / red / parse  → systemError    → banner de warning, no bloquea la UI
```

Los mensajes en inglés que devuelve la API se traducen al español mediante un mapa en `copy.errors.apiMessages` dentro del `api-client.ts`, sin dependencia de la API.

---

## 8. Flujo de orden en 4 pasos

**Decisión:** El modal de orden tiene los pasos `select → form → confirm → result`.

**Por qué:** Pantallas fintech de referencia (Coinbase, Robinhood) usan un paso de confirmación antes de ejecutar. Esto reduce errores del usuario y es especialmente importante en operaciones financieras irreversibles. El paso `confirm` también muestra el desglose estimado de comisiones e impuestos (BYMA).

---

## 9. Modos de ingreso: monto en AR$ o cantidad de títulos

**Decisión:** El formulario permite ingresar el monto total en pesos **o** la cantidad exacta de títulos, con conversión automática.

**Por qué:** Es el comportamiento estándar en brokers argentinos. Un inversor retail piensa en "quiero invertir $10.000" más que en "quiero 47 acciones".

**Regla de negocio:** La conversión `monto → títulos` usa `Math.floor(monto / lastPrice)` porque no se admiten fracciones de acciones.

---

## 10. "Usar todo" (use all)

**Decisión:** Botón que completa el campo con el máximo disponible según el contexto.

| Contexto           | Resultado                               |
| ------------------ | --------------------------------------- |
| BUY + Por monto    | `floor(cash)` en AR$                    |
| BUY + Por títulos  | `floor(cash / lastPrice)` títulos       |
| SELL + Por monto   | `floor(ownedShares * lastPrice)` en AR$ |
| SELL + Por títulos | `ownedShares` títulos exactos           |

La lógica está aislada en `src/features/order/utils/order-form.ts` y cubierta por 20 tests unitarios.

---

## 11. Restricción de venta sin posición

**Decisión:** El botón "Vender" en el modal de selección se deshabilita (con hint explicativo) cuando el usuario no tiene posición en el instrumento.

**Por qué:** Evitar intentos de venta en corto que la API rechazaría con error. Mejor prevenir en UI que dejar al usuario llegar al final del flujo para encontrar un error.

---

## 12. Protección contra números grandes

**Decisión:** Tres capas de defensa para evitar que números muy grandes rompan el layout en la pantalla de presupuesto:

1. **Validación en el formulario**: si el monto supera el efectivo disponible, el botón "Siguiente" queda bloqueado con un mensaje de error visible.
2. **`adjustsFontSizeToFit` + `minimumFontScale`**: los `Text` con valores monetarios en la pantalla de confirmación reducen su tamaño automáticamente si el texto no entra.
3. **Notación compacta en `formatCurrency`**: valores ≥ 1B se muestran como `AR$ 1,6 M` o `AR$ 1,2 B` para evitar desborde y notación científica.

---

## 13. Búsqueda con debounce

**Decisión:** La búsqueda de instrumentos usa un debounce de 400 ms antes de llamar a la API.

**Por qué:** Evita una request por cada keystroke. 400 ms es el balance estándar entre responsividad percibida y carga al servidor.

---

## 14. Reseteo de estado en `onShow` (no en `useEffect`)

**Decisión:** El estado del modal de orden se resetea en el callback `onShow` del componente `Modal`, no en un `useEffect`.

**Por qué:** La regla de lint `react-hooks/set-state-in-effect` prohíbe `setState` dentro de `useEffect` sin dependencias (causa renders adicionales). `onShow` es un event handler, semánticamente correcto y sin penalidad de lint.

---

## 15. Gestión de paquetes: pnpm

**Decisión:** Se usa `pnpm` como package manager.

**Por qué:** Instala más rápido que npm/yarn en proyectos Expo gracias al store global de paquetes. El lockfile `pnpm-lock.yaml` garantiza reproducibilidad.

**Nota:** Para instalar nuevos paquetes con resolución de versiones compatible con el SDK, siempre usar `npx expo install <paquete>`.

---

## 16. Debugging: Reactotron

**Decisión:** Se integró Reactotron para debugging en desarrollo.

**Por qué:** Reactotron es el estándar de facto para debugging en React Native/Expo. Permite inspeccionar requests, state y logs desde un cliente de escritorio sin necesidad de remote debugging del JS engine.

La configuración solo se activa en `__DEV__` y no tiene impacto en builds de producción.

---

## Checklist de requisitos del challenge

| Requisito                                                    | Estado                      |
| ------------------------------------------------------------ | --------------------------- |
| Listado de instrumentos con ticker, nombre, precio y retorno | ✅                          |
| Portfolio con valor de mercado, ganancia y rendimiento       | ✅                          |
| Buscador por ticker                                          | ✅                          |
| Modal de orden BUY/SELL, MARKET/LIMIT                        | ✅                          |
| Input de cantidad o monto en pesos                           | ✅                          |
| Mostrar resultado con id y status                            | ✅                          |
| TypeScript                                                   | ✅                          |
| Expo                                                         | ✅                          |
| README con instrucciones                                     | ✅                          |
| Decisiones técnicas documentadas                             | ✅                          |
| Tests unitarios                                              | ✅ (20 tests en order-form) |
| Manejo robusto de errores                                    | ✅                          |
| Arquitectura escalable                                       | ✅                          |
| State management                                             | ✅ (React Query + Zustand)  |
