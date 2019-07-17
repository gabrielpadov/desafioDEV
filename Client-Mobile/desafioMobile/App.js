/*import React from 'react';

// import TaskList from './src/TaskList';
// import Camera from './src/camera/camera';
//import Camera from './src/camera/camera';
// import TesteGeocoder from './src/geolocation/geolocation';
import Upload from './src/camera/upload';
export default function App() {
  return (
    
	<Upload />
   
  );https://levelup.gitconnected.com/react-native-mongodb-stitch-building-a-crud-application-without-a-server-3e4ae0b34d67#34b3
}https://github.com/deeayeen/taskmanagermedium/blob/master/App.js
*/

import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
//import AppNavigator from "./navigation/AppNavigator";
// import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: undefined,
      client: undefined,
      isLoadingComplete: false
    };
    this._loadClient = this._loadClient.bind(this);
  }

  componentDidMount() {
    this._loadClient();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === "android" && <StatusBar barStyle="default" />}
          
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Icon.Ionicons.font,
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  _loadClient() {/*
    Stitch.initializeDefaultAppClient("YOUR APP ID").then(client => {
      this.setState({ client });
      this.state.client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({ currentUserId: user.id });
          this.setState({ currentUserId: client.auth.user.id });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });
        });
    });*/
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
