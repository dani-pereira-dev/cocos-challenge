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
│   ├── market/      # Componentes, servicio e hooks de instrumentos/búsqueda
│   ├── order/       # Modal + store + servicio + utils + tests
│   ├── portfolio/   # Componentes y hooks de portfolio
│   └── wallets/     # Carteras: componentes, hooks, store (AsyncStorage)
├── app/             # Pantallas (Expo Router — file-based routing)
├── components/      # Componentes compartidos entre features (TickerAvatar, ReturnBadge)
├── hooks/           # Hooks compartidos entre 2+ features
├── services/        # api-client + portfolio.service
├── i18n/            # Configuración de i18next y traducciones (es.json)
├── test-utils/      # Setup de Jest, mocks de Reanimated y vector-icons
└── utils/           # Formatters (moneda, porcentaje, fecha)
```

Ver Decisión 28 para el criterio de colocation que rige qué vive dentro de una feature y qué va al nivel global.

**Por qué:** Escala bien: agregar una feature nueva no requiere tocar carpetas existentes. El dominio sin dependencias de React permite testearlo en aislamiento con tests puros (sin mocks de componentes).

**Trade-off:** Más carpetas que una estructura plana. Se justifica porque el proyecto modela un dominio real (fintech) con reglas de negocio propias.

---

## 3. Server state: React Query v5 / TanStack Query

**Decisión:** Toda la data del servidor (instruments, portfolio, search, submit order) se maneja con React Query. No hay estado de servidor en Zustand ni en `useState`.

**Por qué:** React Query resuelve caching, loading/error states, refetch on focus, y deduplicación de requests sin código adicional. En una app fintech donde los precios cambian frecuentemente, el refresco automático es valioso.

**Nota (React 19 + React Query v5):** La opción `select` de `useQuery` causa un loop infinito en React 19 porque React compara referencias en cada render. Se usa `useMemo` sobre `query.data`:

```ts
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

**Decisión:** Se creó un `ui-kit/` propio con `Button`, `Text`, `TextInput` y foundations (`colors`, `typography`, `spacing`).

**Por qué:** En una app fintech la consistencia visual no es opcional. Un design system centralizado evita colores hardcodeados, tamaños inconsistentes, y hace que cualquier cambio de marca se aplique en un solo lugar.

**Tokens de color semánticos:**

```ts
colors.success; // Verde: BUY, ganancias
colors.error; // Rojo: SELL, pérdidas, alertas
colors.textBrand; // Primario de marca: links, acciones
colors.warning; // Naranja: banners de error de sistema
```

---

## 7. Clasificación de errores de API

**Decisión:** Se creó `ApiError` con tres tipos (`http`, `network`, `parse`) y dos funciones clave: `resolveErrorMessage()` y `isUserError()`.

**Por qué:** Los errores 4xx son corregibles por el usuario (fondos insuficientes, cantidad inválida) y deben mostrarse en el formulario. Los errores 5xx, de red o de parseo son problemas del sistema y se muestran como banner informativo sin bloquear el flujo.

```
4xx (user error)   → validationError → mostrado en el formulario, el usuario puede corregir
5xx / red / parse  → systemError    → banner de warning, no bloquea la UI
```

Los mensajes en inglés que devuelve la API se traducen al español mediante claves en `errors.apiMessages` de `es.json`, sin dependencia de la API.

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

**Decisión:** El botón "Vender" en el modal de selección se deshabilita visualmente cuando el usuario no tiene posición en el instrumento.

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

## 14. Reseteo de estado del modal con `resetToken` + `key`

**Decisión:** El store de Zustand expone un `resetToken: number` que incrementa en cada llamada a `openOrder`. El contenido del modal (`OrderModalContent`) recibe ese token como `key`, lo que fuerza un remount sincrónico en cada apertura.

**Por qué:** `key={resetToken}` fuerza un remount sincrónico de React antes del primer frame, garantizando que el modal siempre abra en el paso `select` sin estado residual de la orden anterior.

```ts
// store
openOrder: (instrument) => set((s) => ({ visible: true, instrument, resetToken: s.resetToken + 1 })),

// OrderModal — el key va en el Provider (que envuelve todo el árbol del modal)
<OrderFormProvider key={resetToken}>
  <OrderModalInner onClose={closeOrder} />
</OrderFormProvider>
```

**Trade-off:** Se agrega un campo `resetToken` al store. El costo es mínimo y el resultado es determinístico.

---

## 15. Estructura de componentes: carpeta propia + archivo de estilos separado

**Decisión:** Cada componente vive en su propia carpeta con tres archivos: `ComponentName.tsx`, `ComponentName.styles.ts` e `index.ts`.

```
Button/
├── Button.tsx           # lógica y JSX
├── Button.styles.ts     # StyleSheet.create(...)
└── index.ts             # export { Button } from './Button'
```

**Por qué:** Mezclar estilos y lógica en un mismo archivo supera rápidamente las 200 líneas en componentes reales. La separación hace que los cambios de UI (estilos) y los cambios de comportamiento (lógica) sean diffs independientes y más fáciles de revisar. El `index.ts` mantiene los imports de los consumidores estables cuando el archivo se mueve o refactoriza.

**Alcance:** Aplica a todos los componentes de `src/components/`, `src/features/*/components/` y `ui-kit/components/`.

---

## 16. Step Registry para el modal de orden

**Decisión:** Los pasos del modal se despachan con un `Record<Step, () => ReactNode>` en lugar de bloques `{step === '...' && <Component />}` en cadena.

```ts
const stepRenderers: Record<Step, () => ReactNode> = {
  select:  () => <SelectStep />,
  form:    () => <FormStep />,
  confirm: () => <ConfirmStep />,
  result:  () => result ? <ResultSheet onClose={onClose} /> : null,
};

return (
  <View>
    <Pressable ... />
    {stepRenderers[step]()}
  </View>
);
```

Los steps no reciben props de formulario porque los leen directamente del contexto (ver Decisión 20).

**Por qué:** `Record<Step, ...>` es exhaustivo: TypeScript da error si falta algún step o si se agrega uno nuevo sin handler. Agregar un paso (`'otp'`, `'review'`) solo requiere una entrada al mapa sin modificar condicionales existentes. El cuerpo del componente queda con una sola línea de render en lugar de cuatro bloques anidados.

---

## 17. Internacionalización: i18next

**Decisión:** Los textos visibles al usuario viven en `src/i18n/locales/es.json` y se acceden mediante `useTranslation()` de `react-i18next` en componentes React.

**Por qué:** i18next resuelve plurales e interpolaciones sin modificar componentes. Escala a múltiples idiomas sin tocar los puntos de uso.

```ts
const { t } = useTranslation();
t('portfolio.shares', { count: qty }); // "1 acción" / "5 acciones"
t('market.noSearchResults', { query }); // interpolación
```

**Trade-off:** Agrega una dependencia de runtime y quita el tipado estático de claves (recuperable con plugins de TypeScript para i18next).

---

## 18. Gestión de paquetes: pnpm

**Decisión:** Se usa `pnpm` como package manager.

**Por qué:** Instala más rápido que npm/yarn en proyectos Expo gracias al store global de paquetes. El lockfile `pnpm-lock.yaml` garantiza reproducibilidad.

**Nota:** Para instalar nuevos paquetes con resolución de versiones compatible con el SDK, siempre usar `npx expo install <paquete>`.

---

## 19. Debugging: Reactotron

**Decisión:** Se integró Reactotron para inspeccionar requests, state y logs en desarrollo.

**Por qué:** Permite ver requests HTTP y estado de Zustand desde un cliente de escritorio sin herramientas adicionales del browser.

La configuración solo se activa en `__DEV__` y no tiene impacto en builds de producción.

---

## 20. Context scoped al modal para eliminar prop drilling

**Decisión:** El estado del formulario de orden se expone a los steps mediante `OrderFormContext` (React Context), no como props. `OrderFormProvider` envuelve el árbol del modal; cada step lee directamente con `useOrderFormContext()`.

```
OrderModal
└── OrderFormProvider        ← contexto vive aquí, se destruye con el modal
    └── OrderModalInner
        ├── <SelectStep />   ← 0 props de formulario
        ├── <FormStep />     ← 0 props de formulario
        └── <ConfirmStep />  ← 0 props de formulario
```

**Por qué:** El estado del formulario es compartido por todos los steps pero no sale del árbol del modal. Contexto es el canal correcto: cada step suscribe solo a lo que usa, sin que el orquestador conozca la interfaz de sus hijos.

**Regla:** _El estado que no cruza el árbol no necesita props — necesita contexto._

**Trade-off:** Los steps quedan acoplados al `OrderFormContext` y no son reutilizables fuera del modal. Es un trade-off aceptable dado que son componentes propios del flujo de orden.

---

## 21. Descomposición del hook `useOrderForm`

**Decisión:** `useOrderForm` se divide en tres capas con responsabilidad única:

| Hook                 | Responsabilidad                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `useOrderNavigation` | Estado de paso (`step`) y sub-sheet; transiciones (`goBack`, `resetNavigation`)                           |
| `useOrderInputs`     | Campos del formulario, parsing, valores derivados, restricciones (`exceedsCash`, `exceedsShares`)         |
| `useOrderForm`       | Orquestador: conecta los dos, agrega submit, errores, reset coordinado y acciones compuestas (`goToForm`) |

**Por qué:** Cada hook tiene un invariante claro. `useOrderForm` solo coordina — delega el parsing del monto a `useOrderInputs` y las transiciones de paso a `useOrderNavigation`. El retorno explícito de `useOrderForm` controla qué implementación interna queda expuesta al contexto (`setSide`, `resetNavigation`, `exceedsCash` son privados).

---

## 22. Placement de componentes: `ui-kit/` vs `src/components/` vs `src/features/`

**Decisión:** Los componentes se ubican según su conocimiento del dominio:

| Ubicación                    | Qué va ahí                                                    | Ejemplos                      |
| ---------------------------- | ------------------------------------------------------------- | ----------------------------- |
| `ui-kit/components/`         | Primitivos del design system, sin dominio                     | `Button`, `Text`, `TextInput` |
| `src/components/`            | Componentes compartidos entre features, con dominio de la app | `TickerAvatar`, `ReturnBadge` |
| `src/features/*/components/` | Componentes exclusivos de una feature                         | `FormStep`, `OrderResult`     |

**Por qué:** `ui-kit/` debe poder extraerse a cualquier otra app sin traer lógica de Cocos. `TickerAvatar` sabe sobre "tickers" y `ReturnBadge` usa `resolveGainColor` (lógica de ganancias/pérdidas) — son domain-aware, no pertenecen al ui-kit pero sí son reutilizables entre features.

**Señal de alerta:** Si un componente en `src/features/X/` es importado desde `src/features/Y/`, es candidato a moverse a `src/components/`.

---

## 23. Estado persistente de Carteras: Zustand + AsyncStorage

**Decisión:** Las carteras personalizadas se persisten con Zustand `persist` middleware sobre `@react-native-async-storage/async-storage`. El store (`useWalletsStore`) es el único source of truth para `CustomWallet[]`.

```ts
const useWalletsStore = create<WalletsState>()(
  persist(
    (set) => ({
      wallets: [],
      createWallet,
      renameWallet,
      deleteWallet,
      upsertAllocation,
      removeAllocations,
    }),
    { name: 'cocos-wallets', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
```

**Por qué:** Las carteras son estado local del usuario (no viven en el servidor). AsyncStorage es el mecanismo estándar de persistencia en React Native y está soportado nativamente por el middleware de Zustand.

**Trade-off:** Sin sincronización entre dispositivos. Si el usuario reinstala la app, pierde las carteras. Aceptable para una feature de organización personal sin backend propio.

---

## 24. Enriquecimiento de allocations: cross-referencia en hooks

**Decisión:** `useWalletDetail` une las `WalletAllocation[]` del store con los `PortfolioAssetWithMetrics[]` de React Query para construir `EnrichedAllocation[]` (agrega `holding` y `currentValue`). No hay snapshot de precios guardado — el valor siempre refleja el precio de mercado actual.

**Por qué:** Guardar precios históricos en el store complicaría la sincronización y generaría stale data. La unión en el hook es O(n) con un `Map` y se recomputa solo cuando cambia el portfolio o la wallet.

---

## 25. Navegación de Carteras: Stack independiente fuera de tabs

**Decisión:** Las pantallas de Carteras viven en `src/app/wallets/` con su propio Stack (`wallets/_layout.tsx`). El entry point es un `WalletBanner` en el `ListFooterComponent` del FlatList de Portfolio.

```
src/app/wallets/
  _layout.tsx           # Stack (headerShown: false)
  index.tsx             # Lista de carteras
  new.tsx               # Crear cartera
  [id]/
    index.tsx           # Detalle
    add-asset.tsx       # Picker de activos
    [ticker].tsx        # Input de cantidad
    remove-assets.tsx   # Selección para eliminar
    rename.tsx          # Renombrar
```

**Por qué:** Las carteras son un flujo completo con múltiples pasos que no corresponde a un tab. Un Stack independiente mantiene la historia de navegación limpia y permite volver paso a paso.

---

## 26. Estrategia de tests de componentes: React Native Testing Library

**Decisión:** Usar `@testing-library/react-native` (RNTL) para tests de componentes. No se usan Enzyme ni snapshots.

**Por qué:** RNTL obliga a testear desde la perspectiva del usuario: qué texto ve, qué puede presionar. Eso hace los tests resistentes a refactors internos (renombrar una función, cambiar estilos) y detecta regresiones reales. Los snapshots son frágiles y no capturan comportamiento, solo estructura.

**Trade-off:** Requiere más setup que un test de función pura (mocks de Reanimated, vector-icons, expo-router). El costo se paga una sola vez en `src/test-utils/`.

---

## 27. Selección de casos de test para componentes

**Decisión:** Se priorizan tests de comportamiento observable sobre tests de implementación interna.

**Criterio de selección:**

- **Lógica condicional en UI**: botones que se habilitan/deshabilitan según estado (`isSubmitDisabled`, `canSell`, `exceedsHolding`) son el tipo de bug más silencioso — el código compila pero el usuario no puede operar.
- **Navegación por props**: cada `router.push` con un path dinámico (ej. `/wallets/${walletId}/add-asset`) es un contrato que puede romperse si cambia la estructura de rutas.
- **Textos i18n críticos**: las claves de traducción que aparecen en flujos de negocio (errores, CTAs, hints de validación) merecen ser afirmadas para detectar si una clave se borra del JSON o cambia de sentido.

**Qué se descartó y por qué:**

- `ReanimatedSwipeable` → el gesto en sí no se puede simular con `fireEvent`; la lógica real es thin (`onDelete(ticker)`), ya cubierta indirectamente.
- Snapshots → agregan ruido sin valor diferencial en una base de código que cambia activamente.
- Tests de estilos (`StyleSheet`) → no representan comportamiento del usuario.

---

## 28. Colocation: artefactos feature-específicos viven dentro de su feature

**Decisión:** Todo artefacto con un único dueño vive dentro de `src/features/<nombre>/`. El nivel global (`src/services/`, `src/hooks/`, `src/components/`) se reserva exclusivamente para código consumido por 2 o más features o infraestructura compartida (api-client, tipos de dominio).

Las query keys siguen la misma regla: `src/features/market/market.query-keys.ts` define las keys de `instruments` y `search` (propias de market); `src/hooks/query-keys.ts` solo define `portfolio` (cross-feature, usada tanto por `usePortfolioQuery` como invalidada por `useSubmitOrderMutation`).

**Por qué:** La colocation reduce el tiempo de orientación cuando se trabaja en una feature: todos sus artefactos están en un solo lugar. También hace obvio qué se puede borrar sin efecto colateral — si está dentro de una feature, solo esa feature puede depender de ello.

**Trade-off:** Los tabs (`src/app/(tabs)`) importan desde `src/features/order/store/` directamente, cruzando la frontera feature→app. Es el costo aceptable de un store que coordina la apertura del modal desde cualquier pantalla.

---

## 29. Pull-to-refresh en la pantalla de Portfolio

**Decisión:** El `FlatList` de Portfolio tiene un `RefreshControl` que llama a `refetch()` de React Query al hacer el gesto de arrastre hacia abajo. El spinner usa `isRefetching` (no `isLoading`) para distinguir una recarga manual del loading inicial.

**Por qué:** En una app de inversiones los precios cambian constantemente. El pull-to-refresh le da al usuario control explícito sobre cuándo actualizar, complementando el `staleTime` automático de React Query. Usar `isRefetching` en lugar de `isLoading` evita que la pantalla muestre el skeleton durante una recarga — los datos viejos siguen visibles mientras llegan los nuevos.

**Trade-off:** Se eligió no agregar pull-to-refresh en la pantalla de Mercado porque ya tiene búsqueda en tiempo real y el listado se refresca al volver al foco de la pantalla por la política de `staleTime` de React Query.
