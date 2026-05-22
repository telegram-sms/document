# Message Templates

Templates let you customize the wording and layout of the messages Telegram SMS sends to you. Every notification type — incoming SMS, MMS, outgoing SMS, calls, app notifications, and battery alerts — has its own template that you can rewrite freely.

## Open the template editor

Open Telegram SMS and tap the overflow menu (⋮) → **Template**.

You will see a card for each message type. Every card shows a **live preview** rendered with sample data, so you can see exactly how your changes will look.

## Edit a template

1. Tap the card for the message type you want to change.
2. Edit the text in the dialog. Use the `{{Placeholder}}` tokens (see below) wherever you want a real value to be inserted.
3. Tap one of:
   - **OK** — save your custom template.
   - **Reset** — discard your customization and restore the built-in default.
   - **Cancel** — close without changing anything.

Use `\n` for a line break, exactly as in the default templates.

## Placeholders

A placeholder is written as `{{Name}}` and is replaced with the real value when the message is sent. Any placeholder you remove simply will not appear; text outside the placeholders is kept as-is. Each template type supports a different set of placeholders:

| Template | Available placeholders |
| --- | --- |
| Received SMS | `{{SIM}}`, `{{From}}`, `{{Content}}`, `{{Time}}` |
| Received MMS | `{{SIM}}`, `{{From}}`, `{{Subject}}`, `{{Content}}`, `{{Time}}` |
| Send SMS | `{{SIM}}`, `{{To}}`, `{{Content}}` |
| Receiving Call | `{{SIM}}`, `{{From}}` |
| Missed Call | `{{SIM}}`, `{{From}}` |
| Notification | `{{APP}}`, `{{Title}}`, `{{Description}}` |
| Battery | `{{BatteryLevel}}`, `{{Message}}` |

> `{{SIM}}` is only meaningful on dual-SIM devices; on a single-SIM device it resolves to an empty value.

## Example

The default **Received SMS** template is:

```
[{{SIM}}Receive SMS]
From: {{From}}
Content: {{Content}}
```

If you wanted to add the time and a custom prefix, you could change it to:

```
📩 New SMS {{SIM}}
{{Time}}
{{From}} wrote:
{{Content}}
```

Tap **OK**, then send yourself a test SMS to confirm the new format.
