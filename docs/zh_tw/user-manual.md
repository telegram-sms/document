# 用戶手冊

## 歡迎

感謝您使用 Telegram SMS！通過閱讀本手冊，您可以從頭開始學習如何更好地構建 Telegram SMS 機器人。

## 介紹

Telegram SMS 是一個運行在您 Android 設備上的 Telegram Bot ，它無需第三方中轉服務器，只要您當前的網絡環境能夠正常訪問 `api.telegram.org` 即可正常使用。它可以通過遠程指令，來方便管理您的短信，未接電話以及電量。

## 1、起步 - 建立一個Telegram Bot

* 訪問 [@botfather](https://t.me/botfather)，輸入 `/newbot` 來獲取一個機器人賬戶。

> Telegram SMS 採取一台手機一個機器人賬戶的原則，故請不要多台手機共用一個機器人賬戶。您可以將多個機器人賬戶加到群組或頻道中進行集中管理。

* 提示`Alright, a new bot. How are we going to call it? Please choose a name for your bot.` ，輸入您的機器人賬戶顯示名稱。

* 提示`Good. Now let's choose a username for your bot. It must end in bot. Like this, for example: TetrisBot or tetris_bot.` 輸入您的機器人用戶名，用戶名必須用 `bot` 作為結尾

* 然後您會獲取到一個機器人令牌和一個添加鏈接，就像下面這樣。

```
Done! Congratulations on your new bot. You will find it at t.me/<你的機器人用戶名>. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
xxxxxxxx:xxxxxxxxxxxxxx
Keep your token secure and store it safely, it can be used by anyone to control your bot.

For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

其中 `xxxxxxxx:xxxxxxxxxxxxxx` 為您的機器人令牌， 您可以通過您設置的用戶名找到創建的機器人。

## 2、配置 - 讓Bot正常響應

* 將上面獲取到的機器人令牌填入機器人令牌一欄。

>您可以使用 https://config.telegram-sms.com 生成一個內容為機器人令牌的二維碼。並使用掃描二維碼功能快速輸入機器人令牌。

>如果您能使用 ADB 進行調試。您可以將輸入焦點放在機器人令牌一欄，使用 `adb shell input text <您的機器人令牌>`（需要當前系統環境中含有adb），這將模擬鍵盤輸入機器人令牌。

* 將機器人激活、加入頻道或群組中。如果加入群組中並使用 `僅響應包含機器人用戶名的命令` 功能，請在 `BotFather` 中關閉 `Privacy mode`，以避免部分結構化信息無法被正常收到。

* 在目標對話中發一些消息，內容任意。

* 點擊 `獲取最近的對話ID`，選擇您想要監聽和接收消息的對話。

* [可選] 填寫一個可信的電話號碼，這個電話號碼用於使用短信遠程控制。您可以使用這個號碼來遠程控制發送短信，重啟後台服務。

* 選擇下方的附加選項

>* 網絡錯誤回退到短信 - 當網絡消息發送失敗的時候，通過短信發送到可信號碼。
>* 監控電池狀態 - 當充電狀態變動或手機電量過低的時候，發送信息。
>* 監控充電器狀態 - 當充電器狀態發生變動的時候，發送消息。
>* 獲取聊天命令 - 使用聊天命令管理機器人(不啟用將僅使用短信管理)。
>* 驗證碼自動提取 - 自動識別獲取短信中的驗證碼(實驗性功能)。
>* 在雙卡模式下顯示SIM卡別名 - 在消息標題顯示卡別名。
>* 僅響應包含機器人用戶名的命令 - 在群組或頻道中只響應包含機器人用戶名的命令。
>* 使用 DNS over HTTPS - 使用安全帶加密的DNS服務（基於 Cloudflare®）。

* 點擊 `測試並保存`，給予相應的權限。當您收到以下信息時，配置完成。

```
[系統信息]
您已成功連接到 Telegram bot 服務器。
```

### 注意

* Telegram SMS 需要您禁用電池優化功能，禁用電池優化功能將使程序能夠穩定快速的接收您的消息。如若使用代理軟件，請一併設置禁用電池優化。

* 當您使用 MIUI 等定制化系統時，請注意在設置中將電池限制關閉，並且啟用開機自動啟動。當您需要接收通知類短信的時候，請在設置中將通知類短信權限打開。 [更多請點擊這裡](https://telegram-sms.com/zh_tw/Q&A.html#%E6%88%91%E8%83%BD%E6%94%B6%E5%88%B0%E4%B8%80%E8%88%AC%E7%9A%84%E7%9F%AD%E4%BF%A1-%E4%BD%86%E6%B2%92%E6%9C%89%E8%BE%A6%E6%B3%95%E6%94%B6%E5%88%B0%E5%90%AB%E6%9C%89%E9%A9%97%E8%AD%89%E7%A2%BC%E7%9A%84%E7%9F%AD%E4%BF%A1)

* 當您使用 EMUI 時，由於特殊的系統後台管理機制，Telegram SMS的後台進程無法正常在後台執行。

* 如果您的系統無法正常接收短信通知，這是因為系統限制的原因，請嘗試將本應用設置為默認短信APP。

## 3、短信 - 使用可信手機控制機器人

您可以為自動轉髮指定可信電話號碼。機器人從該號碼收到消息後將自動轉發，格式如下：

```
/sendsms
{接收方電話號碼}
{短信內容}
```

例子：

```
/sendsms
10086
cxll
```

它會將內容 `cxll` 的短信發送到號碼 `10086` 。

您可以通過可信手機發送命令 `/restart-service` 重新啟動所有後台進程。

你可以使用 `/sendussd` 來發送 USSD 請求，格式如下：

```
/sendussd
{USSD 代碼}
```

**如果您不在當前區域，請添加您的國家/地區呼叫區號（例如，中國大陸國際區號：+86）。 **

## 4、命令 - 使用聊天命令控制機器人

您可以通過發送 `/start` 命令獲取當前可用命令的列表。

### 發送短信

使用命令發送短信的格式和短信發送相同，您也可以直接發送 `/sendsms` 進入交互式短信發送。

使用 `/sendsms` 將通過默認 SIM 卡發送短信。當您使用多張SIM卡時，使用 `/sendsms1` 通過第一張SIM卡發送短信，使用 `/sendsms2` 通過第二張SIM卡發送短信（如果可用）。

### 回复短信

您可以使用 Telegram 的回复功能快速回複收到的短信和未接來電。

當電話權限未被允許時，您只能使用默認的 SIM 卡發送短信。

### 發送 USSD 請求

您可以使用 `/sendussd` 來發送 USSD 請求，格式如下：

```
/sendussd {USSD 代碼}
```

### 群組多機器人管理

如果您在群組或頻道中使用機器人，並且勾選了`僅響應包含機器人用戶名的命令` ，機器人將僅響應`/<命令>@<機器人用戶名>` 的指令，利用這個功能，您將可以在群組或頻道中管理多個機器人。


## 5、版權信息

- Telegram® 是 Telegram Messenger LLP 的註冊商標。

- Cloudflare® 是 Cloudflare, Inc. 的註冊商標。

- MIUI® 是小米科技有限責任公司的註冊商標。