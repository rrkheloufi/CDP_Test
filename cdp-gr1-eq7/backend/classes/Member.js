class Member {
  constructor(username, password, listProjects) {
    this.username = username
    this.password = password
    this.listProjects = listProjects
  }
}

module.exports = {
  Member: Member
}
