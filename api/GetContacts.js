module.exports = function(app, contacts) {
  app.get('/api/get-contacts', (request, result) => {
    contacts.map((contact, index) => contact['id'] = index)
    result.json(contacts)
  })
}