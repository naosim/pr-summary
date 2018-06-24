# pr-summary

## install 
```
npm -g pr-summary
```

## getting started
### simple
```
pr-summary -t your_access_token -o naosim -r pr-summary
```
result
```
header,id,number,state,pullsState,created_at,updated_at,closed_at,merged_at,user,title_escaped
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T09:43:31Z,,,naosim,"プルリクエストのサマリ作成"
footer,1
```

### detail
```
pr-summary -t your_access_token -o naosim -r pr-summary -d
```
result
```
header,id,number,state,pullsState,created_at,updated_at,closed_at,merged_at,user,title_escaped,separator,id,create_at,update_at,user,html_url,tags,body_escaped
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,,,naosim,"[tag1]プルリクエストのサマリ作成",|,196941519,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,naosim,,tag1,"[tag1]プルリクエストのサマリ作成"
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,,,naosim,"[tag1]プルリクエストのサマリ作成",|,197634128,,,naosim,https://github.com/naosim/pr-summary/pull/1#discussion_r197634128,tag1|tag2,"[tag1] [tag2]コードに対するコメントだよ"
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,,,naosim,"[tag1]プルリクエストのサマリ作成",|,399743410,,,naosim,https://github.com/naosim/pr-summary/pull/1#issuecomment-399743410,,"プルリクに対するコメントだよ"
footer,3
```