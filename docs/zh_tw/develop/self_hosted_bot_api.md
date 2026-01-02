# 自託管 Telegram Bot API 指南

您可以按照本指南使用自託管的 Telegram Bot API。

## 註冊您的應用程式

您需要從 [https://my.telegram.org](https://my.telegram.org) 取得 API ID 和 Hash。記下 API ID 和 Hash。

## 安裝

### 方式 1：從原始碼克隆並編譯

構建和安裝 Telegram Bot API 伺服器的最簡單方法是使用我們的 Telegram Bot API 伺服器[構建指南產生器](https://tdlib.github.io/telegram-bot-api/build.html)。

您應該始終遵循 https://github.com/tdlib/telegram-bot-api 的最新說明。

#### 準備依賴項

要構建和執行 Telegram Bot API 伺服器，您需要：

* OpenSSL
* zlib
* C++17 相容編譯器（例如 Clang 5.0+、GCC 7.0+、MSVC 19.1+（Visual Studio 2017.7+）、Intel C++ Compiler 19+）（僅構建）
* gperf（僅構建）
* CMake（3.10+，僅構建）

#### 編譯和安裝

一般來說，您需要安裝所有 Telegram Bot API 伺服器依賴項，並使用 CMake 編譯原始碼：

```shell
git clone --recursive https://github.com/tdlib/telegram-bot-api.git
cd telegram-bot-api
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --target install
```

### 方式 2：Docker compose

只需安裝 docker compose 並使用以下模板，將此檔案重新命名為 `docker-compose.yml` 並將其放置在專案的根目錄中（最好為此專案建立一個新資料夾，因為數據將與 compose 檔案一起儲存）：

```yaml
services:
  telegram-bot-api:
    image: aiogram/telegram-bot-api:latest
    environment:
      TELEGRAM_API_ID: "<您的 API ID>"
      TELEGRAM_API_HASH: "<您的 API Hash>"
      TELEGRAM_STAT: 1
      TELEGRAM_LOCAL: 1
    volumes:
      - ./data:/var/lib/telegram-bot-api
    ports:
      - "127.0.0.1:8081:8081"
      - "127.0.0.1:8082:8082"
```

執行 compose，您就可以存取 API：

```shell
docker compose up -d
```

## 反向代理

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
    server_name <您的網域名稱>;
    listen 443 ssl;
    
    ssl_certificate <您的憑證>;
    ssl_certificate_key <您的憑證金鑰>;
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
        
        # CORS 配置用於生產配置站點
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

