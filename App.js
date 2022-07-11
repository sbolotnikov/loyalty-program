import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import Activityscreen from './screens/Activityscreen';
import Calendarscreen from './screens/Calendarscreen';
import Getstarsscreen from './screens/Getstarsscreen';
import Usestarsscreen from './screens/Usestarsscreen';

//  need Node 16 and up!!!!!!!!!
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
    <NavigationContainer>  
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Homescreen} />
          <Stack.Screen name="Activity" component={Activityscreen} />
          <Stack.Screen name="Calendar" component={Calendarscreen} />
          <Stack.Screen name="Getstars" component={Getstarsscreen} />
          <Stack.Screen name="Usestars" component={Usestarsscreen} />
        </Stack.Navigator>
    </NavigationContainer>
    </TailwindProvider>
  );
}
