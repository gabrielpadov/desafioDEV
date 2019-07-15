import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import TaskList from './src/TaskList';
// import Camera from './src/camera/Camera';
import TesteGeocoder from './src/geolocation/geolocation';
export default function App() {
  return (
    <View style={styles.container}>
     
	<TesteGeocoder />
    </View>
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
