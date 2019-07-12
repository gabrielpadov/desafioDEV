// Importando o React
import React from "react";
// Importando os components react-materialize
import { Row, Col,Button, Icon, Modal} from 'react-materialize';
import { Chip } from 'react-materialize';
//import AddTask from './addTask';
import List from './list';
import axios from 'axios';
import AddTask from "./addTask";


const API_URL = 'http://localhost:8080';


class Tasks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.loadTasks = this.loadTasks.bind(this);
  }

  async loadTasks() {
    const url = `${API_URL}/tasks/`;
    
     axios.get(url).then(response => {
      this.setState({ tasks: response.data });
      console.log(response.data)
      console.log(response.status)

    }).catch(error => {
      console.log(error.response)
      
  });
  
  }
  
  componentDidMount() {
    this.loadTasks();
  }

render() {
  return (
  <Row>
     <Col m={12} s={12}>
    <Button waves="light" href="#addTask" className="blue modal-trigger">
      Task
      <Icon medium left>add_circle</Icon>
    </Button>

    <Modal id="addTask" header="Task" >
    
    <AddTask /> 
        
    </Modal>
    </Col>

    <Col m={5} s={12} style={{marginTop: ''}}>
     <br />
      <div className="center">
        <Chip className="white-text red">Priority</Chip>
        <Chip className="white-text yellow">Emergency</Chip>
        <Chip className="white-text green">Non-emergency</Chip>
       </div>
    </Col>
  
      <Col m={7} s={12}>
        <List tasks={this.state.tasks}/>  
    </Col>
   
  </Row>
);
    }
  }
export default Tasks;
