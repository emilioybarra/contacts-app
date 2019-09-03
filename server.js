const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json(), express.static(path.join(__dirname, 'client/build')))

let contacts = [
  {
    firstName: 'Emilio',
    lastName: 'Ybarra',
    phoneNumber: '015737041618'
  },
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

app.listen(port)
