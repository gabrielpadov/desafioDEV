// src/camera.page.js file
import React from 'react';
import { View, Text, CameraRoll } from 'react-native';

import Toolbar from './toolbar.component';
import Gallery from './gallery.component';
import styles from './styles';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
const axios = require('axios');

export default class CameraPage extends React.Component {
  
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const hasCameraPermission = (camera.status === 'granted' &&
             cameraRoll.status === 'granted');
        this.setState({ hasCameraPermission });
    };
	camera = null;
    state = {
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
        console.log(photoData);

            const formData = new FormData();
            formData.append("file",photoData.uri);
           
            axios.post('http://200.131.36.177:8000/upload', 'file',
              formData)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
         /*    var settings = {
              "url": 'http://200.131.36.177:8000/upload',
              "method": "POST",
              "enctype": 'multipart/form-data',
              "body": formData 
            }
            
            $.ajax(settings).done(function (response) {
              console.log(response);
            });
         
         var form = new FormData();
form.append("img", "/home/usuario/Pictures/gramatica.png");

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:8000/upload",
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PostmanRuntime/7.15.0",
    "Accept": 
    "Cache-Control": "no-cache",
    "Postman-Token": "78c78c51-99e6-4514-ab50-5e253fb0de2e,af8c95c5-3624-4925-a2b6-5dddfeaf47f0",
    "Host": "localhost:8000",
    "cookie": "JSESSIONID=686BD9947003CE2B1B7974D22AC7CBD5",
    "accept-encoding": "gzip, deflate",
    "content-length": "58854",
    "Connection": "keep-alive",
    "cache-control": "no-cache"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
  https://pt.stackoverflow.com/questions/264956/como-passo-enctype-multipart-form-data-pelo-post
https://pt.stackoverflow.com/questions/194455/reactjs-como-executar-chamadas-ajax
https://github.com/axios/axios/issues/710
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
         fetch({
            method: 'POST',
            url: 'http://200.131.36.177:8000/upload',
            headers: {'Content-Type': 'multipart/form-data'},
            body: formData,
            transformRequest: function(data, headersGetterFunction) {
                return data; // do nothing! FormData is very good!
            }*/
        
    }
       /*  try {
           
           const host = 'http://200.131.36.177:8000/upload'
          if (this.state.hasCameraPermission  === true) {
           
            // const formData = new FormData();
            // formData.append('file', photoData.uri );
            
            fetch(host, {
              method: 'POST',
              body: formData
              }),
            
            console.log("Começar form data");
            console.log(formData);
            
          } else {
            console.log("Permissao de camera negada.");
          }
        } catch (err) {
          console.warn(err);
        }
    
       //this.setState({ captures: []});
       // funcao fechar a camera*/

      
      /*

	const image = new FormData();
	
	image.append({
		uri: image.uri,
		type: 'image/jpeg',
		name: `${}_$index.jpg`
	});
	await api.post(


      async uploadFiles() {
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
          promises.push(this.sendRequest(file));
        });
        try {
          await Promise.all(promises);
      
          this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
          // Not Production ready! Do some error handling here instead...
          this.setState({ successfullUploaded: true, uploading: false });
        }
      }
      
      sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);

      req.open("POST", "http://localhost:8000/upload");
      req.send(formData);
    });
  }
      */

    render() {
         const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
		 
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
             <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
{captures.length > 0 && <Gallery captures={captures}/>}
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
            </React.Fragment>
        );
    };
};
