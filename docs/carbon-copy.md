# Carbon Copy

Carbon Copy forwards a copy of the events Telegram SMS handles — incoming SMS, missed calls, app notifications, and battery alerts — to other push services in addition to Telegram. Popular targets include Bark, Gotify, PushDeer, Lark, and any generic webhook.

Each destination is described by an **HTTP Archive (HAR)** request that the app replays for every event. Because the request is replayed verbatim, almost any HTTP-based push service can be supported without a dedicated integration.

## Open Carbon Copy settings

1. Open Telegram SMS and tap the overflow menu (⋮) → **Carbon copy**.
2. You will see the list of configured Carbon Copy services (empty the first time).

## Add a service

1. Tap the **+** floating action button.
2. Paste the service's HAR JSON into the editor. The editor validates the JSON as you type and shows an error if the structure is invalid.
3. Tap **OK** to save.

You can also tap the **scan** option in the overflow menu to import a service by QR code.

> The easiest way to get a correctly structured HAR for common providers (Bark, Gotify, PushDeer, a generic cURL request, …) is the [Configuration Generator](https://config.telegram-sms.com/). If you want to build the HAR by hand, see the developer [Carbon Copy Provider reference](https://dev.telegram-sms.com/CarbonCopyProvider).

### Placeholders

Inside the HAR body you can use the following placeholders. They are substituted for each event before the request is sent:

- `{{Title}}` — the message title (for example the event type or the SMS sender).
- `{{Message}}` — the full message body.
- `{{Copy}}` — a copy-friendly variant of the content.

## Choose which events are copied

The set of event sources is a **global** Carbon Copy setting that applies to every service. Open the overflow menu and choose the Carbon Copy configuration entry, then toggle the sources you want forwarded:

- Received SMS
- Missed calls
- App notifications
- Battery alerts

Only the sources you enable here are forwarded to your Carbon Copy services.

## Edit, enable, disable, or delete a service

- Tap a service in the list to **edit** its HAR or to **delete** it.
- Each entry shows whether it is currently **(Enabled)** or **(Disabled)**.

## Send a test

Use **Send test** in the overflow menu to push a test message to all configured services at once, so you can confirm delivery before you rely on it. If no service is configured yet, the app tells you there is nothing to test.

## Import and encryption

The **receive configuration** option lets you pull a Carbon Copy configuration from a server by entering an ID and a password. When a configuration is encrypted, Telegram SMS decrypts it with the password you provide (libsodium SecretBox), so the credentials embedded in your HAR stay protected while being transferred.
