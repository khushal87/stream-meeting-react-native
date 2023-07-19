/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider, useAppContext} from './src/context/AppContext';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStackParamsList} from './src/types';
import {UsersList} from './src/components/UsersList';
import {JoinMeetingScreen} from './src/screens/JoinMeetingScreen';

import {MeetingScreen} from './src/screens/MeetingScreen';
import {NavigationHeader} from './src/components/NavigationHeader';
import {VideoWrapper} from './src/components/VideoWrapper';

const Stack = createNativeStackNavigator<NavigationStackParamsList>();

const Root = () => {
  const {user} = useAppContext();
  if (!user) {
    return <UsersList />;
  }

  return (
    <VideoWrapper>
      <Stack.Navigator>
        <Stack.Screen
          name="JoinMeetingScreen"
          component={JoinMeetingScreen}
          options={{header: NavigationHeader}}
        />
        <Stack.Screen
          name="MeetingScreen"
          component={MeetingScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </VideoWrapper>
  );
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <AppProvider>
        <Root />
      </AppProvider>
    </NavigationContainer>
  );
}

export default App;
