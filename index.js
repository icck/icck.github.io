var data = [
{
url: "https://icck.github.io/posts/0014-nodejs-upgrade-windows/",
title: "Node.jsをUpgradeする手順（Windows）",
content: "[事前作業：version確認 $ node -v v10.15.0 $ npm -v 6.4.1 最新版をインストール サイトにからLTSをダウンロードしインストール https://nodejs.org/ja/ すべて次へ。 インストール後：version確認 $ node -v v12.16.2 $ npm -v 6.14.4 おまけ（yarnをUpgradeしてみる） $ yarn -v 1.13.0 $ npm uninstall yarn -g $ npm install yarn -g $ yarn -v 1.22.4]"
}
,{
url: "https://icck.github.io/posts/0013-gitsubmodule/",
title: "Git Submodule化できないときの対処",
content: "[Git Submodule化できないときの対処 キャッシュが残っている可能性 まずは、キャッシュのクリアを行います。 git rm –cached サブモジュールディレクトリ git submodule update --init --recursive サブモジュールの削除 既に存在しているサブモジュールがあったら削除してしまいます。 ディレクトリごと消すことがポイント git submodule deinit -f サブモジュールディレクトリ git rm -f サブモジュールディレクトリ サブモジュールの追加 正しく追加できていれば2つのgitがソース管理プロバイダーに見えているはずです。 git submodule add git@github.com:&amp;lt;user&amp;gt;/&amp;lt;path&amp;gt;.git]"
}
,{
url: "https://icck.github.io/posts/0012-oracle-curerror/",
title: "[調査方法]Oracle ORA-01000 最大オープン・カーソル数を超えました。[V$OPEN_CURSOR]",
content: "[Oracle ORA-01000 最大オープン・カーソル数を超えました。 Oracle(PLSQL)でカーソルに関するエラーが発生しハマったときの対処方法メモ 原因としてはカーソルを「オープン」と「クローズ」の数の不一致 私の場合は、オープンがループ内で行われており、クローズはループの外にあったためオープンし過ぎでエラーになりました。 調査方法 1.カーソルの最大数を確認します。 これが小さすぎるのが原因の場合はSet文でOracleの設定変更しましょう。 show parameters open_cursors; 2.カーソルの数を確認します。 私はブレークポイントデバッグを行いながらcount(1)の増加を確認しプログラムによるカーソル増加を特定しました。 自分が動作させているプログラムと確定している場合はuser_nameを条件に設定します。 具体的なプログラム名を特定するにはsidから調査します。 select sid , user_name , count(1) from V$OPEN_CURSOR group by sid, user_name having count(1) &amp;gt; 10 -- ここは最大数に応じて調整 ; さいごに 明示的にオープン、フェッチ、クローズをコードに記載すると通常処理はもちろんエラー処理での適切なクローズを求められます。 暗黙、明示どちらでもよいですが、FORループを利用してコードを記述したほうがバグのリスクを減らすことが出来るためオススメだと思っています。]"
}
,{
url: "https://icck.github.io/posts/0011-wsl/",
title: "WSLの設定",
content: "[WSL(Windows Subsystem for Linux)の設定 前提 WSLが利用可能であること Ubuntu18.04 Setup # 日本からミラーするように sudo sed -i -e &amp;#39;s%http://.*.ubuntu.com%http://ftp.jaist.ac.jp/pub/Linux%g&amp;#39; /etc/apt/sources.list # アップデート sudo apt update -y &amp;amp;&amp;amp; apt upgrade -y # fish 準備 sudo apt-add-repository ppa:fish-shell/release-3 sudo apt update -y # install fish sudo apt install -y fish # change default shell .bashrc exec fish # install fisher curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs https://git.io/fisher fisher -v # add theme fisher add oh-my-fish/theme-agnoster # font powerline git clone https://github.com/powerline/fonts.git # mv c drive sudo mv fonts /mnt/c/ C:\fonts\SourceCodePro\Source Code Pro for Powerline.otf ConEmu https://www.fosshub.com/ConEmu.html Download ConEmu Stable, Installer (32-bit, 64-bit) ConEmu Settings %windir%¥system32¥bash.exe ~ -new_console:t:&amp;quot;Fish&amp;quot; -cur_console:p -c fish 見た目完成 # bashコマンドが使えるように fisher add edc/bass # ctrl &#43; R fisher add jethrokuan/fzf git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf ~/.fzf/install # bd fisher add 0rax/fish-bd vim ~/.config/fish/config.fish ## vimで開く alias vi=&amp;#39;/usr/bin/vim&amp;#39; ## for windows explorer (required win10 creators update) alias open=&amp;#39;explorer.exe&amp;#39; alias e=&amp;#39;explorer.exe .&amp;#39; # cd &amp;gt; ls function cd builtin cd $argv ls -a end # lsの色を見やすく変更 if test ! -e ~/.dircolors/dircolors.ansi-dark git clone https://github.com/seebi/dircolors-solarized.git ~/.dircolors end eval (dircolors -c ~/.dircolors/dircolors.ansi-dark) # aliases for git alias g=&amp;#34;git&amp;#34; alias gd=&amp;#34;git diff&amp;#34; alias ga=&amp;#34;git add&amp;#34; alias gca=&amp;#34;git commit -a -m&amp;#34; alias gcm=&amp;#34;git commit -m&amp;#34; alias gbd=&amp;#34;git branch -D&amp;#34; alias gp=&amp;#34;git push&amp;#34; alias gb=&amp;#34;git branch&amp;#34; alias gcob=&amp;#34;git checkout -b&amp;#34; alias gco=&amp;#34;git checkout&amp;#34; alias gba=&amp;#34;git branch -a&amp;#34; alias glog=&amp;#34;git log --graph --date=iso --pretty=&amp;#39;[%ad]%C(auto) %h%d %Cgreen%an%Creset : %s&amp;#39;&amp;#34; alias gll=&amp;#34;git log --pretty=format:&amp;#39;%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]&amp;#39; --decorate --numstat&amp;#34; # install Home-Brew sudo apt install build-essential curl file git curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh | sh ~/.config/fish/config.fish alias brew=&amp;#39;/home/linuxbrew/.linuxbrew/bin/brew&amp;#39; brew update # Hugo - Windowsだとgitsubmoduleがうまく動作出来なかった。（調査中） wget https://github.com/gohugoio/hugo/releases/download/v0.58.3/hugo_0.58.3_Linux-64bit.deb sudo dpkg -i hugo_0.58.3_Linux-64bit.deb hugo version git clone https://github.com/icck/myblog.git git submodule add git@github.com:icck/icck.github.io.git public chmod &#43;x deploy.sh # set ssh key ssh-keygen # ./git/config url = https://username:password@github.com....]"
}
,{
url: "https://icck.github.io/posts/0010-qiita-python/",
title: "Qiita API②いいねとVIEW数をLambdaで取得してS3へ保存",
content: "[前回投稿した「Qiita API でいいねとVIEW数をCurlで取得する方法」を利用し、Lambdaで実行してs3にjsonファイルとして格納してみようと思います。 Code 以下のコードを実行しs3に格納していきます。 ※事前にバケットは作成しておきます。 import csv import json import logging import os import sys import boto3 import requests formatter = &amp;#39;%(asctime)s%(name)-12s%(levelname)-8s%(message)s&amp;#39; logging.basicConfig(level=logging.WARNING, format=formatter) logger = logging.getLogger(__name__) def get_next_url(response): link = response.headers[&amp;#39;link&amp;#39;] if link is None: return None links = link.split(&amp;#39;,&amp;#39;) for link in links: if &amp;#39;rel=&amp;#34;next&amp;#34;&amp;#39; in link: return link[link.find(&amp;#39;&amp;lt;&amp;#39;) &#43; 1:link.find(&amp;#39;&amp;gt;&amp;#39;)] return None def get_items(token): url = &amp;#39;https://qiita.com/api/v2/authenticated_user/items&amp;#39; headers = {&amp;#39;Authorization&amp;#39;: &amp;#39;Bearer {}&amp;#39;.format(token)} items = [] while True: response = requests.get(url, headers=headers) response.raise_for_status() items.extend(json.loads(response.text)) logger.info(&amp;#39;GET {}&amp;#39;.format(url)) url = get_next_url(response) if url is None: break for item in items: # ビュー数 url = &amp;#39;https://qiita.com/api/v2/items/{}&amp;#39;.format(item[&amp;#39;id&amp;#39;]) logger.info(&amp;#39;GET {}&amp;#39;.format(url)) response = requests.get(url, headers=headers) response.raise_for_status() item[&amp;#39;page_views_count&amp;#39;] = json.loads(response.text)[&amp;#39;page_views_count&amp;#39;] # ストック数 url = &amp;#39;https://qiita.com/api/v2/items/{}/stockers&amp;#39;.format(item[&amp;#39;id&amp;#39;]) logger.info(&amp;#39;GET {}&amp;#39;.format(url)) response = requests.get(url, headers=headers) response.raise_for_status() users = json.loads(response.text) for user in users: logger.info({ &amp;#39;id&amp;#39;: user[&amp;#39;id&amp;#39;], &amp;#39;name&amp;#39;: user[&amp;#39;name&amp;#39;] }) item[&amp;#39;stocks_count&amp;#39;] = len(users) return items def upload_s3(items): s3 = boto3.client(&amp;#39;s3&amp;#39;) bucket_name = s3.Bucket(os.environ[&amp;#39;BUCKET_NAME&amp;#39;]) json_key = &amp;#39;output/sample.json&amp;#39; s3.put_object(Bucket=bucket_name, Key=json_key, Body=json.dumps(items,ensure_ascii=False)) def lambda_handler(event, context): TOKEN = os.environ[&amp;#39;TOKEN&amp;#39;] items = get_items(TOKEN) upload_s3(items) return items 実行後、バケット確認 JSONファイルが保存されていることを確認しました。 さいごに pythonのrequestsを使ってAPIからデータを取得できました。 今後は、以下に発展させていこうと思います。 ファイル名にタイムスタンプの追加 CloudWatchから定期的に実行 収集したログの可視化]"
}
,{
url: "https://icck.github.io/posts/0009-qiita-curl/",
title: "Qiita API でいいねとVIEW数をCurlで取得する方法",
content: "[はじめに QiitaにはAPIが用意されています。 私もQiitaに投稿しているのですが、Google Analyticsでは取得しきれない「いいね」の情報が欲しくてCurlで取得する方法を調べてみました。 APIのドキュメントは以下にあります。 https://qiita.com/api/v2/docs APIを使うための準備 個人の情報を取得するためにはアクセストークンを発行する必要があります。 https://qiita.com/settings/tokens/new にアクセスし、アクセストークンを発行しましょう。 発行できたら、あとはドキュメントに従ってCurlでデータを取得していきます。 QIITA_TOKEN=XXXXXXXXX # いいね、記事タイトル→CSV形式 curl -sH &amp;#34;Authorization: Bearer ${QIITA_TOKEN}&amp;#34; \ &amp;#34;https://qiita.com/api/v2/authenticated_user/items?page=1&amp;amp;per_page=100&amp;#34; \ | jq -r &amp;#39;.[] | [.likes_count, .title, .id] | @csv&amp;#39; 0,&amp;#34;Session Managerでプライベートサブネット上のEC2にSSHする方法&amp;#34;,&amp;#34;e8dc6b039ef95d7b3d72&amp;#34; 0,&amp;#34;5分でAWS Elastic Beanstalk(作って、修正して、お片付け)&amp;#34;,&amp;#34;e30d62e878b1b2c6f3d7&amp;#34; 2,&amp;#34;CodeBuildでECRビルドエラーから得た4つの知見&amp;#34;,&amp;#34;bcf118a38c2a691a837d&amp;#34; 0,&amp;#34;AWS Cloud9でAWS SAM CLI環境作成～Hello World(Python)まで&amp;#34;,&amp;#34;873721df727943beb52d&amp;#34; 3,&amp;#34;[Docker for Windows]Kubernetesを動かしてみる&amp;#34;,&amp;#34;91eac9da094666e47c62&amp;#34; 0,&amp;#34;Docker for WindowsでEnabled Kubernetesが出来なくてハマったときの解決方法&amp;#34;,&amp;#34;c40eede0bb120d643f2c&amp;#34; 1,&amp;#34;[小ネタ]fishでaws-cliの補完機能を使うための手順&amp;#34;,&amp;#34;e57a86ba65c14a7fbb19&amp;#34; 9,&amp;#34;Dockerでaws-cli環境を作ればアカウント切替が簡単に&amp;#34;,&amp;#34;40545486a342179a5bd3&amp;#34; 7,&amp;#34;Pythonista3でstashを実行しNo module named &amp;#39;urlparse&amp;#39;が出た場合の解決方法&amp;#34;,&amp;#34;a33a3b113dea0b2fa850&amp;#34; 5,&amp;#34;QiitaにGoogleAnalyticsの設定する。数字を眺めて楽しい&amp;#34;,&amp;#34;56060f8a72863ee05924&amp;#34; 3,&amp;#34;バッチファイルを経由すればPowerShellファイルの実行権限を変えずに指定権限で実行できた&amp;#34;,&amp;#34;60bc30a793a8f4ecdc2b&amp;#34; 27,&amp;#34;Docker for Windowsをインストール後 could not read CA certificateエラーが出た時の解決方法&amp;#34;,&amp;#34;60e1c1f8b6a05c8fdf72&amp;#34; 10,&amp;#34;AWS認定ソリューションアーキテクトアソシエイト合格[2018.04]&amp;#34;,&amp;#34;a1416e818135a424ad89&amp;#34; 2,&amp;#34;[AWS Cloud9]EC2自動停止を検知して別の処理を始める&amp;#34;,&amp;#34;c841fa99af2c88a6d956&amp;#34; 5,&amp;#34;AWS Cloud9でpythonライブラリを含めたLambdaのデプロイ&amp;#34;,&amp;#34;6cc042d2693b84c96905&amp;#34; 16,&amp;#34;AWS Cloud9でLambdaの作成、テスト、デプロイまでの手順まとめ&amp;#34;,&amp;#34;4c2fa4e0bd87ce214c92&amp;#34; 50,&amp;#34;AWS Cloud9を動かしてみた&amp;#34;,&amp;#34;7705ef6871e261d6535e&amp;#34; 1,&amp;#34;Win10 Creators Update後、vagrant upがエラーになったときの解決方法&amp;#34;,&amp;#34;37e3b88c657b4e4cdb51&amp;#34; 11,&amp;#34;SNSでSlack投稿&amp;#34;,&amp;#34;75f484cd3ccd944cd4c2&amp;#34; VIEW数は記事単位でしか取得できないようです。（nullが取得されてしまう） プログラムで記事をループしてVIEW数を取得する必要がありそうですね。 ITEM_ID=7705ef6871e261d6535e curl -sH &amp;#34;Authorization: Bearer ${QIITA_TOKEN}&amp;#34; \ &amp;#34;https://qiita.com/api/v2/items/${ITEM_ID}&amp;#34; \ | jq -r &amp;#39;.page_views_count&amp;#39; 21895 さいごに 投稿した後にVIEW数などは日々気になるものです。 私も自動で取得する仕組みを作るなど応用してみたいと思います。]"
}
,{
url: "https://icck.github.io/posts/0008-fizzbuzz/",
title: "JavaでLambdaを利用してFizzBuzzしてみた",
content: "[FizzBuzzとは エンジニアがテストコードでよく書くネタ。Wiki参照 https://ja.wikipedia.org/wiki/Fizz_Buzz Javaなら1行でシンプルに書ける。そうLambdaならね import java.util.stream.IntStream; public class FizzBuzz { public static void main(String[] args) { IntStream.rangeClosed(1, 100).forEach( i -&amp;gt; System.out.format(&amp;#34;%s%s%n&amp;#34;, (i%3 == 0 ? &amp;#34;Fizz&amp;#34; : &amp;#34;&amp;#34;), (i%5 == 0 ? &amp;#34;Buzz&amp;#34; : (i%3 == 0 ? &amp;#34;&amp;#34; : i)) ) ); } }]"
}
,{
url: "https://icck.github.io/posts/0007-codecommit/",
title: "AWS CodeCommitの作成、プルリクエストまでの方法",
content: "[Codeシリーズはまずは使ってみる！ AWSにはCodeXXXと名前がついているDeveloperツールがいくつかあります。 それらは単体でも使えますが、組み合わせて利用することが多いです。 ↓ 難しく考えず手を動かすことで、手っ取り早く感覚を掴んでいくのが学習しやすいです 本記事では、リポジトリの作成、コミット&amp;amp;プッシュ、プルリクエストの3つを動かして行きます 概要（最低限） ソースコードを管理するGitリポジトリサービス サードパーティ(SourceTreeなど)利用可能 プルリクエスト機能が利用可能 リポジトリの作成 リポジトリ名を入れて、作成ボタン ＞ 完成！！ はじめにマネジメントコンソールでCodeCommitを選択しリポジトリを作成します。 名前を選択するだけ、簡単ですね。 次にgitを使う端末で設定をしていきます。 今回はAWS CLIを設定していることが前提になります。 git config --global credential.helper &amp;#39;!aws --region ap-northeast-1 codecommit credential-helper $@&amp;#39; git config --global credential.UseHttpPath true git clone [URLのクローン] コミット&amp;amp;プッシュしてみる 通常のgitと同様の利用方法が使えることを確認します。 $ echo &amp;#34;hello codecommit!&amp;#34; &amp;gt; README.md $ git add -A $ git commit -m &amp;#34;add readme&amp;#34; $ git push origin master コミットされたことを確認しました。 プルリクエストしてみる ブランチを作成しファイルを修正、コミット%プッシュします。 (master) $ git checkout -b f1 (f1) $ echo &amp;#34;f1 add&amp;#34; &amp;gt;&amp;gt; README.md (f1) $ cat README.md hello codecommit! f1 add (f1) $ git add -A (f1) $ git commit -m &amp;#34;f1 add&amp;#34; (f1) $ git push origin f1 ブランチが作成されました。 さっそくプルリクエストしていきましょう。 作成ボタン＞プルリクエストを作成します。 プルリクエストは左のプルリクエストから確認できます。 未解決のプルリクエストを選択してマージしていきます。 マージ後にブランチは削除を選択し、マージします。 マージされたことを確認しました。 さいごに CodeCommitのUIはシンプルでGitHubの利用経験があれば学習コストはほぼゼロでした。 さくっと共有できるプライベート環境を作りたいときの選択肢としてはありかも知れません。]"
}
,{
url: "https://icck.github.io/posts/0006-fish-aws-cli/",
title: "fishでaws-cliの補完機能を使う",
content: "[bash -&amp;gt; fishに変更した場合、aws-cliの補完機能を有効にする方法 # 位置を特定します $ which aws_completer # 存在しない場合は作成します $ vim ~/.config/fish/config.fish # aws_completerのパスはwhichで調べたパスに適時変更しconfig.fishに追記して保存します $ complete -c aws -f -a &amp;#39;(begin; set -lx COMP_SHELL fish; set -lx COMP_LINE (commandline); /usr/local/bin/aws_completer; end)&amp;#39; #確認 $ aws s &#43; tab さいごに これで、良いfish Lifeを過ごせます。]"
}
,{
url: "https://icck.github.io/posts/0005-dynamodb-ttl/",
title: "Dynamodb TTL(Time to Live、データを自動削除する機能)を使ってみた",
content: "[TTLとは レコード毎にデータの有効期限を指定でき、その有効期限を過ぎるとデータが自動削除される機能です 利用例 低アクセスデータをアーカイブTBLへ移動 メインTBLと同定義、キャパシティーだけ下げてOLDデータを保存 低アクセスデータを削除 削除時にトリガーして、LOGを残す トリガーさせるにはStreamの有効化が必要 TTL詳細 TTL の有効化 カラムで指定した有効期限を過ぎると、自動でデータが消える 変更が完全に処理されるまでに最大で 1 時間かかる TTL 属性 項目の TTL タイムスタンプを保存する DynamoDB 属性の名前 有効期限はNumber型のエポック時間(Unixtime（ミリ秒無し）)を指定 現在の時間を、項目の Time To Live 属性に保存されている時間と比較 属性に保存されているエポック時間の値が現在の時間よりも少ない場合、項目は期限切れとマークされ、その後に削除される データは48時間以内に削除される リアルタイム性が重要でない場合（48時間後に消えてもOKな場合）は、とても有効な機能 スループットは消費せず、データ容量が減らせる エポック時間形式(Unixtime) コンピューターシステム上での時刻表現の一種 UNIXエポック、すなわち協定世界時 (UTC) での1970年1月1日午前0時0分0秒から形式的な経過秒数（すなわち、実質的な経過秒数から、その間に挿入された閏秒を引き、削除された閏秒を加えたもの） 現在時刻からエポック時間を取得する方法 Linux ターミナル: date &#43;%s Python: import time; long(time.time()) Java: System.currentTimeMillis() / 1000L JavaScript: Math.floor(Date.now() / 1000) 実際にやってみた テーブル作成 aws dynamodb create-table --table-name ttl-sample \ --attribute-definitions AttributeName=id,AttributeType=S \ --key-schema AttributeName=id,KeyType=HASH \ --provisioned-throughput \ ReadCapacityUnits=5,WriteCapacityUnits=5 TTLの有効化 aws dynamodb update-time-to-live --table-name ttl-sample --time-to-live-specification &amp;#34;Enabled=true, AttributeName=ttl&amp;#34; { &amp;#34;TimeToLiveSpecification&amp;#34;: { &amp;#34;AttributeName&amp;#34;: &amp;#34;ttl&amp;#34;, &amp;#34;Enabled&amp;#34;: true } } aws dynamodb describe-time-to-live --table-name ttl-sample { &amp;#34;TimeToLiveDescription&amp;#34;: { &amp;#34;AttributeName&amp;#34;: &amp;#34;ttl&amp;#34;, &amp;#34;TimeToLiveStatus&amp;#34;: &amp;#34;ENABLED&amp;#34; } } データ追加(TTL:５日) EXP=`date -d &amp;#39;&#43;5 days&amp;#39; &#43;%s` aws dynamodb put-item --table-name &amp;#34;ttl-sample&amp;#34; --item &amp;#39;{&amp;#34;id&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;1&amp;#34;}, &amp;#34;ttl&amp;#34;: {&amp;#34;N&amp;#34;: &amp;#34;&amp;#39;$EXP&amp;#39;&amp;#34;}}&amp;#39; aws dynamodb scan --table-name ttl-sample { &amp;#34;Count&amp;#34;: 1, &amp;#34;Items&amp;#34;: [ { &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;1&amp;#34; }, &amp;#34;ttl&amp;#34;: { &amp;#34;N&amp;#34;: &amp;#34;1567788232&amp;#34; } } ], &amp;#34;ScannedCount&amp;#34;: 1, &amp;#34;ConsumedCapacity&amp;#34;: null } お片付け aws dynamodb delete-table --table-name ttl-sample さいごに 特定のしきい値があって、消したいけどリアルタイム性は求めないという場合は使える機能 s3のライフサイクル機能のDynamo版と認識してOK]"
}
,{
url: "https://icck.github.io/posts/2019-08-31/",
title: "DynamoDBでSparse Indexesを利用するテクニック",
content: "[Sparse Indexesとは DynamoDBのデータ抽出アプローチのテクニックの１つ 特定Itemにしか設定していない項目にGSIを含めることでプライマリーキー、ソートキー以外のキーでデータ抽出を容易に 以下の悩みを解決（プライマリーキー、ソートキー以外のキーでデータ抽出） scanだと高コスト、キーで検索しても高コスト、フィルターだとキー検索とコスト一緒 サンプル: gameから最優秀賞を取得 初期テーブル game単位で最優秀スコアのデータを取得したい scoreの最優秀をawdという項目を用意。対象以外は項目を設定しない awdを含めたグローバルセカンダリインデックスを作成 GSIを検索 最優秀賞が設定されている項目が少ないため、VIEWが出来た時点で絞り込まれている scanしても低コスト！←今回の一番のポイント aws dynamodb scan --table-name game --index-name name-awd-index { &amp;#34;Count&amp;#34;: 1, &amp;#34;Items&amp;#34;: [ { &amp;#34;score&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;3&amp;#34; }, &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;user3&amp;#34; }, &amp;#34;awd&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;cp&amp;#34; }, &amp;#34;name&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;game1&amp;#34; } } ], &amp;#34;ScannedCount&amp;#34;: 1, &amp;#34;ConsumedCapacity&amp;#34;: null }]"
}
,{
url: "https://icck.github.io/posts/2019-08-29/",
title: "DynamoDBをaws cliで操作する",
content: "[Create Table (sample:mails) aws dynamodb create-table --table-name mails \ --attribute-definitions \ AttributeName=id,AttributeType=S \ AttributeName=Name,AttributeType=S \ --key-schema \ AttributeName=id,KeyType=HASH \ AttributeName=Name,KeyType=RANGE \ --provisioned-throughput \ ReadCapacityUnits=2,WriteCapacityUnits=2 attribute-definitions プライマリーキーとソートキーを定義する それ以外のキーはテーブル作成時には定義しなくても良い key-schema HASH パーティションキー RANGE ソートキー provisioned-throughput ReadCapacityUnits 読み込みスループット WriteCapacityUnits 書き込みスループット put-item aws dynamodb put-item \ --table-name mails \ --item &amp;#39;{&amp;#34;id&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;testid1&amp;#34;},&amp;#34;Name&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;Alice&amp;#34;},&amp;#34;mail&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;alice@test.mail&amp;#34;} }&amp;#39; \ --return-consumed-capacity TOTAL { &amp;#34;ConsumedCapacity&amp;#34;: { &amp;#34;CapacityUnits&amp;#34;: 1.0, &amp;#34;TableName&amp;#34;: &amp;#34;mails&amp;#34; } } return-consumed-capacity TOTAL 消費された書き込みキャパシティーユニットの総数を返します。 INDEXES 消費された書き込みキャパシティーユニットの総数と、テーブルおよびオペレーションの影響を受けた セカンダリインデックス の小計を返します。 NONE 書き込みキャパシティーの詳細は返されません。(これがデフォルトです) jsonファイルを作成し読み込む事も可能 &amp;ndash;item file://item.json 項目を書き込む PutItem 登録 UpdateItem 更新 DeleteItem 削除 Scan aws dynamodb scan --table-name mails { &amp;#34;Count&amp;#34;: 2, &amp;#34;Items&amp;#34;: [ { &amp;#34;mail&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;test@test.com&amp;#34; }, &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;1&amp;#34; }, &amp;#34;Name&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;test&amp;#34; } }, { &amp;#34;mail&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;alice@test.mail&amp;#34; }, &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;testid1&amp;#34; }, &amp;#34;Name&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;Alice&amp;#34; } } ], &amp;#34;ScannedCount&amp;#34;: 2, &amp;#34;ConsumedCapacity&amp;#34;: null } get-item(Key Select) aws dynamodb get-item --table-name mails --key &amp;#39;{ &amp;#34;id&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;1&amp;#34; },&amp;#34;Name&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;test&amp;#34;} }&amp;#39; { &amp;#34;Item&amp;#34;: { &amp;#34;mail&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;test@test.com&amp;#34; }, &amp;#34;id&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;1&amp;#34; }, &amp;#34;Name&amp;#34;: { &amp;#34;S&amp;#34;: &amp;#34;test&amp;#34; } } } HASHのみを設定するとエラーとなった。ソートキーも指定する必要があるようだ。 Record Count aws dynamodb scan --table-name mails --select &amp;#34;COUNT&amp;#34; { &amp;#34;Count&amp;#34;: 2, &amp;#34;ScannedCount&amp;#34;: 2, &amp;#34;ConsumedCapacity&amp;#34;: null } list-tables aws dynamodb list-tables { &amp;#34;TableNames&amp;#34;: [ &amp;#34;mails&amp;#34; ] } delete-item(Key Select) aws dynamodb delete-item --table-name mails --key &amp;#39;{ &amp;#34;id&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;1&amp;#34; },&amp;#34;Name&amp;#34;: {&amp;#34;S&amp;#34;: &amp;#34;test&amp;#34;} }&amp;#39; aws dynamodb scan --table-name mails --select &amp;#34;COUNT&amp;#34; { &amp;#34;Count&amp;#34;: 1, &amp;#34;ScannedCount&amp;#34;: 1, &amp;#34;ConsumedCapacity&amp;#34;: null } delete-table aws dynamodb delete-table --table-name mails { &amp;#34;TableDescription&amp;#34;: { &amp;#34;TableArn&amp;#34;: &amp;#34;arn:aws:dynamodb:ap-northeast-1:699559627754:table/mails&amp;#34;, &amp;#34;ProvisionedThroughput&amp;#34;: { &amp;#34;NumberOfDecreasesToday&amp;#34;: 0, &amp;#34;WriteCapacityUnits&amp;#34;: 2, &amp;#34;ReadCapacityUnits&amp;#34;: 2 }, &amp;#34;TableSizeBytes&amp;#34;: 0, &amp;#34;TableName&amp;#34;: &amp;#34;mails&amp;#34;, &amp;#34;TableStatus&amp;#34;: &amp;#34;DELETING&amp;#34;, &amp;#34;TableId&amp;#34;: &amp;#34;4603179a-b965-4d40-b350-55954959646e&amp;#34;, &amp;#34;ItemCount&amp;#34;: 0 } }]"
}
,{
url: "https://icck.github.io/posts/2019-08-28/",
title: "Hugoに全文検索機能を追加する",
content: "[完成したもの まずは動いているものは以下になります。 https://icck.github.io/search/ 作業手順 手順を順に記載していきます。以下の記事を参考にさせていただきました。 http://rs.luminousspice.com/hugo-site-search/ https://snap.textgh.org/post/full-text-search-in-hugo/ インデックスファイルのテンプレート $ mkdir ./layouts/js $ touch ./layouts/js/single.html var data = [{{ range $index, $page := where .Site.Pages &amp;#34;Section&amp;#34; &amp;#34;posts&amp;#34;}} {{ if ne $index 0 }},{{ end }}{ url: &amp;#34;{{ $page.Permalink }}&amp;#34;, title: &amp;#34;{{ $page.Title }}&amp;#34;, content: &amp;#34;{{ .PlainWords }}&amp;#34; }{{ end }}] インデックスファイルを生成する空の投稿 $ hugo new pages/indexjs.md --- date: 2019-08-28T21:50:35&#43;09:00 type: &amp;#34;js&amp;#34; url: &amp;#34;index.js&amp;#34; --- 検索ページの作成 検索ページテンプレートの作成 $ mkdir ./layouts/search/ $ touch ./layouts/search/single.html {{ partial &amp;#34;head.html&amp;#34; . }} &amp;lt;div class=&amp;#34;container&amp;#34;&amp;gt; &amp;lt;h1&amp;gt;サイト内全文検索&amp;lt;/h1&amp;gt; &amp;lt;ul&amp;gt; &amp;lt;li&amp;gt;キーワードを入力するとリアルタイムで検索を始めます。 &amp;lt;li&amp;gt;入力欄フォーカス中は、エンターキー、矢印キーでベージ送りします。 &amp;lt;/ul&amp;gt; &amp;lt;script src=&amp;#34;https://icck.github.io/index.js&amp;#34; charset=&amp;#34;utf-8&amp;#34;&amp;gt;&amp;lt;/script&amp;gt; &amp;lt;style&amp;gt; dd{ margin:0; padding:0 0 1em 0.5em; width:90%; } dd span{ font-size:80%; color:#888; } dd b{ color:#666600; background-color:#ffffdd; font-weight:bold; border:1px solid #bbbb00; margin:0 2px 0 2px; padding:0 2px 0 2px; } #navi{ margin:0.5rem 0; line-height:2rem; } #navi span{ border-top:1px solid #d8d8d8; border-bottom:1px solid #d8d8d8; padding: 0.33rem 0.66rem; cursor:pointer; word-wrap:break-word; } #navi span.selected{ background: #D3EDF7; } #navi span:first-child{ border-left:1px solid #d8d8d8; border-top-left-radius: 0.4rem; border-bottom-left-radius: 0.4rem; } #navi span:last-child{ border-right:1px solid #d8d8d8; border-top-right-radius: 0.4rem; border-bottom-right-radius: 0.4rem; } #searchbox input{ font-size: 10px; padding: .3em; margin-left:2em; margin-bottom: 1em; } @media (max-width: 15em) { #navi{ width:300px; } } &amp;lt;/style&amp;gt; &amp;lt;div id=&amp;#34;searchbox&amp;#34;&amp;gt; &amp;lt;input type=&amp;#34;text&amp;#34; id=&amp;#34;q&amp;#34; onkeyup=&amp;#34;do_find(this.value)&amp;#34; onkeydown=&amp;#34;key(event.keyCode)&amp;#34; autocomplete=&amp;#34;off&amp;#34; placeholder=&amp;#34;サイト内を検索&amp;#34;&amp;gt; &amp;lt;span class=&amp;#34;fa fa-search&amp;#34; aria-hidden=&amp;#34;true&amp;#34;&amp;gt;&amp;lt;/span&amp;gt;&amp;lt;span id=&amp;#34;stat&amp;#34;&amp;gt;&amp;lt;/span&amp;gt; &amp;lt;div id=&amp;#34;navi&amp;#34;&amp;gt;&amp;lt;/div&amp;gt; &amp;lt;div id=&amp;#34;result&amp;#34;&amp;gt;&amp;lt;/div&amp;gt; &amp;lt;/div&amp;gt; &amp;lt;script&amp;gt; window.onload=function(){ gid(&amp;#34;q&amp;#34;).focus(); } { $_ = String.prototype; $_.mReplace = function(pat,flag){ var temp = this; if(!flag){flag=&amp;#34;&amp;#34;} for(var i in pat){ var re = new RegExp(i,flag); temp = temp.replace(re,pat[i]) } return temp; }; } { $_ = Date.prototype; $_.format = &amp;#34;yyyy-mm-dd HH:MM:SS&amp;#34;; $_.formatTime = function(format){ var yy; var o = { yyyy : ((yy = this.getYear()) &amp;lt; 2000)? yy&#43;1900 : yy, mm : this.getMonth() &#43; 1, dd : this.getDate(), HH : this.getHours(), MM : this.getMinutes(), SS : this.getSeconds() } for(var i in o){ if (o[i] &amp;lt; 10) o[i] = &amp;#34;0&amp;#34; &#43; o[i]; } return (format) ? format.mReplace(o) : this.format.mReplace(o); } } &amp;lt;/script&amp;gt; &amp;lt;script&amp;gt; var start = new Date().getTime(); var bodylist = []; var st = gid(&amp;#34;stat&amp;#34;); var re = gid(&amp;#34;result&amp;#34;); var nv = gid(&amp;#34;navi&amp;#34;); var max = 5; var KC = { enter: 13, left : 37, right: 39, up : 38, down : 40 }; function gid(id){ return document.getElementById(id); } function ignore_case(){ var a = arguments; return &amp;#34;[&amp;#34; &#43; a[0] &#43; a[0].toUpperCase() &#43; &amp;#34;]&amp;#34; } function do_find(v){ if(this.lastquery == v){return} this.lastquery = v; var re = find(v); if(re.length){ pagenavi(re); view(re) } } function key(c){ switch(c){ case KC.enter: mv(1);break; case KC.left : mv(-1);break; case KC.right: mv(1);break; case KC.up : mv(-1);break; case KC.down : mv(1);break; } } function find(v){ var query = v; if(!v){return []} var aimai; if(query){ aimai = query.replace(/[a-z]/g,ignore_case); try{ reg = new RegExp(aimai,&amp;#34;g&amp;#34;); }catch(e){ reg = /(.)/g; } }else{ reg = /(.)/g; } var start = new Date().getTime(); var result = []; for(var i=0;i&amp;lt;data.length;i&#43;&#43;){ var s = bodylist[i]; var res = reg.exec(s); if(!res){continue} var len = res[0].length; var idx = res.index; if(idx != -1){ result.push([i,idx,len]); } } if(result.length){ st.innerHTML = result.length &#43;&amp;#34;件見つかりました。&amp;#34;; } var end = new Date().getTime(); console.log(&amp;#34;Find:&amp;#34;&#43; (end-start) &#43; &amp;#34; ms&amp;#34;); return result; } function time2date(time){ if(!this.cache){this.cache = {}}; if(this.cache[time]) return this.cache[time]; var d = new Date(time*1000); this.cache[time] = d.formatTime(&amp;#34;yyyy年mm月dd日&amp;#34;); return this.cache[time]; } function snippet(body,idx,len){ var start = idx - 20; return [ body.substring(start,idx), ,&amp;#34;&amp;lt;b&amp;gt;&amp;#34; ,body.substr(idx,len) ,&amp;#34;&amp;lt;/b&amp;gt;&amp;#34; ,body.substr(idx&#43;len,50), ].join(&amp;#34;&amp;#34;); } function pagenavi(result){ var len = result.length; var ct = Math.ceil(len/max); var buf = []; for(var i=0;i&amp;lt;ct;i&#43;&#43;){ buf.push( &amp;#34;&amp;lt;span onclick=&amp;#39;view(\&amp;#34;\&amp;#34;,&amp;#34; ,i&#43;1 ,&amp;#34;);sw(&amp;#34;,i,&amp;#34;)&amp;#39;&amp;gt;&amp;#34; ,i&#43;1 ,&amp;#34;&amp;lt;/span&amp;gt;&amp;#34; ); } nv.innerHTML = buf.join(&amp;#34;&amp;#34;); sw(0); } function sw(t){ var span = nv.getElementsByTagName(&amp;#34;span&amp;#34;); for(var i=0;i&amp;lt;span.length;i&#43;&#43;){ span[i].className = (i==t)?&amp;#34;selected&amp;#34;:&amp;#34;&amp;#34;; } } function mv(to){ var span = nv.getElementsByTagName(&amp;#34;span&amp;#34;); var current; if(!span.length){return} for(var i=0;i&amp;lt;span.length;i&#43;&#43;){ if(span[i].className == &amp;#34;selected&amp;#34;){ current = i;break; } } var moveto = current&#43;to; if(moveto &amp;lt; 0){return} if(moveto &amp;gt; span.length-1){moveto=0} sw(moveto); view(&amp;#34;&amp;#34;,moveto&#43;1) } function view(result,offset){ if(!offset){offset = 1} if(!result){ result = this.last.reverse(); }else{ this.last = result; } var r = result.reverse(); var buf = [&amp;#34;&amp;lt;dl&amp;gt;&amp;#34;]; var count = 0; for(var i=(offset-1)*max;i&amp;lt;r.length;i&#43;&#43;){ count&#43;&#43;; if(count &amp;gt; max){break} var num = r[i][0]; var idx = r[i][1]; var len = r[i][2]; with(data[num]){ buf.push( &amp;#34;&amp;lt;dt&amp;gt;&amp;lt;a href=&amp;#39;&amp;#34;,url,&amp;#34;&amp;#39;&amp;gt;&amp;#34; ,title||&amp;#34;無題&amp;#34;,&amp;#34;&amp;lt;/a&amp;gt;&amp;#34; ,&amp;#34;&amp;lt;dd&amp;gt;&amp;#34; ,snippet(bodylist[num],idx,len) ); } } re.innerHTML = buf.join(&amp;#34;&amp;#34;); } for(var i=0;i&amp;lt;data.length;i&#43;&#43;){ bodylist.push(data[i].title&#43; &amp;#34; &amp;#34; &#43;data[i].content); } var bodyidx = bodylist.join(&amp;#34;&amp;lt;&amp;gt;&amp;#34;); var end = new Date().getTime(); console.log(&amp;#34;Index:&amp;#34;&#43; (end-start) &#43; &amp;#34; ms&amp;#34;); &amp;lt;/script&amp;gt; &amp;lt;noscript&amp;gt;&amp;lt;p class=&amp;#34;notice&amp;#34;&amp;gt;注意: この検索機能は JavaScript を使用しています。&amp;lt;/p&amp;gt;&amp;lt;/noscript&amp;gt; &amp;lt;/div&amp;gt; &amp;lt;/div&amp;gt; {{ partial &amp;#34;footer.html&amp;#34; . }} 検索ページの作成 $ hugo new pages/search.md --- date: 2019-08-28T22:01:57&#43;09:00 type: &amp;#34;search&amp;#34; url: &amp;#34;search&amp;#34; title: &amp;#34;全文検索&amp;#34; --- config.toml追記 [[menu.header]] name = &amp;#34;search&amp;#34; weight = 30 url = &amp;#34;/search&amp;#34;]"
}
,{
url: "https://icck.github.io/posts/000/",
title: "Hugoブログ更新方法",
content: "[Hugoの使い方を今後のブログ更新のために Hugoでブログを書いていく上で、運用方法をメモしていこうと思います。 インストール等は気が向いたときに。 Local環境を起動 $ hugo server --theme=hugo-theme-nix --buildDrafts --watch 記事の作成 $ hugo new post/test.md --- title: &amp;#34;test&amp;#34; date: 2019-08-26T01:14:23&#43;09:00 draft: true --- title:記事のタイトルに修正 date:作成時刻のため、そのまま draft:trueが非公開。falseに変更し公開 Sample --- title: &amp;#34;test&amp;#34; date: 2019-08-26T01:14:23&#43;09:00 draft: false --- ## ここにマークダウンで本文を記載 githubへpush ./deploy.sh]"
}
,{
url: "https://icck.github.io/posts/",
title: "Posts",
content: "[]"
}]