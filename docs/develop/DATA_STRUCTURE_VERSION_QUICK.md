# 数据结构版本管理系统 - 快速指南
## 当前版本：1
## 快速开始
系统已自动集成到应用中，无需额外配置。每次应用启动时会自动检查并执行必要的数据迁移。
## 何时需要升级版本？
当你需要进行以下操作时，应该升级数据结构版本：
1. ✅ 添加新的配置字段
2. ✅ 修改现有字段的数据类型（如 String → Long）
3. ✅ 删除不再使用的字段
4. ✅ 重组数据到不同的存储位置
5. ✅ 修改数据格式或结构
## 如何添加新版本（3 步）
### 步骤 1：更新版本号
编辑 `DataMigrationManager.kt`：
```kotlin
const val CURRENT_DATA_VERSION = 2  // 从 1 改为 2
```
### 步骤 2：添加迁移案例
在 `performMigration()` 中添加：
```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())  // 新增这行
}
```
### 步骤 3：实现迁移逻辑
```kotlin
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "升级到版本 2")
    // 添加新字段
    if (!preferences.contains("new_setting")) {
        preferences.putBoolean("new_setting", false)
    }
    // 数据格式转换
    val oldData = preferences.getString("old_field", "")
    if (oldData.isNotEmpty()) {
        preferences.putString("new_field", oldData.uppercase())
    }
}
```
## 常用迁移模式
### 1. 添加新字段
```kotlin
if (!preferences.contains("new_field")) {
    preferences.putBoolean("new_field", false)
}
```
### 2. 数据类型转换
```kotlin
val oldValue = preferences.getString("chat_id", "")
if (oldValue.isNotEmpty()) {
    val newValue = oldValue.toLong()
    preferences.putLong("chat_id_long", newValue)
}
```
### 3. 删除旧字段
```kotlin
preferences.remove("deprecated_field")
```
### 4. 迁移到新的 MMKV 实例
```kotlin
val mainMMKV = MMKV.defaultMMKV()
val settingsMMKV = MMKV.mmkvWithID("settings")
val value = mainMMKV.getString("setting_key", "")
settingsMMKV.putString("setting_key", value)
```
## 注意事项
⚠️ **重要提示**：
- 每次修改数据结构必须递增版本号
- 迁移逻辑要能处理所有可能的旧版本
- 充分测试迁移过程
- 在文档中记录每个版本的变更
## 查看示例
更多迁移示例请参考：
- `MigrationExamples.kt` - 实用示例
- `DATA_STRUCTURE_VERSION.md` - 完整文档
## 数据备份
如需备份数据（用于重大变更前）：
```kotlin
DataMigrationManager.backupData(context)
```
## 问题排查
### 迁移失败？
1. 检查 Logcat 中的 "DataMigration" 标签
2. 确认版本号是否正确更新
3. 验证迁移函数是否正确实现
### 数据丢失？
1. 检查是否意外删除了字段
2. 确保迁移逻辑正确处理了旧版本
3. 使用备份功能恢复数据
