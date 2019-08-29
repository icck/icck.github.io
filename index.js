var data = [
{
url: "https://icck.github.io/posts/2019-08-29/",
title: "DynamoDBをaws cliで操作する",
content: "[Create Table (sample:mails) aws dynamodb create-table --table-name mails \ --attribute-definitions \ AttributeName=id,AttributeType=S \ AttributeName=Name,AttributeType=S \ --key-schema \ AttributeName=id,KeyType=HASH \ AttributeName=Name,KeyType=RANGE \ --provisioned-throughput \ ReadCapacityUnits=2,WriteCapacityUnits=2 attribute-definitions プライマリーキーとソートキーを定義する それ以外のキーはテーブル作成時には定義しなくても良い key-schema HASH パーティションキー RANGE ソートキー provisioned-throughput ReadCapacityUnits 読み込みスループット WriteCapacityUnits 書き込みスループット put-item aws dynamodb put-item \ --table-name mails \ --item &amp;#39;{&amp;#34;id&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;testid1&amp;#34;},&amp;#34;Name&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;Alice&amp;#34;},&amp;#34;mail&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;alice@test.mail&amp;#34;} }&amp;#39; \ --return-consumed-capacity TOTAL { &amp;#34;ConsumedCapacity&amp;#34;: { &amp;#34;CapacityUnits&amp;#34;: 1.0, &amp;#34;TableName&amp;#34;: &amp;#34;mails&amp;#34; } } return-consumed-capacity TOTAL 消費された書き込みキャパシティーユニットの総数を返します。 INDEXES 消費された書き込みキャパシティーユニットの総数と、テーブルおよびオペレーションの影響を受けた セカンダリインデックス の小計を返します。 NONE 書き込みキャパシティーの詳細は返されません。(これがデフォルトです) jsonファイルを作成し読み込む事も可能 &amp;ndash;item file://item.json 項目を書き込む PutItem 登録 UpdateItem 更新 DeleteItem 削除 Scan aws dynamodb scan --table-name mails { &amp;#34;Count&amp;#34;: 2, &amp;#34;Items&amp;#34;: [ { &amp;#34;mail&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;test@test.com&amp;#34; }, &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;1&amp;#34; }, &amp;#34;Name&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;test&amp;#34; } }, { &amp;#34;mail&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;alice@test.mail&amp;#34; }, &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;testid1&amp;#34; }, &amp;#34;Name&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;Alice&amp;#34; } } ], &amp;#34;ScannedCount&amp;#34;: 2, &amp;#34;ConsumedCapacity&amp;#34;: null } get-item(Key Select) Record Count list-tables delete-item(Key Select) delete-table]"
}
,{
url: "https://icck.github.io/posts/2019-08-28/",
title: "Hugoに全文検索機能を追加する",
content: "[完成したもの まずは動いているものは以下になります。 https://icck.github.io/search/ 作業手順 手順を順に記載していきます。以下の記事を参考にさせていただきました。 http://rs.luminousspice.com/hugo-site-search/ https://snap.textgh.org/post/full-text-search-in-hugo/ インデックスファイルのテンプレート $ mkdir ./layouts/js $ touch ./layouts/js/single.html var data = [{{ range $index, $page := where .Site.Pages &amp;#34;Section&amp;#34; &amp;#34;posts&amp;#34;}} {{ if ne $index 0 }},{{ end }}{ url: &amp;#34;{{ $page.Permalink }}&amp;#34;, title: &amp;#34;{{ $page.Title }}&amp;#34;, content: &amp;#34;{{ .PlainWords }}&amp;#34; }{{ end }}] インデックスファイルを生成する空の投稿 $ hugo new pages/indexjs.md --- date: 2019-08-28T21:50:35&#43;09:00 type: &amp;#34;js&amp;#34; url: &amp;#34;index.js&amp;#34; --- 検索ページの作成 検索ページテンプレートの作成 $ mkdir ./layouts/search/ $ touch ./layouts/search/single.html {{ partial &amp;#34;head.html&amp;#34; . }} &amp;lt;div class=&amp;#34;container&amp;#34;&amp;gt; &amp;lt;h1&amp;gt;サイト内全文検索&amp;lt;/h1&amp;gt; &amp;lt;ul&amp;gt; &amp;lt;li&amp;gt;キーワードを入力するとリアルタイムで検索を始めます。 &amp;lt;li&amp;gt;入力欄フォーカス中は、エンターキー、矢印キーでベージ送りします。 &amp;lt;/ul&amp;gt; &amp;lt;script src=&amp;#34;https://icck.github.io/index.js&amp;#34; charset=&amp;#34;utf-8&amp;#34;&amp;gt;&amp;lt;/script&amp;gt; &amp;lt;style&amp;gt; dd{ margin:0; padding:0 0 1em 0.5em; width:90%; } dd span{ font-size:80%; color:#888; } dd b{ color:#666600; background-color:#ffffdd; font-weight:bold; border:1px solid #bbbb00; margin:0 2px 0 2px; padding:0 2px 0 2px; } #navi{ margin:0.5rem 0; line-height:2rem; } #navi span{ border-top:1px solid #d8d8d8; border-bottom:1px solid #d8d8d8; padding: 0.33rem 0.66rem; cursor:pointer; word-wrap:break-word; } #navi span.selected{ background: #D3EDF7; } #navi span:first-child{ border-left:1px solid #d8d8d8; border-top-left-radius: 0.4rem; border-bottom-left-radius: 0.4rem; } #navi span:last-child{ border-right:1px solid #d8d8d8; border-top-right-radius: 0.4rem; border-bottom-right-radius: 0.4rem; } #searchbox input{ font-size: 10px; padding: .3em; margin-left:2em; margin-bottom: 1em; } @media (max-width: 15em) { #navi{ width:300px; } } &amp;lt;/style&amp;gt; &amp;lt;div id=&amp;#34;searchbox&amp;#34;&amp;gt; &amp;lt;input type=&amp;#34;text&amp;#34; id=&amp;#34;q&amp;#34; onkeyup=&amp;#34;do_find(this.value)&amp;#34; onkeydown=&amp;#34;key(event.keyCode)&amp;#34; autocomplete=&amp;#34;off&amp;#34; placeholder=&amp;#34;サイト内を検索&amp;#34;&amp;gt; &amp;lt;span class=&amp;#34;fa fa-search&amp;#34; aria-hidden=&amp;#34;true&amp;#34;&amp;gt;&amp;lt;/span&amp;gt;&amp;lt;span id=&amp;#34;stat&amp;#34;&amp;gt;&amp;lt;/span&amp;gt; &amp;lt;div id=&amp;#34;navi&amp;#34;&amp;gt;&amp;lt;/div&amp;gt; &amp;lt;div id=&amp;#34;result&amp;#34;&amp;gt;&amp;lt;/div&amp;gt; &amp;lt;/div&amp;gt; &amp;lt;script&amp;gt; window.onload=function(){ gid(&amp;#34;q&amp;#34;).focus(); } { $_ = String.prototype; $_.mReplace = function(pat,flag){ var temp = this; if(!flag){flag=&amp;#34;&amp;#34;} for(var i in pat){ var re = new RegExp(i,flag); temp = temp.replace(re,pat[i]) } return temp; }; } { $_ = Date.prototype; $_.format = &amp;#34;yyyy-mm-dd HH:MM:SS&amp;#34;; $_.formatTime = function(format){ var yy; var o = { yyyy : ((yy = this.getYear()) &amp;lt; 2000)? yy&#43;1900 : yy, mm : this.getMonth() &#43; 1, dd : this.getDate(), HH : this.getHours(), MM : this.getMinutes(), SS : this.getSeconds() } for(var i in o){ if (o[i] &amp;lt; 10) o[i] = &amp;#34;0&amp;#34; &#43; o[i]; } return (format) ? format.mReplace(o) : this.format.mReplace(o); } } &amp;lt;/script&amp;gt; &amp;lt;script&amp;gt; var start = new Date().getTime(); var bodylist = []; var st = gid(&amp;#34;stat&amp;#34;); var re = gid(&amp;#34;result&amp;#34;); var nv = gid(&amp;#34;navi&amp;#34;); var max = 5; var KC = { enter: 13, left : 37, right: 39, up : 38, down : 40 }; function gid(id){ return document.getElementById(id); } function ignore_case(){ var a = arguments; return &amp;#34;[&amp;#34; &#43; a[0] &#43; a[0].toUpperCase() &#43; &amp;#34;]&amp;#34; } function do_find(v){ if(this.lastquery == v){return} this.lastquery = v; var re = find(v); if(re.length){ pagenavi(re); view(re) } } function key(c){ switch(c){ case KC.enter: mv(1);break; case KC.left : mv(-1);break; case KC.right: mv(1);break; case KC.up : mv(-1);break; case KC.down : mv(1);break; } } function find(v){ var query = v; if(!v){return []} var aimai; if(query){ aimai = query.replace(/[a-z]/g,ignore_case); try{ reg = new RegExp(aimai,&amp;#34;g&amp;#34;); }catch(e){ reg = /(.)/g; } }else{ reg = /(.)/g; } var start = new Date().getTime(); var result = []; for(var i=0;i&amp;lt;data.length;i&#43;&#43;){ var s = bodylist[i]; var res = reg.exec(s); if(!res){continue} var len = res[0].length; var idx = res.index; if(idx != -1){ result.push([i,idx,len]); } } if(result.length){ st.innerHTML = result.length &#43;&amp;#34;件見つかりました。&amp;#34;; } var end = new Date().getTime(); console.log(&amp;#34;Find:&amp;#34;&#43; (end-start) &#43; &amp;#34; ms&amp;#34;); return result; } function time2date(time){ if(!this.cache){this.cache = {}}; if(this.cache[time]) return this.cache[time]; var d = new Date(time*1000); this.cache[time] = d.formatTime(&amp;#34;yyyy年mm月dd日&amp;#34;); return this.cache[time]; } function snippet(body,idx,len){ var start = idx - 20; return [ body.substring(start,idx), ,&amp;#34;&amp;lt;b&amp;gt;&amp;#34; ,body.substr(idx,len) ,&amp;#34;&amp;lt;/b&amp;gt;&amp;#34; ,body.substr(idx&#43;len,50), ].join(&amp;#34;&amp;#34;); } function pagenavi(result){ var len = result.length; var ct = Math.ceil(len/max); var buf = []; for(var i=0;i&amp;lt;ct;i&#43;&#43;){ buf.push( &amp;#34;&amp;lt;span onclick=&amp;#39;view(\&amp;#34;\&amp;#34;,&amp;#34; ,i&#43;1 ,&amp;#34;);sw(&amp;#34;,i,&amp;#34;)&amp;#39;&amp;gt;&amp;#34; ,i&#43;1 ,&amp;#34;&amp;lt;/span&amp;gt;&amp;#34; ); } nv.innerHTML = buf.join(&amp;#34;&amp;#34;); sw(0); } function sw(t){ var span = nv.getElementsByTagName(&amp;#34;span&amp;#34;); for(var i=0;i&amp;lt;span.length;i&#43;&#43;){ span[i].className = (i==t)?&amp;#34;selected&amp;#34;:&amp;#34;&amp;#34;; } } function mv(to){ var span = nv.getElementsByTagName(&amp;#34;span&amp;#34;); var current; if(!span.length){return} for(var i=0;i&amp;lt;span.length;i&#43;&#43;){ if(span[i].className == &amp;#34;selected&amp;#34;){ current = i;break; } } var moveto = current&#43;to; if(moveto &amp;lt; 0){return} if(moveto &amp;gt; span.length-1){moveto=0} sw(moveto); view(&amp;#34;&amp;#34;,moveto&#43;1) } function view(result,offset){ if(!offset){offset = 1} if(!result){ result = this.last.reverse(); }else{ this.last = result; } var r = result.reverse(); var buf = [&amp;#34;&amp;lt;dl&amp;gt;&amp;#34;]; var count = 0; for(var i=(offset-1)*max;i&amp;lt;r.length;i&#43;&#43;){ count&#43;&#43;; if(count &amp;gt; max){break} var num = r[i][0]; var idx = r[i][1]; var len = r[i][2]; with(data[num]){ buf.push( &amp;#34;&amp;lt;dt&amp;gt;&amp;lt;a href=&amp;#39;&amp;#34;,url,&amp;#34;&amp;#39;&amp;gt;&amp;#34; ,title||&amp;#34;無題&amp;#34;,&amp;#34;&amp;lt;/a&amp;gt;&amp;#34; ,&amp;#34;&amp;lt;dd&amp;gt;&amp;#34; ,snippet(bodylist[num],idx,len) ); } } re.innerHTML = buf.join(&amp;#34;&amp;#34;); } for(var i=0;i&amp;lt;data.length;i&#43;&#43;){ bodylist.push(data[i].title&#43; &amp;#34; &amp;#34; &#43;data[i].content); } var bodyidx = bodylist.join(&amp;#34;&amp;lt;&amp;gt;&amp;#34;); var end = new Date().getTime(); console.log(&amp;#34;Index:&amp;#34;&#43; (end-start) &#43; &amp;#34; ms&amp;#34;); &amp;lt;/script&amp;gt; &amp;lt;noscript&amp;gt;&amp;lt;p class=&amp;#34;notice&amp;#34;&amp;gt;注意: この検索機能は JavaScript を使用しています。&amp;lt;/p&amp;gt;&amp;lt;/noscript&amp;gt; &amp;lt;/div&amp;gt; &amp;lt;/div&amp;gt; {{ partial &amp;#34;footer.html&amp;#34; . }} 検索ページの作成 $ hugo new pages/search.md --- date: 2019-08-28T22:01:57&#43;09:00 type: &amp;#34;search&amp;#34; url: &amp;#34;search&amp;#34; title: &amp;#34;全文検索&amp;#34; --- config.toml追記 [[menu.header]] name = &amp;#34;search&amp;#34; weight = 30 url = &amp;#34;/search&amp;#34;]"
}
,{
url: "https://icck.github.io/posts/000/",
title: "Hugoブログ更新方法",
content: "[Hugoの使い方を今後のブログ更新のために Hugoでブログを書いていく上で、運用方法をメモしていこうと思います。 インストール等は気が向いたときに Local環境を起動 $ hugo server --theme=hugo-theme-nix --buildDrafts --watch 記事の作成 $ hugo new post/test.md --- title: &amp;#34;test&amp;#34; date: 2019-08-26T01:14:23&#43;09:00 draft: true --- title:記事のタイトルに修正 date:作成時刻のため、そのまま draft:trueが非公開。falseに変更し公開 Sample --- title: &amp;#34;test&amp;#34; date: 2019-08-26T01:14:23&#43;09:00 draft: false --- ## ここにマークダウンで本文を記載 githubへpush ./deploy.sh]"
}
,{
url: "https://icck.github.io/posts/",
title: "Posts",
content: "[]"
}]