import React from 'react'
import ContactsList from './components/pages/ContactsList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddContact from './components/pages/AddContact'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ContactsList} />
          <Route exact path='/add-contact' component={AddContact} />
        </Switch>
      </Router>
    )
  }
}
