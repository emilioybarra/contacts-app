import React from 'react'
import './App.css'
import ContactsList from './components/ContactsList'

export default class App extends React.Component {
  constructor() {
    super()

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  state = {
    contacts: [],
    firstName: '',
    lastName: '',
    phoneNumber: ''
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts () {
    fetch('/api/get-contacts')
      .then(result => result.json())
      .then(contacts => this.setState({ contacts }))
  }

  handleOnChange (e) {
    this.setState({[e.target.name]: e.target.value })
  }

  handleOnSubmit (e) {
    e.preventDefault()
    const { firstName, lastName, phoneNumber } = this.state
    const contact = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber
    }
    fetch('/api/add-contact', {
      method: 'POST',
      body: JSON.stringify(contact),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(result => result.json())
      .then(contacts => this.setState({ contacts }))
      .catch(error => console.error('Error:', error))
  }

  render() {
    const { firstName, lastName, phoneNumber } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <form onSubmit={(e) => this.handleOnSubmit(e)} method='post' className='flex-column'>
            <label>First Name:</label>
            <input name='firstName' type='text' className='has-margin-bottom-10' value={firstName} onChange={this.handleOnChange} />
            <label>Last Name:</label>
            <input name='lastName' type='text' className='has-margin-bottom-10' value={lastName} onChange={this.handleOnChange} />
            <label>Phone Number:</label>
            <input name='phoneNumber' type='text' className='has-margin-bottom-10' value={phoneNumber} onChange={this.handleOnChange} />
            <button type='submit'>Add Contact</button>
          </form>
          <ContactsList contacts={this.state.contacts} />
        </header>
      </div>
    )
  }
}
