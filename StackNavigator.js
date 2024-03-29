import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import Activityscreen from './screens/Activityscreen';
import Calendarscreen from './screens/Calendarscreen';
import Getstarsscreen from './screens/Getstarscreen';
import Usestarsscreen from './screens/Usestarsscreen';
import LoginScreen from './screens/LoginScreen';
import useAuth from './hooks/useAuth';
import SignupScreen from './screens/SignupScreen';
import ResetScreen from './screens/ResetScreen';
import ScanScreen from './screens/ScanScreen';
import Profilescreen from './screens/Profilescreen';
import ActivitysetScreen from './screens/ActivitysetScreen';
import AddingImagesScreen from './screens/AddingImagesscreen';
import UsersScreen from './screens/UsersScreen';
import MusicPlayerScreen from './screens/MusicPlayerScreen';
import AboutScreen from './screens/AboutScreen';
import CompetitionScreen from './screens/CompetitionScreen';
import CompetitionInfoScreen from './screens/CompetitionInfoScreen';
import CompetitionSmallScreen from './screens/CompetitionSmallScreen';
import CompetitionProgramScreen from './screens/CompetitionProgramScreen';
import CompetitionParticipantsScreen from './screens/CompetitionParticipantsScreen';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    const {currentUser}=useAuth();
    const alternativeStack=(status)=>{
      console.log(status)
           if (status=="student") 
           return <>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Activity" component={Activityscreen} />
        <Stack.Screen name="Calendar" component={Calendarscreen} />
        <Stack.Screen name="Getstars" component={Getstarsscreen} />
        <Stack.Screen name="Usestars" component={Usestarsscreen} />
        <Stack.Screen name="Profile" component={Profilescreen} />
        <Stack.Screen name="Music" component={MusicPlayerScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Heatlists" component={CompetitionInfoScreen} />
        <Stack.Screen name="Program" component={CompetitionProgramScreen} />
        <Stack.Screen name="Participants" component={CompetitionParticipantsScreen} />
      </>
       if (currentUser.status=="teacher") return <>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="CalendarSet" component={AddingImagesScreen} />
        <Stack.Screen name="Profile" component={Profilescreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Music" component={MusicPlayerScreen} />
        <Stack.Screen name="Heatlists" component={CompetitionInfoScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Program" component={CompetitionProgramScreen} />
        <Stack.Screen name="Participants" component={CompetitionParticipantsScreen} />
      </>
       if (currentUser.status=="super") return <>
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="ActivitySet" component={ActivitysetScreen} />
        <Stack.Screen name="CalendarSet" component={AddingImagesScreen} />
        <Stack.Screen name="Getstars" component={Getstarsscreen} />
        <Stack.Screen name="Profile" component={Profilescreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Music" component={MusicPlayerScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Heatlists" component={CompetitionInfoScreen} />
        <Stack.Screen name="Program" component={CompetitionProgramScreen} />
        <Stack.Screen name="Participants" component={CompetitionParticipantsScreen} />
      </>
             if (currentUser.status=="admin") return <>
             <Stack.Screen name="Home" component={Homescreen} />
             <Stack.Screen name="ActivitySet" component={ActivitysetScreen} />
             <Stack.Screen name="CalendarSet" component={AddingImagesScreen} />
             <Stack.Screen name="Getstars" component={Getstarsscreen} />
             <Stack.Screen name="Profile" component={Profilescreen} />
             <Stack.Screen name="Scan" component={ScanScreen} />
             <Stack.Screen name="Users" component={UsersScreen} />
             <Stack.Screen name="Music" component={MusicPlayerScreen} />
             <Stack.Screen name="About" component={AboutScreen} />
             <Stack.Screen name="Competition" component={CompetitionScreen} />
             <Stack.Screen name="Program" component={CompetitionProgramScreen} />
             <Stack.Screen name="Participants" component={CompetitionParticipantsScreen} />
           </>
           if (currentUser.status=="MC") return <>
           <Stack.Screen name="Home" component={Homescreen} />
           <Stack.Screen name="Profile" component={Profilescreen} />
           <Stack.Screen name="Competition" component={CompetitionScreen} />
         </>
    return <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Resetpass" component={ResetScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="CompetitionSmall" component={CompetitionSmallScreen} />
    </>
   
    }
  return (
    <Stack.Navigator  screenOptions={{headerShown: false}} >
    {currentUser && currentUser.email ? (
      alternativeStack(currentUser.status)

    )
 : (
      <>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Resetpass" component={ResetScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="CompetitionSmall" component={CompetitionSmallScreen} />
      </>
    )}
  </Stack.Navigator>
  )
}

export default StackNavigator