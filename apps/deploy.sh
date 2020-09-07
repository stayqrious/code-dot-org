#!/bin/sh

aws s3 sync build/package s3://cdo-build/ --cache-control max-age=2628000 --acl public-read --exclude "*.DS_Store*" --size-only
aws s3 cp build/package/assets/js/manifest.json s3://cdo-build/assets/js/manifest.json --acl public-read



