var program = require('commander');
var fs = require('fs');

var main = module.exports = require(__dirname + '/src/main.js');
var detail = require(__dirname + '/src/detail.js');
var escapedString = (v) => {
  // return new Buffer(v).toString('base64');
  return JSON.stringify(v);
}

if (require.main === module) {// コマンド実行
  var packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  program
    .version(packageJson.version)
    .option('-t, --access-token [string]', '[required] Github API access token')
    .option('-o, --owner [string]', '[required] owner')
    .option('-r, --repo [string]', '[required] repo')
    .option('-m, --min-number [num]', 'min pullrequest number')
    .option('-d, --detail-mode', 'detail mode')
    .parse(process.argv);

  if(!program.accessToken) {
    throw '--access-token required'
  }
  if(!program.owner) {
    throw '--owner required'
  }
  if(!program.repo) {
    throw '--repo required'
  }

  var lineCount = 0;

  if(!program.detailMode) {
    // サマリのCSV
    console.log('header,id,number,state,pullsState,created_at,updated_at,closed_at,merged_at,user,title_escaped');
    main(
      program.accessToken,
      program.owner, 
      program.repo,
      program,
      v => {
        console.log([
          'body',
          v.id,
          v.number,
          v.state,
          v.pullsState,
          v.created_at,
          v.updated_at,
          v.closed_at,
          v.merged_at,
          v.user,
          escapedString(v.title)
        ].join(','));
        lineCount++;
      },
      list => {
        console.log(`footer,${lineCount}`);
      }
    );

  } else {
    // 詳細のCSV
    function print(pr, comment) {
      if(comment) {
        console.log([
          'body',
          pr.id,
          pr.number,
          pr.state,
          pr.pullsState,
          pr.created_at,
          pr.updated_at,
          pr.closed_at,
          pr.merged_at,
          pr.user,
          escapedString(pr.title),
          '|',
          comment.id,
          comment.created_at,
          comment.updated_at,
          comment.user,
          comment.html_url,
          escapedString(comment.body)
        ].join(','));
      } else {
        console.log([
          'body',
          pr.id,
          pr.number,
          pr.state,
          pr.pullsState,
          pr.created_at,
          pr.updated_at,
          pr.closed_at,
          pr.merged_at,
          pr.user,
          escapedString(pr.title),
          '|',
          pr.id,
          pr.created_at,
          pr.updated_at,
          pr.user,
          '',
          escapedString(pr.title)
        ].join(','));
      }
      
    }
    
    console.log('header,id,number,state,pullsState,created_at,updated_at,closed_at,merged_at,user,title_escaped,separator,id,create_at,update_at,user,html_url,body_escaped');
    main(
      program.accessToken,
      program.owner, 
      program.repo,
      program,
      v => {},
      list => {
        list.forEach(v => {
          var pr = detail(
            program.accessToken, 
            program.owner, 
            program.repo, 
            v.number
          );
          print(v)
          lineCount++;
          pr.commentList.forEach(c => { print(v, c); lineCount++; })
          pr.issueCommentList.forEach(c => { print(v, c); lineCount++; })
        });

        console.log(`footer,${lineCount}`);
    });

  }

  

  
}
