import React from 'react'

export default class ContactsList extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.contacts.map((contact, index) =>
            <li key={index}>
              First Name: {contact.firstName}
              <br />
              Last Name: {contact.lastName}
              <br />
              Phone Number: {contact.phoneNumber}
              <br />
            </li>
          )}
        </ul>
      </div>
    )
  }
}