const express = require('express')
const app = express()
const db = require('./db_connection')
const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const SIGNUP_ROUTE = '/signUp'
const SIGNUP_VIEW_PATH = '../views/signUp'
const SIGNIN_VIEW_PATH = '../views/signIn'
const STORE_USER = '/signUp'

app.get(SIGNUP_ROUTE, function(req, res) {
  res.render(SIGNUP_VIEW_PATH)
})

app.post(STORE_USER, function(req, res) {
  const username = req.body.username
  const password = req.body.password
  const confirmedPassword = req.body.confirmedPassword

  if (password === confirmedPassword) {
    db._doesUsernameExists(username).then(userExists => {
      if (!userExists) {
        db._storeMember(username, password).then(() => {
          res.render(SIGNIN_VIEW_PATH)
        })
      } else {
        res.render(SIGNUP_VIEW_PATH, {
          errorUsernameTaken: true
        })
      }
    })
  } else {
    res.render(SIGNUP_VIEW_PATH, {
      errorSamePasswords: true
    })
  }
})

module.exports.app = app
