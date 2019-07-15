import React, { Component } from 'react';
import { 
  AppRegistry, 
  View, 
  Text
} from 'react-native';
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
      locationResult: null,
      hasLocationPermissions: false
    };
  }
/*
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
      this.setState({ place: res[0] });
      console.log(res[0]);
    });
   });    
  }*/
  componentDidMount() {
    this._getLocationAsync();
  }


  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location.coords),
    latitude: location.coords.latitude, longitude: location.coords.longitude });
   console.log(location);
   console.log(this.state.locationResult);

  let address = await Location.reverseGeocodeAsync(location.coords);
  console.log(address);
  this.setState({place: JSON.stringify(address)});
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
