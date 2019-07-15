import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { RNCamera } from "react-native-camera";

export default Camera = () => {
  const [imageUri, setImageUri] = useState(null);
  takePicture = async () => {
    try {
      if (this.camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true
        };
        const { uri } = await this.camera.takePictureAsync(options);
        setImageUri(uri);

        alert("ok");
      }
    } catch (err) {
      alert(err.message);
    }
  }
  return (
    <RNCamera
      ref={camera => { this.camera = camera; }}
      style={styles.camera}
      type={RNCamera.Constants.Type.front}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      flashMode={RNCamera.Constants.FlashMode.off}
      permissionDialogTitle={"Permission to use camera"}
      permissionDialogMessage={"We need your permission to use your camera phone"}
    >
      <TouchableOpacity onPress={takePicture} style={styles.button}>
        <Text>PICTURE</Text>
      </TouchableOpacity>
    </RNCamera>
  )
}
const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  button: {
    alignSelf: "center",
    backgroundColor: "blue",
    color: "#fff"
  }
});
