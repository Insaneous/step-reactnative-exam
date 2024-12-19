import { registerRootComponent } from 'expo';

import App from './app/App';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';

const Chat = () => (
  <Provider store={store}>
    <App />
  </Provider>
);


registerRootComponent(Chat);
