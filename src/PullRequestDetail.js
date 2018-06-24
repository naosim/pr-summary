var PullRequest = require(__dirname + '/PullRequest.js');

class PullRequestDetail {
  constructor(
    pr,
    body,
    commentList,
    issueCommentList
  ) {
    this.pr = pr;
    this.body = body.trim();
    this.commentList = commentList;
    this.issueCommentList = issueCommentList;
  }
}
module.exports = PullRequestDetail;