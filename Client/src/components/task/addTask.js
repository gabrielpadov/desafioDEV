import React, { Component } from 'react';
import axios from 'axios';

export default class AddTask extends Component {

        constructor(props) {
            super(props);
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeDescription = this.onChangeDescription.bind(this);
            this.onChangeLevel = this.onChangeLevel.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.onSubmitAdd = this.onSubmitAdd.bind(this);
                        
            this.state = {
                name: '',
                description: '',
                level: 'green',
                date_start: new Date(),
                status: 'Active'
                
            }
        }
        onChangeName(e) {
          this.setState({
            name: e.target.value
          });
        }
        onChangeDescription(e) {
          this.setState({
            description: e.target.value
          })  
        }
        onChangeLevel(e,_String) {
          console.log(_String);

          this.setState({
           level: _String
          })
        }

      onSubmitAdd(e){
        //e.preventDefault();
        this.props.onAddTaskRefreshList(e);
      }
      
      onSubmit(e) {
          e.preventDefault();
          
         const obj = {
            name: this.state.name,
            description: this.state.description,
            level: this.state.level,
            date_start: this.state.date_start,
            status: this.state.status
          };
          console.log(obj);

      axios.post('http://localhost:8080/tasks', obj)
        .then(function (response) {
          //handle success
            console.log(response.status)
        }).catch(error => {
            console.log(error) 
        });      
        this.onSubmitAdd(e);
          
          this.setState({
            name: '',
            description: '',
            level: ''
          })
        }
          
       
render() {
return (
    <div style={{ marginTop: 10 }}>
        
        <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Name:  </label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={this.state.name}
                    onChange={this.onChangeName}
                    />
            </div>
            <div className="form-group">
                <label>Description: </label>
                <input type="text" 
                    className="form-control"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    />
            </div>
            
            <div>
                <label>Level: </label>
                <ul>
                  <li >
                      <input
                        label="Small"  
                        type="radio"
                        value="red"
                        checked={this.state.level === "red"}
                      />
                      <label onClick={(e)=>this.onChangeLevel(e,"red")}>
                      Priority
                    </label>
                  </li>   
                  <li >
                      <input
                      className="form-control"
                        type="radio"
                        value="yellow"
                        checked={this.state.level === "yellow" }          
                      />
                      <label onClick={(e)=>this.onChangeLevel(e,"yellow")}>
                      Emergency
                    </label>
                  </li>
                  <li >
                      <input
                      className="form-control"
                        type="radio"
                        value="green"
                        checked={this.state.level === "green" }                    
                      />
                      <label onClick={(e)=>this.onChangeLevel(e,"green")}>
                      Non-Emergency
                    </label>
                  </li>
                </ul>
            </div>
            
            <div style={{marginTop: '5px'}} className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary"  />
            </div>
        </form>
    </div>
            )
        }
    }
