class Test {
  constructor(
    id,
    projectId,
    name,
    description,
    resultExpected,
    lastVersionValidated,
    state,
    listIssues
  ) {
    this.name = name
    this.description = description
    this.projectId = projectId
    this.id = id
    this.resultExpected = resultExpected
    this.lastVersionValidated = lastVersionValidated
    this.state = state
    this.listIssues = listIssues
  }
}

module.exports = {
  Test: Test
}
