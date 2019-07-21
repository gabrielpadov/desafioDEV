import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Row, Col, Chip, Button} from 'react-materialize';
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
 // console.log(task.id);
  const data = { 
    name: task.name,
    description: task.description,
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
    description: task.description,
    level: task.level,
    details: null,
    image: task.image,
    locate: task.locate,
    date_start: task.date_start,
    date_end: new Date(),
    status: 'Done'
  }
  
  const url = 'http://localhost:8080/tasks/' + task.id;
  axios.put(url, data, httpReqHeaders)
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
    
    <Collapsible accordion={true} style={{backgroundColor: '#e3f2fd'}}>
      
    {this.props.tasks.map((task) => {
          return (
          // eslint-disable-next-line no-unused-expressions
          <CollapsibleItem key={task.id} header={task.name}  style={{'textDecoration': task.status==='Done'?'line-through':'' }}
          icon={task.status === "Done"?"check":task.image?"notification_important":"access_time" } iconClassName={task.level} >   
          <Col className="right">
              <Chip className={task.status==='Done'?'grey':'blue'}>{task.status}</Chip>
            </Col>
            
          <Row>
            <Col l={6} xl={6} m={6} s={12}>
              <label className="title">Begin: <span> {task.date_start}</span></label>
              <label className="title">End: <span>{task.date_end}</span></label>
              <label className="title">Description: <span>{task.description}</span></label>
              <label className="title">Localization: <span>{task.locate}</span></label>
            </Col>
       
          <Col l={6} xl={6} m={6} s={12}>
            { task.image &&
              <img style={{marginTop: '20px', marginBottom:'20px'}} src={task.image?task.image:null} className="img-responsive" alt={task.name} width="310" height="410"/>      
            }
            <Button waves="light" disabled={task.image?task.status === 'Done'?true:false:true} node="a" style={{margin: '2px'}} onClick={(e) => this.onReject(task,e)} >Reject</Button>
            <Button waves="light" disabled={task.image?task.status === 'Done'?true:false:true} node="a" style={{margin: '2px'}} onClick={(e) => this.onDone(task,e)}>Done</Button>
            <Button waves="light" disabled={task.status === 'Done'?true:false} style={{margin: '2px'}} onClick={(e) => this.onDelete(task.id,e)} >Delete</Button>
          </Col>
          </Row>
  </CollapsibleItem>
     ) })}
</Collapsible></div>
         );
 }
}

export default List;
