# データ構造バージョン管理システム

## 概要

このデータ構造バージョン管理システムは、アプリケーションのデータ構造のアップグレードを自動的に処理し、ユーザーがアプリケーションを更新したときにスムーズなデータ移行を保証します。

## 現在のデータ構造バージョン

**現在のバージョン: 1**

## 機能

1. **自動検出とアップグレード**: アプリ起動時にデータ構造のバージョンを自動的に検出し、必要な移行を実行
2. **バージョン追跡**: 現在のデータ構造バージョンを記録し、管理を容易にします
3. **下位互換性**: 古いデータ構造バージョンから新しいバージョンへのアップグレードをサポート
4. **データバックアップ**: データバックアップ機能を提供し、安全な移行を保証
5. **拡張性**: 新しいバージョンの移行ロジックを簡単に追加できます

## 使用方法

### 初期化

システムは `MainActivity.onCreate()` で自動的に初期化されます:

```kotlin
MMKV.initialize(this)
preferences = MMKV.defaultMMKV()

// データ構造移行チェック
DataMigrationManager.checkAndMigrate(this)
```

### 新しいデータ構造バージョンの追加

データ構造を変更する必要がある場合（新しいフィールドの追加、データフォーマットの変更、古いフィールドの削除など）、次の手順に従ってください:

#### ステップ 1: バージョン番号を増やす

`DataMigrationManager.kt` の `CURRENT_DATA_VERSION` を変更します:

```kotlin
/**
 * 現在のデータ構造バージョン
 * データ構造に破壊的な変更を加えるときにこの値を増やします
 */
const val CURRENT_DATA_VERSION = 2  // 1 から 2 に増やす
```

#### ステップ 2: 移行ロジックの実装

`performMigration()` メソッドの `when` 文に新しいバージョンの処理を追加します:

```kotlin
when (nextVersion) {
    1 -> migrateToVersion1(context, MMKV.defaultMMKV())
    2 -> migrateToVersion2(context, MMKV.defaultMMKV())
    3 -> migrateToVersion3(context, MMKV.defaultMMKV())
    // 新しいバージョンを追加
    4 -> migrateToVersion4(context, MMKV.defaultMMKV())
}
```

#### ステップ 3: 移行関数の作成

具体的な移行ロジックを実装します:

```kotlin
/**
 * バージョン 4 への移行
 * 例: 新しい通知設定の追加
 */
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "バージョン 4 への移行")
    
    // デフォルト値で新しいフィールドを追加
    if (!preferences.contains("new_notification_setting")) {
        preferences.putBoolean("new_notification_setting", false)
    }
    
    // 古いデータフォーマットの変換
    val oldValue = preferences.getString("old_format_field", "")
    if (oldValue.isNotEmpty()) {
        val newValue = transformOldFormat(oldValue)
        preferences.putString("new_format_field", newValue)
        // オプション: 古いフィールドを削除
        preferences.remove("old_format_field")
    }
    
    // MMKV インスタンスデータの移行
    val oldMMKV = MMKV.mmkvWithID(MMKVConst.OLD_ID)
    val newMMKV = MMKV.mmkvWithID(MMKVConst.NEW_ID)
    // ... データ移行ロジック
}

private fun transformOldFormat(oldData: String): String {
    // データフォーマット変換ロジックを実装
    return oldData.uppercase()
}
```

## データ構造バージョン履歴

### バージョン 1（現在のベースラインバージョン）

**日付**: 2026年1月2日

**説明**: データ構造バージョン管理システムのベースラインバージョンを確立

**含まれるデータフィールド**:

#### メイン MMKV（デフォルト）:
- `bot_token` (String) - Telegram Bot Token
- `chat_id` (String) - Telegram Chat ID
- `message_thread_id` (String) - トピック ID（グループ用）
- `trusted_phone_number` (String) - 信頼できる電話番号
- `fallback_sms` (Boolean) - SMS へのフォールバック
- `chat_command` (Boolean) - チャットコマンドスイッチ
- `battery_monitoring_switch` (Boolean) - バッテリー監視スイッチ
- `charger_status` (Boolean) - 充電器ステータス通知
- `verification_code` (Boolean) - 確認コード認識
- `doh_switch` (Boolean) - DNS over HTTPS
- `initialized` (Boolean) - 初期化フラグ
- `privacy_dialog_agree` (Boolean) - プライバシーポリシーの同意
- `call_notify` (Boolean) - 着信通知
- `hide_phone_number` (Boolean) - 電話番号を非表示
- `version_code` (Int) - アプリバージョンコード
- `api_address` (String) - Telegram API アドレス
- `data_structure_version` (Int) - データ構造バージョン番号

#### MMKV インスタンス:
- `MMKVConst.PROXY_ID` - プロキシ設定
- `MMKVConst.CHAT_ID` - チャットデータ
- `MMKVConst.CHAT_INFO_ID` - チャット情報
- `MMKVConst.RESEND_ID` - 再送信キュー
- `MMKVConst.CARBON_COPY_ID` - カーボンコピーサービス設定
- `MMKVConst.UPDATE_ID` - アップデートチェックデータ
- `MMKVConst.NOTIFY_ID` - 通知設定
- `MMKVConst.TEMPLATE_ID` - メッセージテンプレート
- `MMKVConst.LOG_ID` - ログデータ

### バージョン 2（例 - 未実装）

バージョン 2 にアップグレードする必要がある場合は、ここに変更を記録してください。

**変更の詳細**:
- XXX フィールドの追加
- XXX データフォーマットの変更
- XXX 非推奨フィールドの削除

## API リファレンス

### DataMigrationManager

#### 公開メソッド

##### `checkAndMigrate(context: Context)`
必要なデータ移行をチェックして実行します。アプリ起動時に呼び出す必要があります。

##### `getCurrentVersion(): Int`
現在保存されているデータ構造バージョンを取得します。

##### `isMigrationNeeded(): Boolean`
移行が必要かどうかをチェックします。

##### `backupData(context: Context): Boolean`
すべての MMKV データをバックアップします。大規模な移行の前に呼び出すことをお勧めします。

##### `resetDataVersion()`
データ構造バージョンをリセットします。**警告**: 慎重に使用してください。データの不整合を引き起こす可能性があります。

## ベストプラクティス

1. **増分バージョン番号**: データ構造を変更するたびに、バージョン番号を 1 ずつ増やす必要があります
2. **下位互換性の維持**: 移行ロジックは、すべての可能性のある古いバージョンのデータを処理する必要があります
3. **詳細なドキュメント**: 各バージョンの変更は、このドキュメントに詳細に記録する必要があります
4. **徹底的なテスト**: リリース前に、すべての古いバージョンから新しいバージョンへの移行をテストします
5. **データバックアップ**: 大きな変更の前にデータをバックアップすることを検討してください
6. **ロギング**: 移行プロセスは、トラブルシューティングのために詳細な情報をログに記録する必要があります

## サンプルシナリオ

### シナリオ 1: 新しいフィールドが必要な新機能の追加

```kotlin
// バージョン 2: メッセージ暗号化機能の追加
private fun migrateToVersion2(context: Context, preferences: MMKV) {
    Log.d(TAG, "バージョン 2 への移行: 暗号化サポートの追加")
    
    // 暗号化スイッチを追加、デフォルトはオフ
    preferences.putBoolean("enable_encryption", false)
    
    // 暗号化キーの保存場所を追加
    preferences.putString("encryption_key", "")
}
```

### シナリオ 2: データフォーマットの変更

```kotlin
// バージョン 3: chat_id を String から Long に移行
private fun migrateToVersion3(context: Context, preferences: MMKV) {
    Log.d(TAG, "バージョン 3 への移行: chat_id を Long に変換")
    
    val oldChatId = preferences.getString("chat_id", "")
    if (oldChatId.isNotEmpty()) {
        try {
            val chatIdLong = oldChatId.toLong()
            preferences.putLong("chat_id_long", chatIdLong)
            // ロールバックを許可するために古いフィールドを一時的に保持
            // preferences.remove("chat_id")
        } catch (e: NumberFormatException) {
            Log.e(TAG, "chat_id を Long に変換できませんでした: $oldChatId")
        }
    }
}
```

### シナリオ 3: 新しい MMKV インスタンスへのデータの再編成

```kotlin
// バージョン 4: 設定を専用の MMKV インスタンスに分離
private fun migrateToVersion4(context: Context, preferences: MMKV) {
    Log.d(TAG, "バージョン 4 への移行: 設定の分離")
    
    // 新しい設定 MMKV を作成
    val settingsMMKV = MMKV.mmkvWithID("settings")
    
    // 設定関連のフィールドを移行
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
        // オプション: メイン MMKV から削除
        // preferences.remove(field)
    }
}
```

## トラブルシューティング

### 問題: 移行が失敗しました

**解決策**:
1. ログのエラーメッセージを確認
2. 移行ロジックの正確性を検証
3. すべての必須フィールドにデフォルト値があることを確認
4. `backupData()` を使用してデータを復元することを検討

### 問題: データの損失

**解決策**:
1. フィールドが誤って削除されていないか確認
2. バックアップデータを確認
3. 移行ロジックがすべての古いバージョンを正しく処理していることを確認

### 問題: バージョン番号の不一致

**解決策**:
1. `CURRENT_DATA_VERSION` が正しく更新されているか確認
2. すべてのバージョンの移行関数が実装されていることを確認
3. 移行ロジックが順番に実行されることを検証

## お問い合わせ

問題や提案については、GitHub Issues を通じてフィードバックを提供してください。

