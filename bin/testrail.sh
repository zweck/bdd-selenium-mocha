#!/bin/sh
while read v; do
  if [[ $v == TESTRAIL* ]] ;
  then
    export $v
  fi
done < .env

mocha testRunner.js --no-exit --reporter mocha-testrail-reporter --reporter-options domain=$TESTRAIL_DOMAIN,username=$TESTRAIL_USERNAME,password=$TESTRAIL_PASSWORD,projectId=$TESTRAIL_PROJECT_ID,suiteId=$TESTRAIL_SUITE_ID
mocha test/ --no-exit --reporter mocha-testrail-reporter --reporter-options domain=$TESTRAIL_DOMAIN,username=$TESTRAIL_USERNAME,password=$TESTRAIL_PASSWORD,projectId=$TESTRAIL_PROJECT_ID,suiteId=$TESTRAIL_SUITE_ID

exit 0