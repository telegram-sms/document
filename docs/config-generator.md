# Config Generator

The **Config Generator** (https://config.telegram-sms.com) is a free, browser-based tool that helps you build a Telegram SMS configuration on a computer and move it to your phone as a QR code — so you don't have to type long values like the bot token on a small touchscreen.

It runs entirely in your browser and does not require an account. Your bot token stays on your device: it is encoded into a QR code locally, and the generator itself does not send it to a server.

## When to use it

- You want to enter a long **bot token** without typing it on the phone.
- You are setting up several phones with similar settings.
- You prefer filling in a form on a full keyboard.

> If you instead want to copy an *already-working* setup from one phone to another, use [Transfer Configuration](./transfer-config) inside the app. The Config Generator is for building a configuration from scratch in a browser.

## How to use it

1. On a computer (or another phone), open https://config.telegram-sms.com.
2. Fill in the configuration fields — at minimum your **bot token**.
3. The page renders a **QR code** of what you entered.
4. In Telegram SMS on the target phone, tap the **scan** (camera) button on the main configuration screen.
5. Scan the QR code on your computer screen. The matching fields are filled in automatically.
6. Finish the remaining steps (such as `Get recent chat ID`) and tap **Test and save**.

This is the same in-app scanner used to read the QR codes produced by [Transfer Configuration](./transfer-config).

## Keep the QR code private

> ⚠️ A configuration QR code can contain your **bot token** in plain form. Anyone who scans it can control your bot. Don't post it publicly or share it in screenshots, and close the page when you are done.

## Related

- [Getting started](./getting-started) — the full first-time setup walkthrough
- [Transfer Configuration](./transfer-config) — copy a finished setup between phones (QR code or encrypted ID + password)
