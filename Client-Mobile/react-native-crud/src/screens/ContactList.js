import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content, List, ListItem, Text, Icon } from 'native-base';
import axios from 'axios';

export default class ContactList extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    axios({
      method: 'get',
      // url: 'http://200.131.36.177:8080/tasks'
     url: 'http://192.168.0.6:8080/tasks'
    })
      .then(res => {
        this.setState({
          data: res.data.sort((a,b)=> new Date(b.date_start) - new Date(a.date_start))
          .filter(task => task.status.toLowerCase() === "active"),
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        })
      })
  }

  _keyExtractor = (item, index) => item.id.toString();

  handleDelete = (id) => () => {
    axios({
      method: 'delete',
     // url: `http://200.131.36.177:8080/tasks/${id}`
     url: 'http://192.168.0.6:8080/tasks'
    })
      .then(res => {
        this.getData();
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderItem = ({ item, index }) => (
    <ListItem style={ styles.list }
      // onLongPress={this.handleDelete(item.id)}
      onPress={() => this.props.navigation.navigate('ContactCreate', {item})}
    >
      <Content style={ styles.textContent }>
        <Text style={styles.dateText}>{item.date_start}</Text>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text>{item.description}</Text>
      </Content>
      <Icon name="ios-notifications" size={16} style={{ color: item.level }}/>
    </ListItem>
  )

  render() {
    return (
      <Container>
        <Content>
          <List>
            <FlatList
              data={this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={this.renderItem}
              refreshing={this.state.isLoading}
              onRefresh={this.getData}
            />
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  titleText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  list: {
    backgroundColor: '#e0e0e0',
    margin: 4, borderRadius: 8,
    padding: 20
  },
  textContent: {
    padding: 4,
    marginLeft: 2
  }
});
