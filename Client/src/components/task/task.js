// Importando o React
import React from "react";
// Importando os components necessários da lib react-materialize
import { Row, Col, Button, Icon, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import AddTask from "../addTask/addTask";

// eslint-disable-next-line no-unused-vars
const filtro = [];
const list = [
  {
    id: 'a',
    firstname: 'Robin',
    lastname: 'Wieruch',
    year: 1988,
  },
  {
    id: 'b',
    firstname: 'Dave',
    lastname: 'Davidds',
    year: 1990,
  },
];

// eslint-disable-next-line no-unused-vars
function filter(){
  // eslint-disable-next-line no-undef
  x = document.getElementById("fname");
  // eslint-disable-next-line no-undef
  this.filtro = this.list.filter(item => item.includes(x));
}

const Task = () => (
  <Row>
     <Col m={12} s={12}>
    <Button waves="light" style={{marginRight: '5px'}} href="#addTask" className="modal-trigger">
      Task
      <Icon medium left>add_circle</Icon>
    </Button>

    <Modal id="addTask" header="Task">
        <AddTask/>
    </Modal>
    </Col>

    <Col m={4} s={12} style={{marginTop: '50px'}}>
     <label>O que tem para fazer?</label>
     <input type="text" label="First Name" id="fname" onKeyUp="filter()" />
    </Col>
  
      <Col m={8} s={12}>
        <h5>To Do</h5>
        <Collapsible>


    {list.map(item => (
      <CollapsibleItem header={item.id} icon="filter_drama">
      <li key={item.id}>
        <div>{item.id}</div>
        <div>{item.firstname}</div>
        <div>{item.lastname}</div>
        <div>{item.year}</div>
      </li>
      </CollapsibleItem>
    ))}
    </Collapsible>
  
    </Col>
   
  </Row>
);

export default Task;

