# Commands and SMS Management

## SMS - Use trusted phones to manage bot

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

## Commands - Use chat commands to manage bot

You can see the available command list by sending the `/start` command. Telegram SMS also shows a command keyboard with quick buttons (such as `/getinfo`, `/sendsms`, `/sendussd`, and `/listsms` when available), so you can trigger commands without typing them out.

The built-in commands include:

- `/getinfo` - Show the current battery level, network connection status, and SIM card information.
- `/log` - Output the last 10 log records.
- `/sendsms` - Send an SMS.
- `/sendussd` - Send a USSD request (requires the phone-call permission, Android 8.0 or later).
- `/listsms` - List and manage SMS messages (only available when Telegram SMS is set as the default SMS app).
- `/restart-service` - Restart all background services.
- `/help` - Display help information.

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

### Interactive SMS sending

In contrast to the direct multi-line `/sendsms` format described above, sending `/sendsms` with no arguments starts an interactive, step-by-step flow. The bot prompts you for each piece of information one at a time using Telegram's ForceReply (the reply box is pre-focused), so you simply reply to each prompt:

1. On dual-SIM devices (when no SIM number was given on the command), the bot first shows an inline keyboard to choose "SIM 1" or "SIM 2". Single-SIM devices skip this step.
2. The bot then asks for the recipient phone number — you reply with the number.
3. The bot then asks for the message content — you reply with the text.
4. The bot sends the SMS via the chosen SIM and confirms.

### Reply to an SMS

You can use the reply function of Telegram to reply to the SMS and missed calls quickly.

When calling permission is not granted, you can only send SMS from the default SIM card.

### Send USSD Codes

You can use `/sendussd` to send a USSD request, and the command format is:

`/sendussd {USSD code}`

### List and Manage SMS Messages

When Telegram SMS is set as the default SMS app and the read-SMS permission is granted, you can use `/listsms` to browse stored messages:

```
/listsms          # list all messages
/listsms inbox    # list received messages
/listsms sent     # list sent messages
```

The list is paginated. Use the inline buttons to turn pages, open a message to view its full content, or delete a message (deletion asks for confirmation first).

### Use Group/Channel to Manage Multiple Bots

You can add multiple bots to a group or a channel to manage them together.
