# 数据结构版本管理系统 - 快速指南
3. 使用备份功能恢复数据
2. 确保迁移逻辑正确处理旧版本
1. 检查字段是否被意外删除
### 数据丢失？

3. 验证迁移函数是否正确实现
2. 验证版本号是否正确更新
1. 在 Logcat 中检查 "DataMigration" 标签
### 迁移失败？

## 故障排除

```
DataMigrationManager.backupData(context)
```kotlin

备份数据（在重大更改之前）：

## 数据备份

- `DATA_STRUCTURE_VERSION_CN.md` - 完整文档
更多迁移示例，请参考：

## 查看示例

- 记录每个版本的变更
- 彻底测试迁移过程
- 迁移逻辑必须处理所有可能的旧版本
- 每次修改数据结构时版本号必须递增
⚠️ **重要**：

## 重要注意事项

```
settingsMMKV.putString("setting_key", value)
val value = mainMMKV.getString("setting_key", "")

val settingsMMKV = MMKV.mmkvWithID("settings")
val mainMMKV = MMKV.defaultMMKV()
```kotlin

### 4. 迁移到新的 MMKV 实例

```
preferences.remove("deprecated_field")
```kotlin

### 3. 删除旧字段

```
}
    preferences.putLong("chat_id_long", newValue)
    val newValue = oldValue.toLong()
if (oldValue.isNotEmpty()) {
val oldValue = preferences.getString("chat_id", "")
```kotlin

### 2. 数据类型转换

```
}
    preferences.putBoolean("new_field", false)
if (!preferences.contains("new_field")) {
```kotlin

### 1. 添加新字段

## 常见迁移模式

```
}
    }
        preferences.putString("new_field", oldData.uppercase())
    if (oldData.isNotEmpty()) {
    val oldData = preferences.getString("old_field", "")
    // 数据格式转换
    
    }
        preferences.putBoolean("new_setting", false)
    if (!preferences.contains("new_setting")) {
    // 添加新字段
    
    Log.d(TAG, "迁移到版本 2")
private fun migrateToVersion2(context: Context, preferences: MMKV) {
```kotlin

### 步骤 3：实现迁移逻辑

```
}
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())  // 添加此行
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
when (nextVersion) {
```kotlin

在 `performMigration()` 中添加：

### 步骤 2：添加迁移分支

```
const val CURRENT_DATA_VERSION = 2  // 从 1 改为 2
```kotlin

编辑 `DataMigrationManager.kt`：

### 步骤 1：更新版本号

## 如何添加新版本（3 步骤）

5. ✅ 修改数据格式或结构
4. ✅ 将数据重组到不同的存储位置
3. ✅ 删除未使用的字段
2. ✅ 修改现有字段的数据类型（例如 String → Long）
1. ✅ 添加新的配置字段

在以下情况下应升级数据结构版本：

## 何时升级版本？

系统已自动集成到应用程序中，无需额外配置。每次应用启动时会自动检查和执行数据迁移。

## 快速开始

## 当前版本：1


