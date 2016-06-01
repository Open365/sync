FROM docker-registry.eyeosbcn.com/alpine6-node-base

ENV WHATAMI sync

ENV InstallationDir /var/service/

WORKDIR ${InstallationDir}

CMD eyeos-run-server --serf /var/service/src/eyeos-sync.js

COPY alpine-*.list /var/service/
COPY . ${InstallationDir}

RUN apk update && \
    /scripts-base/buildDependencies.sh --production --install && \
    npm install --verbose --production && \
    npm cache clean && \
    /scripts-base/buildDependencies.sh --production --purgue && \
    rm -r /etc/ssl /var/cache/apk/* /tmp/*
