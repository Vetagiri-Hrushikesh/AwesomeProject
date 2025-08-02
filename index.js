import { AppRegistry } from 'react-native';
import App from './App';

console.log('[AwesomeProject] entry loaded');
AppRegistry.registerComponent('AwesomeProject', () => App);

// global error handler (safe guard)
if (global.ErrorUtils) {
  global.ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error('[AwesomeProject] global error:', error, 'isFatal:', isFatal);
  });
}
