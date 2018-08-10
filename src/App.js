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
export default class mainPage extends Component {
  constructor(props) {
    super(props);
    this.createCards = this.createCards.bind(this);
    this.addHabit = this.addHabit.bind(this);

  }
  state = { activeItem: 'home', habits:[]}
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
  createCards = () => {
    let cards = []
    // Outer loop to create parent
    for (let i = 0; i < this.state.habits.length; i++) {
      cards.push(
        <Grid.Column>
          <Card fluid 
            centered
            header={this.state.habits[i].name}
            meta={this.state.habits[i].tag}
            description={this.state.habits[i].streak}
          />
        </Grid.Column>)
    }
    return cards
  }
  render() {
    
    const displayHabits = () => (
      <div>
        <Menu size='large'>
          <Menu.Item name='Streak' active={activeItem === 'home'} onClick={this.handleItemClick} />
          
          <Menu.Menu position='right'>
            <Menu.Item>
                <Link to="/add">Add</Link>
            </Menu.Item>
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
            </div>
          </div>
        </Router>
      </div>
    )
  }
}
