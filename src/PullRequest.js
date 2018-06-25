class PullRequest {
  constructor(
    id,
    number,
    state,
    created_at,
    updated_at,
    closed_at,
    merged_at,
    user,
    title
  ) {
    this.id = id;
    this.number = number;
    this.state = state;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.closed_at = closed_at;
    this.merged_at = merged_at;
    this.user = user;
    this.title = title;
    this.pullsState = this.state == 'open' ? 'open' : (this.merged_at ? 'merged' : 'closed');
  }

  getCommentsUrl(repository) {
    return `${repository.pullsUrl}/${this.number}/comments`;
  }

  getIssueCommentsUrl(repository) {
    return `${repository.issuesUrl}/${this.number}/comments`;
  }
}
module.exports = PullRequest;