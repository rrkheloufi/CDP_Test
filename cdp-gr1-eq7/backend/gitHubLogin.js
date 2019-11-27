/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const bodyParser = require('body-parser')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public'))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

const GITHUB_LOGIN_ROUTE = '/gitHubLogin'

const GITHUB_LOGIN_VIEW_PATH = '../views/gitHubLogin'

const LIST_RELEASES_REDIRECT = '/listReleases?projectId='

let projectId
let project
let sess

app.get(GITHUB_LOGIN_ROUTE, function(req, res) {
  projectId = req.query.projectId
  sess = req.session
  project = sess.project

  res.render(GITHUB_LOGIN_VIEW_PATH, {
    projectId: projectId,
    project: project
  })
})

app.post(GITHUB_LOGIN_ROUTE, function(req, res) {
  const usernameGitHub = req.body.usernameGitHub
  const passwordGitHub = req.body.passwordGitHub

  sess.usernameGitHub = usernameGitHub
  sess.passwordGitHub = passwordGitHub
  req.session = sess

  res.redirect(LIST_RELEASES_REDIRECT.concat(projectId))
})

module.exports.app = app
