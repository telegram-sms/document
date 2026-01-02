# 開發手冊

**本文檔適用於開發人員編譯源代碼。對於文檔中不理解的內容或遇到錯誤，請務必使用 Google 搜索。**

## Telegram SMS 的 git 工作流程是如何構建的？

git 允許在工作流程中有大量的靈活性，因此明確定義這個社區的工作流程是很重要的，以便人們知道該期待什麼。Telegram SMS 應用程序使用的 git 工作流程相對簡單，基於 github.com、gitlab.com 等建立的非常常見的工作流程。以下是其含義的分解：

- 代碼通過合併請求（MRs）提交以供包含
- master 分支不得與任何未經實際機器測試的分支合併
- 穩定版本分支的合併請求可以包含來自 master 的提交
- 提供給公眾的編譯包可以使用 github 管道進行編譯

## 如何編譯項目

### 前置要求

- **JDK 21**（Java 開發工具包 21 或更高版本）
- **Android SDK** 包含以下組件：
  - Android SDK Build-Tools
  - Android SDK Platform（API 36 或更高版本）
  - NDK 21.0.6113669
- **Git** 支援子模組

### 1. 下載最新的源代碼

克隆倉庫並包含子模組：

```bash
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

### 2. 配置編譯環境

您可以參考 [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml) 中顯示的編譯腳本來編譯此項目

#### 安裝 NDK

如果您沒有安裝 NDK 21.0.6113669，可以使用以下命令安裝：

```bash
echo "y" | ${ANDROID_HOME}/tools/bin/sdkmanager --install "ndk;21.0.6113669"
```

#### 設定簽名金鑰

對於正式版本構建，您需要設定金鑰庫檔案：

1. 將您的金鑰庫檔案放置在 `app/keys.jks`
2. 配置環境變數：

```bash
export KEYSTORE_PASS=<您的金鑰庫密碼>
export ALIAS_NAME=<您的金鑰別名>
export ALIAS_PASS=<您的別名密碼>
export VERSION_CODE=1
export VERSION_NAME="Debug"
```

#### 複製語言包

該項目使用外部語言包檔案，需要在編譯前複製：

```bash
./gradlew app:copy_language_pack
```

此命令會將語言資源從 `app/language_pack/` 複製到 `app/src/main/res/`。

### 3. 運行編譯

#### 構建偵錯版本：

```bash
./gradlew assembleDebug
```

輸出的 APK 檔案位於：`app/build/outputs/apk/debug/app-debug.apk`

#### 構建正式版本：

```bash
./gradlew assembleRelease
```

輸出的 APK 檔案位於：`app/build/outputs/apk/release/app-release.apk`

#### 完整的構建命令（CI 中使用）：

```bash
export KEYSTORE_PASS=<您的密碼> && \
export ALIAS_NAME=<您的別名> && \
export ALIAS_PASS=<您的密碼> && \
export VERSION_CODE=1 && \
export VERSION_NAME="1.0.0" && \
./gradlew app:copy_language_pack && \
./gradlew assembleRelease
```

### 構建配置

項目使用：
- **編譯 SDK**：36
- **Java/Kotlin 目標**：JDK 21
- **Gradle**：8.13.2+
- **Kotlin**：2.2.21
- **NDK**：21.0.6113669
- **支援的 ABI**：armeabi-v7a、arm64-v8a

### 分支

- **master**：主開發分支
- **nightly**：夜間構建版本，帶有修改的套件名稱（`.nightly` 後綴）
