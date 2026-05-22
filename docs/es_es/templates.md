# Plantillas de mensajes

Las plantillas le permiten personalizar la redacción y el formato de los mensajes que le envía Telegram SMS. Cada tipo de notificación —SMS entrante, MMS, SMS saliente, llamadas, notificaciones de aplicaciones y avisos de batería— tiene su propia plantilla que puede reescribir libremente.

## Abrir el editor de plantillas

Abra Telegram SMS y toque el menú de desbordamiento (⋮) → **Plantilla**.

Verá una tarjeta para cada tipo de mensaje. Cada tarjeta muestra una **vista previa en vivo** generada con datos de ejemplo, para que pueda ver exactamente cómo se verán sus cambios.

## Editar una plantilla

1. Toque la tarjeta del tipo de mensaje que desea cambiar.
2. Edite el texto en el cuadro de diálogo. Use los tokens `{{Marcador}}` (vea más abajo) donde quiera que se inserte un valor real.
3. Toque uno de los siguientes:
   - **Aceptar** — guardar su plantilla personalizada.
   - **Restablecer** — descartar la personalización y restaurar el valor predeterminado integrado.
   - **Cancelar** — cerrar sin cambiar nada.

Use `\n` para un salto de línea, igual que en las plantillas predeterminadas.

## Marcadores de posición

Un marcador de posición se escribe como `{{Nombre}}` y se reemplaza por el valor real cuando se envía el mensaje. Cualquier marcador que elimine simplemente no aparecerá; el texto fuera de los marcadores se mantiene tal cual. Cada tipo de plantilla admite un conjunto diferente de marcadores:

| Plantilla | Marcadores disponibles |
| --- | --- |
| SMS recibido | `{{SIM}}`, `{{From}}`, `{{Content}}`, `{{Time}}` |
| MMS recibido | `{{SIM}}`, `{{From}}`, `{{Subject}}`, `{{Content}}`, `{{Time}}` |
| Enviar SMS | `{{SIM}}`, `{{To}}`, `{{Content}}` |
| Llamada entrante | `{{SIM}}`, `{{From}}` |
| Llamada perdida | `{{SIM}}`, `{{From}}` |
| Notificación | `{{APP}}`, `{{Title}}`, `{{Description}}` |
| Batería | `{{BatteryLevel}}`, `{{Message}}` |

> `{{SIM}}` solo tiene sentido en dispositivos con doble SIM; en un dispositivo con una sola SIM se resuelve como un valor vacío.

## Ejemplo

La plantilla predeterminada de **SMS recibido** es:

```
[{{SIM}}Receive SMS]
From: {{From}}
Content: {{Content}}
```

Si quisiera añadir la hora y un prefijo personalizado, podría cambiarla a:

```
📩 Nuevo SMS {{SIM}}
{{Time}}
{{From}} escribió:
{{Content}}
```

Toque **Aceptar** y luego envíese un SMS de prueba para confirmar el nuevo formato.
