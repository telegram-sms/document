# Transferir configuración

Transferir configuración copia una configuración completa de Telegram SMS de un dispositivo a otro, para que no tengas que volver a introducir todo manualmente. Ábrelo desde el menú de opciones de la aplicación (⋮) → **Transferir configuración**.

Hay dos formas de transferir: un **código QR** (sin conexión, de dispositivo a dispositivo) y una **transferencia cifrada** a través de un servidor de retransmisión (usando un ID y una contraseña).

## Qué está incluido

La configuración transferida contiene toda tu configuración:

- Token del bot, dirección API e ID de chat
- ID de tema y número de teléfono de confianza
- Todos los interruptores de función (monitorear estado de batería, monitorear estado del cargador, obtener comandos de chat, respaldo SMS en error de red, extracción automática de códigos, notificación de llamadas, ocultar números de teléfono)
- Tus servicios de Copia de carbón

## Método 1: Código QR (sin conexión, de dispositivo a dispositivo)

En un dispositivo que ya esté configurado, abre **Transferir configuración**. La aplicación muestra un código QR que codifica tu configuración.

En el nuevo dispositivo, usa el botón de **escanear** (cámara) en la pantalla de configuración principal para escanear ese código QR. Todos los campos se rellenan automáticamente; luego, toca **Probar y guardar** para finalizar.

> ⚠️ **Mantén este código QR en privado.** Contiene el token de tu bot y la configuración completa en texto plano, por lo que cualquiera que lo escanee obtiene el control de tu bot. La aplicación te recuerda: *"¡Mantenga este código QR seguro! Por favor, no lo comparta con otros."*

## Método 2: Transferencia cifrada (ID + contraseña)

Cuando los dos dispositivos no pueden escanearse directamente, puedes retransmitir la configuración a través del servidor de configuración de Telegram SMS (`api.telegram-sms.com`), cifrada en tu dispositivo con una contraseña que elijas.

### Enviar la configuración

1. En **Transferir configuración**, abre el menú de opciones (⋮) → **Enviar configuración**.
2. Ingresa una contraseña (al menos 6 caracteres). Esta contraseña cifra la configuración; el servidor nunca la recibe.
3. La aplicación carga la configuración cifrada y devuelve un **ID de 9 caracteres**, que también se copia en el portapapeles.
4. Comparte el ID y la contraseña con el dispositivo de destino a través de un canal seguro.

### Recibir la configuración

1. En el dispositivo de destino, abre **Transferir configuración** → menú de opciones (⋮) → **Recibir configuración**. En una instalación nueva que aún no se ha configurado, el cuadro de diálogo de recepción aparece automáticamente.
2. Ingresa el **ID de 9 caracteres** y la contraseña.
3. La aplicación descarga y descifra la configuración y rellena todos los campos. Toca **Probar y guardar** para finalizar.

> La configuración se cifra en tu dispositivo con libsodium (SecretBox) antes de cargarse, por lo que solo alguien que tenga **tanto** el ID como la contraseña puede leerla. Elige una contraseña segura y compártela por separado del ID. Si la contraseña es incorrecta, el descifrado falla y se te pide que lo intentes de nuevo.

## Notas

- La transferencia cifrada requiere acceso a la red para `api.telegram-sms.com`.
- El método del código QR funciona completamente sin conexión.
- Este es el mismo mecanismo de importación utilizado por la función "recibir configuración" de **Copia de carbón**.
