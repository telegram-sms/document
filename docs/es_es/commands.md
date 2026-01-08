# Comandos y Administración de SMS

## SMS - Control del Bot con Teléfono de Confianza

Puede especificar un número de teléfono de confianza para el reenvío automático. Cuando el bot reciba mensajes de este número, los reenviará automáticamente. El formato es:
```
/sendsms
{número de teléfono del destinatario}
{contenido del SMS}
```

Para dispositivos con doble SIM, puede especificar qué tarjeta SIM usar:

```
/sendsms 1
{número de teléfono del destinatario}
{contenido del SMS}
```

o

```
/sendsms 2
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

Para dispositivos con doble SIM, puede especificar qué tarjeta SIM usar:

```
/sendussd 1 {código USSD}
```

o

```
/sendussd 2 {código USSD}
```
**Si no está en la región actual, agregue su código de país/región (por ejemplo, código internacional para España: +34).**

## Comandos - Control del Bot mediante Chat

Puede enviar el comando `/start` para obtener una lista de comandos disponibles.

### Enviar SMS

El formato para enviar SMS usando comandos es el mismo que por SMS. También puede enviar `/sendsms` para entrar en el modo interactivo de envío de SMS.

Para dispositivos con doble SIM, puede añadir el número de tarjeta SIM (1 o 2) después del comando para especificar cuál usar:

```
/sendsms 1
{número de teléfono del destinatario}
{contenido del SMS}
```

o

```
/sendsms 2
{número de teléfono del destinatario}
{contenido del SMS}
```

Cuando use `/sendsms` sin especificar el número de tarjeta SIM en un dispositivo con doble SIM, el sistema le pedirá que seleccione qué tarjeta SIM usar.

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
