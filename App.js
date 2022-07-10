import { Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/homescreen';
import Activityscreen from './screens/activityscreen';
import Calendarscreen from './screens/calendarscreen';
import Getstarsscreen from './screens/getstarsscreen';
import Usestarsscreen from './screens/usestarsscreen';

//  need Node 16 and up!!!!!!!!!
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
    <NavigationContainer>  
        <Stack.Navigator>
          <Stack.Screen name="home" component={Homescreen} />
          <Stack.Screen name="activity" component={Activityscreen} />
          <Stack.Screen name="calendar" component={Calendarscreen} />
          <Stack.Screen name="getstars" component={Getstarsscreen} />
          <Stack.Screen name="usestars" component={Usestarsscreen} />
        </Stack.Navigator>
    </NavigationContainer>
    </TailwindProvider>
  );
}
