# セルフホスト Telegram Bot API の使用方法

このガイドに従って、セルフホストの Telegram Bot API を使用できます。

## アプリケーションの登録

[https://my.telegram.org](https://my.telegram.org) から API ID とハッシュを取得する必要があります。API ID とハッシュをメモしてください。

## インストール

### オプション 1: ソースからクローンしてコンパイル

Telegram Bot API サーバーをビルドしてインストールする最も簡単な方法は、[ビルド手順ジェネレーター](https://tdlib.github.io/telegram-bot-api/build.html)を使用することです。

常に https://github.com/tdlib/telegram-bot-api の最新の手順に従う必要があります。

#### 依存関係の準備

Telegram Bot API サーバーをビルドして実行するには、以下が必要です:

* OpenSSL
* zlib
* C++17 互換コンパイラ (例: Clang 5.0+、GCC 7.0+、MSVC 19.1+ (Visual Studio 2017.7+)、Intel C++ Compiler 19+) (ビルドのみ)
* gperf (ビルドのみ)
* CMake (3.10+、ビルドのみ)

#### コンパイルとインストール

一般的に、すべての Telegram Bot API サーバーの依存関係をインストールし、CMake を使用してソースコードをコンパイルする必要があります:

```shell
git clone --recursive https://github.com/tdlib/telegram-bot-api.git
cd telegram-bot-api
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --target install
```

### オプション 2: Docker Compose

Docker Compose をインストールして、次のテンプレートを使用するだけです。このファイルの名前を `docker-compose.yml` に変更し、プロジェクトのルートディレクトリに配置してください（できれば、このプロジェクト用に新しいフォルダーを作成してください。データは compose ファイルと一緒に保存されます）:

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

Compose を実行すると、API にアクセスできるようになります:

```shell
docker compose up -d
```

## リバースプロキシ

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
        
        # 本番環境用の CORS 設定
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

