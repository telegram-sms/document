# Generador de configuración

El **Generador de configuración** (https://config.telegram-sms.com) es una herramienta web gratuita que le ayuda a crear una configuración de Telegram SMS en un ordenador y trasladarla a su teléfono mediante un código QR, para que no tenga que escribir valores largos como el token del bot en una pantalla táctil pequeña.

Funciona por completo en su navegador y no requiere ninguna cuenta. Su token del bot no sale del dispositivo: se codifica localmente en un código QR y el propio generador no lo envía a ningún servidor.

## Cuándo usarlo

- Quiere introducir un **token del bot** largo sin teclearlo en el teléfono.
- Va a configurar varios teléfonos con ajustes similares.
- Prefiere rellenar un formulario con un teclado completo.

> Si lo que quiere es copiar una configuración *que ya funciona* de un teléfono a otro, use [Transferir configuración](./transfer-config) dentro de la aplicación. El Generador de configuración sirve para crear una configuración desde cero en el navegador.

## Cómo usarlo

1. En un ordenador (u otro teléfono), abra https://config.telegram-sms.com.
2. Rellene los campos de configuración; como mínimo, su **token del bot**.
3. La página genera un **código QR** con lo que ha introducido.
4. En Telegram SMS, en el teléfono de destino, toque el botón de **escanear** (cámara) en la pantalla principal de configuración.
5. Escanee el código QR de la pantalla del ordenador. Los campos correspondientes se rellenan automáticamente.
6. Complete los pasos restantes (como `Obtener ID de chat reciente`) y toque **Probar y guardar**.

Es el mismo escáner de la aplicación que se usa para leer los códigos QR generados por [Transferir configuración](./transfer-config).

## Mantenga el código QR en privado

> ⚠️ Un código QR de configuración puede contener su **token del bot** en texto plano. Cualquiera que lo escanee puede controlar su bot. No lo publique ni lo comparta en capturas de pantalla, y cierre la página cuando termine.

## Relacionado

- [Empezar](./getting-started): el recorrido completo de configuración inicial.
- [Transferir configuración](./transfer-config): copie una configuración terminada entre teléfonos (código QR o ID cifrado + contraseña).
