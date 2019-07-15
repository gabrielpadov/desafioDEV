import React, { Component } from 'react';
import { 
  AppRegistry, 
  View, 
  Text
} from 'react-native';
import Geocoder from 'react-native-geocoder'; // 0.5.0
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

export default class TesteGeocoder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      place: 'Localizando endereço...',
      error: null,
    };
  }

 componentDidMount() {
Permissions.askAsync(Permissions.LOCATION);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
console.log(position);

     Location.reverseGeocodeAsync(position.coords).then(res => {
      this.setState({ place: res[0].toString() });console.log(res[0]);
    });
   });     /* Geocoder.geocodePosition({ lat: this.state.latitude, lng: this.state.longitude })
          .then(res => {
              this.setState({
                  place: res[0].formatedAddress
              });console.log(res);
          });
      },
      (error) => this.setState({ error: error.message }),
	
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );*/

  }

  render() {
    return (
      <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>{this.state.place.toString()}</Text>
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

AppRegistry.registerComponent('testeGeocoder', () => testeGeocoder);
