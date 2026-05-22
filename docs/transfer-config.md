# Transfer Configuration

Transfer Configuration copies a fully configured Telegram SMS setup from one device to another, so you don't have to re-enter everything by hand. Open it from the app's overflow menu (⋮) → **Transfer Configuration**.

There are two ways to transfer: a **QR code** (offline, device to device) and an **encrypted transfer** through a relay server (using an ID and a password).

## What is included

The transferred configuration contains your full setup:

- Bot token, API address, and chat ID
- Topic ID and trusted phone number
- All feature switches (battery monitoring, charger status, chat command, fallback SMS, verification code extraction, call notification, hide phone numbers)
- Your Carbon Copy services

## Method 1: QR code (offline, device to device)

On a device that is already set up, open **Transfer Configuration**. The app displays a QR code that encodes your configuration.

On the new device, use the **scan** (camera) button on the main configuration screen to scan that QR code. All fields are filled in automatically — then tap **Test and save** to finish.

> ⚠️ **Keep this QR code private.** It contains your bot token and full configuration in plain form, so anyone who scans it gains control of your bot. The app reminds you: *"Keep this QR code safe! Please don't share it with others."*

## Method 2: Encrypted transfer (ID + password)

When the two devices cannot scan each other directly, you can relay the configuration through the Telegram SMS config server (`api.telegram-sms.com`), encrypted on your device with a password that you choose.

### Send the configuration

1. In **Transfer Configuration**, open the overflow menu (⋮) → **Send configuration**.
2. Enter a password (at least 6 characters). This password encrypts the configuration; the server never receives it.
3. The app uploads the encrypted configuration and returns a **9-character ID**, which is also copied to your clipboard.
4. Share the ID and the password with the target device through a trusted channel.

### Receive the configuration

1. On the target device, open **Transfer Configuration** → overflow menu (⋮) → **Receive configuration**. On a brand-new install that has not been set up yet, the receive dialog appears automatically.
2. Enter the **9-character ID** and the password.
3. The app downloads and decrypts the configuration and fills in all the fields. Tap **Test and save** to finish.

> The configuration is encrypted on your device with libsodium (SecretBox) before it is uploaded, so only someone who has **both** the ID and the password can read it. Choose a strong password and share it separately from the ID. If the password is wrong, decryption fails and you are asked to try again.

## Notes

- The encrypted transfer requires network access to `api.telegram-sms.com`.
- The QR code method works completely offline.
- This is the same import mechanism used by the **Carbon Copy** "receive configuration" feature.
