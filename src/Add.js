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
	onSubmit () {
		this.props.appState.updateHabits();
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
				      <input placeholder="Enter Habit Name Here" />
				    </Form.Field>
				    <Form.Field label='Category' control='select'>
				      <option value='Exercise'>Exercise</option>
				      <option value='Work'>Work</option>
				      <option value='Food'>Food</option>
				      <option value='Other'>Other</option>
				    </Form.Field>
				    <Button type='submit' onClick={this.onSubmit.bind(this)}>
				      Submit
				    </Button>
				</Form>
			</div>
	    );
	}
    
}
