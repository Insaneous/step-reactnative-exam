import { registerRootComponent } from 'expo';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './app/App';

const Chat = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </Provider>
);

registerRootComponent(Chat);
