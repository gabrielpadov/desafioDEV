import React, { Component, Fragment } from 'react';
import { Container, Form, Item, Fab } from 'native-base';
import { Icon, Input, Content, Button } from 'native-base';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Location, Permissions } from 'expo';
import Toolbar from './Toolbar';
import StylesCam from './styles';

export default class ContactCreate extends Component {

  constructor(props) {
    super(props);
    this.item = null;
    if (props.navigation.state.params && props.navigation.state.params.item) {
      this.item = props.navigation.state.params.item;
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
 }

camera=null;
 state = {
    	hasCameraPermission: null,
	//type: Camera.Constants.Type.back,
 	captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
  };

  componentDidMount() {
	this.checkMultiPermissions();
  
}
async checkMultiPermissions() {
  const { Permissions } = Expo;
  const { status, expires, permissions } = await Permissions.getAsync(Permissions.CAMERA, Permissions.LOCATION)
  if (status !== 'granted') {
    alert('Hey! You heve not enabled selected permissions');
  }else{
	this.getLocationAsync();	
}
}
  getLocationAsync= async()=> {
    //let gpsServiceStatus = Location.getProviderStatusAsync()
     // if (gpsServiceStatus.locationServicesEnabled) {
      // 
       //     this.setState({ hasLocationPermissions: true });

      let location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location.coords),
        latitude: location.coords.latitude, longitude: location.coords.longitude
       });
        let address = await Location.reverseGeocodeAsync(location.coords);
          // console.log(address);
      this.setState({place: JSON.stringify(address)});
    //}else
    //  alert('Location services are disable: GPS')
    }

  handlePhoto = async () => {this.setState({cameraCapture: true })}
handlePhotoOff = async () => {this.setState({cameraCapture: false })}
    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => {this.setState({ capturing: true });}

    handleCaptureOut = () => {
        //console.log(this.state.captures);
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
	 
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: photoData })
        // console.log(photoData);
	this.item.image = photoData.uri;
	console.log(this.item);
this.handlePhotoOff();
/*
            const formData = new FormData();
            formData.append("file",photoData.uri);
           
            axios.post('http://200.131.36.177:8000/upload', 'file',
              formData)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });*/
	this.props.navigation.navigate('ContactCreate', this.item);
	
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
const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {

    return (
      <Container style={styles.container}>

  { !this.state.cameraCapture && 
<Content>
        <Icon name="ios-notifications" size={20} style={{ color: this.state.inputLevel , margin: 20 }}/>
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
    onPress={() => {this.handlePhoto()}}>
    <Icon name="ios-camera" />
  </Fab>


{this.state.cameraCapture &&
<Fragment>
	
          <Camera
                        Type={cameraType}
                        flashMode={flashMode}
                        style={StylesCam.preview}
                        ref={camera => this.camera = camera}
                    />
                
                 <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onShortCapture={this.handleShortCapture}
                />
      
</Fragment>}
      </Container>
    )
  }}
}
const styles = StyleSheet.create({
  container: {
    margin: 3, borderRadius: 8,
    padding: 20, backgroundColor: '#e3f2fd'
  },
  local: {
    fontSize: 8,
    fontWeight: 'bold'
  },
});
