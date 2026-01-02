# 資料結構版本管理系統

## 概述

此資料結構版本管理系統自動處理應用程式資料結構升級，確保使用者更新應用程式時資料平滑遷移。

## 目前資料結構版本

**目前版本：1**

## 特性

1. **自動偵測和升級**：應用程式啟動時自動偵測資料結構版本並執行必要的遷移
2. **版本追蹤**：記錄目前資料結構版本，便於管理
3. **向後相容**：支援從舊資料結構版本升級到新版本
4. **資料備份**：提供資料備份功能，確保安全遷移
5. **可擴充性**：易於新增新版本遷移邏輯

## 使用方法

### 初始化

系統在 `MainActivity.onCreate()` 中自動初始化：

```kotlin
MMKV.initialize(this)
preferences = MMKV.defaultMMKV()

// 資料結構遷移檢查
DataMigrationManager.checkAndMigrate(this)
```

### 新增新的資料結構版本

當您需要修改資料結構（例如新增新欄位、修改資料格式、刪除舊欄位）時，請遵循以下步驟：

#### 步驟 1：遞增版本號

修改 `DataMigrationManager.kt` 中的 `CURRENT_DATA_VERSION`：

```kotlin
/**
 * 目前資料結構版本
 * 對資料結構進行破壞性變更時遞增此值
 */
const val CURRENT_DATA_VERSION = 2  // 從 1 遞增到 2
```

#### 步驟 2：實作遷移邏輯

在 `performMigration()` 方法的 `when` 陳述式中新增新版本的處理：

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())
    3 -> migrateToVersion3(context, MMKV.defaultMMKV())
    // 新增新版本
    4 -> migrateToVersion4(context, MMKV.defaultMMKV())
}
```

#### 步驟 3：編寫遷移函數

實作具體的遷移邏輯：

```kotlin
/**
 * 遷移到版本 4
 * 範例：新增新的通知設定
 */
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "遷移到版本 4")
    
    // 新增具有預設值的新欄位
    if (!preferences.contains("new_notification_setting")) {
        preferences.putBoolean("new_notification_setting", false)
    }
    
    // 轉換舊資料格式
    val oldValue = preferences.getString("old_format_field", "")
    if (oldValue.isNotEmpty()) {
        val newValue = transformOldFormat(oldValue)
        preferences.putString("new_format_field", newValue)
        // 可選：刪除舊欄位
        preferences.remove("old_format_field")
    }
    
    // 遷移 MMKV 實例資料
    val oldMMKV = MMKV.mmkvWithID(MMKVConst.OLD_ID)
    val newMMKV = MMKV.mmkvWithID(MMKVConst.NEW_ID)
    // ... 資料遷移邏輯
}

private fun transformOldFormat(oldData: String): String {
    // 實作資料格式轉換邏輯
    return oldData.uppercase()
}
```

## 資料結構版本歷史

### 版本 1（目前基準版本）

**日期**：2026年1月2日

**描述**：為資料結構版本管理系統建立基準版本

**包含的資料欄位**：

#### 主 MMKV（預設）：
- `bot_token` (String) - Telegram Bot Token
- `chat_id` (String) - Telegram Chat ID
- `message_thread_id` (String) - 主題 ID（用於群組）
- `trusted_phone_number` (String) - 受信任的電話號碼
- `fallback_sms` (Boolean) - 回退到簡訊
- `chat_command` (Boolean) - 聊天指令開關
- `battery_monitoring_switch` (Boolean) - 電池監控開關
- `charger_status` (Boolean) - 充電器狀態通知
- `verification_code` (Boolean) - 驗證碼識別
- `doh_switch` (Boolean) - DNS over HTTPS
- `initialized` (Boolean) - 初始化標誌
- `privacy_dialog_agree` (Boolean) - 隱私政策同意
- `call_notify` (Boolean) - 來電通知
- `hide_phone_number` (Boolean) - 隱藏電話號碼
- `version_code` (Int) - 應用程式版本代碼
- `api_address` (String) - Telegram API 位址
- `data_structure_version` (Int) - 資料結構版本號

#### MMKV 實例：
- `MMKVConst.PROXY_ID` - 代理設定
- `MMKVConst.CHAT_ID` - 聊天資料
- `MMKVConst.CHAT_INFO_ID` - 聊天資訊
- `MMKVConst.RESEND_ID` - 重發佇列
- `MMKVConst.CARBON_COPY_ID` - 副本服務設定
- `MMKVConst.UPDATE_ID` - 更新檢查資料
- `MMKVConst.NOTIFY_ID` - 通知設定
- `MMKVConst.TEMPLATE_ID` - 訊息範本
- `MMKVConst.LOG_ID` - 日誌資料

### 版本 2（範例 - 未實作）

當您需要升級到版本 2 時，請在此處記錄變更。

**變更詳情**：
- 新增 XXX 欄位
- 修改 XXX 資料格式
- 刪除 XXX 廢棄欄位

## API 參考

### DataMigrationManager

#### 公開方法

##### `checkAndMigrate(context: Context)`
檢查並執行必要的資料遷移。應在應用程式啟動時呼叫。

##### `getCurrentVersion(): Int`
取得目前儲存的資料結構版本。

##### `isMigrationNeeded(): Boolean`
檢查是否需要遷移。

##### `backupData(context: Context): Boolean`
備份所有 MMKV 資料。建議在重大遷移之前呼叫。

##### `resetDataVersion()`
重設資料結構版本。**警告**：謹慎使用，可能導致資料不一致。

## 最佳實踐

1. **遞增版本號**：每次修改資料結構時，版本號應遞增 1
2. **保持向後相容性**：遷移邏輯應處理所有可能的舊版本資料
3. **詳細文件**：每次版本變更都應在本文件中詳細記錄
4. **徹底測試**：發布前測試從所有舊版本到新版本的遷移
5. **資料備份**：在重大變更之前考慮備份資料
6. **日誌記錄**：遷移過程應記錄詳細資訊以便故障排除

## 範例場景

### 場景 1：新增需要新欄位的新功能

```kotlin
// 版本 2：新增訊息加密功能
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "遷移到版本 2：新增加密支援")
    
    // 新增加密開關，預設關閉
    preferences.putBoolean("enable_encryption", false)
    
    // 新增加密金鑰儲存位置
    preferences.putString("encryption_key", "")
}
```

### 場景 2：修改資料格式

```kotlin
// 版本 3：將 chat_id 從 String 遷移到 Long
private fun migrateToVersion3(context: Context, preferences: MMKV) {
    Log.d(TAG, "遷移到版本 3：將 chat_id 轉換為 Long")
    
    val oldChatId = preferences.getString("chat_id", "")
    if (oldChatId.isNotEmpty()) {
        try {
            val chatIdLong = oldChatId.toLong()
            preferences.putLong("chat_id_long", chatIdLong)
            // 暫時保留舊欄位以便回復
            // preferences.remove("chat_id")
        } catch (e: NumberFormatException) {
            Log.e(TAG, "無法將 chat_id 轉換為 Long：$oldChatId")
        }
    }
}
```

### 場景 3：將資料重組到新的 MMKV 實例

```kotlin
// 版本 4：將設定分離到專用 MMKV 實例
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "遷移到版本 4：分離設定")
    
    // 建立新的設定 MMKV
    val settingsMMKV = MMKV.mmkvWithID("settings")
    
    // 遷移與設定相關的欄位
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
1. 檢查日誌中的錯誤訊息
2. 驗證遷移邏輯的正確性
3. 確保所有必需欄位都有預設值
4. 考慮使用 `backupData()` 恢復資料

### 問題：資料遺失

**解決方案**：
1. 檢查欄位是否被意外刪除
2. 檢視備份資料
3. 確保遷移邏輯正確處理所有舊版本

### 問題：版本號不符

**解決方案**：
1. 檢查 `CURRENT_DATA_VERSION` 是否正確更新
2. 確保實作了所有版本的遷移函數
3. 驗證遷移邏輯按順序執行

## 聯絡方式

如有問題或建議，請透過 GitHub Issues 提供回饋。

