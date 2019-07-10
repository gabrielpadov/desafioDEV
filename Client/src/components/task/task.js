// Importando o React
import React from "react";
// Importando os components react-materialize
import { Row, Col, Button, Icon, Modal, Collapsible, CollapsibleItem, Chip } from 'react-materialize';
import AddTask from "../addTask/addTask";
import noimage from "../../images/noimage.png";

// eslint-disable-next-line no-unused-vars
const filtro = [];
const OptionLegend = () => <div>
        <Chip className="red">Priority</Chip>
        <Chip className="yellow">Emergency</Chip>
        <Chip className="green">Non-emergency</Chip>
       </div>;

const list = [
  {
    id: 'a',
    name: 'Robin',
    description: 'Wieruchaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaa',
    image: null,
    level: 'red',
    date_start: '01-04-2019',
    date_end: null,
    status: 'Active',
  },
  {
    id: 'b',
    name: 'Dave',
    description: 'Davidds',
    image: null,
    level: 'yellow',
    date_start: '11-02-2019',
    date_end: null,
    status: 'Active',
  },
  {
    id: 'c',
    name: 'Carlo',
    description: 'Smith',
    image: null,
    level: 'green',
    date_start: '01-02-2019',
    date_end: '11-02-2019',
    status: 'Done',
  },
  {
    id: 'c',
    name: 'Carlo',
    description: 'Smith',
    image: null,
    level: 'green',
    date_start: '01-02-2019',
    date_end: '11-02-2019',
    status: 'Done',
  },
  {
    id: 'c',
    name: 'Carlo',
    description: 'Smith',
    image: null,
    level: 'green',
    date_start: '01-02-2019',
    date_end: '11-02-2019',
    status: 'Done',
  }
];

// eslint-disable-next-line no-unused-vars
function filter(){
  // eslint-disable-next-line no-undef
  x = document.getElementById("fname");
  // eslint-disable-next-line no-undef
  this.filtro = this.list.filter(item => item.includes(x));
}

/**
 * funções auxiliares
 */
function onStatus(status) {
  if(status==='Done'){
    return 'grey';
  }
  return 'blue';
}

function onImage(image) {
  if(image == null){
    return noimage;
  }
  return image;
}


const Task = () => (
  <Row>
     <Col m={12} s={12}>
    <Button waves="light" style={{marginRight: '5px'}} href="#addTask" className="blue modal-trigger">
      Task
      <Icon medium left>add_circle</Icon>
    </Button>

    <Modal id="addTask" header="Task">
    <React.Fragment>
        <AddTask/>
        </React.Fragment>
    </Modal>
    </Col>

    <Col m={5} s={12} style={{marginTop: '50px'}}>
     <label>What needs to be done?</label>
     <input type="text" label="Task" id="fname" onKeyUp="filter()" />
      <br />
     <OptionLegend />
    </Col>
  
      <Col m={7} s={12}>
        <h4>To Do</h4>
        <Button waves="light" node="a" style={{marginRight: '5px'}}>Recents</Button>
        <Button waves="light" node="a" style={{marginRight: '5px'}}>Actives</Button>
        <Button waves="light" node="a" style={{marginRight: '5px'}}>Done</Button>

        <Collapsible>

    {list.map(item => (
      <CollapsibleItem header={item.name} icon="notification_important" iconClassName={item.level}>   
          <Row>
          <Col m={12} s={12}>

            <Col m={10} s={12}>
            <div style={{marginLeft: '5px'}}>
              <span className="title">Begin: {item.date_start}</span><br />
              <span className="title">End: {item.date_end}</span>
            </div>
            <p>Description: {item.description}</p>
            </Col>
            <Col m={2} s={12}>
              <Chip className={onStatus(item.status)}>{item.status}</Chip>
            </Col>

            <Col m={12} s={12}>
              <img style={{marginBottom: '20px'}} src={onImage(item.image)} />
            </Col>
         
          <Button waves="light" node="a" style={{marginRight: '5px'}}>Reject</Button>
          <Button waves="light" node="a" style={{marginRight: '5px'}}>Done</Button>
        
          </Col>
          </Row>
      </CollapsibleItem>
    ))}
    </Collapsible>
    </Col>
   
  </Row>
);

export default Task;

