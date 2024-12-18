# Q & A

## > I cannot receive any SMS

This problem often happens on deeply customized systems, where all the SMS broadcasts will be blocked because of security concerns. The solution now is to set Telegram SMS as the default SMS APP or get the SMS contents by listening to the push notifications.

## > I can receive standard SMS but not SMS containing verify codes

According to some feedbacks, Telegram SMS cannot forward SMS on certain ROMs, including Huawei EMUI and Xiaomi MIUI. We find this is because these two systems protect verification SMS, which makes the verification codes cannot be got from the broadcasts. Following are the solutions:

**RISK WARNING! Forwarding verification codes may bring risk to your privacy and account security. if you ARE NOT ware of such risk, please DO NOT proceed.**

Huawei EMUI*:
```
Message > More > Settings > Advance, turn off Verification Code Protection.

From: https://club.huawei.com/thread-17770781-1-1.html
```

Xiaomi MIUI*:

```
Security Center > Permission manager > Telegram SMS > Permission > check Notification SMS
```
*: The translation here maybe not accurate. Need to be checked on the phone.

## > Why services cannot work continuously in the background on my Huawei smartphone

Huawei EMUI 9 system introduces a new power manager called `Power Genius`. It will check and force stop the APPs that not included in Huawei's whitelist (e.g., Wechat and QQ are in the whitelist). You need to kill the power manager by ADB to make sure Telegram SMS can work on your phone, but it may cause problems like more power consumption and higher temperature if you do so.

In other versions of EMUI, you can change the battery optimization settings to control and make sure APPs can run properly. Please refer to https://dontkillmyapp.com/huawei to find the instructions and more information.

## > I want to close the notification on the Notification Drawer

Due to the [behavior changes](https://developer.android.com/about/versions/oreo/android-8.0-changes#back-all) in Android O, we cannot run Telegram SMS service in the background silently.

You can refer to `Choose how you're notified > Turn notifications on or off for certain apps` section in [Control notifications on Android](https://support.google.com/android/answer/9079661?hl=en) by Google to find out how to close all the notifications of Telegram SMS.

## > I want to change the API server address

We will NOT provide any function to change the API server address in the APP.

**We make this decision due to the concern of your privacy and communication security. Changing the API server is just like GSM hijacking + SMS sniffing, which may cause the loss of your property.**

You can use SNI proxy to securely proxy `api.telegram.org`, which can avoid the leak of data when forwarding the data packets and protect the packets from being stolen by third-parties. You can implement this function by using the Stream module in Nginx, which is running in the 4th layer of OSI and can run with the service in the 7th layer at the same time. This will make sure you can use Nginx to build a website when using the SNI proxy. You can also use Sniproxy to achieve the same goal.

If you DO KNOW the risk of changing the API address and DO WANT to change it, we will provide you the compile scripts based on Github Action. You can Fork this repo and modify it, and Github Action will compile it automatically when you submit it. Also, a Release version will be issued by a specific signature. Please note that this signature is not the one used in the original version, which means you have to uninstall the previous APP and install your new one.
