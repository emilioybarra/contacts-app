import React from 'react'
import { Hero, Container, Button, Notification } from 'react-bulma-components'
import Navigation from '../Navigation'
import InputValidator from '../common/InputValidator.js'
import { ValidatorForm } from 'react-form-validator-core'

export default class AddContact extends React.Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      error: false
    }

    this.removeError = this.removeError.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  removeError () {
    this.setState({ error: false })
  }

  handleOnChange (e) {
    this.setState({ [e.target.name]: e.target.value })
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
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        if (result.ok) {
          return result.json()
        } else {
          this.setState({ error: true })
        }
        throw new Error('Network response was not ok.')
      })
      .then(() => self.props.history.push('/'))
      .catch(error => console.error('Error:', error))
  }

  render() {
    const { firstName, lastName, phoneNumber, error } = this.state
    return (
      <Hero size='fullheight'>
        <Navigation />
        <Hero.Body>
          <Container fluid>
            <ValidatorForm onSubmit={(e) => this.handleOnSubmit(e)} method='post' className='flex-column'>
              <InputValidator
                label='First Name:'
                name='firstName'
                value={firstName}
                validators={['required']}
                onChange={this.handleOnChange}
                errorMessages={['This field is required']}
              />
              <InputValidator
                label='Last Name:'
                name='lastName'
                value={lastName}
                validators={['required']}
                onChange={this.handleOnChange}
                errorMessages={['This field is required']}
              />
              <InputValidator
                label='Phone Number:'
                name='phoneNumber'
                value={phoneNumber}
                validators={['required', 'isNumber']}
                onChange={this.handleOnChange}
                errorMessages={['This field is required', 'This must be a phone number']}
              />
              {
                error &&
                <Notification color='danger'>
                  Sorry there was a problem with the network, please try another time.
                  <Button remove onClick={this.removeError} />
                </Notification>
              }
              <Button color='info' type='submit'>Add Contact</Button>
            </ValidatorForm>
          </Container>
        </Hero.Body>
      </Hero>
    )
  }
}
