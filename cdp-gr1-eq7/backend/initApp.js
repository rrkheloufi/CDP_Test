/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')

const signIn = require('./signIn')
const signUp = require('./signUp')
const listProjects = require('./listProjects')
const overviewProject = require('./overviewProject')
const listIssues = require('./listIssues')
const listTasks = require('./listTasks')
const listTests = require('./listTests')
const listSprints = require('./listSprints')
const listReleases = require('./listReleases')
const index = require('./index')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

/* Index */
app.use(index.app)

/* Connexion/deconnexion */
app.use(signIn.app)
app.use(signUp.app)

/* Projects */
app.use(listProjects.app)
app.use(overviewProject.app)

/* Issues */
app.use(listIssues.app)

/* Tasks */
app.use(listTasks.app)

/* Releases */
app.use(listReleases.app)

/* Documentation */

/* Tests */
app.use(listTests.app)

/* Sprints */
app.use(listSprints.app)

/* TESTS ZONE */

const NUM_PORT = 3000

app.listen(NUM_PORT, function() {
  console.log('App listening on port ' + NUM_PORT + '!')
})
