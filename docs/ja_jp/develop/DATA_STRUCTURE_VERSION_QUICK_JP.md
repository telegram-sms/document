# データ構造バージョン管理システム - クイックガイド

## 現在のバージョン: 1

## クイックスタート

システムはアプリケーションに自動的に統合されており、追加の設定は不要です。データ移行のチェックと実行は、アプリ起動時に自動的に行われます。

## バージョンをアップグレードするタイミングは？

次の場合にデータ構造バージョンをアップグレードする必要があります:

1. ✅ 新しい設定フィールドを追加
2. ✅ 既存のフィールドのデータ型を変更（例: String → Long）
3. ✅ 未使用のフィールドを削除
4. ✅ データを異なる保存場所に再編成
5. ✅ データフォーマットまたは構造を変更

## 新しいバージョンを追加する方法（3ステップ）

### ステップ 1: バージョン番号を更新

`DataMigrationManager.kt` を編集:

```kotlin
const val CURRENT_DATA_VERSION = 2  // 1 から 2 に変更
```

### ステップ 2: 移行ケースを追加

`performMigration()` に追加:

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())  // この行を追加
}
```

### ステップ 3: 移行ロジックを実装

```kotlin
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "バージョン 2 への移行")
    
    // 新しいフィールドを追加
    if (!preferences.contains("new_setting")) {
        preferences.putBoolean("new_setting", false)
    }
    
    // データフォーマット変換
    val oldData = preferences.getString("old_field", "")
    if (oldData.isNotEmpty()) {
        preferences.putString("new_field", oldData.uppercase())
    }
}
```

## 一般的な移行パターン

### 1. 新しいフィールドを追加

```kotlin
if (!preferences.contains("new_field")) {
    preferences.putBoolean("new_field", false)
}
```

### 2. データ型変換

```kotlin
val oldValue = preferences.getString("chat_id", "")
if (oldValue.isNotEmpty()) {
    val newValue = oldValue.toLong()
    preferences.putLong("chat_id_long", newValue)
}
```

### 3. 古いフィールドを削除

```kotlin
preferences.remove("deprecated_field")
```

### 4. 新しい MMKV インスタンスへの移行

```kotlin
val mainMMKV = MMKV.defaultMMKV()
val settingsMMKV = MMKV.mmkvWithID("settings")

val value = mainMMKV.getString("setting_key", "")
settingsMMKV.putString("setting_key", value)
```

## 重要な注意事項

⚠️ **重要**:
- データ構造を変更するたびにバージョン番号を増やす必要があります
- 移行ロジックは、すべての可能性のある古いバージョンを処理する必要があります
- 移行プロセスを徹底的にテストしてください
- 各バージョンの変更を文書化してください

## サンプルを表示

より多くの移行例については、以下を参照してください:
- `MigrationExamples.kt` - 実用的な例
- `DATA_STRUCTURE_VERSION_JP.md` - 完全なドキュメント

## データバックアップ

データをバックアップする（大きな変更の前）:

```kotlin
DataMigrationManager.backupData(context)
```

## トラブルシューティング

### 移行が失敗しましたか？
1. Logcat で「DataMigration」タグを確認
2. バージョン番号が正しく更新されているか確認
3. 移行関数が正しく実装されているか確認

### データが失われましたか？
1. フィールドが誤って削除されていないか確認
2. 移行ロジックが古いバージョンを正しく処理しているか確認
3. バックアップ機能を使用してデータを復元

