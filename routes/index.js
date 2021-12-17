const { Router } = require('express')
const path = require('path')

const router = Router({
  caseSensitive: false
})

// serve main page
router.get('/', (request, response) => {

  response.sendFile(path.join(__dirname, '/public/index.html'))
})

module.exports = router