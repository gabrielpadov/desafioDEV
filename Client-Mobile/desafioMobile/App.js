import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from './src/TaskList';

export default function App() {
  return (
    <View style={styles.container}>
      <TaskList />
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