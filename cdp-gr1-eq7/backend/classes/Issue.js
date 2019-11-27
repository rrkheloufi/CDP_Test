class Issue{
    constructor(id, projectId, name, description, priority, difficulty){
        this.name = name
        this.description = description
        this.projectId = projectId
        this.id = id
        this.priority = priority
        this.difficulty = difficulty
  }
}

module.exports = {
  Issue:Issue
}
