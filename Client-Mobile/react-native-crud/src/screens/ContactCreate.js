import React, { Component } from 'react';
import { Container, Form, Item, Fab } from 'native-base';
import { Icon, Input, Content, Button, TextInput, Text } from 'native-base';
import axios from 'axios';
import {Permissions, Location} from 'expo';
import { StyleSheet } from 'react-native';

export default class ContactCreate extends Component {

  constructor(props) {
    super(props);
    this.item = null;
	this.photo = null;
   
    if (props.navigation.state.params && props.navigation.state.params.item) {
      this.item = props.navigation.state.params.item;
	console.log('1'+this.item);
    }
    if (props.navigation.state.params && props.navigation.state.params.photo) {
      this.photo = props.navigation.state.params.photo;
	console.log('2'+this.photo);
    }
    this.state = {
      inputName: this.item && this.item.name ? this.item.name : '',
      inputDescription: this.item && this.item.description ? this.item.description: '',
      inputDateStart: this.item && this.item.date_start ? this.item.date_start: '',
      inputDateEnd: this.item && this.item.date_end ? this.item.date_end: '',
      inputLocate: this.item && this.item.locate ? this.item.locate: '',
      inputLevel: this.item && this.item.level ? this.item.level: '',
      inputImage: this.item && this.item.image ? this.item.image: '',
      latitude: null,
      longitude: null,
      place: 'Localizando endereço...',
      error: null,
      locationResult: null,
      local: null,
      hasLocationPermissions: false,
      cameraCapture: false
    }
	console.log('3'+this.photo);
	console.log('4'+JSON.stringify(this.item.photo));
	
	// this.item.image=this.photo;
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let gpsServiceStatus = await Location.getProviderStatusAsync()
      if (gpsServiceStatus.locationServicesEnabled) {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
          if (status !== 'granted') {
            this.setState({
              locationResult: 'Permission to access location was denied',
            });
          }else {
            this.setState({ hasLocationPermissions: true });
          }

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location.coords),
        latitude: location.coords.latitude, longitude: location.coords.longitude
       });
        let address = await Location.reverseGeocodeAsync(location.coords);
          // console.log(address);
      this.setState({place: JSON.stringify(address)});
    }else
      alert('Location services are disable: GPS')
    }

  handlePhoto = () => {
    this.setState({
      cameraCapture: true
    })
  }

  handleSubmit = () => {
    if (this.item && this.item.name) {
      axios({
        method: 'put',
        url: `http://200.131.36.177:8080/tasks${this.item.id}`,
        data: {
            name: task.name,
            description: task.description,
            level: task.level,
            details: null,
            image: task.image,
            locate: this.state.place,
            date_start: task.date_start,
            date_end: this.inputDateEnd,
            status: 'Done'
        }
      })
      .then(res => {
        this.props.navigation.goBack();
      })
    } else {
      axios({
        method: 'post',
        url: `http://200.131.36.177:8080/tasks`,
        data: {
          name: this.state.inputName,
        }
      })
      .then(res => {
        this.props.navigation.goBack();
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>

  { !this.state.cameraCapture && <Content>
        <Icon name="ios-notifications" size={20} style={{ color: this.state.level , margin: 20 }}/>
          <Form>
            <Item>
              <Input disabled placeholder="DataStart" value={this.state.inputDateStart} onChangeText={(value) => this.setState({inputDateStart: value})} />
            </Item>
            <Item>
              <Input disabled placeholder="Name" value={this.state.inputName} onChangeText={(value) => this.setState({inputName: value})} />
            </Item>
            <Item>
              <Input disabled placeholder="Description" value={this.state.inputDescription} onChangeText={(value) => this.setState({inputDescription: value})} />
            </Item>
            <Item >
              <Text>Local: </Text><Text style={styles.local}> {this.state.place} </Text>
            </Item>
            <Item last>
              <Text>Image: </Text> 
              <Input disabled placeholder="DateImage" type="file" value={this.item.image} onChangeText={(value) => this.setState({inputImage: value})} />
            </Item>
          </Form>
  { this.item.image &&
    <Fragment>      
    <Button block style={{backgroundColor: '#000', margin: 5}} 
      onPress={this.handleSubmit}>
      <Text>{this.item && this.item.name ? 'Update' : 'Add'}</Text>
    </Button>
    <Button block style={{backgroundColor: '#cc0', margin: 5}} 
      onPress={this.handleCancel}>
      <Text>Cancel</Text>
    </Button>
    </Fragment>}
  </Content>
  }
       
  <Fab
    style={{ backgroundColor: 'red' }}
    onPress={() => this.props.navigation.navigate('Cam', this.item)}>
    <Icon name="ios-camera" />
  </Fab>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 4, borderRadius: 8,
    padding: 20, backgroundColor: '#e3f2fd'
  },
  local: {
    fontSize: 8,
    fontWeight: 'bold'
  },
});
