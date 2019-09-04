import React from 'react'
import { Hero, Container, Box, Media, Content, Level, Button } from 'react-bulma-components'
import Navigation from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default class ContactsList extends React.Component {
  constructor() {
    super()

    this.state = {
      contacts: []
    }

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

  handleOnDelete (e, contactId) {
    e.preventDefault()
    const contact = {
      contactId: contactId
    }
    fetch('/api/delete-contact', {
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
    return (
      <Hero size='fullheight'>
        <Navigation />
        <Hero.Body>
          <Container fluid>
            {this.state.contacts.map(contact =>
              <Box key={contact.id}>
                <Media>
                  <Media.Item renderAs='figure' position='left'>
                    <FontAwesomeIcon icon={faUserCircle} size='3x' />
                  </Media.Item>
                  <Media.Item>
                    <Content>
                      <p>
                        <strong>{contact.firstName} {contact.lastName}</strong>
                        <br />
                        Number: {contact.phoneNumber}
                      </p>
                    </Content>
                    <Level breakpoint='mobile'>
                      <Level.Side align='left'>
                        <Button color='danger' onClick={(e) => this.handleOnDelete(e, contact.id)}>Delete</Button>
                      </Level.Side>
                    </Level>
                  </Media.Item>
                </Media>
              </Box>
            )}
          </Container>
        </Hero.Body>
      </Hero>
    )
  }
}