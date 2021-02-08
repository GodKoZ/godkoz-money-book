# Godkoz Money Book

เว็บบันทึกรายรับรายจ่าย

### `docker-compose up -d`

ทดสอบรันแบบ local

### `docker-compose -f docker-compose-prod.yaml up -d`

ทดสอบรันแบบ production

**รัน command นี้ก่อน**

```shell
$ docker run --detach \
    --name nginx-proxy \
    --publish 80:80 \
    --publish 443:443 \
    --volume /etc/nginx/certs \
    --volume /etc/nginx/vhost.d \
    --volume /usr/share/nginx/html \
    --volume /var/run/docker.sock:/tmp/docker.sock:ro \
    jwilder/nginx-proxy
```

**ตามด้วย**

```shell
$ docker run --detach \
    --name nginx-proxy-letsencrypt \
    --volumes-from nginx-proxy \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    --volume /etc/acme.sh \
    --env "DEFAULT_EMAIL=mail@yourdomain.tld" \
    jrcs/letsencrypt-nginx-proxy-companion
```

```shell
$ docker-compose -f docker-compose-prod.yaml up -d
```
