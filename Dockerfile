FROM mhart/alpine-node:6.2

ENV WHATAMI sync

ENV InstallationDir /var/service/

WORKDIR ${InstallationDir}

CMD eyeos-run-server --serf /var/service/src/eyeos-sync.js

COPY . ${InstallationDir}

RUN apk update && apk add --no-cache curl make gcc g++ git python dnsmasq bash && \
    npm install --verbose && \
    npm install -g eyeos-run-server && \
    npm install -g eyeos-tags-to-dns && \
    npm cache clean && \
    echo "user=root" > /etc/dnsmasq.conf && \
    curl -L https://releases.hashicorp.com/serf/0.6.4/serf_0.6.4_linux_amd64.zip -o serf.zip && \
    unzip ./serf.zip && mv serf /usr/bin/ && rm ./serf.zip && \
    apk del openssl ca-certificates libssh2 curl binutils-libs binutils gmp isl \
    libgomp libatomic pkgconf pkgconfig mpfr3 mpc1 gcc musl-dev libc-dev g++ expat \
    pcre git make libbz2 libffi gdbm ncurses-terminfo-base ncurses-terminfo ncurses-libs readline sqlite-libs python && \
    rm -r /etc/ssl /var/cache/apk/* /tmp/*
