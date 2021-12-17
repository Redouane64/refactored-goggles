const axios = require('axios')
const { Router } = require('express')
const path = require('path')

const router = Router({
  caseSensitive: false
})

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '127.0.0.1'

const GITHUB_AUTH_URL = process.env.GITHUB_AUTH_URL
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

// auth url
const authUrl = `${GITHUB_AUTH_URL}?client_id=${GITHUB_CLIENT_ID}`

// serve main page
router.get('/auth', (request, response) => {
  response.redirect(authUrl)
})

router.get('/auth_redirect', async (request, response) => {
  const { code } = request.query
  const httpClient = axios.create()
  const githubResponse = await httpClient.get(`https://github.com/login/oauth/access_token?code=${code}&client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}`, {
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