/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./db_connection')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const PROJECT_OVERVIEW_ROUTE = '/overviewProject'
/*
const LIST_ISSUES_ROUTE = '/listIssues'
const LIST_TASKS_ROUTE = '/listTasks'
const LIST_SPRINTS_ROUTE = '/listSprints'
const MODIFY_ISSUE_REDIRECT_URL = '/listIssues?projectId='
*/

const PROJECT_OVERVIEW_VIEW_PATH = '../views/overviewProject'

let projectId
let listProjects = []
let sess

app.get(PROJECT_OVERVIEW_ROUTE, function(req, res) {
  projectId = req.query.projectId
  db._getProjectFromProjectId(projectId).then(project => {
    projectId = req.query.projectId

    listProjects = []
    sess = req.session
    sess.project = project

    db._getProjectsOfMember(sess.username)
      .then(listProjectsMembers => {
        listProjectsMembers.forEach(element => {
          listProjects.push(element)
        })
      })
      .then(value => {
        sess.listProjects = listProjects
        res.render(PROJECT_OVERVIEW_VIEW_PATH, {
          session: req.session,
          project: sess.project,
          projectId: projectId,
          listProjects: sess.listProjects
        })
      })
  })
})

module.exports.app = app
