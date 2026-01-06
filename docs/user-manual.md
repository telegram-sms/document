# User manual

## Welcome

Welcome to use Telegram SMS! You can learn how to build a Telegram SMS bot better from scrach by reading this manual.

## Introduction

Telegram SMS is a Telegram Bot that runs on your Android device. It requires no third-party relay server, but your network must have access to `api.telegram.org`. It can manage your SMS, missed calls, and battery information via remote commands.

## 1. Startup - Build a Telegram Bot

* Visit [@botfather](https://t.me/botfather), and enter `/newbot` to get a new bot.

> Telegram SMS only allows one bot running on one phone, so please DO NOT deploy one bot between different phones, or errors might occur. You can add multiple bot accounts to a group or a channel to manage them together.

* When you see `Alright, a new bot. How are we going to call it? Please choose a name for your bot.`, enter your bot's display name.

* When you see `Good. Now let's choose a username for your bot. It must end in bot. Like this, for example: TetrisBot or tetris_bot.`, enter your bot's Username. Note that the Username of bot must end in `bot`.

* Then you will receive your bot token and URL just as shown below.

```
Done! Congratulations on your new bot. You will find it at t.me/<Username of your bot>. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
xxxxxxxx:xxxxxxxxxxxxxx
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

where  `xxxxxxxx:xxxxxxxxxxxxxx` is the token of your bot. You can find your bot in Telegram by the username of the bot.

## 2. Configuration - Let the bot respond properly


**Please click on the t.me URL to add your bot to your conversation list and start it. You can send several `/start` to start your bot, which helps later.**

> Telegram SMS use Long Polling to listen on the commands, so no Webhook is needed. If your bot set the Webhook before, please visit `https://apt.telegram.org/bot<Your bot token>/setwebhook` to clear the Webhook settings.

(If you have sent `/start` as said before, you can skip this step.)

* Enter the Bot Token you just received in the `Bot Token` column in the APP.

> You can visit https://config.telegram-sms.com to generate a QR code of this token, then use Telegram SMS to scan this QR code to input the token quickly.

> If you can debug with ADB on your computer, you can set the input focus on the column of Bot Token, and enter `adb shell input text <Your bot token>` in your terminal, which will help you fill in the column. ADB is required for this method.

* Activate the bot, and add it to a channel or group. If the bot is added to a group and `Respond only to commands containing the Bot username` is on, please close `Privacy mode` in `BotFather` to make sure you can receive some structured messages.

* Send something arbitrary to the bot. 

* Click `Get recent chat ID`, and select the account that you want to use to listen on and receive the messages.

* [Optional] Enter a trusted phone number, which will be used for SMS remote control. You can use this phone number to send SMS or restart the background service.

* Turn on/off the following options based on your needs

>* Resend using SMS when network error occurs - Send the messages that fail to send to your trusted phone number.
>* Monitor battery level change - When charging status changes or low battery, you will be notified by receiving a message.
>* Monitor charger status - When charger status changes, send a message to notify you.
>* Get chat command - Use chat commands to manage your bot (SMS management only if you disable this)
>* Verification code automatic extraction - Automatically extract verification code from SMS (experimental function).
>* Display SIM card alias in dual card mode - Display SIM card alias on the SMS title.
>* Respond only to commands containing the Bot username - The bot will only respond to the commands that contain the Bot username in a group or a channel.
>* Using DNS over HTTPS - Use secure encrypted DNS service (based on Cloudflare®)

* Click `Test and save` to grant corresponding permissions. The configuration succeeds when you receive the following SMS:

```
[System information]
Connected to the Telegram API Server.
```

### Precautions
* Telegram SMS needs you to ban the adaptive battery. It will help you receive your messages quickly and stably. If you are using a proxy APP, please stop restrict its battery use as well.

* When you are using OS like MIUI, please close the battery restriction in the settings, and enable starting with the system. When you need to receive Service SMS, please grant the corresponding permissions in the settings. [Click here for more information](https://telegram-sms.com/Q&A.html#i-can-receive-standard-sms-but-not-sms-containing-verify-codes)

* When you are using EMUI, the Telegram SMS background process cannot run in the background normally due to the EMUI's special background management strategy.

* If your system cannot receive SMS successfully due to the system restriction, please set this APP as the default SMS APP.

## 3. SMS - Use trusted phones to manage bot

You can set a trusted phone number for automatic forwarding. The bot will forward the SMS automatically when receiving an SMS from the number. The command format is:

```
/sendsms
{Receiver phone number}
{SMS content}
```

For dual SIM devices, you can specify which SIM card to use:

```
/sendsms 1
{Receiver phone number}
{SMS content}
```

or

```
/sendsms 2
{Receiver phone number}
{SMS content}
```

Example：

```
/sendsms
+441807391001
example.com
```

It will send `example.com` to the number `+441807391001` by SMS.

You can use the command `/restart-service` to restart all the background service.

You can use `/sendussd` to send USSD requests. The command format is:

```
/sendussd
{USSD code}
```

For dual SIM devices, you can specify which SIM card to use:

```
/sendussd 1 {USSD code}
```

or

```
/sendussd 2 {USSD code}
```

**If you are roaming, please add your country/region codes before the number(e.g., UK country calling code: +44)**

## 4. Commands - Use chat commands to manage bot

You can see the avaliable command list by sending `/start` command.

### Send an SMS

You can send `/sendsms` directly to the bot to enter the SMS sending procedure.

The command format to send an SMS is:
```
/sendsms
{Receiver phone number}
{SMS content}
```

For dual SIM devices, you can specify which SIM card to use by adding the SIM number (1 or 2) after the command:
```
/sendsms 1
{Receiver phone number}
{SMS content}
```

or

```
/sendsms 2
{Receiver phone number}
{SMS content}
```

For example,
```
/sendsms
+441807391001
example.com
```

It will send `example.com` to the number `+441807391001` by SMS.

When using `/sendsms` without specifying a SIM card number on a dual SIM device, you will be prompted to select which SIM card to use.

### Reply to an SMS

You can use the reply function of Telegram to reply to the SMS and missed calls quickly.

When calling permission is not granted, you can only send SMS from the default SIM card.

### Send USSD Codes

You can use `/sendussd` to send a USSD request, and the command format is:

`/sendussd {USSD code}`

### Use Group/Channel to Manage Multiple Bots

If the bot is added to a group and `Respond only to commands containing the Bot username` is on, the bot will only respond to the command containing `/<command>@<bot username>`. You can manage multiple bots in a group or a channel by using this function.


## Copyright Information

- Telegram is a trademark of Telegram Messenger LLP.
- Cloudflare® is a trademark of Cloudflare, Inc.
- MIUI® is a trademark of Xiaomi Corporation.
