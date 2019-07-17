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
      tasks: [],
      taskList: [],
      input: ''
    };
    this.loadTasks = this.loadTasks.bind(this);
    this.onRecentsTask = this.onRecentsTask.bind(this);
    this.onOldsTask = this.onOldsTask.bind(this);
    this.onActivesTask = this.onActivesTask.bind(this);
    this.onDoneTask = this.onDoneTask.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  async loadTasks() {
    const url = `${API_URL}/tasks/`;
    
     axios.get(url).then(response => {
      this.setState({ tasks: response.data,
        taskList: response.data.sort((a,b)=> new Date(b.date_start) - new Date(a.date_start)) });
          console.log(response.status)
        }).catch(error => {
          console.log(error.response) 
    });
  }
  
  componentDidMount() {
    this.loadTasks();
  }

 onRecentsTask(e){
  e.preventDefault();
    this.loadTasks();
  }

  onOldsTask(e){
    e.preventDefault();
    this.setState({
      taskList : this.state.tasks.sort((a,b)=> new Date(a.date_start) - new Date(b.date_start))
    })
  }
  onDoneTask(e){
    e.preventDefault();
    this.setState({
      taskList : this.state.tasks.sort((a,b)=> new Date(b.date_start) - new Date(a.date_start))
      .filter(task => task.status.toLowerCase() === "done")})
  }

  onActivesTask(e){
    e.preventDefault();
    this.setState({
      taskList : this.state.tasks.sort((a,b)=> new Date(b.date_start) - new Date(a.date_start))
      .filter(task => task.status.toLowerCase() === "active")
    })
  }

  onChangeInput(e){
   e.preventDefault();
   
      const updatedList = this.state.tasks.filter((item) => item.name.toLowerCase().search(
          e.target.value.toLowerCase()) !== -1);

      this.setState({
          taskList: updatedList
      })
  }

  onAddTaskRefreshListClick(e){
    e.preventDefault();
    this.loadTasks();
  }

  onRejectRefreshListClick(e){
    e.preventDefault();
    this.onActivesTask(e)
  } 

  onDeleteRefreshListClick(e){
    e.preventDefault();
    this.onRecentsTask(e)
  } 

  onDoneRefreshListClick(e){
    e.preventDefault();
    this.onDoneTask(e)
  } 

render() {
  return (
  <Row>
     <Col m={12} s={12}>
    <Button waves="light" href="#addTask" className="blue modal-trigger">
      Task
      <Icon medium left>add_circle</Icon>
    </Button>

    <Modal id="addTask" header="Task">
    
    <AddTask onAddTaskRefreshList={this.onAddTaskRefreshListClick.bind(this)} /> 
        
    </Modal>
    </Col>

    <Col m={5} s={12} style={{marginTop: '5px'}}>
     <br />
      <div className="center">
        <Chip className="grey-darken-2-text red">Priority</Chip>
        <Chip className="grey-darken-2-text yellow">Emergency</Chip>
        <Chip className="grey-darken-2-text green">Non-emergency</Chip>
       </div>
    </Col>
  
      <Col m={7} s={12}>
      
      <label>What needs to be done?</label>
        <input type="text" label="Task" id="fname" onChange={this.onChangeInput} />
        <h4>To Do</h4>
        <div className="center">
          <Button waves="light" node="a" style={{margin: '2px'}} onClick={this.onRecentsTask}>Recents</Button>
          <Button waves="light" node="a" style={{margin: '2px'}} onClick={this.onOldsTask}>Olds</Button>
          <Button waves="light" node="a" style={{margin: '2px'}} onClick={this.onActivesTask}>Actives</Button>
          <Button waves="light" node="a" style={{margin: '2px'}} onClick={this.onDoneTask}>Done</Button>
        </div>
        <List tasks={this.state.taskList} onDeleteRefreshList={this.onDeleteRefreshListClick.bind(this)} 
            onDoneRefreshList={this.onDoneRefreshListClick.bind(this)} 
            onRejectRefreshList={this.onRejectRefreshListClick.bind(this)} />  
    </Col>
  </Row>
    );
  }
}
export default Tasks;
