import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Row, Col, Chip, Button, } from 'react-materialize';
import noimage from "../../images/noimage.png";

class List extends Component {

/**
 * funções auxiliares
 */
onStatus(status) {
  if(status==='Done'){
    return 'grey';
  }
  return 'blue';
}

onImage(image) {
  if(image == null){
    return noimage;
  }
  return image;
}

     render() {
       return (
        <div>
        
        <label>What needs to be done?</label>
        <input type="text" label="Task" id="fname"  />
        <h4>To Do</h4>
        <Button waves="light" node="a" style={{margin: '5px'}}>Recents</Button>
        <Button waves="light" node="a" style={{margin: '5px'}}>Actives</Button>
        <Button waves="light" node="a" style={{margin: '5px'}}>Done</Button>
        
        <Collapsible>
          
        {this.props.tasks.map((task) => {
                    return (
                   // eslint-disable-next-line no-unused-expressions
                   <CollapsibleItem key={task.id} header={task.name} icon="notification_important" iconClassName={task.level}>   
                   <Row>
                   <Col m={12} s={12}>
         
                     <Col m={10} s={12}>
                       <label className="title">Begin: </label><span> {task.date_start}</span><br />
                       <label className="title">End: </label><span>{task.date_end}</span>
                       <label className="title">Description: </label><span>{task.description}</span>
                     </Col>
                     
                     <Col m={2} s={12}>
                       <Chip className={this.onStatus(task.status)}>{task.status}</Chip>
                     </Col>
         
                     <Col m={12} s={12}>
                       
                       <img style={{marginBottom: '20px'}} src={this.onImage(task.image)} alt="description of image"/>
                     </Col>
                  
                   <Button waves="light" node="a" style={{marginRight: '5px'}}>Reject</Button>
                   <Button waves="light" node="a" style={{marginRight: '5px'}}>Done</Button>
                   <Button waves="light" key={task.id} node="a" style={{marginRight: '5px'}}>Delete</Button>
                 
                   </Col>
                   </Row>
               </CollapsibleItem>
         ) })}
             </Collapsible></div>
             );
     }
   }

export default List;
