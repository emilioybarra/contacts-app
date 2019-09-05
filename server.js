const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

const GetContacts = require('./api/GetContacts')
const AddContact = require('./api/AddContact')
const DeleteContact = require('./api/DeleteContact')

app.use(bodyParser.json(), express.static(path.join(__dirname, 'client/build')))

let contacts = [
  {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '0123456789'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '0123456789'
  }
]

GetContacts(app, contacts)
AddContact(app, contacts)
DeleteContact(app, contacts)

app.listen(port)
