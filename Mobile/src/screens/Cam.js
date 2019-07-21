import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import Toolbar from './Toolbar';
import Styles from './styles';
export default class Cam extends React.Component {

  constructor(props) {
    super(props);
    this.item = null;
    if (props.navigation.state.params && props.navigation.state.params.item) {
      this.item = props.navigation.state.params.item;
    }
	console.log(this.item+"cam");
}

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
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

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        //console.log(this.state.captures);
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: photoData })
        // console.log(photoData);
	this.item.image = JSON.stringify(photoData.uri);
	console.log(this.item);
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

  render() {
    const { hasCameraPermission, flashMode, cameraType, capturing } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
                        Type={cameraType}
                        flashMode={flashMode}
                        style={Styles.preview}
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
       </View>
      );
    }
  }
}
