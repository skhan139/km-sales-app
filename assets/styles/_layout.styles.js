import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  tabBarStyle: Platform.select({
    ios: {
      position: 'absolute', // Use a transparent background on iOS to show the blur effect
    },
    default: {},
  }),
});

export default styles;