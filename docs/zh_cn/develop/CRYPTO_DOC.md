# 加密模块文档

## 概述

本模块使用 **NaCl SecretBox**（XSalsa20-Poly1305）实现对称加密，提供认证加密（AEAD）。

## 依赖项

### Gradle 依赖

```groovy
dependencies {
    implementation 'com.goterl:lazysodium-android:5.1.0@aar'
    implementation 'net.java.dev.jna:jna:5.17.0@aar'
}
```

### 其他平台

| 平台 | 依赖项 |
|----------|------------|
| Java | `com.goterl:lazysodium-java:5.1.4` |
| Python | `pynacl` |
| Node.js | `tweetnacl` 或 `libsodium-wrappers` |
| Go | `golang.org/x/crypto/nacl/secretbox` |
| Rust | `sodiumoxide` 或 `crypto_secretbox` |

---

## 加密规范

| 参数 | 值 | 说明 |
|-----------|-------|-------------|
| 算法 | XSalsa20-Poly1305 | NaCl SecretBox |
| 密钥长度 | 32 字节（256 位） | `SecretBox.KEYBYTES` |
| Nonce 长度 | 24 字节（192 位） | `SecretBox.NONCEBYTES` |
| MAC 长度 | 16 字节（128 位） | `SecretBox.MACBYTES` |
| 编码 | Base64 (DEFAULT) | Android Base64 |

---

## 数据格式

### 加密数据结构

```
+------------------+------------------------+
|      Nonce       |       密文             |
|    (24 字节)     |   (明文 + MAC)         |
+------------------+------------------------+
```

最终输出为 Base64 编码的字符串。

### 密文长度计算

```
密文长度 = Nonce (24) + 明文长度 + MAC (16)
Base64 长度 ≈ ceil((24 + 明文长度 + 16) / 3) * 4
```

---

## API 参考

### `encrypt(data: String, key: ByteArray): String`

加密字符串。

**参数：**
- `data` - 要加密的明文字符串（UTF-8）
- `key` - 32 字节的加密密钥

**返回值：**
- Base64 编码的加密数据（包含 nonce）

**示例：**
```kotlin
val key = Crypto.getKeyFromString("my-secret-password")
val encrypted = Crypto.encrypt("Hello, World!", key)
```

---

### `decrypt(encryptedData: String, key: ByteArray): String`

解密加密数据。

**参数：**
- `encryptedData` - Base64 编码的加密数据
- `key` - 32 字节的密钥（必须与加密密钥匹配）

**返回值：**
- 解密后的明文字符串（UTF-8）

**抛出异常：**
- `IllegalArgumentException` - 如果数据无效或解密失败（密钥错误/数据被篡改）

**示例：**
```kotlin
val key = Crypto.getKeyFromString("my-secret-password")
val decrypted = Crypto.decrypt(encryptedData, key)
```

---

### `getKeyFromString(keyString: String): ByteArray`

从密码字符串派生 32 字节的密钥。

**参数：**
- `keyString` - 用户密码或密钥字符串

**返回值：**
- 32 字节的密钥

**派生方法：**
```
1. SHA-256(keyString) → firstHash
2. SHA-256(firstHash + keyString) → key (32 字节)
```

**示例：**
```kotlin
val key = Crypto.getKeyFromString("user-password-123")
// key 是一个 32 字节的 ByteArray
```

---

## 跨平台实现参考

### Python (PyNaCl)

```python
import nacl.secret
import nacl.utils
import hashlib
import base64

def get_key_from_string(key_string: str) -> bytes:
    first_hash = hashlib.sha256(key_string.encode('utf-8')).digest()
    key = hashlib.sha256(first_hash + key_string.encode('utf-8')).digest()
    return key[:32]

def encrypt(data: str, key: bytes) -> str:
    box = nacl.secret.SecretBox(key)
    nonce = nacl.utils.random(nacl.secret.SecretBox.NONCE_SIZE)
    encrypted = box.encrypt(data.encode('utf-8'), nonce)
    # encrypted 已包含 nonce + 密文
    return base64.b64encode(encrypted).decode('utf-8')

def decrypt(encrypted_data: str, key: bytes) -> str:
    box = nacl.secret.SecretBox(key)
    encrypted = base64.b64decode(encrypted_data)
    decrypted = box.decrypt(encrypted)
    return decrypted.decode('utf-8')
```

### Node.js (tweetnacl)

```javascript
const nacl = require('tweetnacl');
const { createHash } = require('crypto');

function getKeyFromString(keyString) {
    const firstHash = createHash('sha256').update(keyString, 'utf8').digest();
    const key = createHash('sha256').update(Buffer.concat([firstHash, Buffer.from(keyString, 'utf8')])).digest();
    return key.slice(0, 32);
}

function encrypt(data, key) {
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const messageUint8 = new TextEncoder().encode(data);
    const ciphertext = nacl.secretbox(messageUint8, nonce, key);
    
    const result = new Uint8Array(nonce.length + ciphertext.length);
    result.set(nonce);
    result.set(ciphertext, nonce.length);
    
    return Buffer.from(result).toString('base64');
}

function decrypt(encryptedData, key) {
    const combined = Buffer.from(encryptedData, 'base64');
    const nonce = combined.slice(0, nacl.secretbox.nonceLength);
    const ciphertext = combined.slice(nacl.secretbox.nonceLength);
    
    const decrypted = nacl.secretbox.open(ciphertext, nonce, key);
    if (!decrypted) {
        throw new Error('解密失败');
    }
    
    return new TextDecoder().decode(decrypted);
}
```

### Go

```go
package crypto

import (
    "crypto/rand"
    "crypto/sha256"
    "encoding/base64"
    "errors"
    
    "golang.org/x/crypto/nacl/secretbox"
)

const (
    KeySize   = 32
    NonceSize = 24
)

func GetKeyFromString(keyString string) [KeySize]byte {
    firstHash := sha256.Sum256([]byte(keyString))
    combined := append(firstHash[:], []byte(keyString)...)
    key := sha256.Sum256(combined)
    return key
}

func Encrypt(data string, key [KeySize]byte) (string, error) {
    var nonce [NonceSize]byte
    if _, err := rand.Read(nonce[:]); err != nil {
        return "", err
    }
    
    encrypted := secretbox.Seal(nonce[:], []byte(data), &nonce, &key)
    return base64.StdEncoding.EncodeToString(encrypted), nil
}

func Decrypt(encryptedData string, key [KeySize]byte) (string, error) {
    combined, err := base64.StdEncoding.DecodeString(encryptedData)
    if err != nil {
        return "", err
    }
    
    if len(combined) < NonceSize {
        return "", errors.New("无效的加密数据")
    }
    
    var nonce [NonceSize]byte
    copy(nonce[:], combined[:NonceSize])
    
    decrypted, ok := secretbox.Open(nil, combined[NonceSize:], &nonce, &key)
    if !ok {
        return "", errors.New("解密失败")
    }
    
    return string(decrypted), nil
}
```

---

## 安全注意事项

1. **密钥管理**：密钥应安全存储；避免在源代码中硬编码
2. **Nonce 唯一性**：每次加密自动生成随机 nonce，确保安全性
3. **认证加密**：SecretBox 提供完整性验证；被篡改的数据将无法解密
4. **Base64 编码**：Android 使用 `Base64.DEFAULT`；确保与其他平台的兼容性

---

## 测试向量

使用以下测试数据验证跨平台实现兼容性：

```
密码: "test-password-123"
明文: "Hello, World!"

派生密钥（十六进制）：通过双重 SHA-256 哈希计算
```

建议使用已知的加密结果进行解密测试，以确保跨平台兼容性。

