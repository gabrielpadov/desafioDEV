import React, { Component } from 'react';
import {RadioGroup} from 'react-materialize';

export default class AddTask extends Component {
  
  //var event = new Date('August 19, 1975 23:15:30 UTC');

// var jsonDate = event.toJSON()

  state = {
    name: '',
    description: '',
    level: '',
    status: '',
    date_start: ''

}

handleFormSubmit( event ) {
    event.preventDefault();
    console.log(this.state);
}

render(){
    return (
    
    <form>
        <label>Name</label>
        <input type="text" name="name" value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}/>

        <label>Description</label>
        <input type="text" name="email" value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}/>

        <label>Country</label>
            <RadioGroup  name="level"  label="T-Shirt Size"  
            options={[{label: 'Priority',value: 'red'},{label: 'Emergency',value: 'yellow'},{label: 'Non-emergency',value: 'green'}]}
            value={this.state.country} onChange={e => this.setState({ country: e.target.value })}/>

        <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
    </form>);
}

}