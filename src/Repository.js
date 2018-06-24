class Repository {
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
    this.baseUrl = `https://api.github.com/repos/${this.owner}/${this.repo}`;
    this.pullsUrl = `${this.baseUrl}/pulls`
    this.issuesUrl = `${this.baseUrl}/issues`
  }
}

module.exports = Repository;