# 加密模組文檔
建議使用已知的加密結果進行解密測試，以確保跨平台相容性。

```
派生金鑰（十六進位）：透過雙重 SHA-256 雜湊計算

明文: "Hello, World!"
密碼: "test-password-123"
```

使用以下測試數據驗證跨平台實現相容性：

## 測試向量

---

4. **Base64 編碼**：Android 使用 `Base64.DEFAULT`；確保與其他平台的相容性
3. **認證加密**：SecretBox 提供完整性驗證；被篡改的數據將無法解密
2. **Nonce 唯一性**：每次加密自動生成隨機 nonce，確保安全性
1. **金鑰管理**：金鑰應安全儲存；避免在原始碼中硬編碼

## 安全注意事項

---

```
}
    return string(decrypted), nil
    
    }
        return "", errors.New("解密失敗")
    if !ok {
    decrypted, ok := secretbox.Open(nil, combined[NonceSize:], &nonce, &key)
    
    copy(nonce[:], combined[:NonceSize])
    var nonce [NonceSize]byte
    
    }
        return "", errors.New("無效的加密數據")
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
        throw new Error('解密失敗');
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
    # encrypted 已包含 nonce + 密文
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

## 跨平台實現參考

---

```
// key 是一個 32 位元組的 ByteArray
val key = Crypto.getKeyFromString("user-password-123")
```kotlin
**範例：**

```
2. SHA-256(firstHash + keyString) → key (32 位元組)
1. SHA-256(keyString) → firstHash
```
**派生方法：**

- 32 位元組的金鑰
**返回值：**

- `keyString` - 使用者密碼或金鑰字串
**參數：**

從密碼字串派生 32 位元組的金鑰。

### `getKeyFromString(keyString: String): ByteArray`

---

```
val decrypted = Crypto.decrypt(encryptedData, key)
val key = Crypto.getKeyFromString("my-secret-password")
```kotlin
**範例：**

- `IllegalArgumentException` - 如果數據無效或解密失敗（金鑰錯誤/數據被篡改）
**拋出異常：**

- 解密後的明文字串（UTF-8）
**返回值：**

- `key` - 32 位元組的金鑰（必須與加密金鑰匹配）
- `encryptedData` - Base64 編碼的加密數據
**參數：**

解密加密數據。

### `decrypt(encryptedData: String, key: ByteArray): String`

---

```
val encrypted = Crypto.encrypt("Hello, World!", key)
val key = Crypto.getKeyFromString("my-secret-password")
```kotlin
**範例：**

- Base64 編碼的加密數據（包含 nonce）
**返回值：**

- `key` - 32 位元組的加密金鑰
- `data` - 要加密的明文字串（UTF-8）
**參數：**

加密字串。

### `encrypt(data: String, key: ByteArray): String`

## API 參考

---

```
Base64 長度 ≈ ceil((24 + 明文長度 + 16) / 3) * 4
密文長度 = Nonce (24) + 明文長度 + MAC (16)
```

### 密文長度計算

最終輸出為 Base64 編碼的字串。

```
+------------------+------------------------+
|    (24 位元組)   |   (明文 + MAC)         |
|      Nonce       |       密文             |
+------------------+------------------------+
```

### 加密數據結構

## 數據格式

---

| 編碼 | Base64 (DEFAULT) | Android Base64 |
| MAC 長度 | 16 位元組（128 位元） | `SecretBox.MACBYTES` |
| Nonce 長度 | 24 位元組（192 位元） | `SecretBox.NONCEBYTES` |
| 金鑰長度 | 32 位元組（256 位元） | `SecretBox.KEYBYTES` |
| 演算法 | XSalsa20-Poly1305 | NaCl SecretBox |
|-----------|-------|-------------|
| 參數 | 值 | 說明 |

## 加密規範

---

| Rust | `sodiumoxide` 或 `crypto_secretbox` |
| Go | `golang.org/x/crypto/nacl/secretbox` |
| Node.js | `tweetnacl` 或 `libsodium-wrappers` |
| Python | `pynacl` |
| Java | `com.goterl:lazysodium-java:5.1.4` |
|----------|------------|
| 平台 | 依賴項 |

### 其他平台

```
}
    implementation 'net.java.dev.jna:jna:5.17.0@aar'
    implementation 'com.goterl:lazysodium-android:5.1.0@aar'
dependencies {
```groovy

### Gradle 依賴

## 依賴項

本模組使用 **NaCl SecretBox**（XSalsa20-Poly1305）實現對稱加密，提供認證加密（AEAD）。

## 概述


