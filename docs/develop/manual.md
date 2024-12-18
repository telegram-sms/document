# Development Manual

**This document is intended for developers to compile with source code. For content that is not understood in the documentation or if you encounter an error, be sure to use Google Search.**

## How is the Telegram SMS git workflow structured?

git allows tons of flexibility in the workflow of how people work together, so it is important to clearly define the workflow of this community so that people know what to expect. The git workflow the Telegram SMS app uses is relatively simple and based on the very common workflow established by github.com, gitlab.com and others like it. Here’s a break down of what that means:

- all development work happens in the `nightly` branch
- code is submitted for inclusion via Merge Requests (MRs)
- The master branch must not be merged with any branch that has not been tested on the actual machine
- Merge Requests for a stable release branch can include commits from master
- The compilation package provided to the public can be compiled using the github pipeline.

## How to compile the project

#### 1. download the latest source code

```
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

#### 2. configure the compilation environment

You can compile this project by referring to the compiled script shown in [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml)

Configure environment variables, be careful to modify `ANDROID_HOME` for your `Android SDK` directory

```
export ANDROID_HOME=<Android SDK>
export KEYSTORE_PASSWORD=<Your password>
export ALIAS_PASSWORD=<Your password>
export ALIAS_NAME=<Your alias name>
export VERSION_CODE=1
export VERSION_NAME="Debug"
./gradlew app:copy_language_pack
```

#### 3. run compile

```
./gradlew assembleDebug
```

Or use the following command to generate the `release` version

```
./gradlew assembleRelease
```