var request = require('request');

var Repository = require(__dirname + '/Repository.js');
var PullRequest = require(__dirname + '/PullRequest.js');

function toBase64(str) {
  return new Buffer(str).toString('base64');
}

function main(accessToken, owner, repo, option, forEach, end) {
  var repository = new Repository(owner, repo);
  var minNumber = option.minNumber || parseInt(option.minNumber);
  function run(page, forEach, end) {
    page = page || 1;
    request.get({
      url: repository.pullsUrl,
      headers: {
        'User-Agent': 'request'
      },
      qs: {
        access_token: accessToken,
        state: 'all',
        page: page
      }
    }, function (error, response, body) {
      if(error) {
        throw err;
      }
      var list = JSON.parse(body);
      list = list.map(v => new PullRequest(
        v.id,
        v.number,
        v.state,
        v.created_at,
        v.updated_at,
        v.closed_at,
        v.merged_at,
        v.user.login,
        v.title
      )).filter(v => !minNumber || v.number >= minNumber);
  
      if(forEach) {
        list.forEach(forEach);
      }
  
      if(minNumber && list.length > 0 && list[list.length - 1].number > minNumber) {
        run(page + 1, forEach, end);
      } else if(end){
        end(list);
      }
      
    });  
  }

  run(1, forEach, end);
}

module.exports = main;