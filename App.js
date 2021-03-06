import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';

//  need Node 16 and up!!!!!!!!!


export default function App() {
  return (
      <NavigationContainer>
        <Provider store={store}>
          <AuthProvider>
            <StackNavigator/>
          </AuthProvider>
        </Provider>
      </NavigationContainer>
  );
}
