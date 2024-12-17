# 开发手册

**本文档适用于开发人员编译源代码。对于文档中不理解的内容或遇到错误，请务必使用 Google 搜索。**

## Telegram SMS 的 git 工作流程是如何构建的？

git 允许在工作流程中有大量的灵活性，因此明确定义这个社区的工作流程是很重要的，以便人们知道该期待什么。Telegram SMS 应用程序使用的 git 工作流程相对简单，基于 github.com、gitlab.com 等建立的非常常见的工作流程。以下是其含义的分解：

- 所有开发工作都在 `nightly` 分支进行
- 代码通过合并请求（MRs）提交以供包含
- master 分支不得与任何未经实际机器测试的分支合并
- 稳定版本分支的合并请求可以包含来自 master 的提交
- 提供给公众的编译包可以使用 github 管道进行编译

## 如何编译项目

#### 1. 下载最新的源代码
```
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

#### 2. 配置编译环境

您可以参考 [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml) 中显示的编译脚本来编译此项目

配置环境变量，注意修改 `ANDROID_HOME` 为您的 `Android SDK` 目录

```
export ANDROID_HOME=<Android SDK>
export KEYSTORE_PASSWORD=<Your password>
export ALIAS_PASSWORD=<Your password>
export ALIAS_NAME=<Your alias name>
export VERSION_CODE=1
export VERSION_NAME="Debug"
./gradlew app:copy_language_pack
```

#### 3. 运行编译
```
./gradlew assembleDebug
```

或者使用以下命令生成 `release` 版本

```
./gradlew assembleRelease
```