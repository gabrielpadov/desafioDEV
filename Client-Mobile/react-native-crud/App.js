import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ContactList from './src/screens/ContactList';
import ContactCreate from './src/screens/ContactCreate';

const AppNavigator = createStackNavigator({
  ContactList: {
    screen: ContactList,
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
  ContactCreate: {
    screen: ContactCreate,
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
