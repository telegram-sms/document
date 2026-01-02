# Sistema de gestión de versiones de estructura de datos

## Descripción general

Este sistema de gestión de versiones de estructura de datos maneja automáticamente las actualizaciones de la estructura de datos de la aplicación, asegurando una migración de datos fluida cuando los usuarios actualizan la aplicación.

## Versión actual de la estructura de datos

**Versión actual: 1**

## Características

1. **Detección y actualización automática**: Detecta automáticamente la versión de la estructura de datos al iniciar la aplicación y ejecuta las migraciones necesarias
2. **Seguimiento de versiones**: Registra la versión actual de la estructura de datos para facilitar la gestión
3. **Compatibilidad hacia atrás**: Admite la actualización desde versiones anteriores de la estructura de datos a versiones más nuevas
4. **Copia de seguridad de datos**: Proporciona funcionalidad de copia de seguridad de datos para garantizar una migración segura
5. **Extensibilidad**: Fácil de agregar lógica de migración para nuevas versiones

## Uso

### Inicialización

El sistema se inicializa automáticamente en `MainActivity.onCreate()`:

```kotlin
MMKV.initialize(this)
preferences = MMKV.defaultMMKV()

// Verificación de migración de estructura de datos
DataMigrationManager.checkAndMigrate(this)
```

### Agregar una nueva versión de estructura de datos

Cuando necesite modificar la estructura de datos (por ejemplo, agregar nuevos campos, modificar formatos de datos, eliminar campos antiguos), siga estos pasos:

#### Paso 1: Incrementar el número de versión

Modifique `CURRENT_DATA_VERSION` en `DataMigrationManager.kt`:

```kotlin
/**
 * Versión actual de la estructura de datos
 * Incremente esto cuando realice cambios disruptivos en la estructura de datos
 */
const val CURRENT_DATA_VERSION = 2  // Incrementar de 1 a 2
```

#### Paso 2: Implementar lógica de migración

Agregue el manejo de la nueva versión en la declaración `when` del método `performMigration()`:

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())
    3 -> migrateToVersion3(context, MMKV.defaultMMKV())
    // Agregar nueva versión
    4 -> migrateToVersion4(context, MMKV.defaultMMKV())
}
```

#### Paso 3: Escribir función de migración

Implemente la lógica de migración específica:

```kotlin
/**
 * Migración a versión 4
 * Ejemplo: Agregar nueva configuración de notificación
 */
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrando a versión 4")
    
    // Agregar nuevo campo con valor predeterminado
    if (!preferences.contains("new_notification_setting")) {
        preferences.putBoolean("new_notification_setting", false)
    }
    
    // Transformar formato de datos antiguo
    val oldValue = preferences.getString("old_format_field", "")
    if (oldValue.isNotEmpty()) {
        val newValue = transformOldFormat(oldValue)
        preferences.putString("new_format_field", newValue)
        // Opcional: Eliminar campo antiguo
        preferences.remove("old_format_field")
    }
    
    // Migrar datos de instancia MMKV
    val oldMMKV = MMKV.mmkvWithID(MMKVConst.OLD_ID)
    val newMMKV = MMKV.mmkvWithID(MMKVConst.NEW_ID)
    // ... lógica de migración de datos
}

private fun transformOldFormat(oldData: String): String {
    // Implementar lógica de transformación de formato de datos
    return oldData.uppercase()
}
```

## Historial de versiones de estructura de datos

### Versión 1 (Versión base actual)

**Fecha**: 2 de enero de 2026

**Descripción**: Establecida la versión base para el sistema de gestión de versiones de estructura de datos

**Campos de datos incluidos**:

#### MMKV principal (predeterminado):
- `bot_token` (String) - Telegram Bot Token
- `chat_id` (String) - Telegram Chat ID
- `message_thread_id` (String) - ID de tema (para grupos)
- `trusted_phone_number` (String) - Número de teléfono de confianza
- `fallback_sms` (Boolean) - Respaldo a SMS
- `chat_command` (Boolean) - Interruptor de comando de chat
- `battery_monitoring_switch` (Boolean) - Interruptor de monitoreo de batería
- `charger_status` (Boolean) - Notificación de estado del cargador
- `verification_code` (Boolean) - Reconocimiento de código de verificación
- `doh_switch` (Boolean) - DNS over HTTPS
- `initialized` (Boolean) - Bandera de inicialización
- `privacy_dialog_agree` (Boolean) - Acuerdo de política de privacidad
- `call_notify` (Boolean) - Notificación de llamada
- `hide_phone_number` (Boolean) - Ocultar número de teléfono
- `version_code` (Int) - Código de versión de la aplicación
- `api_address` (String) - Dirección de la API de Telegram
- `data_structure_version` (Int) - Número de versión de la estructura de datos

#### Instancias MMKV:
- `MMKVConst.PROXY_ID` - Configuración de proxy
- `MMKVConst.CHAT_ID` - Datos de chat
- `MMKVConst.CHAT_INFO_ID` - Información de chat
- `MMKVConst.RESEND_ID` - Cola de reenvío
- `MMKVConst.CARBON_COPY_ID` - Configuración del servicio de copia
- `MMKVConst.UPDATE_ID` - Datos de verificación de actualización
- `MMKVConst.NOTIFY_ID` - Configuración de notificaciones
- `MMKVConst.TEMPLATE_ID` - Plantillas de mensajes
- `MMKVConst.LOG_ID` - Datos de registro

### Versión 2 (Ejemplo - No implementado)

Cuando necesite actualizar a la versión 2, documente los cambios aquí.

**Detalles de cambios**:
- Agregar campo XXX
- Modificar formato de datos XXX
- Eliminar campo obsoleto XXX

## Referencia de API

### DataMigrationManager

#### Métodos públicos

##### `checkAndMigrate(context: Context)`
Verificar y ejecutar las migraciones de datos necesarias. Debe llamarse al iniciar la aplicación.

##### `getCurrentVersion(): Int`
Obtener la versión de estructura de datos guardada actualmente.

##### `isMigrationNeeded(): Boolean`
Verificar si se necesita migración.

##### `backupData(context: Context): Boolean`
Hacer copia de seguridad de todos los datos MMKV. Se recomienda llamar antes de migraciones importantes.

##### `resetDataVersion()`
Restablecer la versión de la estructura de datos. **Advertencia**: Use con precaución, puede causar inconsistencia de datos.

## Mejores prácticas

1. **Números de versión incrementales**: El número de versión debe incrementarse en 1 cada vez que se modifica la estructura de datos
2. **Mantener la compatibilidad hacia atrás**: La lógica de migración debe manejar todos los datos de versiones anteriores posibles
3. **Documentación detallada**: Cada cambio de versión debe documentarse en detalle en este documento
4. **Pruebas exhaustivas**: Pruebe la migración desde todas las versiones anteriores a la nueva versión antes del lanzamiento
5. **Copia de seguridad de datos**: Considere hacer una copia de seguridad de los datos antes de cambios importantes
6. **Registro**: El proceso de migración debe registrar información detallada para la solución de problemas

## Escenarios de ejemplo

### Escenario 1: Agregar nueva función que requiere un nuevo campo

```kotlin
// Versión 2: Agregar función de cifrado de mensajes
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrando a versión 2: Agregando soporte de cifrado")
    
    // Agregar interruptor de cifrado, desactivado por defecto
    preferences.putBoolean("enable_encryption", false)
    
    // Agregar ubicación de almacenamiento de clave de cifrado
    preferences.putString("encryption_key", "")
}
```

### Escenario 2: Modificar formato de datos

```kotlin
// Versión 3: Migrar chat_id de String a Long
private fun migrateToVersion3(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrando a versión 3: Convirtiendo chat_id a Long")
    
    val oldChatId = preferences.getString("chat_id", "")
    if (oldChatId.isNotEmpty()) {
        try {
            val chatIdLong = oldChatId.toLong()
            preferences.putLong("chat_id_long", chatIdLong)
            // Mantener campo antiguo por un tiempo para permitir reversión
            // preferences.remove("chat_id")
        } catch (e: NumberFormatException) {
            Log.e(TAG, "No se pudo convertir chat_id a Long: $oldChatId")
        }
    }
}
```

### Escenario 3: Reorganizar datos en nueva instancia MMKV

```kotlin
// Versión 4: Separar configuraciones en instancia MMKV dedicada
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrando a versión 4: Separando configuraciones")
    
    // Crear nuevo MMKV de configuraciones
    val settingsMMKV = MMKV.mmkvWithID("settings")
    
    // Migrar campos relacionados con configuraciones
    val fieldsToMigrate = listOf(
        "doh_switch",
        "battery_monitoring_switch",
        "charger_status",
        "call_notify",
        "verification_code"
    )
    
    for (field in fieldsToMigrate) {
        val value = preferences.getBoolean(field, false)
        settingsMMKV.putBoolean(field, value)
        // Opcional: Eliminar del MMKV principal
        // preferences.remove(field)
    }
}
```

## Solución de problemas

### Problema: La migración falló

**Solución**:
1. Verifique los mensajes de error en los registros
2. Verifique la corrección de la lógica de migración
3. Asegúrese de que todos los campos requeridos tengan valores predeterminados
4. Considere usar `backupData()` para restaurar datos

### Problema: Pérdida de datos

**Solución**:
1. Verifique si los campos fueron eliminados accidentalmente
2. Revise los datos de respaldo
3. Asegúrese de que la lógica de migración maneje correctamente todas las versiones anteriores

### Problema: Desajuste del número de versión

**Solución**:
1. Verifique si `CURRENT_DATA_VERSION` está actualizado correctamente
2. Asegúrese de que las funciones de migración estén implementadas para todas las versiones
3. Verifique que la lógica de migración se ejecute en secuencia

## Contacto

Para problemas o sugerencias, proporcione comentarios a través de GitHub Issues.

