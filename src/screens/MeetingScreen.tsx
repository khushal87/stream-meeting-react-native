import React, {useEffect, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';

import {MeetingUI} from '../components/MeetingUI';
import {NavigationStackParamsList} from '../types';

type Props = NativeStackScreenProps<NavigationStackParamsList, 'MeetingScreen'>;

export const MeetingScreen = (props: Props) => {
  const {route} = props;

  const client = useStreamVideoClient();
  const callType = 'default';
  const {
    params: {callId},
  } = route;
  const call = useMemo<Call | undefined>(() => {
    if (!client) {
      return undefined;
    }
    return client.call(callType, callId);
  }, [callId, callType, client]);

  useEffect(() => {
    call?.getOrCreate().catch(err => {
      console.error('Failed to get or create call', err);
    });
  }, [call]);

  if (!call) {
    return null;
  }

  return (
    <StreamCall call={call}>
      <MeetingUI callId={callId} {...props} />
    </StreamCall>
  );
};
