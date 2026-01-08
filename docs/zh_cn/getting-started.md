# 快速开始

## 第一步 - 建立一个Telegram Bot

* 访问 [@botfather](https://t.me/botfather)，输入 `/newbot` 来获取一个机器人账户。

> Telegram SMS 采取一台手机一个机器人账户的原则，故请不要多台手机共用一个机器人账户。您可以将多个机器人账户加到群组或频道中进行集中管理。

* 当您看到`Alright, a new bot. How are we going to call it? Please choose a name for your bot.` ，输入您的机器人账户显示名称。

* 当您看到`Good. Now let's choose a username for your bot. It must end in bot. Like this, for example: TetrisBot or tetris_bot.`  输入您的机器人用户名，用户名必须用 `bot` 作为结尾

* 然后您会获取到一个机器人令牌和一个添加链接，就像下面这样。

```
Done! Congratulations on your new bot. You will find it at t.me/<你的机器人用户名>. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
xxxxxxxx:xxxxxxxxxxxxxx
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

其中 `xxxxxxxx:xxxxxxxxxxxxxx` 为您的机器人令牌， 您可以通过您设置的用户名找到创建的机器人。

## 第二步 - 配置 - 让Bot正常响应

* 将上面获取到的机器人令牌填入机器人令牌一栏。

>您可以使用 https://config.telegram-sms.com 生成一个内容为机器人令牌的二维码。并使用扫描二维码功能快速输入机器人令牌。

* 将机器人激活、加入频道或群组中。

* 在目标对话中发一些消息，内容任意。

* 点击 `获取最近的对话ID`，选择您想要监听和接收消息的对话。

* [可选] 填写一个可信的电话号码，这个电话号码用于使用短信远程控制。您可以使用这个号码来远程控制发送短信，重启后台服务。

* 选择下方的附加选项

>* 网络错误回退到短信 - 当网络消息发送失败的时候，通过短信发送到可信号码。
>* 监控电池状态 - 当充电状态变动或手机电量过低的时候，发送信息。
>* 监控充电器状态 - 当充电器状态发生变动的时候，发送消息。
>* 获取聊天命令 - 使用聊天命令管理机器人(不启用将仅使用短信管理)。
>* 验证码自动提取 - 自动识别获取短信中的验证码(实验性功能)。
>* 显示SIM卡别名 - 在消息标题显示卡别名。
>* 使用 DNS over HTTPS - 使用安全带加密的DNS服务（基于 Cloudflare®）。
>* 抄送 - 将通知转发到Bark、Lark或PushDeer等其他服务。您可以配置多个服务来接收您的消息副本。

* 点击 `测试并保存`，给予相应的权限。当您收到以下信息时，配置完成。

```
[系统信息]
您已成功连接到 Telegram bot 服务器。
```

## 注意事项

* Telegram SMS 需要您禁用电池优化功能，禁用电池优化功能将使程序能够稳定快速的接收您的消息。如若使用代理软件，请一并设置禁用电池优化。

* 当您使用 MIUI 等定制化系统时，请注意在设置中将电池限制关闭，并且启用开机自动启动。当您需要接收通知类短信的时候，请在设置中将通知类短信权限打开。[更多请点击这里](https://telegram-sms.com/zh_cn/Q&A.html)

* 当您使用 EMUI 时，由于特殊的系统后台管理机制，Telegram SMS的后台进程无法正常在后台执行。

* 如果您的系统无法正常接收短信通知，这是因为系统限制的原因，请尝试将本应用设置为默认短信APP。
