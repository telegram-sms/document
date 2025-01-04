# 開発マニュアル

**このドキュメントは、開発者がソースコードをコンパイルするためのものです。ドキュメントの内容が理解できない場合やエラーが発生した場合は、必ずGoogle検索を使用してください。**

## Telegram SMS の git ワークフローはどのように構築されていますか？

git はワークフローに多くの柔軟性を提供するため、このコミュニティのワークフローを明確に定義することが重要です。Telegram SMS アプリケーションで使用される git ワークフローは比較的シンプルで、github.com、gitlab.com などで確立された非常に一般的なワークフローに基づいています。以下はその内容の分解です：

- コードはマージリクエスト（MRs）を通じて提出され、含まれます
- master ブランチは、実際のマシンでテストされていないブランチとマージしてはなりません
- 安定版ブランチのマージリクエストには、master からのコミットを含めることができます
- 公開されるコンパイルパッケージは、github パイプラインを使用してコンパイルできます

## プロジェクトをコンパイルする方法

#### 1. 最新のソースコードをダウンロードする
```
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

#### 2. コンパイル環境を設定する

[android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml) に表示されているコンパイルスクリプトを参考にして、このプロジェクトをコンパイルできます

環境変数を設定し、`ANDROID_HOME` をあなたの `Android SDK` ディレクトリに変更してください

```
export ANDROID_HOME=<Android SDK>
export KEYSTORE_PASSWORD=<Your password>
export ALIAS_PASSWORD=<Your password>
export ALIAS_NAME=<Your alias name>
export VERSION_CODE=1
export VERSION_NAME="Debug"
./gradlew app:copy_language_pack
```

#### 3. コンパイルを実行する
```
./gradlew assembleDebug
```

または、以下のコマンドを使用して `release` バージョンを生成します

```
./gradlew assembleRelease
```