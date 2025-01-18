# ユーザーマニュアル

## ようこそ

Telegram SMSをご利用いただき、ありがとうございます！このマニュアルを読むことで、Telegram SMSボットの構築方法を最初から学ぶことができます。

## はじめに

Telegram SMSは、Androidデバイス上で動作するTelegram Botで、サードパーティのリレーサーバーを必要としません。現在のネットワーク環境で`api.telegram.org`にアクセスできれば、正常に動作します。リモートコマンドを使用して、SMSや不在着信、バッテリー残量を便利に管理することができます。

## 1. 始めましょう - Telegram Botの作成

* [@botfather](https://t.me/botfather)にアクセスし、`/newbot`を入力してボットアカウントを取得します。

> Telegram SMSは1台の携帯電話に1つのボットアカウントという原則を採用しているため、複数の携帯電話で1つのボットアカウントを共有しないでください。複数のボットアカウントをグループやチャンネルに追加して一括管理することができます。

* `Alright, a new bot. How are we going to call it? Please choose a name for your bot.`と表示されたら、ボットアカウントの表示名を入力します。

* `Good. Now let's choose a username for your bot. It must end in bot. Like this, for example: TetrisBot or tetris_bot.`と表示されたら、ボットのユーザー名を入力します。ユーザー名は`bot`で終わる必要があります。

* その後、以下のようなボットトークンと追加リンクが表示されます：

```
Done! Congratulations on your new bot. You will find it at t.me/<あなたのボットユーザー名>. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
xxxxxxxx:xxxxxxxxxxxxxx
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

`xxxxxxxx:xxxxxxxxxxxxxx`がボットトークンです。設定したユーザー名で作成したボットを見つけることができます。

## 2. 設定 - ボットの応答設定

* 上記で取得したボットトークンをボットトークン欄に入力します。

> https://config.telegram-sms.com を使用して、ボットトークンを含むQRコードを生成し、QRコードスキャン機能を使用して素早く入力することができます。

* ボットを有効化し、チャンネルまたはグループに追加します。グループに追加し、「ボットユーザー名を含むコマンドのみに応答」機能を使用する場合は、`BotFather`で`Privacy mode`をオフにし、一部のメッセージが正しく処理されない問題を回避してください。

* 目的の会話でメッセージを送信します（内容は任意）。

* 「最新の会話IDを取得」をクリックし、監視してメッセージを受信したい会話を選択します。

* [オプション] 信頼できる電話番号を入力します。この電話番号はSMSによるリモート制御に使用されます。この番号を使用してSMSの送信やバックグラウンドサービスの再起動をリモートで制御できます。

* 以下の追加オプションを選択します：

>* ネットワークエラー時にSMSにフォールバック - ネットワークメッセージの送信に失敗した場合、SMSで信頼できる番号に送信します。
>* バッテリー状態の監視 - 充電状態が変化したり、バッテリー残量が少なくなったりした場合にメッセージを送信します。
>* 充電器状態の監視 - 充電器の状態が変化した場合にメッセージを送信します。
>* チャットコマンドの取得 - チャットコマンドでボットを管理します（無効にするとSMSでのみ管理）。
>* 認証コードの自動抽出 - SMS内の認証コードを自動的に認識します（実験的機能）。
>* SIMカードエイリアスの表示 - メッセージタイトルにカードエイリアスを表示します。
>* ボットユーザー名を含むコマンドのみに応答 - グループやチャンネルでボットユーザー名を含むコマンドのみに応答します。
>* DNS over HTTPSの使用 - セキュアな暗号化DNSサービス（Cloudflare®ベース）を使用します。

* 「テストして保存」をクリックし、必要な権限を付与します。以下のメッセージが表示されたら、設定は完了です：

```
[システム情報]
Telegram botサーバーに正常に接続されました。
```

### 注意事項
* Telegram SMSはバッテリー最適化機能を無効にする必要があります。バッテリー最適化を無効にすることで、プログラムは安定的かつ迅速にメッセージを受信できるようになります。プロキシソフトウェアを使用する場合は、そちらのバッテリー最適化も無効にしてください。

* MIUIなどのカスタマイズされたシステムを使用する場合は、設定でバッテリー制限をオフにし、起動時の自動起動を有効にしてください。通知系のSMSを受信する必要がある場合は、設定で通知系のSMS権限を有効にしてください。[詳細はこちらをクリック](https://telegram-sms.com/ja_jp/Q&A.html#%E4%B8%80%E8%88%AC%E7%9A%84%E3%81%AAsms%E3%81%AF%E5%8F%97%E4%BF%A1%E3%81%A6%E3%82%99%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B%E3%82%99%E3%80%81%E8%AA%8D%E8%A8%BC%E3%82%B3%E3%83%BC%E3%83%88%E3%82%99%E3%82%92%E5%90%AB%E3%82%80sms%E3%81%AF%E5%8F%97%E4%BF%A1%E3%81%A6%E3%82%99%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93)

* EMUIを使用する場合、特殊なシステムのバックグラウンド管理メカニズムにより、Telegram SMSのバックグラウンドプロセスが正常にバックグラウンドで実行できません。

* システムがSMS通知を正常に受信できない場合、これはシステムの制限によるものです。このアプリをデフォルトのSMSアプリとして設定してみてください。

## 3. SMS - 信頼できる電話によるボットの制御

自動転送用に信頼できる電話番号を指定できます。ボットがその番号からメッセージを受信すると自動的に転送されます。フォーマットは以下の通りです：

```
/sendsms
{受信者の電話番号}
{SMSの内容}
```

例：

```
/sendsms
10086
cxll
```

これにより、内容`cxll`のSMSが番号`10086`に送信されます。

信頼できる電話から`/restart-service`コマンドを送信することで、すべてのバックグラウンドプロセスを再起動できます。

`/sendussd`を使用してUSSDリクエストを送信できます。フォーマットは以下の通りです：

```
/sendussd
{USSDコード}
```

**現在の地域にいない場合は、国/地域の呼び出しコードを追加してください（例：中国本土の国際コード：+86）。**

## 4. コマンド - チャットコマンドによるボットの制御

`/start`コマンドを送信することで、現在利用可能なコマンドのリストを取得できます。

### SMSの送信

コマンドを使用したSMSの送信フォーマットはSMS送信と同じです。また、`/sendsms`を直接送信して対話式のSMS送信に入ることもできます。

`/sendsms`を使用するとデフォルトのSIMカードからSMSが送信されます。複数のSIMカードを使用している場合、`/sendsms1`で1枚目のSIMカードから、`/sendsms2`で2枚目のSIMカードから送信できます（利用可能な場合）。

### SMSへの返信

Telegramの返信機能を使用して、受信したSMSや不在着信に素早く返信できます。

電話の権限が許可されていない場合、デフォルトのSIMカードでのみSMSを送信できます。

### USSDリクエストの送信

`/sendussd`を使用してUSSDリクエストを送信できます。フォーマットは以下の通りです：

```
/sendussd {USSDコード}
```

### グループでの複数ボット管理

グループやチャンネルでボットを使用し、「ボットユーザー名を含むコマンドのみに応答」を選択している場合、ボットは`/<コマンド>@<ボットユーザー名>`の形式のコマンドにのみ応答します。この機能を利用することで、グループやチャンネルで複数のボットを管理できます。

## 5. 著作権情報

- Telegram®はTelegram Messenger LLPの登録商標です。

- Cloudflare®はCloudflare, Inc.の登録商標です。

- MIUI®は小米科技有限責任公司の登録商標です。