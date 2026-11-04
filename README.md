# Cocos Challenge — App Fintech

App móvil desarrollada con **Expo / React Native** para el challenge técnico de Cocos Capital. Permite visualizar instrumentos del mercado, consultar el portafolio personal, enviar órdenes de compra y venta, y gestionar carteras personalizadas.

> Las funcionalidades implementadas están en [FEATURES.md](./FEATURES.md). La arquitectura está en [ARCHITECTURE.md](./ARCHITECTURE.md). Las decisiones técnicas están en [DECISIONS.md](./DECISIONS.md).

---

## Probar la app en Android (sin instalar nada)

Podés instalar la app directamente en cualquier dispositivo Android descargando el APK desde el siguiente link:

**[Descargar APK](https://expo.dev/accounts/danielpereira19861978/projects/cocos-challenge/builds/4d740482-a026-43cb-b155-d00686959a6f)**

### Pasos para instalar

1. Abrí el link desde el navegador del celular Android
2. Descargá el APK
3. Si el sistema pide permiso, habilitá **Instalar apps de fuentes desconocidas** (Ajustes → Seguridad) y confirmá la instalación
4. Abrí la app desde el cajón de aplicaciones

> No requiere cuenta de Expo, Node.js ni ningún entorno de desarrollo.

---

## Ejecutar en local

Las siguientes instrucciones son para correr el proyecto en un entorno de desarrollo local.

### Requisitos previos

| Herramienta | Versión mínima | Cómo instalar                    |
| ----------- | -------------- | -------------------------------- |
| Node.js     | 20 LTS         | [nodejs.org](https://nodejs.org) |
| pnpm        | 10             | `npm install -g pnpm`            |

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

| Herramienta | Cómo instalar                              |
| ----------- | ------------------------------------------ |
| Xcode       | App Store (incluye el simulador de iPhone) |
| CocoaPods   | `sudo gem install cocoapods --no-document` |

#### Prerrequisitos Android

| Herramienta    | Cómo instalar                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------ |
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

> El archivo `.env` está en `.gitignore`; `.env.example` sí se versiona como referencia.
