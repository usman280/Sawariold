/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import byMessaging from './components/bgMessaging'


AppRegistry.registerHeadlessTask(
    "RNFirebaseBackgroundMessage",
    () => byMessaging
  );

console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
