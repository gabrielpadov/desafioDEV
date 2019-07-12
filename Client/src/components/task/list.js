import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Row, Col, Chip, Button, } from 'react-materialize';
import noimage from "../../images/noimage.png";
import axios from 'axios'; 

class List extends Component {
  
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onReject = this.onReject.bind(this);
    this.onDone = this.onDone.bind(this);
    //this.onRefreshCollapsibleItem = this.onRefreshCollapsibleItem.bind(this);
    this.onRejectRefresh = this.onRejectRefresh.bind(this);
  }

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

onStatusButton(status){
  if(status==='Done'){
    return true;
  }
return false;
}

onDoneRefresh(e){
  e.preventDefault();
  this.props.onDoneRefreshList(e);
}

onRejectRefresh(e){
  e.preventDefault();
  this.props.onRejectRefreshList(e);
}

onDeleteRefresh(e){
  e.preventDefault();
  this.props.onDeleteRefreshList(e);
}

onDelete(id,e) {
  e.preventDefault();
  const httpReqHeaders = {
    'Access-Control-Allow-Origin': '*'
  };
  
  const url = 'http://localhost:8080/tasks/' + id;
  axios.delete(url, httpReqHeaders )
       .then(function (response) {
          //handle success
            console.log(response.status)
        }).catch(error => {
            console.log(error) 
        });       
        this.onDeleteRefresh(e);
}

onReject(task,e) {
  e.preventDefault();
  const httpReqHeaders = {
    'Access-Control-Allow-Origin': '*'
  };
  console.log(task.id);
  const data = { 
    name: task.name,
    description: task.name,
    level: task.level,
    details: null,
    status: task.status,  
    date_start: task.date_start,
    date_end: null,
    image: null,
    locate: null
    
  }
  
  const url = 'http://localhost:8080/tasks/' + task.id;
  axios.put(url, data, httpReqHeaders )
       .then(function (response) {
          //handle success
            console.log(response.status)
            
        }).catch(error => {
            console.log(error) 
        }); 
        console.log('reject')
        this.onRejectRefresh(e);    
}

onDone(task,e) {
  e.preventDefault();
  const httpReqHeaders = {
    'Access-Control-Allow-Origin': '*'
  };
  // console.log(task.id);
  const data = { 
    name: task.name,
    description: task.name,
    level: task.level,
    details: null,
    image: task.image,
    locate: task.locate,
    date_start: task.date_start,
    date_end: new Date().toDateString(),
    status: 'Done'
  }
  
  const url = 'http://localhost:8080/tasks/' + task.id;
  axios.put(url, data, httpReqHeaders )
       .then(function (response) {
          //handle success
            console.log(response.date)
           
        }).catch(error => {
            console.log(error) 
        });       
        this.onDoneRefresh(e); 
}

     render() {
       return (
        <div>
        
        <Collapsible accordion={true}>
          
        {this.props.tasks.map((task) => {
              return (
              // eslint-disable-next-line no-unused-expressions
              <CollapsibleItem key={task.id} header={task.name} icon="notification_important" iconClassName={task.level} 
                >   
              <Row>
              <Col m={12} s={12}>
    
                <Col m={10} s={10}>
                  <label className="title">Begin: </label><span> {task.date_start}</span><br />
                  <label className="title">End: </label><span>{task.date_end}</span><br />
                  <label className="title">Description: </label><span>{task.description}</span>
                </Col>
                
                <Col m={2} s={2}>
                  <Chip className={this.onStatus(task.status)}>{task.status}</Chip>
                </Col>
                
              <div className="center">
                <img style={{marginBottom: '20px'}} src={this.onImage(task.image)} alt="description of image"/>
                    <br/>
                
                <Button waves="light" disabled={this.onStatusButton(task.status)} node="a" style={{margin: '2px'}} onClick={(e) => this.onReject(task,e)} >Reject</Button>
                <Button waves="light" disabled={this.onStatusButton(task.status)} node="a" style={{margin: '2px'}} onClick={(e) => this.onDone(task,e)}>Done</Button>
                <Button waves="light" disabled={this.onStatusButton(task.status)} node="a" style={{margin: '2px'}} onClick={(e) => this.onDelete(task.id,e)} >Delete</Button>
                
                </div>
              </Col>
              </Row>
      </CollapsibleItem>
         ) })}
    </Collapsible></div>
             );
     }
   }

export default List;
