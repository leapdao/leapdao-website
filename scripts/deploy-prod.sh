#!/bin/sh
./scripts/update-route53.sh
#aws s3 sync ./__sapper__/export s3://$PROD_S3_BUCKET/ --acl public-read
#aws configure set preview.cloudfront true
#aws cloudfront create-invalidation --distribution-id $PROD_CLOUDFRONT_DISTRIBUTION --paths "/*"
