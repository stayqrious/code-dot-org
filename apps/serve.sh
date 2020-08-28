#!/bin/bash

set -e 

npm run build
node serve/index.js --config ../../serve.json --listen 4444 --cors build/package
