# 數據結構版本管理系統 - 快速指南

## 當前版本：1

## 快速開始

系統已自動整合到應用程式中，無需額外配置。每次應用程式啟動時會自動檢查和執行數據遷移。

## 何時升級版本？

在以下情況下應升級數據結構版本：

1. ✅ 新增新的配置欄位
2. ✅ 修改現有欄位的數據類型（例如 String → Long）
3. ✅ 刪除未使用的欄位
4. ✅ 將數據重組到不同的儲存位置
5. ✅ 修改數據格式或結構

## 如何新增新版本（3 步驟）

### 步驟 1：更新版本號

編輯 `DataMigrationManager.kt`：

```kotlin
const val CURRENT_DATA_VERSION = 2  // 從 1 改為 2
```

### 步驟 2：新增遷移分支

在 `performMigration()` 中新增：

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())  // 新增此行
}
```

### 步驟 3：實現遷移邏輯

```kotlin
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "遷移到版本 2")
    
    // 新增新欄位
    if (!preferences.contains("new_setting")) {
        preferences.putBoolean("new_setting", false)
    }
    
    // 數據格式轉換
    val oldData = preferences.getString("old_field", "")
    if (oldData.isNotEmpty()) {
        preferences.putString("new_field", oldData.uppercase())
    }
}
```

## 常見遷移模式

### 1. 新增新欄位

```kotlin
if (!preferences.contains("new_field")) {
    preferences.putBoolean("new_field", false)
}
```

### 2. 數據類型轉換

```kotlin
val oldValue = preferences.getString("chat_id", "")
if (oldValue.isNotEmpty()) {
    val newValue = oldValue.toLong()
    preferences.putLong("chat_id_long", newValue)
}
```

### 3. 刪除舊欄位

```kotlin
preferences.remove("deprecated_field")
```

### 4. 遷移到新的 MMKV 實例

```kotlin
val mainMMKV = MMKV.defaultMMKV()
val settingsMMKV = MMKV.mmkvWithID("settings")

val value = mainMMKV.getString("setting_key", "")
settingsMMKV.putString("setting_key", value)
```

## 重要注意事項

⚠️ **重要**：
- 每次修改數據結構時版本號必須遞增
- 遷移邏輯必須處理所有可能的舊版本
- 徹底測試遷移過程
- 記錄每個版本的變更

## 查看範例

更多遷移範例，請參考：
- `DATA_STRUCTURE_VERSION_TW.md` - 完整文檔

## 數據備份

備份數據（在重大更改之前）：

```kotlin
DataMigrationManager.backupData(context)
```

## 故障排除

### 遷移失敗？
1. 在 Logcat 中檢查 "DataMigration" 標籤
2. 驗證版本號是否正確更新
3. 驗證遷移函式是否正確實現

### 數據遺失？
1. 檢查欄位是否被意外刪除
2. 確保遷移邏輯正確處理舊版本
3. 使用備份功能恢復數據

