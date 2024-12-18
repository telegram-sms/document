# 用户手册

## 欢迎

感谢您使用 Telegram SMS！通过阅读本手册，您可以从头开始学习如何更好地构建 Telegram SMS 机器人。

## 介绍

Telegram SMS 是一个运行在您 Android 设备上的 Telegram Bot ，它无需第三方中转服务器，只要您当前的网络环境能够正常访问 `api.telegram.org` 即可正常使用。它可以通过远程指令，来方便管理您的短信，未接电话以及电量。

## 1、起步 - 建立一个Telegram Bot

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

## 2、配置 - 让Bot正常响应

* 将上面获取到的机器人令牌填入机器人令牌一栏。

>您可以使用 https://qrcode.telegram-sms.com 生成一个内容为机器人令牌的二维码。并使用扫描二维码功能快速输入机器人令牌。

* 将机器人激活、加入频道或群组中。如果加入群组中并使用 `仅响应包含机器人用户名的命令` 功能，请在 `BotFather` 中关闭 `Privacy mode`，避免部分消息无法被正确处理。

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
>* 仅响应包含机器人用户名的命令 - 在群组或频道中只响应包含机器人用户名的命令。 
>* 使用 DNS over HTTPS - 使用安全带加密的DNS服务（基于 Cloudflare®）。

* 点击 `测试并保存`，给予相应的权限。当您收到以下信息时，配置完成。

```
[系统信息]
您已成功连接到 Telegram bot 服务器。
```

### 注意
* Telegram SMS 需要您禁用电池优化功能，禁用电池优化功能将使程序能够稳定快速的接收您的消息。如若使用代理软件，请一并设置禁用电池优化。

* 当您使用 MIUI 等定制化系统时，请注意在设置中将电池限制关闭，并且启用开机自动启动。当您需要接收通知类短信的时候，请在设置中将通知类短信权限打开。[更多请点击这里](https://guide.telegram-sms.com/zh_cn/q&a#%E6%88%91%E8%83%BD%E6%94%B6%E5%88%B0%E4%B8%80%E8%88%AC%E7%9A%84%E7%9F%AD%E4%BF%A1%EF%BC%8C%E4%BD%86%E6%B2%A1%E6%9C%89%E5%8A%9E%E6%B3%95%E6%94%B6%E5%88%B0%E5%90%AB%E6%9C%89%E9%AA%8C%E8%AF%81%E7%A0%81%E7%9A%84%E7%9F%AD%E4%BF%A1)

* 当您使用 EMUI 时，由于特殊的系统后台管理机制，Telegram SMS的后台进程无法正常在后台执行。

* 如果您的系统无法正常接收短信通知，这是因为系统限制的原因，请尝试将本应用设置为默认短信APP。

## 3、短信 - 使用可信手机控制机器人

您可以为自动转发指定可信电话号码。机器人从该号码收到消息后将自动转发，格式如下：

```
/sendsms
{接收方电话号码}
{短信内容}
```

例子：

```
/sendsms
10086
cxll
```

它会将内容 `cxll` 的短信发送到号码 `10086` 。

您可以通过可信手机发送命令 `/restart-service` 重新启动所有后台进程。

你可以使用 `/sendussd` 来发送 USSD 请求，格式如下：

```
/sendussd
{USSD 代码}
```

**如果您不在当前区域，请添加您的国家/地区呼叫区号（例如，中国大陆国际区号：+86）。**

## 4、命令 - 使用聊天命令控制机器人

您可以通过发送 `/start` 命令获取当前可用命令的列表。

### 发送短信

使用命令发送短信的格式和短信发送相同，您也可以直接发送 `/sendsms` 进入交互式短信发送。

使用 `/sendsms` 将通过默认 SIM 卡发送短信。当您使用多张SIM卡时，使用 `/sendsms1` 通过第一张SIM卡发送短信，使用 `/sendsms2` 通过第二张SIM卡发送短信（如果可用）。

### 回复短信

您可以使用 Telegram 的回复功能快速回复收到的短信和未接来电。

当电话权限未被允许时，您只能使用默认的 SIM 卡发送短信。

### 发送 USSD 请求

您可以使用 `/sendussd` 来发送 USSD 请求，格式如下：

```
/sendussd {USSD 代码}
```

### 群组多机器人管理

如果您在群组或频道中使用机器人，并且勾选了 `仅响应包含机器人用户名的命令` ，机器人将仅响应 `/<命令>@<机器人用户名>` 的指令，利用这个功能，您将可以在群组或频道中管理多个机器人。


## 5、版权信息

- Telegram® 是 Telegram Messenger LLP 的注册商标。

- Cloudflare® 是 Cloudflare, Inc. 的注册商标。

- MIUI® 是小米科技有限责任公司的注册商标。
