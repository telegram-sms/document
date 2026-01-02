# 自托管 Telegram Bot API 指南

您可以按照本指南使用自托管的 Telegram Bot API。

## 注册您的应用程序

您需要从 [https://my.telegram.org](https://my.telegram.org) 获取 API ID 和 Hash。记下 API ID 和 Hash。

## 安装

### 方式 1：从源代码克隆并编译

构建和安装 Telegram Bot API 服务器的最简单方法是使用我们的 Telegram Bot API 服务器[构建指南生成器](https://tdlib.github.io/telegram-bot-api/build.html)。

您应该始终遵循 https://github.com/tdlib/telegram-bot-api 的最新说明。

#### 准备依赖项

要构建和运行 Telegram Bot API 服务器，您需要：

* OpenSSL
* zlib
* C++17 兼容编译器（例如 Clang 5.0+、GCC 7.0+、MSVC 19.1+（Visual Studio 2017.7+）、Intel C++ Compiler 19+）（仅构建）
* gperf（仅构建）
* CMake（3.10+，仅构建）

#### 编译和安装

一般来说，您需要安装所有 Telegram Bot API 服务器依赖项，并使用 CMake 编译源代码：

```shell
git clone --recursive https://github.com/tdlib/telegram-bot-api.git
cd telegram-bot-api
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --target install
```

### 方式 2：Docker compose

只需安装 docker compose 并使用以下模板，将此文件重命名为 `docker-compose.yml` 并将其放置在项目的根目录中（最好为此项目创建一个新文件夹，因为数据将与 compose 文件一起存储）：

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

运行 compose，您就可以访问 API：

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
    server_name <您的域名>;
    listen 443 ssl;
    
    ssl_certificate <您的证书>;
    ssl_certificate_key <您的证书密钥>;
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
        
        # CORS 配置用于生产配置站点
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

