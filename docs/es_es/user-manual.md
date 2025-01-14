# Manual de Usuario de Telegram SMS

## Bienvenida
¡Gracias por usar Telegram SMS! A través de este manual, aprenderá desde cero cómo construir mejor su bot de Telegram SMS.

## Introducción
Telegram SMS es un Bot de Telegram que se ejecuta en su dispositivo Android. No requiere servidores intermediarios de terceros; solo necesita que su entorno de red actual pueda acceder normalmente a `api.telegram.org` para funcionar correctamente. Puede usar comandos remotos para administrar convenientemente sus SMS, llamadas perdidas y nivel de batería.

## 1. Primeros Pasos - Crear un Bot de Telegram
1. Visite [@botfather](https://t.me/botfather) y escriba `/newbot` para obtener una cuenta de bot.
   > Nota: Telegram SMS adopta el principio de un bot por teléfono, así que no comparta una cuenta de bot entre varios teléfonos. Puede agregar múltiples cuentas de bot a grupos o canales para una gestión centralizada.

2. Cuando vea "Alright, a new bot. How are we going to call it? Please choose a name for your bot.", ingrese el nombre de visualización para su cuenta de bot.

3. Cuando vea "Good. Now let's choose a username for your bot. It must end in bot. Like this, for example: TetrisBot or tetris_bot.", ingrese su nombre de usuario del bot, que debe terminar en `bot`.

4. Luego recibirá un token de bot y un enlace de invitación, que se verá así:
```
Done! Congratulations on your new bot. You will find it at t.me/<su-nombre-de-usuario-bot>. You can now add a description, about section and profile picture for your bot, see /help for a list of commands. By the way, when you've finished creating your cool bot, ping our Bot Support if you want a better username for it. Just make sure the bot is fully operational before you do this.

Use this token to access the HTTP API:
xxxxxxxx:xxxxxxxxxxxxxx

Keep your token secure and store it safely, it can be used by anyone to control your bot.
For a description of the Bot API, see this page: https://core.telegram.org/bots/api
```

## 2. Configuración - Hacer que el Bot Responda
1. Ingrese el token del bot que obtuvo anteriormente en el campo correspondiente.
   > Puede usar https://config.telegram-sms.com para generar un código QR con el token del bot e ingresarlo rápidamente usando la función de escaneo.

2. Active el bot y agrégelo a un canal o grupo. Si lo agrega a un grupo y usa la función "Solo responder a comandos que incluyan el nombre de usuario del bot", desactive el "Privacy mode" en BotFather para evitar que algunos mensajes no se procesen correctamente.

3. Envíe algunos mensajes en la conversación objetivo, el contenido no importa.

4. Haga clic en "Obtener ID de chat reciente" y seleccione la conversación que desea monitorear y recibir mensajes.

5. [Opcional] Ingrese un número de teléfono de confianza, que se usará para el control remoto por SMS. Puede usar este número para controlar remotamente el envío de SMS y reiniciar el servicio en segundo plano.

6. Seleccione las opciones adicionales:
   - Respaldo SMS en error de red - Cuando falla el envío de mensajes por red, enviar por SMS al número de confianza
   - Monitorear estado de batería - Enviar información cuando cambie el estado de carga o la batería esté baja
   - Monitorear estado del cargador - Enviar mensaje cuando cambie el estado del cargador
   - Obtener comandos de chat - Usar comandos de chat para administrar el bot (si no se activa, solo se administrará por SMS)
   - Extracción automática de códigos - Identificar automáticamente códigos de verificación en SMS (función experimental)
   - Mostrar alias de tarjeta SIM - Mostrar alias de tarjeta en el título del mensaje
   - Solo responder a comandos con nombre de usuario del bot - En grupos o canales, solo responder a comandos que incluyan el nombre de usuario del bot
   - Usar DNS sobre HTTPS - Usar servicio DNS seguro con cifrado (basado en Cloudflare®)

### Notas Importantes
* Telegram SMS requiere que deshabilite la optimización de batería para que el programa pueda recibir sus mensajes de manera estable y rápida. Si usa software proxy, también configure la desactivación de la optimización de batería.
* Cuando use sistemas personalizados como MIUI, asegúrese de desactivar las restricciones de batería en la configuración y habilitar el inicio automático. Cuando necesite recibir SMS de tipo notificación, habilite los permisos correspondientes en la configuración.
* En EMUI, debido a su mecanismo especial de gestión en segundo plano, el proceso de Telegram SMS no puede ejecutarse normalmente en segundo plano.
* Si su sistema no puede recibir normalmente notificaciones de SMS, esto se debe a restricciones del sistema. Intente configurar esta aplicación como la aplicación de SMS predeterminada.

## 3. SMS - Control del Bot con Teléfono de Confianza
Puede especificar un número de teléfono de confianza para el reenvío automático. Cuando el bot reciba mensajes de este número, los reenviará automáticamente. El formato es:
```
/sendsms
{número de teléfono del destinatario}
{contenido del SMS}
```

Ejemplo:
```
/sendsms
10086
cxll
```
Esto enviará un SMS con el contenido "cxll" al número "10086".

Puede enviar el comando `/restart-service` desde el teléfono de confianza para reiniciar todos los procesos en segundo plano.

Puede usar `/sendussd` para enviar solicitudes USSD, con el formato:
```
/sendussd
{código USSD}
```
**Si no está en la región actual, agregue su código de país/región (por ejemplo, código internacional para España: +34).**

## 4. Comandos - Control del Bot mediante Chat
Puede enviar el comando `/start` para obtener una lista de comandos disponibles.

### Enviar SMS
El formato para enviar SMS usando comandos es el mismo que por SMS. También puede enviar `/sendsms` para entrar en el modo interactivo de envío de SMS.

Usar `/sendsms` enviará SMS a través de la tarjeta SIM predeterminada. Cuando use múltiples tarjetas SIM, use `/sendsms1` para enviar a través de la primera SIM y `/sendsms2` para la segunda (si está disponible).

### Responder SMS
Puede usar la función de respuesta de Telegram para responder rápidamente a SMS recibidos y llamadas perdidas.
Cuando los permisos de teléfono no estén habilitados, solo podrá usar la tarjeta SIM predeterminada.

### Enviar Solicitudes USSD
Puede usar `/sendussd` para enviar solicitudes USSD con el formato:
```
/sendussd {código USSD}
```

### Gestión de Múltiples Bots en Grupos
Si usa el bot en grupos o canales y ha marcado "Solo responder a comandos con nombre de usuario del bot", el bot solo responderá a comandos con el formato `/<comando>@<nombre-usuario-bot>`. Esta función le permite gestionar múltiples bots en grupos o canales.

## 5. Información de Derechos de Autor
- Telegram® es una marca registrada de Telegram Messenger LLP.
- Cloudflare® es una marca registrada de Cloudflare, Inc.
- MIUI® es una marca registrada de Xiaomi Inc.
