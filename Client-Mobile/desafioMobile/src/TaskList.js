import React, { Component } from 'react';
import { ActivityIndicator, Modal, Card, View, FlatList, StyleSheet, Text } from 'react-native';

export default class TaskList extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true,
      dataSource : []
    }
  }

  componentDidMount(){
    //const host = 'http://192.168.0.2:8080/tasks';
    const host = 'http://200.131.36.177:8080/tasks';
    return fetch(host)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.name}, {item.description}</Text>}
          keyExtractor = {(item, index) => index.toString ()}
        
<Modal
animationType="slide"
transparent={true}
visible={this.state.modalVisible}
onRequestClose={this.closeModal} // Used to handle the Android Back Button
>
/>
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

