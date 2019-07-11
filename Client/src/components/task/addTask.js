import React, { Component } from 'react';
import axios from 'axios';


export default class AddTask extends Component {

        constructor(props) {
            super(props);
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeDescription = this.onChangeDescription.bind(this);
            this.onChangeLevel = this.onChangeLevel.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
      
            this.state = {
                name: '',
                description: '',
                level: '',
                date_start: new Date().toDateString(),
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
        onChangeLevel(e) {
          this.setState({
           level: e.target.value
          })
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
            console.log(response.date)
        }).catch(error => {
            console.log(error) 
        });      
          
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
            <div className="form-group">
                <label>Level: </label>
                <input type="text" 
                    className="form-control"
                    value={this.state.level}
                    onChange={this.onChangeLevel}
                    />
            </div>
            <div className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary"/>
            </div>
        </form>
    </div>
            )
        }
      }   
   /* handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      
      let formData = new FormData();
      formData.append('name', event.name);
      formData.append('description', event.description);
      formData.append('level', event.level);
      formData.append('date_start', new Date().toDateString());
      formData.append('status', 'Active');
      
      axios({
          method: 'post',
          url: 'http://localhost:3001/tasks',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data' }}
      }).then(function (response) {
          //handle success
          console.log(response)
      }).catch(function (response) {
          //handle error
          console.log(response)
     })
  
      }*/
    