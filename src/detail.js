var request = require('sync-request');
var PullRequest = require(__dirname + '/PullRequest.js');
var PullRequestDetail = require(__dirname + '/PullRequestDetail.js');

var Repository = require(__dirname + '/Repository.js');

class Comment {
  constructor(
    id,
    user,
    body,
    create_at,
    update_at,
    html_url
  ) {
    this.id = id;
    this.user = user
    this.body = body
    this.create_at = create_at
    this.update_at = update_at
    this.html_url = html_url
  }
}

function main(accessToken, owner, repo, number) {
  var repository = new Repository(owner, repo);
  function getCommonCommentList(url) {
    var res = request('GET', url, {
      headers: {
        'User-Agent': 'request'
      },
      qs: { access_token: accessToken }
    });
    var list = JSON.parse(res.getBody());
    return list.map(obj => new Comment(
      obj.id, 
      obj.user.login, 
      obj.body.trim(), 
      obj.created_at, 
      obj.updated_at, 
      obj.html_url
    ));
  }
  function getCommentList(pr) {
    return getCommonCommentList(pr.getCommentsUrl(repository));
  }

  function getIssueCommentList(pr) {
    return getCommonCommentList(pr.getIssueCommentsUrl(repository));
  }

  var res = request('GET', `${repository.pullsUrl}/${number}`, {
    headers: {
      'User-Agent': 'request'
    },
    qs: { access_token: accessToken }
  });
  var obj = JSON.parse(res.getBody());
  var pr = new PullRequest(
    obj.id,
    obj.number,
    obj.state,
    obj.created_at,
    obj.updated_at,
    obj.closed_at,
    obj.merged_at,
    obj.user.login,
    obj.title
  )
  return new PullRequestDetail(
    pr,
    obj.body,
    getCommentList(pr),
    getIssueCommentList(pr)
  );
}

module.exports = main;