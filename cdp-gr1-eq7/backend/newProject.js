/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db_connection')
const listIssues = require('./listIssues')
const listTasks = require('./listTasks')
const listSprints = require('./listSprints')

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

app.use(listIssues.app)
app.use(listTasks.app)
app.use(listSprints.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const NEW_PROJECT_ROUTE = '/newProject'
const ADD_MEMBER_ROUTE = '/addMember'
const REMOVE_MEMBER_ROUTE = '/removeMember'
const CREATE_PROJECT_ROUTE = '/createProject'
const PROJECT_OVERVIEW_ROUTE = '../overviewProject'

const NEW_PROJECT_VIEW_PATH = '../views/newProject'
const PROJECT_OVERVIEW_VIEW_PATH = '../views/overviewProject'

const DEFAULT_GITHUB = ''

/* TESTS ZONE */

/* FUNCTIONS */
let sess

let listMembers = []
let areAdmins = []

function removeMember(username, listMembers) {
  listMembers.forEach(member => {
    if (member === username) {
      let index = listMembers.indexOf(member)
      listMembers.splice(index, 1)
    }
  })
}

app.get(NEW_PROJECT_ROUTE, function(req, res) {
  listMembers = []
  areAdmins = []
  sess = req.session

  res.render(NEW_PROJECT_VIEW_PATH, {
    session: sess,
    listMembers: listMembers
  })
})

app.post(ADD_MEMBER_ROUTE, function(req, res) {
  const memberUsernameToAdd = req.body.memberUsernameToAdd
  console.log('Added member ' + memberUsernameToAdd)

  listMembers.push(memberUsernameToAdd)
  res.render(NEW_PROJECT_VIEW_PATH, {
    session: sess,
    listMembers: listMembers
  })
})

app.post(REMOVE_MEMBER_ROUTE, function(req, res) {
  const memberUsernameToRemove = req.body.memberUsernameToRemove
  console.log('Removed member ' + memberUsernameToRemove)

  removeMember(memberUsernameToRemove, listMembers)
  res.render(NEW_PROJECT_VIEW_PATH, {
    session: sess,
    listMembers: listMembers
  })
})

app.post(CREATE_PROJECT_ROUTE, function(req, res) {
  const projectName = req.body.projectName
  const projectDescription = req.body.projectDescription
  console.log('Project ' + projectName + ' created')

  for (i = 0; i < listMembers.length; i++) {
    areAdmins.push(0)
  }

  listMembers.push(sess.username)
  areAdmins.push(1)

  db._createProject(
    projectName,
    projectDescription,
    DEFAULT_GITHUB,
    DEFAULT_GITHUB
  ).then(projectId => {
    db._inviteMembersToProject(projectId, listMembers, areAdmins)

    db._getProjectFromProjectId(projectId).then(newProject => {
      res.render(PROJECT_OVERVIEW_VIEW_PATH, {
        session: sess,
        project: newProject,
        projectId: projectId
      })
    })
  })
})

module.exports.app = app
