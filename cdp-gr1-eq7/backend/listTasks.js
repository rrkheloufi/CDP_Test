/* CONFIG */
const express = require('express')
const app = express()

/* REQUIRED */
const path = require('path')
const bodyParser = require('body-parser')
const db = require('./db_connection')
const newTask = require('./newTask')

/* USE THE REQUIRES */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../public')) // Mettre l'URL du dossier 'public' par rapport a initApp.js
app.use(newTask.app)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './..', '/views'))

const LIST_TASKS_PATH = '../views/listTasks.ejs'
const NEW_TASK_PATH = '../views/newTask.ejs'

let sess

let listIssues
let listProjectMembers
let listProjectTasks

app.get('/newTask', function(req, res) {
  listIssues = []
  listProjectMembers = []
  listProjectTasks = []
  sess = req.session

  db._getAllProjectIssues(req.query.projectId).then(result => {
    listIssues = result
    db._getMembersOfProject(req.query.projectId).then(result => {
      listProjectMembers = result
      db._getAllTasksOfProject(req.query.projectId).then(result => {
        listProjectTasks = result
        res.render(NEW_TASK_PATH, {
          listIssues: listIssues,
          listProjectMembers: listProjectMembers,
          listProjectTasks: listProjectTasks,
          projectId: req.query.projectId
        })
      })
    })
  })
})

app.post('/newTask', function(req, res) {
  db._addTask(
    req.query.projectId,
    req.body.taskName,
    req.body.taskDescription,
    req.body.taskState,
    req.body.startDate,
    req.body.taskDuration,
    req.body.taskDoD,
    req.body.taskMember,
    req.body.taskMember,
    req.body.taskRequired,
    req.body.taskIssue
  ).then(res.redirect('/listIssues?projectId='.concat(req.query.projectId)))
})

/* Test values
let taskList = [];
const testTask1 = new tasks.Task("2", "1", "Task 1", "Desc task 1", "To Do", "", "", "", [], [])
const testTask2 = new tasks.Task("2", "2", "Task 2", "Desc task 2", "Doing", "", "", "", [], [])
const testTask3 = new tasks.Task("2", "3", "Task 3", "Desc task 3", "Done", "", "", "", [], [])

taskList.push(testTask1)
taskList.push(testTask2)
taskList.push(testTask3) */

let taskToDo
let taskDoing
let taskDone

app.get('/listTasks', function(req, res) {
  taskToDo = []
  taskDoing = []
  taskDone = []
  sess = req.session

  db._getAllTasksOfProjectByState(req.query.projectId, 'To Do').then(result => {
    taskToDo = result
    db._getAllTasksOfProjectByState(req.query.projectId, 'Doing').then(
      result => {
        taskDoing = result
        db._getAllTasksOfProjectByState(req.query.projectId, 'Done').then(
          result => {
            taskDone = result
            res.render(LIST_TASKS_PATH, {
              taskToDo: taskToDo,
              taskDoing: taskDoing,
              taskDone: taskDone,
              projectId: req.query.projectId,
              session: sess,
              project: sess.project,
              listProjects: sess.listProjects
            })
          }
        )
      }
    )
  })
})

app.post('/removeTask', function(req, res) {
  db._deleteTask(req.query.taskId).then(
    res.redirect('/listTasks?projectId='.concat(req.query.projectId))
  )
})

module.exports.app = app
