import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import Activityscreen from './screens/Activityscreen';
import Calendarscreen from './screens/Calendarscreen';
import Getstarsscreen from './screens/Getstarsscreen';
import Usestarsscreen from './screens/Usestarsscreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import SignupScreen from './screens/SignupScreen';
import ResetScreen from './screens/ResetScreen';
import ScanScreen from './screens/ScanScreen';
import Profilescreen from './screens/Profilescreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const {currentUser}=useAuth();
    console.log("current",currentUser);
  return (
    <Stack.Navigator>
    {currentUser && currentUser.email ? (currentUser.status=="student"?(
      <>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Activity" component={Activityscreen} />
        <Stack.Screen name="Calendar" component={Calendarscreen} />
        <Stack.Screen name="Getstars" component={Getstarsscreen} />
        <Stack.Screen name="Usestars" component={Usestarsscreen} />
        <Stack.Screen name="Profile" component={Profilescreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </>
    ):(
      <>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Activity" component={Activityscreen} />
        <Stack.Screen name="Profile" component={Profilescreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </>
    )
    ) : (
      <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Resetpass" component={ResetScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      </>
    )}
  </Stack.Navigator>
  )
}

export default StackNavigator