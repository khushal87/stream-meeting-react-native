import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {STREAM_API_KEY} from 'react-native-dotenv';
import {useAppContext} from '../context/AppContext';

export const VideoWrapper = ({children}: PropsWithChildren<{}>) => {
  const {user} = useAppContext();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | undefined>(
    undefined,
  );

  useEffect(() => {
    const _videoClient = new StreamVideoClient({
      apiKey: STREAM_API_KEY,
      user,
      tokenProvider: async () => user?.custom?.token,
    });
    setVideoClient(_videoClient);

    return () => {
      _videoClient.disconnectUser();
      setVideoClient(undefined);
    };
  }, [user]);

  if (!videoClient) {
    return null;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
