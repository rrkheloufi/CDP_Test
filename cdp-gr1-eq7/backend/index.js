/* CONFIG */
const express = require('express')
const app = express()
const session = require('express-session')

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const INDEX_PATH = '../views/index'

let sess

app.get('/', function(req, res) {
  sess = req.session
  if (sess.username === undefined) {
    res.render(INDEX_PATH)
  } else {
    res.render(INDEX_PATH, {
      session: sess,
      listProjects: sess.listProjects
    })
  }
})

module.exports.app = app
