# 开发手册

**本文档适用于开发人员编译源代码。对于文档中不理解的内容或遇到错误，请务必使用 Google 搜索。**

## Telegram SMS 的 git 工作流程是如何构建的？

git 允许在工作流程中有大量的灵活性，因此明确定义这个社区的工作流程是很重要的，以便人们知道该期待什么。Telegram SMS 应用程序使用的 git 工作流程相对简单，基于 github.com、gitlab.com 等建立的非常常见的工作流程。以下是其含义的分解：

- 代码通过合并请求（MRs）提交以供包含
- master 分支不得与任何未经实际机器测试的分支合并
- 稳定版本分支的合并请求可以包含来自 master 的提交
- 提供给公众的编译包可以使用 github 管道进行编译

## 如何编译项目

### 前置要求

- **JDK 21**（Java 开发工具包 21 或更高版本）
- **Android SDK** 包含以下组件：
  - Android SDK Build-Tools
  - Android SDK Platform（API 36 或更高版本）
  - NDK 21.0.6113669
- **Git** 支持子模块

### 1. 下载最新的源代码

克隆仓库并包含子模块：

```bash
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

### 2. 配置编译环境

您可以参考 [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml) 中显示的编译脚本来编译此项目

#### 安装 NDK

如果您没有安装 NDK 21.0.6113669，可以使用以下命令安装：

```bash
echo "y" | ${ANDROID_HOME}/tools/bin/sdkmanager --install "ndk;21.0.6113669"
```

#### 设置签名密钥

对于正式版本构建，您需要设置密钥库文件：

1. 将您的密钥库文件放置在 `app/keys.jks`
2. 配置环境变量：

```bash
export KEYSTORE_PASS=<您的密钥库密码>
export ALIAS_NAME=<您的密钥别名>
export ALIAS_PASS=<您的别名密码>
export VERSION_CODE=1
export VERSION_NAME="Debug"
```

#### 复制语言包

该项目使用外部语言包文件，需要在编译前复制：

```bash
./gradlew app:copy_language_pack
```

此命令会将语言资源从 `app/language_pack/` 复制到 `app/src/main/res/`。

### 3. 运行编译

#### 构建调试版本：

```bash
./gradlew assembleDebug
```

输出的 APK 文件位于：`app/build/outputs/apk/debug/app-debug.apk`

#### 构建正式版本：

```bash
./gradlew assembleRelease
```

输出的 APK 文件位于：`app/build/outputs/apk/release/app-release.apk`

#### 完整的构建命令（CI 中使用）：

```bash
export KEYSTORE_PASS=<您的密码> && \
export ALIAS_NAME=<您的别名> && \
export ALIAS_PASS=<您的密码> && \
export VERSION_CODE=1 && \
export VERSION_NAME="1.0.0" && \
./gradlew app:copy_language_pack && \
./gradlew assembleRelease
```

### 构建配置

项目使用：
- **编译 SDK**：36
- **Java/Kotlin 目标**：JDK 21
- **Gradle**：8.13.2+
- **Kotlin**：2.2.21
- **NDK**：21.0.6113669
- **支持的 ABI**：armeabi-v7a、arm64-v8a

### 分支

- **master**：主开发分支
- **nightly**：夜间构建版本，带有修改的包名（`.nightly` 后缀）
