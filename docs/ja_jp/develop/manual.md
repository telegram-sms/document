# 開発マニュアル

**このドキュメントは、開発者がソースコードをコンパイルするためのものです。ドキュメントの内容が理解できない場合やエラーが発生した場合は、必ずGoogle検索を使用してください。**

## Telegram SMS の git ワークフローはどのように構築されていますか？

git はワークフローに多くの柔軟性を提供するため、このコミュニティのワークフローを明確に定義することが重要です。Telegram SMS アプリケーションで使用される git ワークフローは比較的シンプルで、github.com、gitlab.com などで確立された非常に一般的なワークフローに基づいています。以下はその内容の分解です：

- コードはマージリクエスト（MRs）を通じて提出され、含まれます
- master ブランチは、実際のマシンでテストされていないブランチとマージしてはなりません
- 安定版ブランチのマージリクエストには、master からのコミットを含めることができます
- 公開されるコンパイルパッケージは、github パイプラインを使用してコンパイルできます

## プロジェクトをコンパイルする方法

### 前提条件

- **JDK 21**（Java Development Kit 21 以上）
- **Android SDK** 以下のコンポーネント：
  - Android SDK Build-Tools
  - Android SDK Platform（API 36 以上）
  - NDK 21.0.6113669
- **Git** サブモジュールのサポート付き

### 1. 最新のソースコードをダウンロードする

サブモジュール付きでリポジトリをクローンします：

```bash
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

### 2. コンパイル環境を設定する

[android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml) に表示されているコンパイルスクリプトを参考にして、このプロジェクトをコンパイルできます

#### NDK をインストールする

NDK 21.0.6113669 がインストールされていない場合は、以下のコマンドでインストールできます：

```bash
echo "y" | ${ANDROID_HOME}/tools/bin/sdkmanager --install "ndk;21.0.6113669"
```

#### 署名キーを設定する

リリースビルドには、キーストアファイルを設定する必要があります：

1. キーストアファイルを `app/keys.jks` に配置します
2. 環境変数を設定します：

```bash
export KEYSTORE_PASS=<キーストアのパスワード>
export ALIAS_NAME=<キーのエイリアス名>
export ALIAS_PASS=<エイリアスのパスワード>
export VERSION_CODE=1
export VERSION_NAME="Debug"
```

#### 言語パックをコピーする

プロジェクトは外部言語パックファイルを使用しており、コンパイル前にコピーする必要があります：

```bash
./gradlew app:copy_language_pack
```

このコマンドは、`app/language_pack/` から `app/src/main/res/` に言語リソースをコピーします。

### 3. コンパイルを実行する

#### デバッグビルドの場合：

```bash
./gradlew assembleDebug
```

出力 APK ファイルの場所：`app/build/outputs/apk/debug/app-debug.apk`

#### リリースビルドの場合：

```bash
./gradlew assembleRelease
```

出力 APK ファイルの場所：`app/build/outputs/apk/release/app-release.apk`

#### 完全なビルドコマンド（CI で使用）：

```bash
export KEYSTORE_PASS=<パスワード> && \
export ALIAS_NAME=<エイリアス> && \
export ALIAS_PASS=<パスワード> && \
export VERSION_CODE=1 && \
export VERSION_NAME="1.0.0" && \
./gradlew app:copy_language_pack && \
./gradlew assembleRelease
```

### ビルド設定

プロジェクトで使用されているもの：
- **コンパイル SDK**：36
- **Java/Kotlin ターゲット**：JDK 21
- **Gradle**：8.13.2+
- **Kotlin**：2.2.21
- **NDK**：21.0.6113669
- **サポートされる ABI**：armeabi-v7a、arm64-v8a

### ブランチ

- **master**：メイン開発ブランチ
- **nightly**：ナイトリービルド、パッケージ名に `.nightly` サフィックスが追加されます
