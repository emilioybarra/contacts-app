import React from 'react'
import { Box, Button, Content, Level, Media, Notification } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default class ContactBox extends React.Component {
  handleOnDelete (e) {
    this.props.handleOnDelete(e, this.props.contact.id)
  }

  render() {
    const { contact, error, contactId } = this.props
    return (
      <Box>
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
            <Level>
              <Level.Side align='left'>
                <Button color='danger' onClick={(e) => this.handleOnDelete(e)}>Delete</Button>
              </Level.Side>
            </Level>
            <Level>
              <Level.Side align='left'>
                {
                  error && contactId === contact.id &&
                  <Notification color='danger'>
                    Sorry there was a problem with the network, please try another time.
                    <Button remove onClick={this.props.removeError} />
                  </Notification>
                }
              </Level.Side>
            </Level>
          </Media.Item>
        </Media>
      </Box>
    )
  }
}
