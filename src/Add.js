import React, { Component } from 'react'
import { Menu, Button, Checkbox, Form } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import habit from './habitClass.js'
import {observer} from 'mobx-react';

export default class Add extends Component {
	constructor(props) {
		super(props)
		this.state = {name:"", tag:""}
	}
	nameChange = (e) => {
	    this.setState({name: e.target.value});
	}
	tagChange = (e) => {
	    this.setState({tag: e.target.value});
	}
	render() {
	    return (
	    	<div>
		        <Menu size='large'>
				    <Menu.Item>
				      <Link to="/">Back</Link>
				    </Menu.Item>
				</Menu>
				<Form>
				    <Form.Field>
				      <label>New Habit Name</label>
				      <input value={this.state.name} 
				      	placeholder="Enter Habit Name Here" 
				      	onChange={this.nameChange.bind(this)}/>
				    </Form.Field>
				    <Form.Field value={this.state.tag} 
				    	label='Category' control='select'
				    	onChange={this.tagChange.bind(this)}>
				      <option value='Exercise'>Exercise</option>
				      <option value='Work'>Work</option>
				      <option value='Food'>Food</option>
				      <option value='Other'>Other</option>
				    </Form.Field>
				    <Button type='submit' onClick={() => this.props.onSubmit(this.state.name, this.state.tag)}>
				      Submit
				    </Button>
				</Form>
			</div>
	    );
	}
    
}
