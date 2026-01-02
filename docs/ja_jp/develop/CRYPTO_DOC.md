# 暗号化モジュールドキュメント

## 概要

このモジュールは **NaCl SecretBox** (XSalsa20-Poly1305) を使用した対称暗号化を実装し、認証付き暗号化 (AEAD) を提供します。

## 依存関係

### Gradle 依存関係

```groovy
dependencies {
    implementation 'com.goterl:lazysodium-android:5.1.0@aar'
    implementation 'net.java.dev.jna:jna:5.17.0@aar'
}
```

### その他のプラットフォーム

| プラットフォーム | 依存関係 |
|----------|------------|
| Java | `com.goterl:lazysodium-java:5.1.4` |
| Python | `pynacl` |
| Node.js | `tweetnacl` または `libsodium-wrappers` |
| Go | `golang.org/x/crypto/nacl/secretbox` |
| Rust | `sodiumoxide` または `crypto_secretbox` |

---

## 暗号化仕様

| パラメータ | 値 | 説明 |
|-----------|-------|-------------|
| アルゴリズム | XSalsa20-Poly1305 | NaCl SecretBox |
| キー長 | 32 バイト (256 ビット) | `SecretBox.KEYBYTES` |
| ノンス長 | 24 バイト (192 ビット) | `SecretBox.NONCEBYTES` |
| MAC 長 | 16 バイト (128 ビット) | `SecretBox.MACBYTES` |
| エンコーディング | Base64 (DEFAULT) | Android Base64 |

---

## データフォーマット

### 暗号化データ構造

```
+------------------+------------------------+
|      ノンス      |      暗号文            |
|    (24 バイト)   |   (平文 + MAC)         |
+------------------+------------------------+
```

最終出力は Base64 エンコードされた文字列です。

### 暗号文長の計算

```
暗号文長 = ノンス (24) + 平文長 + MAC (16)
Base64 長 ≈ ceil((24 + 平文長 + 16) / 3) * 4
```

---

## API リファレンス

### `encrypt(data: String, key: ByteArray): String`

文字列を暗号化します。

**パラメータ:**
- `data` - 暗号化する平文文字列 (UTF-8)
- `key` - 32 バイトの暗号化キー

**戻り値:**
- Base64 エンコードされた暗号化データ（ノンスを含む）

**例:**
```kotlin
val key = Crypto.getKeyFromString("my-secret-password")
val encrypted = Crypto.encrypt("Hello, World!", key)
```

---

### `decrypt(encryptedData: String, key: ByteArray): String`

暗号化されたデータを復号化します。

**パラメータ:**
- `encryptedData` - Base64 エンコードされた暗号化データ
- `key` - 32 バイトのキー（暗号化キーと一致する必要があります）

**戻り値:**
- 復号化された平文文字列 (UTF-8)

**例外:**
- `IllegalArgumentException` - データが無効または復号化に失敗した場合（間違ったキー/改ざんされたデータ）

**例:**
```kotlin
val key = Crypto.getKeyFromString("my-secret-password")
val decrypted = Crypto.decrypt(encryptedData, key)
```

---

### `getKeyFromString(keyString: String): ByteArray`

パスワード文字列から 32 バイトのキーを導出します。

**パラメータ:**
- `keyString` - ユーザーパスワードまたはキー文字列

**戻り値:**
- 32 バイトのキー

**導出方法:**
```
1. SHA-256(keyString) → firstHash
2. SHA-256(firstHash + keyString) → key (32 バイト)
```

**例:**
```kotlin
val key = Crypto.getKeyFromString("user-password-123")
// key は 32 バイトの ByteArray
```

---

## クロスプラットフォーム実装リファレンス

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
    # encrypted にはすでに nonce + ciphertext が含まれています
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
        throw new Error('Decryption failed');
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
        return "", errors.New("invalid encrypted data")
    }
    
    var nonce [NonceSize]byte
    copy(nonce[:], combined[:NonceSize])
    
    decrypted, ok := secretbox.Open(nil, combined[NonceSize:], &nonce, &key)
    if !ok {
        return "", errors.New("decryption failed")
    }
    
    return string(decrypted), nil
}
```

---

## セキュリティ上の考慮事項

1. **キー管理**: キーは安全に保存する必要があります。ソースコードにハードコードしないでください
2. **ノンスの一意性**: 各暗号化に対してランダムなノンスが自動的に生成され、セキュリティが確保されます
3. **認証付き暗号化**: SecretBox は整合性検証を提供します。改ざんされたデータは復号化に失敗します
4. **Base64 エンコーディング**: Android は `Base64.DEFAULT` を使用します。他のプラットフォームとの互換性を確認してください

---

## テストベクトル

クロスプラットフォーム実装の互換性を検証するために、次のテストデータを使用してください:

```
パスワード: "test-password-123"
平文: "Hello, World!"

導出されたキー (hex): 二重 SHA-256 ハッシュで計算
```

クロスプラットフォームの互換性を確保するために、既知の暗号化結果を使用して復号化テストを行うことをお勧めします。

