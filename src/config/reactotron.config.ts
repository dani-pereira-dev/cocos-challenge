import { Platform } from 'react-native';
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

/**
 * En el emulador de Android, `localhost` apunta al propio emulador.
 * `10.0.2.2` es el alias que mapea a la máquina host donde corre Reactotron.
 */
const REACTOTRON_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

Reactotron.configure({
  name: 'Cocos Challenge',
  host: REACTOTRON_HOST,
})
  .useReactNative({
    networking: {
      /**
       * Ignora rutas internas de Metro y Expo para no contaminar el log de red.
       */
      ignoreUrls: /\/(symbolicate|logs|hot|message)\b/,
    },
  })
  .connect();

/**
 * Expone Reactotron como `console.tron` para logs manuales desde cualquier archivo.
 * Uso: console.tron.log('mi valor') | console.tron.display({...})
 */
console.tron = Reactotron;

export default Reactotron;
