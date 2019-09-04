const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

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

app.get('/api/get-contacts', (request, result) => {
  contacts.map((contact, index) => contact['id'] = index)
  result.json(contacts)
})

app.post('/api/add-contact', (request, result) => {
  const contact = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    phoneNumber: request.body.phoneNumber
  }
  contacts.push(contact)
  result.send(contacts)
})

app.post('/api/delete-contact', (request, result) => {
  const contactId = request.body.contactId
  contacts = contacts.filter(contact => contact.id !== contactId)
  result.send(contacts)
})

app.listen(port)
