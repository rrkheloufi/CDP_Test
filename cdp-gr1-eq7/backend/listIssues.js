/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')
const modifyIssue = require('./modifyIssue')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public'))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)
app.use(modifyIssue.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_ISSUES_ROUTE = '/listIssues'
const REMOVE_ISSUE_ROUTE = '/removeIssue'

const LIST_ISSUES_VIEW_PATH = '../views/listIssues'
const CREATE_ISSUE_ROUTE = '/createIssue'

let listIssues = []
let projectId
let currentProject
let sess

/* FUNCTIONS */

app.get(LIST_ISSUES_ROUTE, function(req, res) {
  listIssues = []
  projectId = req.query.projectId
  sess = req.session

  db._getProjectFromProjectId(projectId).then(result => {
    currentProject = result
    db._getAllProjectIssues(result.id).then(issues => {
      issues.forEach(issue => {
        listIssues.push(issue)
      })
      res.render(LIST_ISSUES_VIEW_PATH, {
        session: sess,
        listIssues: listIssues,
        listProjects: sess.listProjects,
        project: currentProject
      })
    })
  })
})

app.post(REMOVE_ISSUE_ROUTE, function(req, res) {
  console.log('Removed')
  const issueId = req.body.issueId
  db._deleteIssue(issueId)

  res.redirect('back')
})

app.post(CREATE_ISSUE_ROUTE, function(req, res) {
  const issueName = req.body.issueName
  const issueDescription = req.body.issueDescription
  const issuePriority = req.body.issuePriority
  const issueDifficulty = req.body.issueDifficulty

  db._addIssueToProject(
    projectId,
    issueName,
    issueDescription,
    issuePriority,
    issueDifficulty
  )

  res.redirect('back')
})

module.exports.app = app
