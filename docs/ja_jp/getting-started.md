# はじめに

## 始めましょう - Telegram Botの作成

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

## 設定 - ボットの応答設定

* 取得したボットトークンをボットトークン欄に入力します。

> https://config.telegram-sms.com を使用して、ボットトークンを含むQRコードを生成し、QRコードスキャン機能で素早く入力できます。

* ボットを有効化し、チャンネルまたはグループに追加します。グループに追加し、「ボットユーザー名を含むコマンドのみに応答」機能を使用する場合は、`BotFather`で`Privacy mode`をオフにし、一部のメッセージが正しく処理されない問題を回避してください。

* 目的の会話でメッセージを送信します（内容は任意）。

* 「最新の会話IDを取得」をクリックし、監視してメッセージを受信したい会話を選択します。

* [オプション] 信頼できる電話番号を入力します。この電話番号はSMSによるリモート制御に使用されます。この番号を使用してSMSの送信やバックグラウンドサービスの再起動をリモートで制御できます。

* 以下の追加オプションを選択します：

>* ネットワークエラー時のSMSバックアップ - ネットワークメッセージの送信に失敗した場合、信頼できる番号にSMSで送信します。
>* バッテリー状態の監視 - 充電状態の変化やバッテリー残量が少ないときにメッセージを送信します。
>* 充電器の状態の監視 - 充電器の状態が変化したときにメッセージを送信します。
>* チャットコマンドの取得 - チャットコマンドでボットを制御（無効にした場合はSMSでのみ制御可能）。
>* 認証コードの自動抽出 - SMS内の認証コードを自動認識（実験的機能）。
>* デュアルSIMモードでSIMカードの別名を表示 - メッセージタイトルにSIMカードの別名を表示。
>* ボットユーザー名を含むコマンドにのみ応答 - グループやチャンネルでは、ボットユーザー名を含むコマンドにのみ応答。
>* DNS over HTTPSの使用 - 暗号化された安全なDNSサービスを使用（Cloudflare®基盤）。

* 「テストして保存」をクリックし、必要な権限を付与します。以下のメッセージが表示されたら、設定は完了です：

```
[システム情報]
Telegram botサーバーに正常に接続されました。
```

## 注意事項

* Telegram SMSはバッテリー最適化機能を無効にする必要があります。バッテリー最適化を無効にすることで、プログラムは安定的かつ迅速にメッセージを受信できるようになります。プロキシソフトウェアを使用する場合は、そちらのバッテリー最適化も無効にしてください。

* MIUIなどのカスタマイズされたシステムを使用する場合は、設定でバッテリー制限をオフにし、起動時の自動起動を有効にしてください。通知系のSMSを受信する必要がある場合は、設定で通知系のSMS権限を有効にしてください。[詳細はこちらをクリック](https://telegram-sms.com/ja_jp/Q&A.html)

* EMUIを使用する場合、特殊なシステムのバックグラウンド管理メカニズムにより、Telegram SMSのバックグラウンドプロセスが正常にバックグラウンドで実行できません。

* システムがSMS通知を正常に受信できない場合、これはシステムの制限によるものです。このアプリをデフォルトのSMSアプリとして設定してみてください。

## 著作権情報

- Telegram®はTelegram Messenger LLPの登録商標です。
- Cloudflare®はCloudflare, Inc.の登録商標です。
- MIUI®は小米科技有限責任公司の登録商標です。
