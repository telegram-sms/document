# Система управления версиями структуры данных

## Обзор

Эта система управления версиями структуры данных автоматически обрабатывает обновления структуры данных приложения, обеспечивая плавную миграцию данных при обновлении приложения пользователями.

## Текущая версия структуры данных

**Текущая версия: 1**

## Функции

1. **Автоматическое обнаружение и обновление**: Автоматически определяет версию структуры данных при запуске приложения и выполняет необходимые миграции
2. **Отслеживание версий**: Записывает текущую версию структуры данных для удобного управления
3. **Обратная совместимость**: Поддерживает обновление со старых версий структуры данных до новых
4. **Резервное копирование данных**: Предоставляет функциональность резервного копирования данных для обеспечения безопасной миграции
5. **Расширяемость**: Легко добавлять логику миграции для новых версий

## Использование

### Инициализация

Система автоматически инициализируется в `MainActivity.onCreate()`:

```kotlin
MMKV.initialize(this)
preferences = MMKV.defaultMMKV()

// Проверка миграции структуры данных
DataMigrationManager.checkAndMigrate(this)
```

### Добавление новой версии структуры данных

Когда вам нужно изменить структуру данных (например, добавить новые поля, изменить форматы данных, удалить старые поля), следуйте этим шагам:

#### Шаг 1: Увеличьте номер версии

Измените `CURRENT_DATA_VERSION` в `DataMigrationManager.kt`:

```kotlin
/**
 * Текущая версия структуры данных
 * Увеличивайте это значение при внесении критических изменений в структуру данных
 */
const val CURRENT_DATA_VERSION = 2  // Увеличить с 1 до 2
```

#### Шаг 2: Реализуйте логику миграции

Добавьте обработку новой версии в оператор `when` метода `performMigration()`:

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())
    3 -> migrateToVersion3(context, MMKV.defaultMMKV())
    // Добавить новую версию
    4 -> migrateToVersion4(context, MMKV.defaultMMKV())
}
```

#### Шаг 3: Напишите функцию миграции

Реализуйте конкретную логику миграции:

```kotlin
/**
 * Миграция до версии 4
 * Пример: Добавление нового параметра уведомлений
 */
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "Миграция до версии 4")
    
    // Добавить новое поле со значением по умолчанию
    if (!preferences.contains("new_notification_setting")) {
        preferences.putBoolean("new_notification_setting", false)
    }
    
    // Преобразовать старый формат данных
    val oldValue = preferences.getString("old_format_field", "")
    if (oldValue.isNotEmpty()) {
        val newValue = transformOldFormat(oldValue)
        preferences.putString("new_format_field", newValue)
        // Необязательно: Удалить старое поле
        preferences.remove("old_format_field")
    }
    
    // Миграция данных экземпляра MMKV
    val oldMMKV = MMKV.mmkvWithID(MMKVConst.OLD_ID)
    val newMMKV = MMKV.mmkvWithID(MMKVConst.NEW_ID)
    // ... логика миграции данных
}

private fun transformOldFormat(oldData: String): String {
    // Реализовать логику преобразования формата данных
    return oldData.uppercase()
}
```

## История версий структуры данных

### Версия 1 (Текущая базовая версия)

**Дата**: 2 января 2026 г.

**Описание**: Установлена базовая версия для системы управления версиями структуры данных

**Включенные поля данных**:

#### Основной MMKV (по умолчанию):
- `bot_token` (String) - Telegram Bot Token
- `chat_id` (String) - Telegram Chat ID
- `message_thread_id` (String) - ID темы (для групп)
- `trusted_phone_number` (String) - Доверенный номер телефона
- `fallback_sms` (Boolean) - Резервный SMS
- `chat_command` (Boolean) - Переключатель команд чата
- `battery_monitoring_switch` (Boolean) - Переключатель мониторинга батареи
- `charger_status` (Boolean) - Уведомление о статусе зарядного устройства
- `verification_code` (Boolean) - Распознавание кода подтверждения
- `doh_switch` (Boolean) - DNS over HTTPS
- `initialized` (Boolean) - Флаг инициализации
- `privacy_dialog_agree` (Boolean) - Согласие с политикой конфиденциальности
- `call_notify` (Boolean) - Уведомление о звонке
- `hide_phone_number` (Boolean) - Скрыть номер телефона
- `version_code` (Int) - Код версии приложения
- `api_address` (String) - Адрес Telegram API
- `data_structure_version` (Int) - Номер версии структуры данных

#### Экземпляры MMKV:
- `MMKVConst.PROXY_ID` - Настройки прокси
- `MMKVConst.CHAT_ID` - Данные чата
- `MMKVConst.CHAT_INFO_ID` - Информация о чате
- `MMKVConst.RESEND_ID` - Очередь повторной отправки
- `MMKVConst.CARBON_COPY_ID` - Конфигурация службы копирования
- `MMKVConst.UPDATE_ID` - Данные проверки обновлений
- `MMKVConst.NOTIFY_ID` - Настройки уведомлений
- `MMKVConst.TEMPLATE_ID` - Шаблоны сообщений
- `MMKVConst.LOG_ID` - Данные журнала

### Версия 2 (Пример - Не реализовано)

Когда вам нужно обновиться до версии 2, задокументируйте изменения здесь.

**Детали изменений**:
- Добавить поле XXX
- Изменить формат данных XXX
- Удалить устаревшее поле XXX

## Справочник API

### DataMigrationManager

#### Публичные методы

##### `checkAndMigrate(context: Context)`
Проверить и выполнить необходимые миграции данных. Должен вызываться при запуске приложения.

##### `getCurrentVersion(): Int`
Получить текущую сохраненную версию структуры данных.

##### `isMigrationNeeded(): Boolean`
Проверить, требуется ли миграция.

##### `backupData(context: Context): Boolean`
Резервное копирование всех данных MMKV. Рекомендуется вызывать перед основными миграциями.

##### `resetDataVersion()`
Сбросить версию структуры данных. **Предупреждение**: Используйте с осторожностью, может привести к несогласованности данных.

## Лучшие практики

1. **Инкрементные номера версий**: Номер версии должен увеличиваться на 1 каждый раз при изменении структуры данных
2. **Поддержка обратной совместимости**: Логика миграции должна обрабатывать все возможные данные старых версий
3. **Подробная документация**: Каждое изменение версии должно быть подробно задокументировано в этом документе
4. **Тщательное тестирование**: Перед выпуском протестируйте миграцию со всех старых версий на новую версию
5. **Резервное копирование данных**: Рассмотрите возможность резервного копирования данных перед крупными изменениями
6. **Ведение журнала**: Процесс миграции должен записывать подробную информацию для устранения неполадок

## Примеры сценариев

### Сценарий 1: Добавление новой функции, требующей новое поле

```kotlin
// Версия 2: Добавление функции шифрования сообщений
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "Миграция до версии 2: Добавление поддержки шифрования")
    
    // Добавить переключатель шифрования, по умолчанию выключен
    preferences.putBoolean("enable_encryption", false)
    
    // Добавить место хранения ключа шифрования
    preferences.putString("encryption_key", "")
}
```

### Сценарий 2: Изменение формата данных

```kotlin
// Версия 3: Миграция chat_id из String в Long
private fun migrateToVersion3(context: Context, preferences: MMKV) {
    Log.d(TAG, "Миграция до версии 3: Преобразование chat_id в Long")
    
    val oldChatId = preferences.getString("chat_id", "")
    if (oldChatId.isNotEmpty()) {
        try {
            val chatIdLong = oldChatId.toLong()
            preferences.putLong("chat_id_long", chatIdLong)
            // Сохранить старое поле на некоторое время для возможности отката
            // preferences.remove("chat_id")
        } catch (e: NumberFormatException) {
            Log.e(TAG, "Не удалось преобразовать chat_id в Long: $oldChatId")
        }
    }
}
```

### Сценарий 3: Реорганизация данных в новый экземпляр MMKV

```kotlin
// Версия 4: Разделение настроек в выделенный экземпляр MMKV
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "Миграция до версии 4: Разделение настроек")
    
    // Создать новый MMKV настроек
    val settingsMMKV = MMKV.mmkvWithID("settings")
    
    // Мигрировать поля, связанные с настройками
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
        // Необязательно: Удалить из основного MMKV
        // preferences.remove(field)
    }
}
```

## Устранение неполадок

### Проблема: Миграция не удалась

**Решение**:
1. Проверьте сообщения об ошибках в журналах
2. Проверьте правильность логики миграции
3. Убедитесь, что все обязательные поля имеют значения по умолчанию
4. Рассмотрите возможность использования `backupData()` для восстановления данных

### Проблема: Потеря данных

**Решение**:
1. Проверьте, не были ли поля случайно удалены
2. Просмотрите резервные данные
3. Убедитесь, что логика миграции правильно обрабатывает все старые версии

### Проблема: Несоответствие номера версии

**Решение**:
1. Проверьте, правильно ли обновлен `CURRENT_DATA_VERSION`
2. Убедитесь, что реализованы функции миграции для всех версий
3. Проверьте, что логика миграции выполняется последовательно

## Контакты

По вопросам или предложениям, пожалуйста, оставьте отзыв через GitHub Issues.

