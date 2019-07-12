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
            
            <div>
                <label>Level: </label>
                <ul>

        <li >
          
            <input
           
              label="Small"  
              type="radio"
              value="red"
              checked={this.state.level === "red"}
              onChange={this.onChangeLevel }
          
            />
            <label>
            Small
          </label>
        </li>
        
        <li >
          
            <input
            className="form-control"
              type="radio"
              value="yellow"
              checked={this.state.level === "yellow" }
              onChange={this.onChangeLevel}
             
            />
            <label>
            Medium
          </label>
        </li>

        <li >
          
            <input
            className="form-control"
              type="radio"
              value="green"
              checked={this.state.level === "green" }
              onChange={this.onChangeLevel}
             
            />
            <label>
            Large
          </label>
        </li>
      </ul>
       </div>
            
            <div style={{marginTop: '5px'}} className="form-group">
                <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
        </form>
    </div>
            )
        }
    }


/*    initialRegistration:"26/07/2014"

movies.sort(function(a, b) {
    var dateA = new Date(a.release), dateB = new Date(b.release);
    return dateA - dateB;
});


let sortedCars1 = cars.sort((a, b) => new Date(a.initialRegistration.split('/').reverse()) - new Date(...b.initialRegistration.split('/').reverse()));
sortedCars1 = cars.sort((a, b) =>
  a.initialRegistration.split('/').reverse().join().localeCompare(b.initialRegistration.split('/').reverse().join())); 
    let sortedCars = cars.sort((a, b) => Date.parse(new Date(a.initialRegistration.split("/").reverse().join("-"))) - Date.parse(new Date(b.initialRegistration.split("/").reverse().join("-"))));
*/