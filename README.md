# pr-summary
プルリクエストの内容をcsv形式で吐き出します

## install 
```
npm -g pr-summary
```

## getting started
### simple
#### run
```
pr-summary -t your_access_token -o naosim -r pr-summary
```
#### result
```
header,id,number,state,pullsState,created_at,updated_at,closed_at,merged_at,user,title_escaped
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T09:43:31Z,,,naosim,"プルリクエストのサマリ作成"
footer,1
```

### detail
#### run
```
pr-summary -t your_access_token -o naosim -r pr-summary -d
```
#### result
```
header,id,number,state,pullsState,created_at,updated_at,closed_at,merged_at,user,title_escaped,separator,id,create_at,update_at,user,html_url,tags,body_escaped
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,,,naosim,"[tag1]プルリクエストのサマリ作成",|,196941519,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,naosim,,tag1,"[tag1]プルリクエストのサマリ作成"
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,,,naosim,"[tag1]プルリクエストのサマリ作成",|,197634128,,,naosim,https://github.com/naosim/pr-summary/pull/1#discussion_r197634128,tag1|tag2,"[tag1] [tag2]コードに対するコメントだよ"
body,196941519,1,open,open,2018-06-24T09:42:34Z,2018-06-24T16:22:03Z,,,naosim,"[tag1]プルリクエストのサマリ作成",|,399743410,,,naosim,https://github.com/naosim/pr-summary/pull/1#issuecomment-399743410,,"プルリクに対するコメントだよ"
footer,3
```

## reference
### command
```
pr-summary [options]
```

```
Options:

  -V, --version                output the version number
  -t, --access-token [string]  [required] Github API access token
  -o, --owner [string]         [required] owner
  -r, --repo [string]          [required] repo
  -m, --min-number [num]       min pullrequest number
  -d, --detail-mode            detail mode
  -h, --help                   output usage information
```

### CSV format
separater: ,

#### header line
1カラム目: header
2カラム目以降: カラム名

#### body line
1カラム名: body
2カラム目以降: header行のカラム名に対応する値

#### footer line
1カラム目: footer
2カラム目: bodyの行数

## body data
### simple
プルリクエストの状態やタイトルのみをプルリクエスト単位で出力する

カラム名 | 説明
---|---
header | body 固定値
id | プルリクエストのID
number | プルリクエストの番号
state | 状態。open, clonse
pullsState | プルリクエストの状態。 open, close, merged
created_at | プルリクエストの作成日時
updated_at | プルリクエストの更新日時
closed_at | プルリクエストの終了日時
merged_at | プルリクエストのマージ日時
user | プルリクエストを出したユーザ
title_escaped | プルリクエストのタイトル。カンマや改行などがエスケープされている

### detail
プルリクエストの内容とコメントの内容をコメント単位で出力する


カラム名 | 説明
---|---
header | body 固定値
id | プルリクエストのID
number | プルリクエストの番号
state | 状態。open, clonse
pullsState | プルリクエストの状態。 open, close, merged
created_at | プルリクエストの作成日時
updated_at | プルリクエストの更新日時
closed_at | プルリクエストの終了日時
merged_at | プルリクエストのマージ日時
user | プルリクエストを出したユーザ
title_escaped | プルリクエストのタイトル。カンマや改行などがエスケープされている
separator | データとして特に意味なし。これより左がプルリク情報、これより右がコメント情報。
id | ID。プルリクエスト、または、コードのコメント、または、プルリクエスト
create_at | 作成日時。プルリクエスト、または、コードのコメント、または、プルリクエスト
update_at | 更新日時。プルリクエスト、または、コードのコメント、または、プルリクエスト
user | ユーザ。プルリクエスト、または、コードのコメント、または、プルリクエスト
html_url | リンク。コードのコメント、または、プルリクエスト。プルリクエストの場合は空。
tags | タグリスト。バー区切り。内容の最初に[hoge]のようなタグを入れた場合に、ここにリストとして入る
body_escaped | 内容

