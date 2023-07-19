import React, {useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  CallingState,
  LobbyView,
  useCall,
  useCallCallingState,
} from '@stream-io/video-react-native-sdk';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {theme} from '@stream-io/video-react-native-sdk/dist/src/theme';
import {AuthProgressLoader} from './AuthProgressLoader';
import {NavigationStackParamsList, ScreenTypes} from '../types';
import {ActiveCall} from './ActiveCall';
import {CallErrorComponent} from './CallErrorComponent';

type Props = NativeStackScreenProps<
  NavigationStackParamsList,
  'MeetingScreen'
> & {
  callId: string;
  mode?: string;
};

export const MeetingUI = ({navigation}: Props) => {
  const [show, setShow] = useState<ScreenTypes>('lobby');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const call = useCall();
  const callingState = useCallCallingState();

  const returnToHomeHandler = () => {
    navigation.navigate('JoinMeetingScreen');
  };

  const backToLobbyHandler = () => {
    setShow('lobby');
  };

  const onCallJoinHandler = useCallback(async () => {
    try {
      setShow('loading');
      await call?.join({create: true});
      setShow('active-call');
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error joining call:', error);
        setErrorMessage(error.message);
      }
      setShow('error-join');
    }
  }, [call]);

  const onCallHangupHandler = async () => {
    setShow('loading');
    try {
      if (callingState === CallingState.LEFT) {
        return;
      }
      await call?.leave();
      setShow('lobby');
      navigation.goBack();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error leaving call:', error);
        setErrorMessage(error.message);
      }
      setShow('error-leave');
    }
  };

  let ComponentToRender: JSX.Element | null = null;

  if (show === 'error-join' || show === 'error-leave') {
    ComponentToRender = (
      <CallErrorComponent
        title="Error Joining/Leaving Call"
        message={errorMessage}
        backToLobbyHandler={backToLobbyHandler}
        returnToHomeHandler={returnToHomeHandler}
      />
    );
  } else if (show === 'lobby') {
    ComponentToRender = (
      <LobbyView joinCallButton={{onPressHandler: onCallJoinHandler}} />
    );
  } else if (show === 'loading') {
    ComponentToRender = <AuthProgressLoader />;
  } else if (!call) {
    ComponentToRender = (
      <View style={styles.container}>
        <Text style={styles.errorText}>Lost Active Call Connection</Text>
        <Button title="Return to Home" onPress={returnToHomeHandler} />
        <Button title="Back to Lobby" onPress={backToLobbyHandler} />
      </View>
    );
  } else {
    ComponentToRender = (
      <SafeAreaView style={styles.wrapper}>
        <ActiveCall
          hangUpCallButton={{
            onPressHandler: onCallHangupHandler,
          }}
        />
      </SafeAreaView>
    );
  }

  return ComponentToRender;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.light.static_grey,
  },
  wrapper: {
    flex: 1,
    backgroundColor: theme.light.static_grey,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 30,
    color: 'red',
    textAlign: 'center',
  },
});
