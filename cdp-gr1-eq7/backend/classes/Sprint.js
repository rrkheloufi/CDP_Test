class Sprint {
  constructor(
    id,
    project_id,
    objective,
    date_begin,
    date_end,
    listIssues,
    listReleases
  ) {
    this.id = id
    this.project_id = project_id
    this.objective = objective
    this.date_begin = date_begin
    this.date_end = date_end
    this.listIssues = listIssues
    this.listReleases = listReleases
  }
}

module.exports = {
  Sprint: Sprint
}
