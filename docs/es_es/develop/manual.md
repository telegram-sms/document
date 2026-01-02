# Manual de Desarrollo

**Este documento está destinado a los desarrolladores para compilar con el código fuente. Para el contenido que no se entienda en la documentación o si encuentra un error, asegúrese de usar Google Search.**

## ¿Cómo está estructurado el flujo de trabajo de git de Telegram SMS?

git permite mucha flexibilidad en el flujo de trabajo de cómo las personas trabajan juntas, por lo que es importante definir claramente el flujo de trabajo de esta comunidad para que las personas sepan qué esperar. El flujo de trabajo de git que utiliza la aplicación Telegram SMS es relativamente simple y se basa en el flujo de trabajo muy común establecido por github.com, gitlab.com y otros similares. Aquí hay un desglose de lo que eso significa:

- el código se envía para su inclusión a través de Solicitudes de Fusión (MRs)
- La rama master no debe fusionarse con ninguna rama que no haya sido probada en la máquina real
- Las Solicitudes de Fusión para una rama de lanzamiento estable pueden incluir commits de master
- El paquete de compilación proporcionado al público puede compilarse utilizando la canalización de github.

## Cómo compilar el proyecto

### Requisitos previos

- **JDK 21** (Java Development Kit 21 o superior)
- **Android SDK** con los siguientes componentes:
  - Android SDK Build-Tools
  - Android SDK Platform (API 36 o superior)
  - NDK 21.0.6113669
- **Git** con soporte para submódulos

### 1. Descargar el último código fuente

Clonar el repositorio con submódulos:

```bash
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

### 2. Configurar el entorno de compilación

Puede compilar este proyecto refiriéndose al script de compilación mostrado en [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml)

#### Instalar NDK

Si no tiene NDK 21.0.6113669 instalado, puede instalarlo usando:

```bash
echo "y" | ${ANDROID_HOME}/tools/bin/sdkmanager --install "ndk;21.0.6113669"
```

#### Configurar claves de firma

Para compilaciones de lanzamiento, necesita configurar un archivo keystore:

1. Coloque su archivo keystore en `app/keys.jks`
2. Configure las variables de entorno:

```bash
export KEYSTORE_PASS=<Su contraseña del keystore>
export ALIAS_NAME=<Su nombre de alias>
export ALIAS_PASS=<Su contraseña de alias>
export VERSION_CODE=1
export VERSION_NAME="Debug"
```

#### Copiar paquete de idioma

El proyecto usa archivos de paquete de idioma externos que deben copiarse antes de la compilación:

```bash
./gradlew app:copy_language_pack
```

Esto copia los recursos de idioma de `app/language_pack/` a `app/src/main/res/`.

### 3. Ejecutar compilación

#### Para compilación de depuración:

```bash
./gradlew assembleDebug
```

El APK de salida estará en: `app/build/outputs/apk/debug/app-debug.apk`

#### Para compilación de lanzamiento:

```bash
./gradlew assembleRelease
```

El APK de salida estará en: `app/build/outputs/apk/release/app-release.apk`

#### Comando de compilación completo (como se usa en CI):

```bash
export KEYSTORE_PASS=<Su contraseña> && \
export ALIAS_NAME=<Su alias> && \
export ALIAS_PASS=<Su contraseña> && \
export VERSION_CODE=1 && \
export VERSION_NAME="1.0.0" && \
./gradlew app:copy_language_pack && \
./gradlew assembleRelease
```

### Configuración de compilación

El proyecto utiliza:
- **SDK de compilación**: 36
- **Objetivo Java/Kotlin**: JDK 21
- **Gradle**: 8.13.2+
- **Kotlin**: 2.2.21
- **NDK**: 21.0.6113669
- **ABIs soportadas**: armeabi-v7a, arm64-v8a

### Ramas

- **master**: Rama de desarrollo principal
- **nightly**: Compilaciones nocturnas con nombre de paquete modificado (sufijo `.nightly`)
