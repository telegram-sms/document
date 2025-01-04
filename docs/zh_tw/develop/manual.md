# 開發手冊

**本文檔適用於開發人員編譯源代碼。對於文檔中不理解的內容或遇到錯誤，請務必使用 Google 搜索。**

## Telegram SMS 的 git 工作流程是如何構建的？

git 允許在工作流程中有大量的靈活性，因此明確定義這個社區的工作流程是很重要的，以便人們知道該期待什麼。Telegram SMS 應用程序使用的 git 工作流程相對簡單，基於 github.com、gitlab.com 等建立的非常常見的工作流程。以下是其含義的分解：

- 代碼通過合併請求（MRs）提交以供包含
- master 分支不得與任何未經實際機器測試的分支合併
- 穩定版本分支的合併請求可以包含來自 master 的提交
- 提供給公眾的編譯包可以使用 github 管道進行編譯

## 如何編譯項目

#### 1. 下載最新的源代碼
```
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

#### 2. 配置編譯環境

您可以參考 [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml) 中顯示的編譯腳本來編譯此項目

配置環境變量，注意修改 `ANDROID_HOME` 為您的 `Android SDK` 目錄

```
export ANDROID_HOME=<Android SDK>
export KEYSTORE_PASSWORD=<Your password>
export ALIAS_PASSWORD=<Your password>
export ALIAS_NAME=<Your alias name>
export VERSION_CODE=1
export VERSION_NAME="Debug"
./gradlew app:copy_language_pack
```

#### 3. 運行編譯
```
./gradlew assembleDebug
```

或者使用以下命令生成 `release` 版本

```
./gradlew assembleRelease
```