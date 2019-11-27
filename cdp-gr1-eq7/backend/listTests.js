/* eslint-disable space-before-function-paren */
/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')

const modifyTest = require('./modifyTest')

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
app.use(modifyTest.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_TEST_ROUTE = '/listTests'
const REMOVE_TEST_ROUTE = '/removeTest'
const CREATE_TEST_ROUTE = '/createTest'
const SET_TEST_TO_FAILED = '/setTestToFailed'
const SET_TEST_TO_PASSED = '/setTestToPassed'
const SET_TEST_TO_TODO = '/setTestToTodo'

const LIST_TEST_VIEW_PATH = '../views/listTests'

const DEFAULT_STATE = 'todo'

let listIssuesTest = []
let listIssues = []

let projectId
let sess

/* FUNCTIONS */

function isChecked(req, listIssues) {
  const result = []
  listIssues.forEach(issue => {
    if (req.body['' + issue.id]) {
      result.push(issue.id)
    }
  })
  return result
}

function changeStateTest(req, res, newState) {
  const testId = req.query.testId
  db._updateTestState(testId, newState).then(testId => {
    db._setIssuesToTest(testId, listIssuesTest).then(result => {
      res.redirect('back')
    })
  })
}

app.get(LIST_TEST_ROUTE, function(req, res) {
  projectId = req.query.projectId
  sess = req.session

  listIssuesTest = []
  listIssues = []
  db._getProjectFromProjectId(projectId).then(result => {
    db._getAllProjectIssues(projectId).then(issues => {
      issues.forEach(issue => {
        listIssues.push(issue)
      })
      db._getAllTestsFromProject(projectId).then(listTests => {
        res.render(LIST_TEST_VIEW_PATH, {
          session: sess,
          listTests: listTests,
          project: sess.project,
          listProjects: sess.listProjects,
          listIssuesTest: listIssues
        })
      })
    })
  })
})

app.post(REMOVE_TEST_ROUTE, function(req, res) {
  const testIdToRemove = req.body.testIdToRemove
  db._deleteTest(testIdToRemove).then(result => {
    res.redirect('back')
  })
})

app.post(CREATE_TEST_ROUTE, function(req, res) {
  const testName = req.body.testName
  const testDescription = req.body.testDescription
  const resultExpected = req.body.testResultExpected
  const lastVersionValidated = req.body.testLastVersionValidated

  listIssuesTest = isChecked(req, listIssues)

  db._addTest(
    projectId,
    testName,
    testDescription,
    resultExpected,
    lastVersionValidated,
    DEFAULT_STATE
  ).then(testId => {
    db._setIssuesToTest(testId, listIssuesTest).then(result => {
      res.redirect('back')
    })
  })
})

app.get(SET_TEST_TO_FAILED, function(req, res) {
  changeStateTest(req, res, 'failed')
})

app.get(SET_TEST_TO_PASSED, function(req, res) {
  changeStateTest(req, res, 'passed')
})

app.get(SET_TEST_TO_TODO, function(req, res) {
  changeStateTest(req, res, 'todo')
})

module.exports.app = app
