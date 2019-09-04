import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

export default class Navigation extends React.Component {
  constructor () {
    super ()

    this.state = {
      isActive: false
    }

    this.toggleActiveState = this.toggleActiveState.bind(this)
  }

  toggleActiveState () {
    this.setState({ isActive: !this.state.isActive })
  }

  render() {
    const isActive = this.state.isActive
    return (
      <Navbar className='has-background-grey-lighter' fixed='top' active={isActive}>
        <Navbar.Brand>
          <Link to='/' className='navbar-item'>
            <FontAwesomeIcon icon={faAddressBook} size='3x' />
          </Link>
          <Navbar.Burger active={isActive} onClick={this.toggleActiveState} />
        </Navbar.Brand>
        <Navbar.Menu active={isActive}>
          <Navbar.Container position='end'>
            <Link to='/add-contact' className='navbar-item'>
              Add Contact
            </Link>
            <Link to='/' className='navbar-item'>
              Contacts List
            </Link>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    )
  }
}