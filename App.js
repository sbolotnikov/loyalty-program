import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './hooks/useAuth';
import { DimensionsProvider } from './hooks/useDimensions';
import StackNavigator from './StackNavigator';
import { CompetitionProvider } from './hooks/useCompetition'; 

//  need Node 16 and up!!!!!!!!!

export default function App() {
  return ( 
    <NavigationContainer>
      <Provider store={store}>
        <AuthProvider>
            <CompetitionProvider>
              <DimensionsProvider>
                <StackNavigator />
              </DimensionsProvider>
            </CompetitionProvider>
        </AuthProvider>
      </Provider>
    </NavigationContainer> 
  );
}
