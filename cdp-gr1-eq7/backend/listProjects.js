/* CONFIG */
const express = require('express')
const app = express()
const session = require('express-session')

/* REQUIRED */
const path = require('path')
const ejs = require('ejs')
let bodyParser = require('body-parser')
const db = require('./db_connection')
const newProject = require('./newProject')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')); // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(newProject.app)
app.use(session({secret: 'shhhhhhared-secret', saveUninitialized: true,resave: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_PROJECTS_ROUTE = '/listProjects'
const REMOVE_PROJECT_ROUTE = '/removeProject'

const LIST_PROJECTS_VIEW_PATH = '../views/listProjects'

let sess
let listProjects = []

/* TESTS ZONE */
/*let user = new member.Member ('User5', 'pwd1', [])
let p1 = new project.Project ('p1', 'p1', 'id1', [], user)
user.listProjects.push (p1)

let m2 = new member.Member ('m2', 'pwd1', [])
let p2 = new project.Project ('p2', 'p2', 'id2', [], m2)
user.listProjects.push (p2)*/

/* FUNCTIONS */

function removeProject (id, listProjects){
  listProjects.forEach(project => {
    if (project.id == id){
      let index = listProjects.indexOf (project)
      listProjects.splice (index, 1)
    }
  })
}

app.get (LIST_PROJECTS_ROUTE, function (req, res){
    listProjects = []
    sess = req.session

    db._getProjectsOfMember(sess.username).then(listProjectsMembers => {
        listProjectsMembers.forEach(element => {
            listProjects.push(element)
        })

        res.render(LIST_PROJECTS_VIEW_PATH, {
            session: sess,
            listProjects: listProjects,
        })
    })
})
// require newProject here causes an error if newProject requireq listProjects too
/*app.get (NEW_PROJECT_ROUTE, function (req, res){
  res.render (NEW_PROJECT_VIEW_PATH)
})*/

app.post (REMOVE_PROJECT_ROUTE, function (req, res){
  const projectId = req.body.projectId;
  removeProject (projectId, listProjects)

  res.render (LIST_PROJECTS_VIEW_PATH, {
    session: sess,
    listProjects: listProjects,
  })
  db._deleteProject(projectId)
})

module.exports.app = app
