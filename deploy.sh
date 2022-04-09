#!/bin/bash

npm run build

rsync -a --delete ./test/ ./dist/

rm -r ./test