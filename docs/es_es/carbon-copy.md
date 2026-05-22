# Copia de carbón (Carbon Copy)

La copia de carbón reenvía una copia de los eventos que gestiona Telegram SMS —SMS entrantes, llamadas perdidas, notificaciones de aplicaciones y avisos de batería— a otros servicios de notificación, además de enviarlos a Telegram. Los destinos habituales incluyen Bark, Gotify, PushDeer, Lark y cualquier webhook genérico.

Cada destino se describe mediante una solicitud **HAR (HTTP Archive)** que la aplicación reproduce en cada evento. Como la solicitud se reproduce tal cual, se admite prácticamente cualquier servicio de notificación basado en HTTP sin necesidad de una integración específica.

## Abrir la configuración de copia de carbón

1. Abra Telegram SMS y toque el menú de desbordamiento (⋮) → **Copia de carbón**.
2. Verá la lista de servicios de copia de carbón configurados (vacía la primera vez).

## Añadir un servicio

1. Toque el botón de acción flotante **+**.
2. Pegue el HAR JSON del servicio en el editor. El editor valida el JSON mientras escribe y muestra un error si la estructura no es válida.
3. Toque **Aceptar** para guardar.

También puede tocar la opción **Escanear** en el menú de desbordamiento para importar un servicio mediante un código QR.

> La forma más sencilla de obtener un HAR con la estructura correcta para los proveedores habituales (Bark, Gotify, PushDeer, una solicitud cURL genérica, …) es el [Generador de configuración](https://config.telegram-sms.com/). Si desea crear el HAR manualmente, consulte la [referencia de proveedores de copia de carbón](https://dev.telegram-sms.com/CarbonCopyProvider) para desarrolladores.

### Marcadores de posición

Dentro del cuerpo del HAR puede usar los siguientes marcadores de posición, que se sustituyen en cada evento antes de enviar la solicitud:

- `{{Title}}` — el título del mensaje (por ejemplo, el tipo de evento o el remitente del SMS).
- `{{Message}}` — el cuerpo completo del mensaje.
- `{{Copy}}` — una variante del contenido más adecuada para copiar.

## Elegir qué eventos se copian

El conjunto de fuentes de eventos es una configuración **global** de copia de carbón que se aplica a todos los servicios. Abra el menú de desbordamiento y elija la entrada de configuración de copia de carbón, luego active las fuentes que desea reenviar:

- SMS recibidos
- Llamadas perdidas
- Notificaciones de aplicaciones
- Avisos de batería

Solo se reenvían a sus servicios de copia de carbón las fuentes que active aquí.

## Editar, activar, desactivar o eliminar un servicio

- Toque un servicio de la lista para **editar** su HAR o **eliminarlo**.
- Cada entrada indica si está actualmente **(Activado)** o **(Desactivado)**.

## Enviar una prueba

Use **Enviar prueba** en el menú de desbordamiento para enviar un mensaje de prueba a todos los servicios configurados a la vez, de modo que pueda confirmar la entrega antes de depender de ella. Si aún no hay ningún servicio configurado, la aplicación le indica que no hay nada que probar.

## Importación y cifrado

La opción **recibir configuración** le permite obtener una configuración de copia de carbón desde un servidor introduciendo un ID y una contraseña. Cuando una configuración está cifrada, Telegram SMS la descifra con la contraseña que proporcione (libsodium SecretBox), de modo que las credenciales incluidas en su HAR permanecen protegidas durante la transferencia.
