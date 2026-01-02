# Система управления версиями структуры данных - Краткое руководство

## Текущая версия: 1

## Быстрый старт

Система автоматически интегрирована в приложение, дополнительная настройка не требуется. Проверка и выполнение миграции данных происходят автоматически при каждом запуске приложения.

## Когда обновлять версию?

Вы должны обновить версию структуры данных, когда вам нужно:

1. ✅ Добавить новые поля конфигурации
2. ✅ Изменить типы данных существующих полей (например, String → Long)
3. ✅ Удалить неиспользуемые поля
4. ✅ Реорганизовать данные в разные места хранения
5. ✅ Изменить форматы или структуры данных

## Как добавить новую версию (3 шага)

### Шаг 1: Обновите номер версии

Отредактируйте `DataMigrationManager.kt`:

```kotlin
const val CURRENT_DATA_VERSION = 2  // Измените с 1 на 2
```

### Шаг 2: Добавьте случай миграции

Добавьте в `performMigration()`:

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())  // Добавьте эту строку
}
```

### Шаг 3: Реализуйте логику миграции

```kotlin
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "Миграция до версии 2")
    
    // Добавить новое поле
    if (!preferences.contains("new_setting")) {
        preferences.putBoolean("new_setting", false)
    }
    
    // Преобразование формата данных
    val oldData = preferences.getString("old_field", "")
    if (oldData.isNotEmpty()) {
        preferences.putString("new_field", oldData.uppercase())
    }
}
```

## Общие шаблоны миграции

### 1. Добавить новое поле

```kotlin
if (!preferences.contains("new_field")) {
    preferences.putBoolean("new_field", false)
}
```

### 2. Преобразование типа данных

```kotlin
val oldValue = preferences.getString("chat_id", "")
if (oldValue.isNotEmpty()) {
    val newValue = oldValue.toLong()
    preferences.putLong("chat_id_long", newValue)
}
```

### 3. Удалить старое поле

```kotlin
preferences.remove("deprecated_field")
```

### 4. Миграция в новый экземпляр MMKV

```kotlin
val mainMMKV = MMKV.defaultMMKV()
val settingsMMKV = MMKV.mmkvWithID("settings")

val value = mainMMKV.getString("setting_key", "")
settingsMMKV.putString("setting_key", value)
```

## Важные примечания

⚠️ **Важно**:
- Номер версии должен увеличиваться при каждом изменении структуры данных
- Логика миграции должна обрабатывать все возможные старые версии
- Тщательно протестируйте процесс миграции
- Документируйте изменения каждой версии

## Просмотр примеров

Для получения дополнительных примеров миграции обратитесь к:
- `DATA_STRUCTURE_VERSION_RU.md` - Полная документация

## Резервное копирование данных

Для резервного копирования данных (перед значительными изменениями):

```kotlin
DataMigrationManager.backupData(context)
```

## Устранение неполадок

### Миграция не удалась?
1. Проверьте тег "DataMigration" в Logcat
2. Убедитесь, что номер версии правильно обновлен
3. Убедитесь, что функция миграции правильно реализована

### Потеря данных?
1. Проверьте, не были ли случайно удалены поля
2. Убедитесь, что логика миграции правильно обрабатывает старые версии
3. Используйте функцию резервного копирования для восстановления данных

