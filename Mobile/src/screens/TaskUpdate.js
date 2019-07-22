import React, { Component, Fragment } from 'react';
import { Container, Form, Item, Fab } from 'native-base';
import { Icon, Input, Content, Button } from 'native-base';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { Text, View, TouchableOpacity, Platform, Image, Alert} from 'react-native';
import { Camera, Location, Permissions } from 'expo';
import Toolbar from './Toolbar';
import StylesCam from './styles';

// host servidor API Spring
const host = 'http://192.168.0.4:8080/tasks/';
//const host = 'http://200.131.36.177:8080/tasks/';
// host API servidor upload imagens
const hostSendUpload = 'http://192.168.0.4:8000/api/upload';
//const hostSendUpload = 'http://200.131.36.177:8000/api/upload';
const hostUpload = 'http://localhost:8000/'

export default class TaskUpdate extends Component {

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
      inputLocate: this.item && this.item.locate ? this.item.locate: null,
      inputLevel: this.item && this.item.level ? this.item.level: '',
      inputImage: this.item && this.item.image ? this.item.image: null,
      latitude: null, longitude: null,
      place: 'Localizando endereço...',
      error: null,
      locationResult: null, local: null,
      hasLocationPermissions: false,
      cameraCapture: false,
      addressImage: null,
      teste: null
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
    //hasCameraPermission: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
	  this.getLocationAsync();
  }

  getLocationAsync= async()=> {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
        this.alert('Permission to access location was denied')
    }
      this.setState({ hasLocationPermissions: true });
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location.coords),
        latitude: location.coords.latitude, longitude: location.coords.longitude
      });
      const address = await Location.reverseGeocodeAsync(location.coords);
      console.log(address[0])
      const str = address[0].street+', '+address[0].postalCode+'. '+address[0].region+', '+address[0].country;
      //console.log(str)
      this.setState({place: str});
  }

handleShortCapture = async () => {
    const photoData = await this.camera.takePictureAsync({quality: 0.2});
    this.setState({ capturing: false, captures: photoData, inputImage: photoData.uri })
    console.log(photoData)
    this.handlePhotoOff();
  }
  
  handlePhoto = async () => {this.setState({cameraCapture: true })}
  handlePhotoOff = async () => {this.setState({cameraCapture: false })}
  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => {this.setState({ capturing: true });}
  handleCancel = () => {this.setState({ inputImage: null, captures: null, inputLocate: null});this.item.image=null;}
  handleCaptureOut = () => {if (this.state.capturing) this.camera.stopRecording();};

  handleSubmit = () => {
    Alert.alert(
      'Send photo',
      'Are you sure?',
      [
        {text: 'Cancel', onPress: () => this.handleCancel(), style: 'cancel'},
        {text: 'Done', onPress: () => this.Submit()},
      ],
      { cancelable: false },
    )
  }
  
  Submit = () => {    
    if (this.item && this.item.name) {
    
      fetch(hostSendUpload, {
        method: "POST",
        body: this.createFormData(this.state.captures, { userId: "123" })
        })
          .then(response => response.json())
          .then(response => {
            console.log("upload success", response.name[0]);
           
      axios({
        method: 'put',
        url: host+`${this.item.id}`,
        data: {
            name: this.item.name,
            description: this.item.description,
            level: this.item.level,
            details: null,
            image: `${hostUpload}`+response.name[0].path,
            locate: this.state.place,
            date_start: this.item.date_start,
            date_end: new Date(),
            status: this.item.status
        }
      })
        .then(response => {
            alert("Upload success!");
            this.setState({ captures: null});
            this.props.navigation.goBack();
          })
          .catch(error => {
            console.log("upload error", error);
            alert("Upload failed!");
          });  
});
      }else {
      axios({
        method: 'post',
        url: host,
        data: {
          name: this.state.inputName,
        }
      })
      .then(res => {
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
    }
  }
  
  createFormData = (photo, body) => {
    const data = new FormData();
  
    data.append("photo", {
      name: photo.uri,
      type: 'image/jpeg',
      econdig: 'base64',
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
   // console.log(data);
    return data;
  };

  
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
  
  <Content > 
  <Icon name="ios-notifications" style={{ color: this.state.inputLevel , margin: 10 }}/>
    <Form>
    <Item>
      <Input disabled placeholder="DataStart" style={styles.dateText} 
      value={this.state.inputDateStart} onChangeText={(value) => this.setState({inputDateStart: value})} />
    </Item>
      <Text style={styles.titleText}>{this.state.inputName}</Text>
      <Text style={styles.dateText}>{this.state.inputDescription}</Text>
      <Text>Local: </Text>
      <Text>{this.state.place}</Text> 
    <Item>  
    <Image source={{ uri: this.state.inputImage }}
           style={ styles.local} />
      <Text>Image: </Text> 
      <Input disabled placeholder="DateImage" name="image" id="image" type="file" style={{ fontSize: 8 }}
      value={this.state.inputImage} onChangeText={(value) => this.setState({inputImage: value})} />
    </Item>
  </Form>
         
{ this.state.captures &&
  <Fragment>      
    <Button block style={{backgroundColor: 'green', margin: 5}} 
      onPress={this.handleSubmit}>
      <Text>{this.item && this.item.name ? 'Update' : 'Add'}</Text>
    </Button>
  </Fragment>}
  <Fragment>
    <Button block style={{backgroundColor: 'grey', margin: 5}} 
      onPress={()=>{this.handleCancel()}}>
      <Text>Cancel</Text>
    </Button>
  </Fragment>
</Content>
}

{ !this.state.captures && !this.state.cameraCapture && 
  <Fab
    style={{ backgroundColor: 'red' }}
    onPress={() => {this.handlePhoto()}}>
    <Icon name="ios-camera" />
  </Fab>
}

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
    margin: 10, borderRadius: 8,
    padding:10, backgroundColor: '#e3f2fd'
  },
  local: {
    margin: 5, width: 80,
    height: 80, padding: 5
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 5
  },
  titleText:{
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5
  }
});
