import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import TaskList from './src/screens/TaskList';
import TaskUpdate from './src/screens/TaskUpdate';

const AppNavigator = createStackNavigator({
  TaskList: {
    screen: TaskList,
    navigationOptions: {
      title: 'Tasks',
      headerStyle: {
        backgroundColor: '#616161',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  },
  TaskUpdate: {
    screen: TaskUpdate,
    navigationOptions: {
      title: 'Send task',
      headerStyle: {
        backgroundColor: '#616161',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
});

export default createAppContainer(AppNavigator);
