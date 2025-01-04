# Preguntas y Respuestas
### > No puedo recibir ningún SMS

Este problema suele ocurrir en sistemas de teléfonos profundamente personalizados, generalmente debido a problemas de seguridad que bloquean todas las transmisiones de SMS. La solución actual a este problema es configurar Telegram SMS como la aplicación de SMS predeterminada o escuchar las notificaciones push para obtener el contenido del SMS.

### > Puedo recibir SMS normales, pero no puedo recibir SMS con códigos de verificación

**¡Advertencia de riesgo! Reenviar códigos de verificación puede comprometer su privacidad personal y la seguridad de su cuenta. Si comprende este riesgo, continúe con las siguientes operaciones.**

Recientemente, algunos usuarios han informado que Telegram SMS no puede reenviar correctamente los SMS de tipo notificación. Las ROM afectadas incluyen Huawei EMUI y Xiaomi MIUI. Estos sistemas proporcionan funciones de protección de seguridad para los SMS de verificación, lo que impide que los códigos de verificación se obtengan correctamente a través de la transmisión. A continuación se presentan las soluciones.

Huawei EMUI：
```
Mensajes > Más > Configuración > Avanzado > Desactivar la protección de seguridad del código de verificación.

via:https://club.huawei.com/thread-17770781-1-1.html
```

Xiaomi MIUI：
```
Centro de seguridad > Gestión de permisos > Telegram SMS > Permisos > Seleccionar SMS de tipo notificación
```

### > ¿Por qué el servicio en segundo plano de mi teléfono Huawei no puede seguir funcionando?

En el sistema Huawei EMUI9, se ha incorporado una nueva herramienta de gestión de energía llamada `Power Genius`. Esta herramienta verifica automáticamente los programas que se ejecutan en segundo plano y, si no están en la lista blanca de Huawei (por ejemplo, WeChat, QQ), los detiene forzosamente. Necesita desactivar completamente la ejecución de este programa a través de ADB, lo que garantizará que su teléfono pueda ejecutar Telegram SMS correctamente, pero puede causar problemas de consumo de batería y sobrecalentamiento.

En otras versiones del sistema EMUI, puede controlar y garantizar el funcionamiento normal del programa configurando la información de optimización de la batería. Consulte el siguiente enlace para obtener más detalles.

Pasos de operación e información relacionada: https://dontkillmyapp.com/huawei

### > Quiero desactivar las notificaciones en la barra de notificaciones

Debido a los [cambios de comportamiento](https://developer.android.com/about/versions/oreo/android-8.0-changes?hl=es-419#back-all) en Android O, no podemos ejecutar el servicio de Telegram SMS en segundo plano de manera silenciosa.

Puede consultar el documento proporcionado por Google "Controlar las notificaciones que se muestran en tu dispositivo Android" en la sección `Elegir cómo recibir notificaciones > Activar o desactivar las notificaciones de ciertas aplicaciones` para desactivar todas las notificaciones de Telegram SMS en la barra de notificaciones.

Información relacionada: https://support.google.com/android/answer/9079661?hl=es-419

### > Quiero cambiar la dirección del servidor API

No proporcionamos ninguna función de configuración para cambiar la dirección del servidor API en el programa.

**Esto se debe a consideraciones de privacidad y seguridad de las comunicaciones. Cambiar la dirección del API es similar a un secuestro GSM + sniffing de SMS, lo que puede causar pérdidas financieras.**

Puede usar el método de proxy SNI para proxy de manera segura `api.telegram.org`, lo que evitará que los paquetes de datos se descompriman durante la transmisión y protegerá los paquetes de datos de ser obtenidos por terceros. Puede usar el módulo Stream de Nginx para implementar esta función. Este módulo opera en la capa 4 del modelo OSI y puede ejecutarse simultáneamente con servicios que operan en la capa 7. Esto garantizará que pueda alojar un sitio web mientras usa el proxy SNI. También puede usar Sniproxy para lograr la misma función.

Si comprende los riesgos de cambiar la dirección del API pero aún desea realizar esta operación, le proporcionaremos un script de compilación basado en GitHub Action. Puede hacer un fork de este repositorio y realizar modificaciones. GitHub Action compilará automáticamente cuando realice un commit y emitirá una versión de lanzamiento utilizando la firma de prueba incorporada. Tenga en cuenta que esta firma es diferente de la utilizada en la versión original, por lo que deberá desinstalar la aplicación original e instalar la nueva versión.