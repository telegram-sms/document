Telegram SMSのご利用ありがとうございます.このマニュアルに沿ってゼロからTelegram SMS Botを構築することが出来ます.

## 紹介
Telegram SMSはAndroid端末で稼働するTelegram Bot.中継サーバーの必要がなく,端末のネット環境で`api.telegram.org`がアクセスできるだけで使えます.

## 1. はじめに - Telegram Botを作る

* [@botfather](https://t.me/botfather)をアクセスして,`/newbot`を入力し,新しいTelegram Botを作ります.

> Telegram SMSは端末ごとに一つのBotが必要になります.二つの端末で一つのBotを使う場合は不具合が生じる可能性があります.

*  `Alright, a new bot. How are we going to call it? Please choose a name for your bot.` のメッセージが表示されたら,Botの表示名を入力します.

* `Good. Now let's choose a username for your bot. It must end in bot. Like this, for example: TetrisBot or tetris_bot.` のメッセージが表示されたら,Botのユーザー名を入力します.ユーザー名の語尾は`bot`で終わる必要があります.

* そしてBot tokenとURLが入ったメッセージが下のように表示されます.t.me のURLをクリックし,Botをトークリストに追加して起動ます.(`/start`を送るによって,設定時の助けになります.)

```
Done! Congratulations on your new bot. You will find it at t.me/<Username of your bot>. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
xxxxxxxx:xxxxxxxxxxxxxx
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

`xxxxxxxx:xxxxxxxxxxxxxx` はBot tokenです.

## 2. 設定 - Botの応答を確認

> Telegram SMS は Long Polling を使ってコマンドを受信するので,Webhook の設定は必要ないです.もしBotがすでに Webhook を設定している場合は `https://apt.telegram.org/bot<Your bot token>/setwebhook` をアクセスして Webhook を無効化してください.

* 端末で先にもらったBot tokenを入力します.

> PCでADBを使ってAndroid端末を設定する場合は,`adb shell input text <Your bot token>`のコマンドを使って,テキストボックスでBot tokenの入力が出来ます.

* Botに一言を送ります.(`/start`を送った場合はこのステップをスキップしても大丈夫です)

* `Get recent chat ID`をクリックして,あなたのアカウントを選択します.

* 信頼できる電話番号を入力します.この電話番号で遠隔操作ができます.この電話番号でSMSを使ってバックグラウンドの再起動ができます.

* 以下の選択肢が選択できます.
>* ネットワークエラー,SMSで送信する - Telegramに送信失敗したメッセージを信頼した電話番号にSMSで送信します.
>* バッテリー状態の変化を監視する - 端末の充電状態が変わる時や低電力のとき通知します
>* チャットコマンドを取得する - チャットコマンドでBotを管理します. (無効の場合はSMSコマンドのみ管理できます)
>* デュアルカードモードでSIMカードのエイリアスを表示する - メッセージタイトルでSIMカードのエイリアスを表示します.
* `テストと保存` をクリックして必要なパーミッションを与えます.以下のメッセージがもらったら設定が終わります.

```
[システム情報]
Telegram Botサーバーに正常に接続しました.
```

### 注意事項
* Telegram SMS は安定でメッセージを送るため,端末のアダプティブバッテリーの無効化が必要です. プロキシアプリを使った場合もバッテリー制限をしないでください.

* MIUIなどのROMを使っているとき,バッテリー制限を無効にして,自動起動を許可してください.お知らせメールの取得の権限も与えてください.

* 最適化機能が自動的にアプリを停止させることもあるので無効化にしてください.(未検証)

* SMSを所得できない場合はデフォルトSMSアプリをTelegram SMSにしてください.

## 3. SMS - 信頼した電話番号でBOTを管理する
SMS転送を許可する電話番号の追加ができます.追加した電話番号から指定書式のメッセージが受信した場合は,メッセージの指定内容は指定相手に送りします.書式:
```
<受信先の電話番号>
<本文>
```

例:

```
+441807391001
example.com
```

以上のメッセージで`example.com`をSMSで`+441807391001`に送信します.

`restart-service`を送るによって全てのサービスを再起動することができます.
** ローミング状態の場合は, 電話番号の前に国番号を追加してください.(日本: +81)

## 4. コマンド - チャットコマンドでBOTを管理する

`/start`を送るによってコマンドリストが表示されます.
SMSを送信するコマンドの書式:

```
/sendsms
<受信先の電話番号>
<本文>
```
例:
```
/sendsms
+441807391001
example.com
```

以上のメッセージで`example.com`をSMSで`+441807391001`に送信します.

`/sendsms`コマンドの送信元はデフォルトSIMカードです.デュアルカードモードを使っているときは`/sendsms1`と`/sendsms2`で送信先を指定することができます.

Telegramの応答(reply)機能で直接SMSで応答することができます.(ログをクリアした場合はクリア時点前のメッセージはこの機能が使えなくなります.)

通話の権限が与えていないときはフォルトSIMカードのみSMSの送信ができます.