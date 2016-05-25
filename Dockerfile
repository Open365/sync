FROM docker-registry.eyeosbcn.com/alpine6-node-base

ENV WHATAMI sync

ENV InstallationDir /var/service/

WORKDIR ${InstallationDir}

CMD eyeos-run-server --serf /var/service/src/eyeos-sync.js

COPY . ${InstallationDir}

RUN apk update && apk add --no-cache curl make gcc g++ git python dnsmasq bash && \
    npm install --verbose --production && \
    npm cache clean && \
    apk del curl make gcc g++ git python && \
    rm -r /etc/ssl /var/cache/apk/* /tmp/*
