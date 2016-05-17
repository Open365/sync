FROM docker-registry.eyeosbcn.com/eyeos-fedora21-node-base

ENV WHATAMI sync

ENV InstallationDir /var/service/

WORKDIR ${InstallationDir}

CMD eyeos-run-server --serf /var/service/src/eyeos-sync.js

COPY . ${InstallationDir}

RUN npm install -g eyeos-run-server && \
    npm install --verbose && \
    npm cache clean
