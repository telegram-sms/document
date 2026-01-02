# Documentación del módulo de cifrado

## Descripción general

Este módulo implementa cifrado simétrico usando **NaCl SecretBox** (XSalsa20-Poly1305), proporcionando cifrado autenticado (AEAD).

## Dependencias

### Dependencias de Gradle

```groovy
dependencies {
    implementation 'com.goterl:lazysodium-android:5.1.0@aar'
    implementation 'net.java.dev.jna:jna:5.17.0@aar'
}
```

### Otras plataformas

| Plataforma | Dependencia |
|----------|------------|
| Java | `com.goterl:lazysodium-java:5.1.4` |
| Python | `pynacl` |
| Node.js | `tweetnacl` o `libsodium-wrappers` |
| Go | `golang.org/x/crypto/nacl/secretbox` |
| Rust | `sodiumoxide` o `crypto_secretbox` |

---

## Especificación de cifrado

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| Algoritmo | XSalsa20-Poly1305 | NaCl SecretBox |
| Longitud de clave | 32 bytes (256 bits) | `SecretBox.KEYBYTES` |
| Longitud de nonce | 24 bytes (192 bits) | `SecretBox.NONCEBYTES` |
| Longitud de MAC | 16 bytes (128 bits) | `SecretBox.MACBYTES` |
| Codificación | Base64 (DEFAULT) | Android Base64 |

---

## Formato de datos

### Estructura de datos cifrados

```
+------------------+------------------------+
|      Nonce       |    Texto cifrado       |
|    (24 bytes)    |   (texto plano + MAC)  |
+------------------+------------------------+
```

La salida final es una cadena codificada en Base64.

### Cálculo de longitud del texto cifrado

```
Longitud del texto cifrado = Nonce (24) + Longitud del texto plano + MAC (16)
Longitud Base64 ≈ ceil((24 + Longitud del texto plano + 16) / 3) * 4
```

---

## Referencia de API

### `encrypt(data: String, key: ByteArray): String`

Cifra una cadena.

**Parámetros:**
- `data` - La cadena de texto plano a cifrar (UTF-8)
- `key` - Una clave de cifrado de 32 bytes

**Devuelve:**
- Datos cifrados codificados en Base64 (incluye nonce)

**Ejemplo:**
```kotlin
val key = Crypto.getKeyFromString("my-secret-password")
val encrypted = Crypto.encrypt("Hello, World!", key)
```

---

### `decrypt(encryptedData: String, key: ByteArray): String`

Descifra datos cifrados.

**Parámetros:**
- `encryptedData` - Datos cifrados codificados en Base64
- `key` - Una clave de 32 bytes (debe coincidir con la clave de cifrado)

**Devuelve:**
- Cadena de texto plano descifrado (UTF-8)

**Lanza:**
- `IllegalArgumentException` - Si los datos son inválidos o el descifrado falla (clave incorrecta/datos alterados)

**Ejemplo:**
```kotlin
val key = Crypto.getKeyFromString("my-secret-password")
val decrypted = Crypto.decrypt(encryptedData, key)
```

---

### `getKeyFromString(keyString: String): ByteArray`

Deriva una clave de 32 bytes de una cadena de contraseña.

**Parámetros:**
- `keyString` - Contraseña de usuario o cadena de clave

**Devuelve:**
- Una clave de 32 bytes

**Método de derivación:**
```
1. SHA-256(keyString) → firstHash
2. SHA-256(firstHash + keyString) → key (32 bytes)
```

**Ejemplo:**
```kotlin
val key = Crypto.getKeyFromString("user-password-123")
// key es un ByteArray de 32 bytes
```

---

## Referencia de implementación multiplataforma

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
    # encrypted ya contiene nonce + ciphertext
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

## Consideraciones de seguridad

1. **Gestión de claves**: Las claves deben almacenarse de forma segura; evite codificarlas directamente en el código fuente
2. **Unicidad del nonce**: Se genera automáticamente un nonce aleatorio para cada cifrado, garantizando la seguridad
3. **Cifrado autenticado**: SecretBox proporciona verificación de integridad; los datos alterados no se descifrarán
4. **Codificación Base64**: Android usa `Base64.DEFAULT`; asegure la compatibilidad con otras plataformas

---

## Vectores de prueba

Use los siguientes datos de prueba para verificar la compatibilidad de implementación multiplataforma:

```
Contraseña: "test-password-123"
Texto plano: "Hello, World!"

Clave derivada (hex): Calculada mediante hash SHA-256 doble
```

Se recomienda usar un resultado cifrado conocido para pruebas de descifrado para garantizar la compatibilidad multiplataforma.

