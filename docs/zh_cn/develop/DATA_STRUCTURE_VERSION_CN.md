# 数据结构版本管理系统

## 概述

此数据结构版本管理系统自动处理应用程序数据结构升级，确保用户更新应用程序时数据平滑迁移。

## 当前数据结构版本

**当前版本：1**

## 特性

1. **自动检测和升级**：应用启动时自动检测数据结构版本并执行必要的迁移
2. **版本跟踪**：记录当前数据结构版本，便于管理
3. **向后兼容**：支持从旧数据结构版本升级到新版本
4. **数据备份**：提供数据备份功能，确保安全迁移
5. **可扩展性**：易于添加新版本迁移逻辑

## 使用方法

### 初始化

系统在 `MainActivity.onCreate()` 中自动初始化：

```kotlin
MMKV.initialize(this)
preferences = MMKV.defaultMMKV()

// 数据结构迁移检查
DataMigrationManager.checkAndMigrate(this)
```

### 添加新的数据结构版本

当您需要修改数据结构（例如添加新字段、修改数据格式、删除旧字段）时，请遵循以下步骤：

#### 步骤 1：递增版本号

修改 `DataMigrationManager.kt` 中的 `CURRENT_DATA_VERSION`：

```kotlin
/**
 * 当前数据结构版本
 * 对数据结构进行破坏性更改时递增此值
 */
const val CURRENT_DATA_VERSION = 2  // 从 1 递增到 2
```

#### 步骤 2：实现迁移逻辑

在 `performMigration()` 方法的 `when` 语句中添加新版本的处理：

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())
    3 -> migrateToVersion3(context, MMKV.defaultMMKV())
    // 添加新版本
    4 -> migrateToVersion4(context, MMKV.defaultMMKV())
}
```

#### 步骤 3：编写迁移函数

实现具体的迁移逻辑：

```kotlin
/**
 * 迁移到版本 4
 * 示例：添加新的通知设置
 */
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "迁移到版本 4")
    
    // 添加具有默认值的新字段
    if (!preferences.contains("new_notification_setting")) {
        preferences.putBoolean("new_notification_setting", false)
    }
    
    // 转换旧数据格式
    val oldValue = preferences.getString("old_format_field", "")
    if (oldValue.isNotEmpty()) {
        val newValue = transformOldFormat(oldValue)
        preferences.putString("new_format_field", newValue)
        // 可选：删除旧字段
        preferences.remove("old_format_field")
    }
    
    // 迁移 MMKV 实例数据
    val oldMMKV = MMKV.mmkvWithID(MMKVConst.OLD_ID)
    val newMMKV = MMKV.mmkvWithID(MMKVConst.NEW_ID)
    // ... 数据迁移逻辑
}

private fun transformOldFormat(oldData: String): String {
    // 实现数据格式转换逻辑
    return oldData.uppercase()
}
```

## 数据结构版本历史

### 版本 1（当前基准版本）

**日期**：2026年1月2日

**描述**：为数据结构版本管理系统建立基准版本

**包含的数据字段**：

#### 主 MMKV（默认）：
- `bot_token` (String) - Telegram Bot Token
- `chat_id` (String) - Telegram Chat ID
- `message_thread_id` (String) - 主题 ID（用于群组）
- `trusted_phone_number` (String) - 受信任的电话号码
- `fallback_sms` (Boolean) - 回退到短信
- `chat_command` (Boolean) - 聊天命令开关
- `battery_monitoring_switch` (Boolean) - 电池监控开关
- `charger_status` (Boolean) - 充电器状态通知
- `verification_code` (Boolean) - 验证码识别
- `doh_switch` (Boolean) - DNS over HTTPS
- `initialized` (Boolean) - 初始化标志
- `privacy_dialog_agree` (Boolean) - 隐私政策同意
- `call_notify` (Boolean) - 来电通知
- `hide_phone_number` (Boolean) - 隐藏电话号码
- `version_code` (Int) - 应用版本代码
- `api_address` (String) - Telegram API 地址
- `data_structure_version` (Int) - 数据结构版本号

#### MMKV 实例：
- `MMKVConst.PROXY_ID` - 代理设置
- `MMKVConst.CHAT_ID` - 聊天数据
- `MMKVConst.CHAT_INFO_ID` - 聊天信息
- `MMKVConst.RESEND_ID` - 重发队列
- `MMKVConst.CARBON_COPY_ID` - 抄送服务配置
- `MMKVConst.UPDATE_ID` - 更新检查数据
- `MMKVConst.NOTIFY_ID` - 通知设置
- `MMKVConst.TEMPLATE_ID` - 消息模板
- `MMKVConst.LOG_ID` - 日志数据

### 版本 2（示例 - 未实现）

当您需要升级到版本 2 时，请在此处记录更改。

**更改详情**：
- 添加 XXX 字段
- 修改 XXX 数据格式
- 删除 XXX 废弃字段

## API 参考

### DataMigrationManager

#### 公共方法

##### `checkAndMigrate(context: Context)`
检查并执行必要的数据迁移。应在应用启动时调用。

##### `getCurrentVersion(): Int`
获取当前保存的数据结构版本。

##### `isMigrationNeeded(): Boolean`
检查是否需要迁移。

##### `backupData(context: Context): Boolean`
备份所有 MMKV 数据。建议在重大迁移之前调用。

##### `resetDataVersion()`
重置数据结构版本。**警告**：谨慎使用，可能导致数据不一致。

## 最佳实践

1. **递增版本号**：每次修改数据结构时，版本号应递增 1
2. **保持向后兼容性**：迁移逻辑应处理所有可能的旧版本数据
3. **详细文档**：每次版本更改都应在本文档中详细记录
4. **彻底测试**：发布前测试从所有旧版本到新版本的迁移
5. **数据备份**：在重大更改之前考虑备份数据
6. **日志记录**：迁移过程应记录详细信息以便故障排除

## 示例场景

### 场景 1：添加需要新字段的新功能

```kotlin
// 版本 2：添加消息加密功能
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "迁移到版本 2：添加加密支持")
    
    // 添加加密开关，默认关闭
    preferences.putBoolean("enable_encryption", false)
    
    // 添加加密密钥存储位置
    preferences.putString("encryption_key", "")
}
```

### 场景 2：修改数据格式

```kotlin
// 版本 3：将 chat_id 从 String 迁移到 Long
private fun migrateToVersion3(context: Context, preferences: MMKV) {
    Log.d(TAG, "迁移到版本 3：将 chat_id 转换为 Long")
    
    val oldChatId = preferences.getString("chat_id", "")
    if (oldChatId.isNotEmpty()) {
        try {
            val chatIdLong = oldChatId.toLong()
            preferences.putLong("chat_id_long", chatIdLong)
            // 暂时保留旧字段以便回滚
            // preferences.remove("chat_id")
        } catch (e: NumberFormatException) {
            Log.e(TAG, "无法将 chat_id 转换为 Long：$oldChatId")
        }
    }
}
```

### 场景 3：将数据重组到新的 MMKV 实例

```kotlin
// 版本 4：将设置分离到专用 MMKV 实例
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "迁移到版本 4：分离设置")
    
    // 创建新的设置 MMKV
    val settingsMMKV = MMKV.mmkvWithID("settings")
    
    // 迁移与设置相关的字段
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
        // 可选：从主 MMKV 中删除
        // preferences.remove(field)
    }
}
```

## 故障排除

### 问题：迁移失败

**解决方案**：
1. 检查日志中的错误消息
2. 验证迁移逻辑的正确性
3. 确保所有必需字段都有默认值
4. 考虑使用 `backupData()` 恢复数据

### 问题：数据丢失

**解决方案**：
1. 检查字段是否被意外删除
2. 查看备份数据
3. 确保迁移逻辑正确处理所有旧版本

### 问题：版本号不匹配

**解决方案**：
1. 检查 `CURRENT_DATA_VERSION` 是否正确更新
2. 确保实现了所有版本的迁移函数
3. 验证迁移逻辑按顺序执行

## 联系方式

如有问题或建议，请通过 GitHub Issues 提供反馈。

