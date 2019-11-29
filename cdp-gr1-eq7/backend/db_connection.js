/* eslint-disable camelcase */
var mysql = require('mysql')
var bcrypt = require('bcrypt')

const Project = require('./classes/Project')
const Issue = require('./classes/Issue')
const Task = require('./classes/Task')
const Test = require('./classes/Test')
const Sprint = require('./classes/Sprint')
const Doc = require('./classes/Doc')

// https://stackoverflow.com/questions/30545749/how-to-provide-a-mysql-database-connection-in-single-file-in-nodejs

var con

setTimeout(function() {
  con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'cdp_db',
    multipleStatements: true
  })

  con.connect(function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected!')
    }
  })
}, 20000)

// TODO : checker les paramètres vides

// ================ Projects ================

function _createProject(name, description, userGitHub, repositoryGitHub) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO project (name, description, userGitHub, repositoryGitHub) VALUES ('.concat(
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(userGitHub),
      ',',
      con.escape(repositoryGitHub),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

function _modifyProject(
  projectId,
  name,
  description,
  userGitHub,
  repositoryGitHub
) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE project SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' userGitHub = ',
      con.escape(userGitHub),
      ',',
      ' repositoryGitHub = ',
      con.escape(repositoryGitHub),
      ' WHERE id = ',
      con.escape(projectId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

function _deleteProject(id) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM project WHERE id = '.concat(con.escape(id))
    con.query(sql, function(err, result) {
      if (err) resolve(err)
      resolve('Project Deleted')
    })
  })
}

function _inviteMembersToProject(projectId, usernameList, areAdminsList) {
  return new Promise(function(resolve, reject) {
    if (usernameList.length !== areAdminsList.length) {
      reject(
        new Error(
          'The usernameList and the areAdminsList lenght must be the same'
        )
      )
    }
    let i
    let sql = ''
    for (i = 0; i < usernameList.length; i++) {
      sql = sql.concat(
        'INSERT INTO project_team (project_id, username, is_admin) VALUES (',
        con.escape(projectId),
        ',',
        con.escape(usernameList[i]),
        ',',
        con.escape(areAdminsList[i]),
        ');\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Members added')
    })
  })
}

function _deleteMembersFromProject(projectId, usernameList) {
  return new Promise(function(resolve, reject) {
    let i
    let sql = ''
    for (i = 0; i < usernameList.length; i++) {
      // TODO: check if the user is not the admin of the project
      sql = sql.concat(
        'DELETE FROM project_team WHERE project_id = ',
        con.escape(projectId),
        ' and username = ',
        con.escape(usernameList[i]),
        ';\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Members deleted')
    })
  })
}

function _getMembersOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM project_team WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].username)
      }
      resolve(id_list)
    })
  })
}

function _getAdminsOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM project_team WHERE project_id = '.concat(
      con.escape(project_id),
      " and is_admin = '1'"
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].username)
      }
      resolve(id_list)
    })
  })
}

// ================ Members ================
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f

function _storeMember(username, password) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(password, 10, function(err, hashedPassword) {
      if (err) throw err
      const sql = 'INSERT INTO member (username, password) VALUES ('.concat(
        con.escape(username),
        ',',
        con.escape(hashedPassword),
        ')'
      )
      con.query(sql, function(err, result) {
        if (err) {
          reject(err)
          return
        }
        resolve(result.insertId)
      })
    })
  })
}

function _getProjectsIdsOfMember(username) {
  return new Promise(function(resolve, reject) {
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    const sql = 'SELECT project_id FROM project_team WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].project_id)
      }
      resolve(id_list)
    })
  })
}

function _getProjectFromProjectId(project_id) {
  return new Promise(function(resolve, reject) {
    _getMembersOfProject(project_id).then(
      members => {
        _getAdminsOfProject(project_id).then(
          admins => {
            const p = new Promise(function(resolve, reject) {
              const sql = 'SELECT * FROM project WHERE id = '.concat(
                con.escape(project_id)
              )
              con.query(sql, function(err, result) {
                if (err) {
                  reject(err)
                  return
                }
                const project = new Project.Project(
                  result[0].id,
                  result[0].name,
                  result[0].description,
                  members,
                  admins,
                  result[0].userGitHub,
                  result[0].repositoryGitHub
                )
                resolve(project)
              })
            })
            p.then(projects => {
              resolve(projects)
            })
          },
          raison => {
            reject(raison)
          }
        )
      },
      raison => {
        reject(raison)
      }
    )
  })
}

function _getProjectsOfMember(username) {
  return new Promise(function(resolve, reject) {
    _getProjectsIdsOfMember(username).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getProjectFromProjectId(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(project_list) {
          resolve(project_list)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

function _getTaskIdsAssignedToMember(username) {
  return new Promise(function(resolve, reject) {
    // TODO: Vérifier si le couple user/project_id n'existe pas déjà
    const sql = 'SELECT task_id FROM assigned_task WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].task_id)
      }
      resolve(id_list)
    })
  })
}

function _areUsernameAndPasswordCorrect(username, password) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM cdp_db.member WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      if (result.length === 0) {
        resolve(false)
        return
      }
      const hashedPassword = result[0].password
      bcrypt.compare(password, hashedPassword, function(err, result) {
        if (err) reject(err)
        if (result === true) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  })
}

function _doesUsernameExists(username) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM member WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      if (result.length === 0) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

function _deleteMember(username) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM member WHERE username = '.concat(
      con.escape(username)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Member deleted')
    })
  })
}

// ================ Issues ================

function _addIssueToProject(
  projectId,
  name,
  description,
  priority,
  difficulty
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO issue (project_id, name, description, priority, difficulty) VALUES ('.concat(
      con.escape(projectId),
      ',',
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(priority),
      ',',
      con.escape(difficulty),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

function _modifyIssue(issueId, name, description, priority, difficulty) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE issue SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' priority = ',
      con.escape(priority),
      ',',
      ' difficulty = ',
      con.escape(difficulty),
      ' WHERE id = ',
      con.escape(issueId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

function _getAllProjectIssues(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM issue WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const issue_list = []
      for (let i = 0; i < result.length; i++) {
        issue_list.push(
          new Issue.Issue(
            result[i].id,
            result[i].project_id,
            result[i].name,
            result[i].description,
            result[i].priority,
            result[i].difficulty
          )
        )
      }
      resolve(issue_list)
    })
  })
}

function _deleteIssue(issueId) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM issue WHERE id = '.concat(con.escape(issueId))
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issue removed')
    })
  })
}

function _getIssueById(issueId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM issue WHERE id = '.concat(con.escape(issueId))
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const issue = new Issue.Issue(
        result[0].id,
        result[0].project_id,
        result[0].name,
        result[0].description,
        result[0].priority,
        result[0].difficulty
      )
      resolve(issue)
    })
  })
}

// ================ Tasks ================

function _getAllTasksIdsByProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM task WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

function _getAllTasksIdsByProjectAndState(project_id, state) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM task WHERE project_id = '.concat(
      con.escape(project_id),
      ' AND state = ',
      con.escape(state)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

function _getTaskById(task_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesOfTask(task_id).then(
      issues => {
        _getMembersAssignedToTask(task_id).then(members => {
          _getTaskDependencies(task_id).then(dependencies => {
            const sql = 'SELECT * FROM task WHERE id = '.concat(
              con.escape(task_id)
            )
            con.query(sql, function(err, result) {
              if (err) reject(err)
              const task = new Task.Task(
                result[0].id,
                result[0].project_id,
                result[0].name,
                result[0].description,
                result[0].state,
                result[0].start_date,
                result[0].realisation_time,
                result[0].description_of_done,
                dependencies,
                members,
                issues
              )
              resolve(task)
            })
          })
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

function _getAllTasksOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    _getAllTasksIdsByProject(project_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTaskById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

function _getAllTasksOfProjectByState(project_id, state) {
  return new Promise(function(resolve, reject) {
    _getAllTasksIdsByProjectAndState(project_id, state).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTaskById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

function _addTask(
  projectId,
  name,
  description,
  state,
  date_beginning,
  realisation_time,
  DoD,
  dependencies /* list of task id */,
  members /* list username */,
  issues /* list of issue id */
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO task (project_id, name, description, state, start_date, realisation_time, description_of_done) VALUES ('.concat(
      con.escape(projectId),
      ',',
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(state),
      ',',
      con.escape(date_beginning),
      ',',
      con.escape(realisation_time),
      ',',
      con.escape(DoD),
      ');'
    )
    con.query(sql, function(err, result) {
      if (err) throw err
      console.log('New task added')
      const taskId = result.insertId
      _setTaskDependencies(taskId, dependencies).then(
        _setTaskToMembers(taskId, members).then(_setTaskToIssue(taskId, issues))
      )
    })
  })
}

function _modifyTask(
  taskId,
  name,
  description,
  state,
  startDate,
  realisationTime,
  DoD
) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' state = ',
      con.escape(state),
      ',',
      ' start_date = ',
      con.escape(startDate),
      ',',
      ' realisation_time = ',
      con.escape(realisationTime),
      ',',
      ' description_of_done = ',
      con.escape(DoD),
      ' WHERE id = ',
      con.escape(taskId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

function _setTaskDependencies(taskId, dependsOnTasksIdList) {
  return new Promise(function(resolve, reject) {
    var sql = 'DELETE FROM task_dependencies WHERE task_id = '.concat(
      con.escape(taskId),
      ';\n'
    )
    if (dependsOnTasksIdList) {
      for (let i = 0; i < dependsOnTasksIdList.length; i++) {
        sql = sql.concat(
          'INSERT INTO task_dependencies (task_id, depend_on_task_id) VALUES (',
          con.escape(taskId),
          ',',
          con.escape(dependsOnTasksIdList[i]),
          '); \n'
        )
      }
      con.query(sql, function(err, result) {
        if (err) reject(err)
        resolve('New dependencies added')
      })
    } else {
      resolve('No dependency to add')
    }
  })
}

function _setTaskToMembers(taskId, usernameList) {
  // TODO : check if username exists
  return new Promise(function(resolve, reject) {
    let i
    let sql = 'DELETE FROM assigned_task WHERE task_id = '.concat(
      con.escape(taskId),
      ';\n'
    )
    if (usernameList) {
      if (typeof usernameList === 'string') {
        sql = sql.concat(
          'INSERT INTO assigned_task (task_id, username) VALUES (',
          con.escape(taskId),
          ',',
          con.escape(usernameList),
          ');\n'
        )
      } else {
        for (i = 0; i < usernameList.length; i++) {
          sql = sql.concat(
            'INSERT INTO assigned_task (task_id, username) VALUES (',
            con.escape(taskId),
            ',',
            con.escape(usernameList[i]),
            ');\n'
          )
        }
      }
      con.query(sql, function(err, result) {
        if (err) reject(err)
        resolve('Task assigned to members')
      })
    } else {
      resolve('No member to assign the task')
    }
  })
}

function _getMembersAssignedToTask(taskId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT username FROM assigned_task WHERE task_id = '.concat(
      con.escape(taskId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].username)
      }
      resolve(id_list)
    })
  })
}

function _getTaskDependencies(taskId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM task WHERE id IN (SELECT depend_on_task_id FROM task_dependencies WHERE task_id ='.concat(
      con.escape(taskId),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const deps = []
      for (let i = 0; i < result.length; i++) {
        deps.push(
          new Task.Task(
            result[i].id,
            result[i].project_id,
            result[i].name,
            result[i].description,
            result[i].state,
            result[i].start_date,
            result[i].realisation_time,
            result[i].description_of_done,
            [],
            [],
            []
          )
        )
      }
      resolve(deps)
    })
  })
}

function _updateTaskState(taskId, state) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task SET state = '.concat(state, ' WHERE id = ', taskId)
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

function _deleteTask(taskId) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM task WHERE id = '.concat(con.escape(taskId))
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issue removed')
    })
  })
}

function _setTaskToIssue(task_id, issueId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    var sql = 'DELETE FROM issue_of_task WHERE task_id = '.concat(
      con.escape(task_id),
      ';\n'
    )
    if (issueId_list) {
      for (i = 0; i < issueId_list.length; i++) {
        sql = sql.concat(
          'INSERT INTO issue_of_task (task_id, issue_id) VALUES (',
          con.escape(task_id),
          ',',
          con.escape(issueId_list[i]),
          ');\n'
        )
      }
      con.query(sql, function(err, result) {
        if (err) reject(err)
        resolve('Issues linked to task')
      })
    } else {
      resolve('No issues to link')
    }
  })
}

function _getIssuesIdsOfTask(task_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT issue_id FROM issue_of_task WHERE task_id = '.concat(
      con.escape(task_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].issue_id)
      }
      resolve(id_list)
    })
  })
}

function _getIssuesOfTask(task_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesIdsOfTask(task_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getIssueById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

// ================ Checklist ================

function _setTaskChecklist(taskId, description, isDone) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO task_checklist (task_id, description, is_done) VALUES ('.concat(
      con.escape(taskId),
      ',',
      con.escape(description),
      ',',
      con.escape(isDone),
      ');\n'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve('Task assigned to members')
    })
  })
}

function _modifyTaskDescription(checklistId, description) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task_checklist SET '.concat(
      'description = ',
      con.escape(description),
      '  WHERE id = ',
      con.escape(checklistId)
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve('Task modified')
    })
  })
}

function _modifyTaskState(checklistId, isDone) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE task_checklist SET '.concat(
      'is_done = ',
      con.escape(isDone),
      ' WHERE id = ',
      con.escape(checklistId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

function _getTaskChecklist(task_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM task_checklist WHERE task_id = '.concat(
      con.escape(task_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push([result[i].description, result[i].is_done])
      }
      resolve(id_list)
    })
  })
}

function _getChecklistItemById(itemId) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM task_checklist WHERE id = '.concat(
      con.escape(itemId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push([result[i].id, result[i].description, result[i].is_done])
      }
      resolve(id_list)
    })
  })
}

// ================ Tests ================

function _addTest(
  projectId,
  name,
  description,
  expected_result,
  last_version_validated,
  state
) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO test (project_id, name, description, expected_result, last_version_validated, state) VALUES ('.concat(
      '',
      con.escape(projectId),
      ',',
      con.escape(name),
      ',',
      con.escape(description),
      ',',
      con.escape(expected_result),
      ',',
      con.escape(last_version_validated),
      ',',
      con.escape(state),
      '',
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        console.log('New test added')
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

function _getTestById(test_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesOfTest(test_id).then(
      issues => {
        const sql = 'SELECT * FROM test WHERE id = '.concat(con.escape(test_id))
        con.query(sql, function(err, result) {
          if (err) reject(err)
          const test = new Test.Test(
            result[0].id,
            result[0].project_id,
            result[0].name,
            result[0].description,
            result[0].expected_result,
            result[0].last_version_validated,
            result[0].state,
            issues
          )
          resolve(test)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

function _setIssuesToTest(test_id, issueId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    var sql = 'DELETE FROM issue_of_test WHERE test_id = '.concat(
      con.escape(test_id),
      ';\n'
    )
    for (i = 0; i < issueId_list.length; i++) {
      sql = sql.concat(
        'INSERT INTO issue_of_test (test_id, issue_id) VALUES (',
        con.escape(test_id),
        ',',
        con.escape(issueId_list[i]),
        ');\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issues linked to test')
    })
  })
}

function _getIssuesIdsOfTest(test_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT issue_id FROM issue_of_test WHERE test_id = '.concat(
      con.escape(test_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].issue_id)
      }
      resolve(id_list)
    })
  })
}

function _getIssuesOfTest(test_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesIdsOfTest(test_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getIssueById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(test_list) {
          resolve(test_list)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

function _deleteTest(test_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM test WHERE id = '.concat(con.escape(test_id))
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Test removed')
    })
  })
}

function _modifyTest(
  testId,
  name,
  description,
  expected_result,
  last_version_validated,
  state
) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE test SET'.concat(
      ' name = ',
      con.escape(name),
      ',',
      ' description = ',
      con.escape(description),
      ',',
      ' expected_result = ',
      con.escape(expected_result),
      ',',
      ' last_version_validated = ',
      con.escape(last_version_validated),
      ',',
      ' state = ',
      con.escape(state),
      ' WHERE id = ',
      con.escape(testId),
      ';\n'
    )
    con.query(sql, function(err, result) {
      console.log('Test updated')
      if (err) {
        reject(err)
        return
      }
      resolve(result.affectedRows)
    })
  })
}

function _getAllTestsIdsFromProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM test WHERE project_id = '.concat(
      con.escape(project_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

function _getAllTestsFromProject(project_id) {
  return new Promise(function(resolve, reject) {
    _getAllTestsIdsFromProject(project_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getTestById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(test_list) {
          resolve(test_list)
        })
      },
      raison => {
        reject(raison)
      }
    )
  })
}

function _updateTestState(testId, state) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE test SET state = '.concat(
      con.escape(state),
      ' WHERE id = ',
      con.escape(testId)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve(result.affectedRows)
    })
  })
}

// ================ Sprints ================

/*
_addSprint(3, 'Un objectif fort en couleur 2 !', '2019-06-10', '2019-06-20', [
  125,
  122
])

_getAllSprintFromProject(3).then(
  valeur => {
    console.log(valeur)
  },
  raison => {
    console.log(raison)
  }
)

*/

function _addSprint(project_id, objective, date_begin, date_end, issue_list) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO sprint (project_id, objective, date_begin, date_end) VALUES ('.concat(
      con.escape(project_id),
      ',',
      con.escape(objective),
      ',',
      con.escape(date_begin),
      ',',
      con.escape(date_end),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      _setIssuesToSprint(result.insertId, issue_list).then(value => {
        resolve(result.insertId)
      })
    })
  })
}

function _updateSprint(sprint_id, objective, date_begin, date_end, issue_list) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE sprint SET'.concat(
      ' objective = ',
      con.escape(objective),
      ',',
      ' date_begin = ',
      con.escape(date_begin),
      ',',
      ' date_end = ',
      con.escape(date_end),
      ' WHERE id = ',
      con.escape(sprint_id),
      ';\n'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      _setIssuesToSprint(sprint_id, issue_list).then(value =>
        resolve(result.affectedRows)
      )
    })
  })
}

function _setIssuesToSprint(sprint_id, issueId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    var sql = 'DELETE FROM issue_of_sprint WHERE sprint_id = '.concat(
      con.escape(sprint_id),
      ';\n'
    )
    for (i = 0; i < issueId_list.length; i++) {
      sql = sql.concat(
        'INSERT INTO issue_of_sprint (sprint_id, issue_id) VALUES (',
        con.escape(sprint_id),
        ',',
        con.escape(issueId_list[i]),
        ');\n'
      )
    }

    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Issues linked to test')
    })
  })
}

function _deleteSprint(id) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM sprint WHERE id = '.concat(con.escape(id))
    con.query(sql, function(err, result) {
      if (err) resolve(err)
      resolve('Project Deleted')
    })
  })
}

function _getAllSprintFromProject(project_id) {
  return new Promise(function(resolve, reject) {
    _getAllSprintIdsOfProject(project_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getSprintById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(sprint_list) {
          resolve(sprint_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

function _getAllSprintIdsOfProject(project_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT id FROM sprint WHERE project_id = '.concat(
      con.escape(project_id),
      'ORDER BY date_begin'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].id)
      }
      resolve(id_list)
    })
  })
}

function _getSprintById(sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM sprint WHERE id = '.concat(con.escape(sprint_id))
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      _getIssuesOfSprint(sprint_id).then(issue_list => {
        const sprint = new Sprint.Sprint(
          result[0].id,
          result[0].project_id,
          result[0].objective,
          result[0].date_begin,
          result[0].date_end,
          issue_list,
          []
        )
        resolve(sprint)
      })
    })
  })
}

function _getIssuesIdsOfSprint(sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT issue_id FROM issue_of_sprint WHERE sprint_id = '.concat(
      con.escape(sprint_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].issue_id)
      }
      resolve(id_list)
    })
  })
}

function _getIssuesOfSprint(sprint_id) {
  return new Promise(function(resolve, reject) {
    _getIssuesIdsOfSprint(sprint_id).then(
      id_list => {
        const promise_list = []
        for (let i = 0; i < id_list.length; i++) {
          const promise = _getIssueById(id_list[i])
          promise_list.push(promise)
        }
        Promise.all(promise_list).then(function(task_list) {
          resolve(task_list)
        })
      },
      raison => {
        console.log(raison)
      }
    )
  })
}

// ================ Documentation ================

function _addDocToRelease(release_id, url) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO documentation_of_release (url, release_id) VALUES ('.concat(
      con.escape(url),
      ',',
      con.escape(release_id),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

function _updateDoc(release_id, url) {
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE documentation_of_release SET'.concat(
      ' url = ',
      con.escape(url),
      ' WHERE release_id = ',
      con.escape(release_id),
      ';\n'
    )
    con.query(sql, function(err, result) {
      console.log('Doc updated')
      if (err) {
        reject(err)
        return
      }
      resolve(result.affectedRows)
    })
  })
}

function _getDocFromReleaseId(release_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM documentation_of_release WHERE release_id = '.concat(
      con.escape(release_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      if (result.length !== 0) {
        const doc = new Doc.Doc(
          result[0].id,
          result[0].url,
          result[0].release_id
        )
        resolve(doc)
      } else {
        const doc = new Doc.Doc('', '', release_id)
        resolve(doc)
      }
    })
  })
}

function _getDocsFromReleases(list_releases) {
  return new Promise(function(resolve, reject) {
    const promise_list = []
    for (let i = 0; i < list_releases.length; i++) {
      const promise = _getDocFromReleaseId(list_releases[i].id)
      promise_list.push(promise)
    }
    Promise.all(promise_list).then(function(test_list) {
      resolve(test_list)
    }),
      raison => {
        reject(raison)
      }
  })
}

function _deleteDoc(release_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'DELETE FROM documentation_of_release WHERE release_id = '.concat(
      con.escape(release_id)
    )
    con.query(sql, function(err, result) {
      if (err) resolve(err)
      resolve('Doc Deleted')
    })
  })
}

// ================ Releases ================

function _addReleaseToSprint(release_id, sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'INSERT INTO sprint_of_release (sprint_id, release_id) VALUES ('.concat(
      con.escape(sprint_id),
      ',',
      con.escape(release_id),
      ')'
    )
    con.query(sql, function(err, result) {
      if (err) {
        reject(err)
        return
      }
      resolve(result.insertId)
    })
  })
}

function _getAllReleasesOfSprintId(sprint_id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT release_id FROM sprint_of_release WHERE sprint_id = '.concat(
      con.escape(sprint_id)
    )
    con.query(sql, function(err, result) {
      if (err) reject(err)
      const id_list = []
      for (let i = 0; i < result.length; i++) {
        id_list.push(result[i].release_id)
      }
      resolve(id_list)
    })
  })
}

function _removeAllReleasesOfSprintId(sprint_id) {
  return new Promise(function(resolve, reject) {
    var sql = 'DELETE FROM sprint_of_release WHERE sprint_id = '.concat(
      con.escape(sprint_id),
      ';\n'
    )
  })
}

function _setReleasesToSprints(sprint_id, releaseId_list) {
  return new Promise(function(resolve, reject) {
    let i = 0
    _removeAllReleasesOfSprintId(sprint_id)
    for (i = 0; i < issueId_list.length; i++) {
      sql = sql.concat(
        'INSERT INTO sprint_of_release (sprint_id, release_id) VALUES (',
        con.escape(releaseId_list[i]),
        ',',
        con.escape(sprint_id),
        ');\n'
      )
    }
    con.query(sql, function(err, result) {
      if (err) reject(err)
      resolve('Sprints linked to release')
    })
  })
}

module.exports = {
  _getProjectsIdsOfMember,
  _getProjectFromProjectId,
  _getProjectsOfMember,
  _getTaskIdsAssignedToMember,
  _areUsernameAndPasswordCorrect,
  _createProject,
  _modifyProject,
  _deleteProject,
  _inviteMembersToProject,
  _deleteMembersFromProject,
  _getMembersOfProject,
  _getAdminsOfProject,
  _storeMember,
  _deleteMember,
  _doesUsernameExists,
  _addIssueToProject,
  _modifyIssue,
  _getAllProjectIssues,
  _deleteIssue,
  _getIssueById,
  _getAllTasksIdsByProject,
  _getAllTasksIdsByProjectAndState,
  _getTaskById,
  _getAllTasksOfProject,
  _getAllTasksOfProjectByState,
  _addTask,
  _modifyTask,
  _setTaskDependencies,
  _setTaskToMembers,
  _getMembersAssignedToTask,
  _getTaskDependencies,
  _updateTaskState,
  _deleteTask,
  _setTaskChecklist,
  _modifyTaskDescription,
  _modifyTaskState,
  _getTaskChecklist,
  _getChecklistItemById,
  _getIssuesOfTask,
  _setTaskToIssue,
  _addTest,
  _setIssuesToTest,
  _deleteTest,
  _modifyTest,
  _getTestById,
  _getIssuesIdsOfTest,
  _getIssuesOfTest,
  _getAllTestsFromProject,
  _updateTestState,
  _addSprint,
  _getAllSprintFromProject,
  _deleteSprint,
  _updateSprint,
  _getSprintById,
  _getIssuesIdsOfSprint,
  _addDocToRelease,
  _updateDoc,
  _getDocFromReleaseId,
  _deleteDoc,
  _getDocsFromReleases,
  _addReleaseToSprint,
  _getAllReleasesOfSprintId,
  _removeAllReleasesOfSprintId,
  _setReleasesToSprints
}
