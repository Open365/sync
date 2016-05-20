#!/bin/bash
echo '############ BEGIN $0 #################'
set -e
set -u
set -x

npm install #So we install devDependencies
npm -g install grunt-cli istanbul
grunt commit-stage
echo '############# END $0 ##################'
