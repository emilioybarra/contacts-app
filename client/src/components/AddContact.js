import React from 'react'
import { Hero, Container, Button } from 'react-bulma-components'
import Navigation from './Navigation'

export default class AddContact extends React.Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleOnChange (e) {
    this.setState({[e.target.name]: e.target.value })
  }

  handleOnSubmit (e) {
    e.preventDefault()
    const self = this
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
      .then(() => self.props.history.push('/'))
      .catch(error => console.error('Error:', error))
  }

  render() {
    const { firstName, lastName, phoneNumber } = this.state
    return (
      <Hero size='fullheight'>
        <Navigation />
        <Hero.Body>
          <Container fluid>
            <form onSubmit={(e) => this.handleOnSubmit(e)} method='post' className='flex-column'>
              <div className='field'>
                <label className='label'>First Name:</label>
                <div className='control'>
                  <input className='input' name='firstName' type='text' value={firstName} onChange={this.handleOnChange} />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Last Name:</label>
                <div className='control'>
                  <input className='input' name='lastName' type='text' value={lastName} onChange={this.handleOnChange} />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Phone Number:</label>
                <div className='control'>
                  <input className='input' name='phoneNumber' type='text' value={phoneNumber} onChange={this.handleOnChange} />
                </div>
              </div>
              <Button color='info' type='submit'>Add Contact</Button>
            </form>
          </Container>
        </Hero.Body>
      </Hero>
    )
  }
}