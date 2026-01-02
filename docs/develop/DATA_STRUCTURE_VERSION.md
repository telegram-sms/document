# 數據結構版本管理系統

## 概述

這個數據結構版本管理系統可以自動處理應用程序數據結構的升級，確保用戶在應用更新時數據能夠平滑遷移。

## 當前數據結構版本

**當前版本：1**

## 功能特點

1. **自動檢測和升級**：應用啟動時自動檢測數據結構版本並執行必要的遷移
2. **版本追蹤**：記錄當前數據結構版本，便於管理
3. **向後兼容**：支持從舊版本數據結構升級到新版本
4. **數據備份**：提供數據備份功能，確保遷移安全
5. **可擴展**：易於添加新的版本遷移邏輯

## 使用方法

### 初始化

系統已在 `MainActivity.onCreate()` 中自動初始化：

```kotlin
MMKV.initialize(this)
preferences = MMKV.defaultMMKV()

// 數據結構遷移檢查
DataMigrationManager.checkAndMigrate(this)
```

### 添加新的數據結構版本

當需要修改數據結構時（例如添加新字段、修改數據格式、刪除舊字段），請遵循以下步驟：

#### 步驟 1：增加版本號

在 `DataMigrationManager.kt` 中修改 `CURRENT_DATA_VERSION`：

```kotlin
/**
 * Current data structure version
 * Increment this when making breaking changes to data structure
 */
const val CURRENT_DATA_VERSION = 2  // 從 1 增加到 2
```

#### 步驟 2：實現遷移邏輯

在 `performMigration()` 方法的 `when` 語句中添加新版本的處理：

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())
    3 -> migrateToVersion3(context, MMKV.defaultMMKV())
    // 添加新版本
    4 -> migrateToVersion4(context, MMKV.defaultMMKV())
}
```

#### 步驟 3：編寫遷移函數

實現具體的遷移邏輯：

```kotlin
/**
 * Migration to version 4
 * Example: Add a new notification setting
 */
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrating to version 4")
    
    // 添加新字段，設置默認值
    if (!preferences.contains("new_notification_setting")) {
        preferences.putBoolean("new_notification_setting", false)
    }
    
    // 轉換舊數據格式
    val oldValue = preferences.getString("old_format_field", "")
    if (oldValue.isNotEmpty()) {
        val newValue = transformOldFormat(oldValue)
        preferences.putString("new_format_field", newValue)
        // 可選：刪除舊字段
        preferences.remove("old_format_field")
    }
    
    // 遷移 MMKV 實例數據
    val oldMMKV = MMKV.mmkvWithID(MMKVConst.OLD_ID)
    val newMMKV = MMKV.mmkvWithID(MMKVConst.NEW_ID)
    // ... 數據遷移邏輯
}

private fun transformOldFormat(oldData: String): String {
    // 實現數據格式轉換邏輯
    return oldData.uppercase()
}
```

## 數據結構版本歷史

### 版本 1（當前基線版本）

**日期**：2026-01-02

**描述**：建立數據結構版本管理系統的基線版本

**包含的數據字段**：

#### 主 MMKV（默認）：
- `bot_token` (String) - Telegram Bot Token
- `chat_id` (String) - Telegram Chat ID
- `message_thread_id` (String) - 話題 ID（用於群組）
- `trusted_phone_number` (String) - 受信任的手機號碼
- `fallback_sms` (Boolean) - 降級使用 SMS
- `chat_command` (Boolean) - 聊天命令開關
- `battery_monitoring_switch` (Boolean) - 電池監控開關
- `charger_status` (Boolean) - 充電狀態通知
- `verification_code` (Boolean) - 驗證碼識別
- `doh_switch` (Boolean) - DNS over HTTPS
- `initialized` (Boolean) - 初始化標記
- `privacy_dialog_agree` (Boolean) - 隱私政策同意
- `call_notify` (Boolean) - 來電通知
- `hide_phone_number` (Boolean) - 隱藏電話號碼
- `version_code` (Int) - 應用版本號
- `api_address` (String) - Telegram API 地址
- `data_structure_version` (Int) - 數據結構版本號

#### MMKV 實例：
- `MMKVConst.PROXY_ID` - 代理設置
- `MMKVConst.CHAT_ID` - 聊天數據
- `MMKVConst.CHAT_INFO_ID` - 聊天信息
- `MMKVConst.RESEND_ID` - 重發隊列
- `MMKVConst.CARBON_COPY_ID` - 抄送服務配置
- `MMKVConst.UPDATE_ID` - 更新檢查數據
- `MMKVConst.NOTIFY_ID` - 通知設置
- `MMKVConst.TEMPLATE_ID` - 消息模板
- `MMKVConst.LOG_ID` - 日誌數據

### 版本 2（示例 - 未實現）

當您需要升級到版本 2 時，請在此處記錄變更。

**變更內容**：
- 添加 XXX 字段
- 修改 XXX 數據格式
- 移除 XXX 過時字段

## API 參考

### DataMigrationManager

#### 公共方法

##### `checkAndMigrate(context: Context)`
檢查並執行必要的數據遷移。應在應用啟動時調用。

##### `getCurrentVersion(): Int`
獲取當前保存的數據結構版本。

##### `isMigrationNeeded(): Boolean`
檢查是否需要執行遷移。

##### `backupData(context: Context): Boolean`
備份所有 MMKV 數據。在執行重大遷移前建議調用。

##### `resetDataVersion()`
重置數據結構版本。**警告**：謹慎使用，可能導致數據不一致。

## 最佳實踐

1. **版本號遞增**：每次修改數據結構時，版本號應遞增 1
2. **保持向後兼容**：遷移邏輯應能處理所有可能的舊版本數據
3. **詳細記錄**：每個版本變更都應在此文檔中詳細記錄
4. **測試充分**：在發布前測試從所有舊版本到新版本的遷移
5. **數據備份**：對於重大變更，考慮先備份數據
6. **日誌記錄**：遷移過程應記錄詳細日誌，便於問題追蹤

## 示例場景

### 場景 1：添加新功能需要新字段

```kotlin
// 版本 2：添加消息加密功能
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrating to version 2: Adding encryption support")
    
    // 添加加密開關，默認關閉
    preferences.putBoolean("enable_encryption", false)
    
    // 添加加密密鑰存儲位置
    preferences.putString("encryption_key", "")
}
```

### 場景 2：修改數據格式

```kotlin
// 版本 3：將 chat_id 從 String 遷移到 Long
private fun migrateToVersion3(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrating to version 3: Converting chat_id to Long")
    
    val oldChatId = preferences.getString("chat_id", "")
    if (oldChatId.isNotEmpty()) {
        try {
            val chatIdLong = oldChatId.toLong()
            preferences.putLong("chat_id_long", chatIdLong)
            // 保留舊字段一段時間以便回退
            // preferences.remove("chat_id")
        } catch (e: NumberFormatException) {
            Log.e(TAG, "Failed to convert chat_id to Long: $oldChatId")
        }
    }
}
```

### 場景 3：重組數據到新的 MMKV 實例

```kotlin
// 版本 4：將設置分離到專門的 MMKV 實例
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "Migrating to version 4: Separating settings")
    
    // 創建新的設置 MMKV
    val settingsMMKV = MMKV.mmkvWithID("settings")
    
    // 遷移設置相關字段
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
        // 可選：從主 MMKV 中刪除
        // preferences.remove(field)
    }
}
```

## 故障排除

### 問題：遷移失敗

**解決方案**：
1. 檢查日誌中的錯誤信息
2. 驗證遷移邏輯的正確性
3. 確保所有必需的字段都有默認值
4. 考慮使用 `backupData()` 恢復數據

### 問題：數據丟失

**解決方案**：
1. 檢查是否意外刪除了字段
2. 查看備份數據
3. 確保遷移邏輯正確處理了所有舊版本

### 問題：版本號不匹配

**解決方案**：
1. 檢查 `CURRENT_DATA_VERSION` 是否正確更新
2. 確保所有版本的遷移函數都已實現
3. 驗證遷移邏輯按順序執行

## 聯繫方式

如有問題或建議，請通過 GitHub Issues 反饋。

