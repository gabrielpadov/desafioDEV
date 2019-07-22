import React from 'react';
import { StyleSheet, FlatList, Image} from 'react-native';
import { Container, Content, List, ListItem, Text, Icon } from 'native-base';
import axios from 'axios';
import TimerMixin from 'react-timer-mixin';

mixins: [TimerMixin];


const host = 'http://192.168.0.4:8080/tasks';
//const host = 'http://200.131.36.177:8080/tasks';

export default class TaskList extends React.Component {

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
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentDidMount() {
    this.getData();
    this.interval = setInterval(() => {
      this.getData();//console.log('atualiza');
    }, 10000); //6 seconds
  }

  getData = () => {
    this.setState({
      isLoading: true
    })
    axios({
      method: 'get',
     url: host
    })
      .then(res => {
        this.setState({
          data: res.data.sort((a,b)=> new Date(b.date_start) - new Date(a.date_start))
          .filter(task => task.status.toLowerCase() === "active" && task.image == null),
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
     url: host+id
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
      onPress={() => this.props.navigation.navigate('TaskUpdate', {item})}
    >
      <Content style={ styles.textContent }>
        <Text style={styles.dateText}>{item.date_start}</Text>
        <Text style={styles.titleText}>{item.name}</Text>
        <Text>{item.description}</Text>
      </Content>
      <Icon name="ios-notifications" style={{ color: item.level}}/>
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
    fontSize: 16,
    fontWeight: 'bold'
  },
  list: {
    backgroundColor: '#e3f2fd',
    margin: 4, borderRadius: 8,
    padding: 15
  },
  textContent: {
    padding: 4,
    marginLeft: 2
  }
});
