# Sistema de gestión de versiones de estructura de datos - Guía rápida

## Versión actual: 1

## Inicio rápido

El sistema está integrado automáticamente en la aplicación, no se requiere configuración adicional. La verificación y ejecución de la migración de datos se realiza automáticamente en cada inicio de la aplicación.

## ¿Cuándo actualizar la versión?

Debe actualizar la versión de la estructura de datos cuando necesite:

1. ✅ Agregar nuevos campos de configuración
2. ✅ Modificar tipos de datos de campos existentes (por ejemplo, String → Long)
3. ✅ Eliminar campos no utilizados
4. ✅ Reorganizar datos en diferentes ubicaciones de almacenamiento
5. ✅ Modificar formatos o estructuras de datos

## Cómo agregar una nueva versión (3 pasos)

### Paso 1: Actualizar número de versión

Editar `DataMigrationManager.kt`:

```kotlin
const val CURRENT_DATA_VERSION = 2  // Cambiar de 1 a 2
```

### Paso 2: Agregar caso de migración

Agregar en `performMigration()`:

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())  // Agregar esta línea
}
```

### Paso 3: Implementar lógica de migración

```kotlin
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrando a versión 2")
    
    // Agregar nuevo campo
    if (!preferences.contains("new_setting")) {
        preferences.putBoolean("new_setting", false)
    }
    
    // Conversión de formato de datos
    val oldData = preferences.getString("old_field", "")
    if (oldData.isNotEmpty()) {
        preferences.putString("new_field", oldData.uppercase())
    }
}
```

## Patrones de migración comunes

### 1. Agregar nuevo campo

```kotlin
if (!preferences.contains("new_field")) {
    preferences.putBoolean("new_field", false)
}
```

### 2. Conversión de tipo de datos

```kotlin
val oldValue = preferences.getString("chat_id", "")
if (oldValue.isNotEmpty()) {
    val newValue = oldValue.toLong()
    preferences.putLong("chat_id_long", newValue)
}
```

### 3. Eliminar campo antiguo

```kotlin
preferences.remove("deprecated_field")
```

### 4. Migrar a nueva instancia MMKV

```kotlin
val mainMMKV = MMKV.defaultMMKV()
val settingsMMKV = MMKV.mmkvWithID("settings")

val value = mainMMKV.getString("setting_key", "")
settingsMMKV.putString("setting_key", value)
```

## Notas importantes

⚠️ **Importante**:
- El número de versión debe incrementarse cada vez que se modifica la estructura de datos
- La lógica de migración debe manejar todas las versiones antiguas posibles
- Pruebe exhaustivamente el proceso de migración
- Documente los cambios de cada versión

## Ver ejemplos

Para más ejemplos de migración, consulte:
- `MigrationExamples.kt` - Ejemplos prácticos
- `DATA_STRUCTURE_VERSION_ES.md` - Documentación completa

## Copia de seguridad de datos

Para hacer copia de seguridad de datos (antes de cambios importantes):

```kotlin
DataMigrationManager.backupData(context)
```

## Solución de problemas

### ¿La migración falló?
1. Verifique la etiqueta "DataMigration" en Logcat
2. Verifique que el número de versión esté actualizado correctamente
3. Verifique que la función de migración esté implementada correctamente

### ¿Pérdida de datos?
1. Verifique si los campos fueron eliminados accidentalmente
2. Asegúrese de que la lógica de migración maneje correctamente las versiones antiguas
3. Use la función de copia de seguridad para restaurar datos

