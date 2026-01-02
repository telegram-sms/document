# Документация модуля шифрования
Рекомендуется использовать известный зашифрованный результат для тестирования расшифровки, чтобы обеспечить кроссплатформенную совместимость.

```
Производный ключ (hex): Рассчитывается через двойной хеш SHA-256

Открытый текст: "Hello, World!"
Пароль: "test-password-123"
```

Используйте следующие тестовые данные для проверки совместимости кроссплатформенной реализации:

## Тестовые векторы

---

4. **Кодирование Base64**: Android использует `Base64.DEFAULT`; убедитесь в совместимости с другими платформами
3. **Аутентифицированное шифрование**: SecretBox обеспечивает проверку целостности; поврежденные данные не будут расшифрованы
2. **Уникальность Nonce**: Для каждого шифрования автоматически генерируется случайный nonce, обеспечивая безопасность
1. **Управление ключами**: Ключи должны храниться безопасно; избегайте жесткого кодирования в исходном коде

## Соображения безопасности

---

```
}
    return string(decrypted), nil
    
    }
        return "", errors.New("расшифровка не удалась")
    if !ok {
    decrypted, ok := secretbox.Open(nil, combined[NonceSize:], &nonce, &key)
    
    copy(nonce[:], combined[:NonceSize])
    var nonce [NonceSize]byte
    
    }
        return "", errors.New("недействительные зашифрованные данные")
    if len(combined) < NonceSize {
    
    }
        return "", err
    if err != nil {
    combined, err := base64.StdEncoding.DecodeString(encryptedData)
func Decrypt(encryptedData string, key [KeySize]byte) (string, error) {

}
    return base64.StdEncoding.EncodeToString(encrypted), nil
    encrypted := secretbox.Seal(nonce[:], []byte(data), &nonce, &key)
    
    }
        return "", err
    if _, err := rand.Read(nonce[:]); err != nil {
    var nonce [NonceSize]byte
func Encrypt(data string, key [KeySize]byte) (string, error) {

}
    return key
    key := sha256.Sum256(combined)
    combined := append(firstHash[:], []byte(keyString)...)
    firstHash := sha256.Sum256([]byte(keyString))
func GetKeyFromString(keyString string) [KeySize]byte {

)
    NonceSize = 24
    KeySize   = 32
const (

)
    "golang.org/x/crypto/nacl/secretbox"
    
    "errors"
    "encoding/base64"
    "crypto/sha256"
    "crypto/rand"
import (

package crypto
```go

### Go

```
}
    return new TextDecoder().decode(decrypted);
    
    }
        throw new Error('Расшифровка не удалась');
    if (!decrypted) {
    const decrypted = nacl.secretbox.open(ciphertext, nonce, key);
    
    const ciphertext = combined.slice(nacl.secretbox.nonceLength);
    const nonce = combined.slice(0, nacl.secretbox.nonceLength);
    const combined = Buffer.from(encryptedData, 'base64');
function decrypt(encryptedData, key) {

}
    return Buffer.from(result).toString('base64');
    
    result.set(ciphertext, nonce.length);
    result.set(nonce);
    const result = new Uint8Array(nonce.length + ciphertext.length);
    
    const ciphertext = nacl.secretbox(messageUint8, nonce, key);
    const messageUint8 = new TextEncoder().encode(data);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
function encrypt(data, key) {

}
    return key.slice(0, 32);
    const key = createHash('sha256').update(Buffer.concat([firstHash, Buffer.from(keyString, 'utf8')])).digest();
    const firstHash = createHash('sha256').update(keyString, 'utf8').digest();
function getKeyFromString(keyString) {

const { createHash } = require('crypto');
const nacl = require('tweetnacl');
```javascript

### Node.js (tweetnacl)

```
    return decrypted.decode('utf-8')
    decrypted = box.decrypt(encrypted)
    encrypted = base64.b64decode(encrypted_data)
    box = nacl.secret.SecretBox(key)
def decrypt(encrypted_data: str, key: bytes) -> str:

    return base64.b64encode(encrypted).decode('utf-8')
    # encrypted уже содержит nonce + шифротекст
    encrypted = box.encrypt(data.encode('utf-8'), nonce)
    nonce = nacl.utils.random(nacl.secret.SecretBox.NONCE_SIZE)
    box = nacl.secret.SecretBox(key)
def encrypt(data: str, key: bytes) -> str:

    return key[:32]
    key = hashlib.sha256(first_hash + key_string.encode('utf-8')).digest()
    first_hash = hashlib.sha256(key_string.encode('utf-8')).digest()
def get_key_from_string(key_string: str) -> bytes:

import base64
import hashlib
import nacl.utils
import nacl.secret
```python

### Python (PyNaCl)

## Справочник кроссплатформенной реализации

---

```
// key - это 32-байтовый ByteArray
val key = Crypto.getKeyFromString("user-password-123")
```kotlin
**Пример:**

```
2. SHA-256(firstHash + keyString) → key (32 байта)
1. SHA-256(keyString) → firstHash
```
**Метод получения:**

- 32-байтовый ключ
**Возвращает:**

- `keyString` - Пароль пользователя или строка ключа
**Параметры:**

Получает 32-байтовый ключ из строки пароля.

### `getKeyFromString(keyString: String): ByteArray`

---

```
val decrypted = Crypto.decrypt(encryptedData, key)
val key = Crypto.getKeyFromString("my-secret-password")
```kotlin
**Пример:**

- `IllegalArgumentException` - Если данные недействительны или расшифровка не удалась (неправильный ключ/поврежденные данные)
**Выбрасывает:**

- Расшифрованная строка открытого текста (UTF-8)
**Возвращает:**

- `key` - 32-байтовый ключ (должен совпадать с ключом шифрования)
- `encryptedData` - Зашифрованные данные в кодировке Base64
**Параметры:**

Расшифровывает зашифрованные данные.

### `decrypt(encryptedData: String, key: ByteArray): String`

---

```
val encrypted = Crypto.encrypt("Hello, World!", key)
val key = Crypto.getKeyFromString("my-secret-password")
```kotlin
**Пример:**

- Зашифрованные данные в кодировке Base64 (включает nonce)
**Возвращает:**

- `key` - 32-байтовый ключ шифрования
- `data` - Открытый текст для шифрования (UTF-8)
**Параметры:**

Шифрует строку.

### `encrypt(data: String, key: ByteArray): String`

## Справка по API

---

```
Длина Base64 ≈ ceil((24 + Длина открытого текста + 16) / 3) * 4
Длина шифротекста = Nonce (24) + Длина открытого текста + MAC (16)
```

### Расчет длины шифротекста

Конечный вывод представляет собой строку в кодировке Base64.

```
+------------------+------------------------+
|    (24 байта)    |   (открытый текст + MAC)|
|      Nonce       |      Шифротекст        |
+------------------+------------------------+
```

### Структура зашифрованных данных

## Формат данных

---

| Кодирование | Base64 (DEFAULT) | Android Base64 |
| Длина MAC | 16 байт (128 бит) | `SecretBox.MACBYTES` |
| Длина Nonce | 24 байта (192 бита) | `SecretBox.NONCEBYTES` |
| Длина ключа | 32 байта (256 бит) | `SecretBox.KEYBYTES` |
| Алгоритм | XSalsa20-Poly1305 | NaCl SecretBox |
|-----------|-------|-------------|
| Параметр | Значение | Описание |

## Спецификация шифрования

---

| Rust | `sodiumoxide` или `crypto_secretbox` |
| Go | `golang.org/x/crypto/nacl/secretbox` |
| Node.js | `tweetnacl` или `libsodium-wrappers` |
| Python | `pynacl` |
| Java | `com.goterl:lazysodium-java:5.1.4` |
|----------|------------|
| Платформа | Зависимость |

### Другие платформы

```
}
    implementation 'net.java.dev.jna:jna:5.17.0@aar'
    implementation 'com.goterl:lazysodium-android:5.1.0@aar'
dependencies {
```groovy

### Зависимости Gradle

## Зависимости

Этот модуль реализует симметричное шифрование с использованием **NaCl SecretBox** (XSalsa20-Poly1305), обеспечивающее аутентифицированное шифрование (AEAD).

## Обзор


