import React from 'react'
import ContactsList from './components/ContactsList'
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddContact from './components/AddContact'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={ContactsList} />
        <Route exact path='/add-contact' component={AddContact} />
      </Router>
    )
  }
}
