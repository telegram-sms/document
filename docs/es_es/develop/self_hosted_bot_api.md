# Instrucciones sobre Bot API de Telegram auto-hospedado

Puede usar un Bot API de Telegram auto-hospedado siguiendo esta guía.

## Registrar su aplicación

Necesitará obtener el API ID y Hash desde [https://my.telegram.org](https://my.telegram.org). Anote el API ID y Hash.

## Instalación

### Opción 1: Clonar y compilar desde el código fuente

La forma más sencilla de compilar e instalar el servidor Bot API de Telegram es usar nuestro [generador de instrucciones de compilación](https://tdlib.github.io/telegram-bot-api/build.html) del servidor Bot API de Telegram.

SIEMPRE DEBE SEGUIR las instrucciones más recientes de https://github.com/tdlib/telegram-bot-api.

#### Preparación de dependencias

Para compilar y ejecutar el servidor Bot API de Telegram necesitará:

* OpenSSL
* zlib
* Compilador compatible con C++17 (por ejemplo, Clang 5.0+, GCC 7.0+, MSVC 19.1+ (Visual Studio 2017.7+), Intel C++ Compiler 19+) (solo compilación)
* gperf (solo compilación)
* CMake (3.10+, solo compilación)

#### Compilar e instalar

En general, necesita instalar todas las dependencias del servidor Bot API de Telegram y compilar el código fuente usando CMake:

```shell
git clone --recursive https://github.com/tdlib/telegram-bot-api.git
cd telegram-bot-api
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --target install
```

### Opción 2: Docker Compose

Simplemente instale Docker Compose y use la siguiente plantilla, renombre este archivo a `docker-compose.yml` y colóquelo en el directorio raíz de su proyecto (preferiblemente, cree una nueva carpeta para este proyecto, ya que los datos se almacenarán junto con el archivo compose):

```yaml
services:
  telegram-bot-api:
    image: aiogram/telegram-bot-api:latest
    environment:
      TELEGRAM_API_ID: "<Your API ID>"
      TELEGRAM_API_HASH: "<Your API Hash>"
      TELEGRAM_STAT: 1
      TELEGRAM_LOCAL: 1
    volumes:
      - ./data:/var/lib/telegram-bot-api
    ports:
      - "127.0.0.1:8081:8081"
      - "127.0.0.1:8082:8082"
```

Ejecute el compose y podrá acceder a la API:

```shell
docker compose up -d
```

## Proxy inverso

### Nginx

```conf
log_format token_filter '$remote_addr - $remote_user [$time_local] '
                        '"$sanitized_request" $status $body_bytes_sent '
                        '"$http_referer" "$http_user_agent"';

upstream telegram-bot-api {
    server 127.0.0.1:8081;
}

upstream telegram-bot-stat {
    server 127.0.0.1:8082;
}

server {
    server_name <your domain name>;
    listen 443 ssl;
    
    ssl_certificate <Your certificate>;
    ssl_certificate_key <Your certificate key>;
    ssl_protocols TLSv1.2 TLSv1.3;

    chunked_transfer_encoding on;
    proxy_connect_timeout 600;
    proxy_send_timeout 600;
    proxy_read_timeout 600;
    send_timeout 600;
    client_max_body_size 2G;
    client_body_buffer_size 30M;
    keepalive_timeout 0;

    set $sanitized_request $request;
    if ( $sanitized_request ~ (\w+)\s(\/bot\d+):[-\w]+\/(\S+)\s(.*) ) {
        set $sanitized_request "$1 $2:<hidden-token>/$3 $4";
    }

    access_log /var/log/nginx/tg-api_access.log token_filter;
    error_log  /var/log/nginx/tg-api_error.log;

    location ~* \/file\/bot\d+:(.*) {
        rewrite ^/file\/bot(.*) /$1 break;
        root /var/lib/telegram-bot-api;
        try_files $uri @files;
    }

    location ~* ^/file\/bot[^/]+\/var\/lib\/telegram-bot-api(.*) {
        rewrite ^/file\/bot[^/]+\/var\/lib\/telegram-bot-api(.*) /$1 break;
        root /var/lib/telegram-bot-api;
        try_files $uri @files;
    }

    location / {
        try_files $uri @api;
    }

    location /stat {
        proxy_pass http://telegram-bot-stat;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }


    location @files {
        root /var/lib/telegram-bot-api;
        gzip on;
        gzip_vary on;
        gzip_proxied any;
        gzip_comp_level 6;
        gzip_min_length 1100;
    }

    location @api {
        if ($request_method = 'OPTIONS') {
        	return 204;
    	}
        
        # Configuración CORS para el sitio de configuración de producción
	    add_header 'Access-Control-Allow-Origin' 'config.telegram-sms.com' always;
	    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
	    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
	    add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;

	    proxy_pass http://telegram-bot-api;
	    proxy_redirect off;
	    proxy_set_header Host $host;
	    proxy_set_header X-Real-IP $remote_addr;
	    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	    proxy_set_header X-Forwarded-Host $server_name;
	    proxy_set_header X-Forwarded-Proto $scheme;
	}

}
```

