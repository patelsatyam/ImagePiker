import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ImagePicker from './ImagePiker';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImagePicker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
