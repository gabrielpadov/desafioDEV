import * as React from 'react';
import { Button, Image, Text, View } from 'react-native';
import Camera from './camera';

export default class Upload extends React.Component {
  state = {
    image: null, viewCam: null
  };

  render() {
    let { image, viewCam } = this.state;

    return (
<View>
	      
<Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          title="Pick an image from camera roll"
          onPress={this._pickCam}
        />
     	<Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
	<Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          title="Pick an image from camera roll"
          onPress={this._pickCam}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
 	
	
     
{viewCam && <Camera />}</View>
    );
  }

 // componentDidMount() {
 //   this.getPermissionAsync();
 // }

 // getPermissionAsync = async () => {
  //  if (Constants.platform.ios) {
   //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
     // if (status !== 'granted') {
     //   alert('Sorry, we need camera roll permissions to make this work!');
     // }
  //  }
 // }

_pickCam = async () => {
	this.setState({viewCam: true});
}
  _pickImage = async () => {
  //  let result = await ImagePicker.launchImageLibraryAsync({
    //  mediaTypes: ImagePicker.MediaTypeOptions.All,
   //   allowsEditing: true,
   //   aspect: [4, 3],
   // });

   // console.log(result);

   // if (!result.cancelled) {
      this.setState({ image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_f8zkY5djSp9WsGg_AQ2mq17sw9pEm9q1xk1wMQLYGffH-YN-' });
   // }
  };
}
