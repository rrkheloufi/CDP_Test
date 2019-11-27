/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const session = require('express-session')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')); // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(session({secret: 'shhhhhhared-secret', saveUninitialized: true,resave: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const MODIFY_ISSUE_ROUTE = "/modifyIssue"
const MODIFY_ISSUE_VIEW_PATH = "../views/modifyIssue"

const MODIFY_ISSUE_REDIRECT_URL = '/listIssues?projectId='

let issueId
let projectId
let sess

app.get(MODIFY_ISSUE_ROUTE, function(req, res){
  projectId = req.query.projectId
  issueId = req.query.issueId
  sess = req.session
  db._getProjectFromProjectId(projectId).then(currentProject =>{
    db._getIssueById(issueId).then(issue =>{
      res.render(MODIFY_ISSUE_VIEW_PATH, {
        project: currentProject,
        session: sess,
        issue: issue
      })
    })
  })
})

app.post(MODIFY_ISSUE_ROUTE, function(req, res){
  let newName = req.body.issueName
  let newDescription = req.body.issueDescription
  let newPriority = req.body.issuePriority
  let newDifficulty = req.body.issueDifficulty
  console.log("Issue of id " + issueId + " modified")

  db._modifyIssue(issueId, newName, newDescription, newPriority, newDifficulty).then(result =>{
    res.redirect(MODIFY_ISSUE_REDIRECT_URL + projectId)
  })
})

module.exports.app = app
