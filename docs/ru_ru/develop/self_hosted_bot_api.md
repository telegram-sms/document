# Инструкция по самостоятельному размещению Telegram Bot API

Вы можете использовать самостоятельно размещенный Telegram Bot API, следуя этому руководству.

## Зарегистрируйте свое приложение

Вам нужно получить API ID и Hash на [https://my.telegram.org](https://my.telegram.org). Запишите API ID и Hash.

## Установка

### Вариант 1: Клонирование и компиляция из исходного кода

Самый простой способ собрать и установить сервер Telegram Bot API - использовать наш [генератор инструкций по сборке](https://tdlib.github.io/telegram-bot-api/build.html) сервера Telegram Bot API.

ВЫ ДОЛЖНЫ ВСЕГДА СЛЕДОВАТЬ последним инструкциям с https://github.com/tdlib/telegram-bot-api.

#### Подготовка зависимостей

Для сборки и запуска сервера Telegram Bot API вам понадобятся:

* OpenSSL
* zlib
* Компилятор, совместимый с C++17 (например, Clang 5.0+, GCC 7.0+, MSVC 19.1+ (Visual Studio 2017.7+), Intel C++ Compiler 19+) (только сборка)
* gperf (только сборка)
* CMake (3.10+, только сборка)

#### Компиляция и установка

В общем, вам нужно установить все зависимости сервера Telegram Bot API и скомпилировать исходный код с помощью CMake:

```shell
git clone --recursive https://github.com/tdlib/telegram-bot-api.git
cd telegram-bot-api
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --target install
```

### Вариант 2: Docker compose

Просто установите docker compose и используйте следующий шаблон, переименуйте этот файл в `docker-compose.yml` и поместите его в корневой каталог вашего проекта (желательно создать новую папку для этого проекта, так как данные будут храниться вместе с файлом compose):

```yaml
services:
  telegram-bot-api:
    image: aiogram/telegram-bot-api:latest
    environment:
      TELEGRAM_API_ID: "<Ваш API ID>"
      TELEGRAM_API_HASH: "<Ваш API Hash>"
      TELEGRAM_STAT: 1
      TELEGRAM_LOCAL: 1
    volumes:
      - ./data:/var/lib/telegram-bot-api
    ports:
      - "127.0.0.1:8081:8081"
      - "127.0.0.1:8082:8082"
```

Запустите compose, и вы сможете получить доступ к API:

```shell
docker compose up -d
```

## Обратный прокси

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
    server_name <ваше доменное имя>;
    listen 443 ssl;
    
    ssl_certificate <Ваш сертификат>;
    ssl_certificate_key <Ваш ключ сертификата>;
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
        
        # Конфигурация CORS для производственного сайта конфигурации
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

