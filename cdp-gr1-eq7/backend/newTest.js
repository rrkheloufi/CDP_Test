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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const NEW_TEST_ROUTE = '/newTest'
const ADD_ISSUE_ROUTE = '/addIssueTest'
const REMOVE_ISSUE_ROUTE = '/removeIssueTest'
const CREATE_TEST_ROUTE = '/createTest'

const NEW_TEST_VIEW_PATH = '../views/newTest'

const LIST_TESTS_REDIRECT_URL = '/listTests?projectId='

/* TESTS ZONE */
/*const Issue = require('./classes/Issue')
let i1 = new Issue.Issue('i1', 'projectId', 'A', 'description', 'priority', 1)
let i2 = new Issue.Issue('i2', 'projectId', 'B', 'description', 'priority', 1)
let i3 = new Issue.Issue('i3', 'projectId', 'C', 'description', 'priority', 1)
let i4 = new Issue.Issue('i4', 'projectId', 'D', 'description', 'priority', 1)
let i5 = new Issue.Issue('i5', 'projectId', 'E', 'description', 'priority', 1)
let lTest = []
lTest.push(i1)
lTest.push(i2)
lTest.push(i3)
lTest.push(i4)
lTest.push(i5)

function addIssue(id, listIssuesTest) {
  lTest.forEach(issue => {
    if (issue.id == id) {
      listIssuesTest.push(issue)
      console.log('Added to listIssuesTest')
    }
  })
}*/

/* FUNCTIONS */
const DEFAULT_STATE = 'todo'
let sess
let projectId

let listIssuesTest = []

function removeIssue(id, listIssuesTest) {
  listIssuesTest.forEach(issue => {
    if (issue.id == id) {
      let index = listIssuesTest.indexOf(issue)
      listIssuesTest.splice(index, 1)
    }
  })
}

app.get(NEW_TEST_ROUTE, function(req, res) {
  console.log('New Test')
  listIssuesTest = []
  areAdmins = []
  projectId = req.query.projectId
  sess = req.session

  res.render(NEW_TEST_VIEW_PATH, {
    //session: sess,
    listIssuesTest: listIssuesTest
  })
})

app.post(ADD_ISSUE_ROUTE, function(req, res) {
  const issueIdToAdd = req.body.issueIdToAdd
  console.log('Added issue ' + issueIdToAdd)
  //res.redirect(LIST_TESTS_REDIRECT_URL + '110' + '/#collapseAddTest')
  // addIssue(issueIdToAdd, listIssuesTest) // used to test without db

  //listIssuesTest.push(issueIdToAdd)
  res.render(NEW_TEST_VIEW_PATH, {
    session: sess,
    project: sess.project,
    projectId: projectId,
    listIssuesTest: listIssuesTest
  })
})

app.post(REMOVE_ISSUE_ROUTE, function(req, res) {
  const issueIdToRemove = req.body.issueIdToRemove
  console.log('Removed issue ' + issueIdToRemove)

  removeIssue(issueIdToRemove, listIssuesTest)
  res.render(NEW_TEST_VIEW_PATH, {
    session: sess,
    project: sess.project,
    projectId: projectId,
    listIssuesTest: listIssuesTest
  })
})

app.post(CREATE_TEST_ROUTE, function(req, res) {
  const testName = req.body.testName
  const testDescription = req.body.testDescription
  let resultExpected = req.body.testResultExpected
  let lastVersionValidated = req.body.testLastVersionValidated
  console.log('Test ' + testName + ' created')

  db._addTest(
    1,
    'test1',
    'description',
    'expected_result',
    0,
    0,
    '0.0.1',
    'todo'
  )

  /*db._addTestToProject(
    projectId,
    testName,
    testDescription,
    resultExpected,
    lastVersionValidated,
    DEFAULT_STATE,
    listIssuesTest
  ).then(testId => {
    db._addIssuesToTest(testId, listIssuesTest)*/

  res.redirect(LIST_TESTS_REDIRECT_URL + projectId)
  //})
})

module.exports.app = app
