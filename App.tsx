import React from 'react';
import { Provider } from 'react-redux';
import RootStackNavigation from './src/components/navigation';
import store from './src/store';

const App = () => (
  <Provider store={store}>
    <RootStackNavigation />
  </Provider>
);

export default App;
