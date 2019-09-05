module.exports = function(app, contacts) {
  app.post('/api/add-contact', (request, result) => {
    const contact = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      phoneNumber: request.body.phoneNumber
    }
    contacts.push(contact)
    result.send(contacts)
  })
}
