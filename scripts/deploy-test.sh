#!/bin/sh

aws s3 sync ./__sapper__/export s3://$TEST_S3_BUCKET/ --acl public-read
aws configure set preview.cloudfront true
echo "User-agent: *\n\rDisallow: /\n\r" > robots.txt
aws s3 cp robots.txt s3://$TEST_S3_BUCKET/ --acl public-read
aws cloudfront create-invalidation --distribution-id $TEST_CLOUDFRONT_DISTRIBUTION --paths "/*"
