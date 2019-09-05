import React from 'react'
import { Hero, Container } from 'react-bulma-components'
import Navigation from '../Navigation'
import ContactBox from '../common/ContactBox'

export default class ContactsList extends React.Component {
  constructor() {
    super()

    this.state = {
      contacts: [],
      contactId: '',
      error: false
    }

    this.removeError = this.removeError.bind(this)
    this.handleOnDelete = this.handleOnDelete.bind(this)
  }

  componentDidMount() {
    this.getContacts()
  }

  getContacts () {
    fetch('/api/get-contacts')
      .then(result => result.json())
      .then(contacts => this.setState({ contacts }))
  }

  removeError () {
    this.setState({ error: false })
  }

  handleOnDelete (e, contactId) {
    e.preventDefault()
    const contact = {
      contactId: contactId
    }

    fetch('/api/delete-contact', {
      method: 'DELETE',
      body: JSON.stringify(contact),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(result => {
        if (result.ok) {
          return result.json()
        } else {
          this.setState({ error: true, contactId: contactId })
        }
        throw new Error('Network response was not ok.')
      })
      .then(contacts => {
        this.setState({ contacts })
      })
      .catch(error => console.error('Error:', error))
  }

  render() {
    const { contacts, error, contactId } = this.state
    return (
      <Hero size='fullheight'>
        <Navigation />
        <Hero.Body>
          <Container fluid>
            {contacts && contacts.map(contact =>
              <ContactBox
                key={contact.id}
                contact={contact}
                error={error}
                contactId={contactId}
                handleOnDelete={this.handleOnDelete}
                removeError={this.removeError}
              />
            )}
          </Container>
        </Hero.Body>
      </Hero>
    )
  }
}
