/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/setup.ts'],
  moduleNameMapper: {
    '^react-native-reanimated$': '<rootDir>/src/test-utils/mocks/reanimated.ts',
    '^@expo/vector-icons(.*)?$': '<rootDir>/src/test-utils/mocks/vector-icons.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@ui-kit$': '<rootDir>/ui-kit/index.ts',
    '^@ui-kit/(.*)$': '<rootDir>/ui-kit/$1',
  },
  transformIgnorePatterns: [
    /**
     * pnpm guarda los módulos en node_modules/.pnpm/<pkg@version>/node_modules/<pkg>.
     * Agregamos \.pnpm a las excepciones para que Jest transforme esos archivos también
     * y pueda manejar los módulos ESM como @react-native/jest-preset.
     */
    'node_modules/(?!\\.pnpm|((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
  ],
};
