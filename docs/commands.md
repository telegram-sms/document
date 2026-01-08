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
