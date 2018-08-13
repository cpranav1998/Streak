import React, { Component } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'
import { Grid, Image, Segment } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import RouteWithProps from './routeWithProps'
import Add from './Add';
import habit from './habitClass.js'
import { db } from './firebase'
import Login from "./Login";
import SignUp from "./SignUp";

export default class mainPage extends Component {
  constructor(props) {
    super(props);
    this.createCards = this.createCards.bind(this);
    this.addHabit = this.addHabit.bind(this);
    this.state = { activeItem: 'home', habits:[], mode: 'add'}
  }
  componentDidMount() {
    db
      .doc('habitData/Habit')
      .get()
      .then(doc => this.setState({habits: doc.data().habits}))
  }
  componentDidUpdate() {
    db.doc('habitData/Habit').set({habits: this.state.habits})
  }
  addHabit(name, tag) {
    var newHabits = this.state.habits
    newHabits.push({
      name: name,
      tag: tag,
      streak: 0,
      maxstreak: 0
    })
    this.setState({
      habits: newHabits
    });
    console.log(this.state.habits)
  }
  handleItemClick = (e, { name }) => {
    console.log('The link was clicked.');
    console.log(this.state.test)
    this.setState({ activeItem: name })
    
  }
  alterHabit(i) {
    if(this.state.mode == 'add') {
      this.state.habits[i].streak = this.state.habits[i].streak + 1
      this.forceUpdate() 
    } else if(this.state.mode == 'delete') {
      let oldhabits = this.state.habits.slice()
      oldhabits.splice(i,1)
      this.state.habits = oldhabits
      this.forceUpdate() 
    }
    
  }
  createCards = () => {
    let cards = []
    // Outer loop to create parent
    for (let i = 0; i < this.state.habits.length; i++) {
      cards.push(
        <Grid.Column>
          <Card fluid 
            centered
            header={this.state.habits[i].name}
            description={this.state.habits[i].streak}
            onClick = {() => this.alterHabit(i)}/>
        </Grid.Column>)
    }
    return cards
  }
  whichMenu = () => {
    if(this.state.mode == 'add') {
      return (
        <Grid textAlign='center' columns={2}>
          <Grid.Row stretched>
            <Grid.Column>
              <Menu.Item>
                <Link to="/" onClick = {()=> {this.setState({mode:'delete'}); 
                this.forceUpdate()}}>Delete</Link>
              </Menu.Item>
            </Grid.Column>
            <Grid.Column>
              <Menu.Item>
                <Link to="/add">Add</Link>
              </Menu.Item>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else if(this.state.mode == 'delete') {
      return (
        <Menu.Item>
            <Link to="/" onClick = {()=> {this.setState({mode: 'add'});
            this.forceUpdate() }}>Done</Link>
        </Menu.Item>
      )
    }
  }
  render() {
    
    const displayHabits = () => (
      <div>
        <Menu size='large'>
          <Menu.Item name='Streak' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            {this.whichMenu()}
          </Menu.Menu>
        </Menu>
        <Grid stackable padded columns={3}>
          {this.createCards()}
        </Grid>
      </div>
    )
    const { activeItem } = this.state

    return (
      <div>
        <Router>
          <div>
            <div>
              <RouteWithProps path="/add" exact={true} component={Add} onSubmit = {this.addHabit}/>
              <Route path="/" exact={true} component={displayHabits} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}
