class Project {
  constructor(
    id,
    name,
    description,
    listMembers,
    admin,
    userGitHub,
    repositoryGitHub
  ) {
    this.name = name
    this.description = description
    this.id = id
    this.listMembers = listMembers
    this.admin = admin
    this.userGitHub = userGitHub
    this.repositoryGitHub = repositoryGitHub
  }
}

module.exports = {
  Project: Project
}
