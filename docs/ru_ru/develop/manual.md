# Manual de Desarrollo

**Este documento está destinado a los desarrolladores para compilar con el código fuente. Para el contenido que no se entienda en la documentación o si encuentra un error, asegúrese de usar Google Search.**

## ¿Cómo está estructurado el flujo de trabajo de git de Telegram SMS?

git permite mucha flexibilidad en el flujo de trabajo de cómo las personas trabajan juntas, por lo que es importante definir claramente el flujo de trabajo de esta comunidad para que las personas sepan qué esperar. El flujo de trabajo de git que utiliza la aplicación Telegram SMS es relativamente simple y se basa en el flujo de trabajo muy común establecido por github.com, gitlab.com y otros similares. Aquí hay un desglose de lo que eso significa:

- el código se envía para su inclusión a través de Solicitudes de Fusión (MRs)
- La rama master no debe fusionarse con ninguna rama que no haya sido probada en la máquina real
- Las Solicitudes de Fusión para una rama de lanzamiento estable pueden incluir commits de master
- El paquete de compilación proporcionado al público puede compilarse utilizando la canalización de github.

## Cómo compilar el proyecto

#### 1. descargar el último código fuente

```
git clone https://github.com/telegram-sms/telegram-sms.git telegram-sms
cd telegram-sms
git submodule update --init --recursive
```

#### 2. configurar el entorno de compilación

Puede compilar este proyecto refiriéndose al script de compilación mostrado en [android.yml](https://github.com/telegram-sms/telegram-sms/blob/master/.github/workflows/android.yml)

Configure las variables de entorno, tenga cuidado de modificar `ANDROID_HOME` para su directorio `Android SDK`

```
export ANDROID_HOME=<Android SDK>
export KEYSTORE_PASSWORD=<Su contraseña>
export ALIAS_PASSWORD=<Su contraseña>
export ALIAS_NAME=<Su nombre de alias>
export VERSION_CODE=1
export VERSION_NAME="Debug"
./gradlew app:copy_language_pack
```

#### 3. ejecutar la compilación

```
./gradlew assembleDebug
```

O use el siguiente comando para generar la versión `release`

```
./gradlew assembleRelease
```