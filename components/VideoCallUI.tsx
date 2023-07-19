import React from 'react';
import {
  CallContentView,
  CallControlsView,
  ParticipantsInfoBadge,
} from '@stream-io/video-react-native-sdk';
import {SafeAreaView, StyleSheet, View} from 'react-native';

export const VideoCallUI = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icons}>
        <ParticipantsInfoBadge />
      </View>
      <CallContentView />
      <CallControlsView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icons: {
    position: 'absolute',
    right: 16,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
});
