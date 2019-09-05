module.exports = function(app, contacts) {
  app.delete('/api/delete-contact', (request, result) => {
    const contactId = request.body.contactId
    contacts = contacts.filter(contact => contact.id !== contactId)
    result.send(contacts)
  })
}
