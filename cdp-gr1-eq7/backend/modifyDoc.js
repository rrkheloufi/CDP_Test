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
app.use(express.static('../public'))
app.use(
  session({
    secret: 'shhhhhhared-secret',
    saveUninitialized: true,
    resave: true
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const MODIFY_DOC_ROUTE = '/modifyDoc'
const MODIFY_DOC_VIEW_PATH = '../views/modifyDoc'

const MODIFY_DOC_REDIRECT_URL = '/listReleases?projectId='

let releaseId
let projectId
let sess
let docOldUrl

app.get(MODIFY_DOC_ROUTE, function(req, res) {
  projectId = req.query.projectId
  releaseId = req.query.releaseId
  sess = req.session

  db._getDocById(releaseId).then(doc => {
    docOldUrl = doc.url

    res.render(MODIFY_DOC_VIEW_PATH, {
      docUrl: doc.url,
      project: sess.project,
      session: sess,
      releaseId: releaseId
    })
  })
})

app.post(MODIFY_DOC_ROUTE, function(req, res) {
  const docUrl = req.body.docUrl

  if (docOldUrl === '') {
    db._addDocToRelease(releaseId, docUrl)
  } else {
    db._updateDoc(releaseId, docUrl)
  }
  res.redirect(MODIFY_DOC_REDIRECT_URL + projectId)
})

module.exports.app = app
