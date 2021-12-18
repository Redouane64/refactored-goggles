const axios = require('axios')
const { Router } = require('express')
const configs = require('../config')

const router = Router({
  caseSensitive: false
})

// auth url
const authUrl = `${configs.GITHUB_AUTH_URL}?client_id=${configs.GITHUB_CLIENT_ID}`

// serve main page
router.get('/auth', (request, response) => {
  response.redirect(authUrl)
})

router.get('/auth_redirect', async (request, response) => {
  const { code } = request.query
  const httpClient = axios.create()
  const githubResponse = await httpClient.get(`https://github.com/login/oauth/access_token?code=${code}&client_id=${configs.GITHUB_CLIENT_ID}&client_secret=${configs.GITHUB_CLIENT_SECRET}`, {
    headers: {
      Accept: 'application/json'
    }
  })

  if (githubResponse.status === 200) {
    const { access_token } = githubResponse.data
    const githubApiResponse = await httpClient.get(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${access_token}`
      }
    })

    if (githubApiResponse.status === 200) {
      return response.json({
        message: `Hello, ${githubApiResponse.data.name}`
      })
    }
  }

  return response.json({
    error: 'something went wrong'
  })
})

module.exports = router