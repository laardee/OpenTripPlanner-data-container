#!/bin/bash
set -e

export ROUTER_NAME=payiq
export ORG=payiq
export OTP_TAG=v2
export SEED_TAG=some-tag 

rm -rf data

npx gulp seed
npx gulp osm:update
npx gulp gtfs:update
npx gulp gtfs:id
# # npx gulp gtfs:payiq

# JAVA_OPTS="-Xms12g -Xmx12g" npx gulp router:buildGraph
# JAVA_OPTS="-Xms12g -Xmx12g" ./build.sh
# docker tag payiq/opentripplanner-data-container-finland:test payiq/opentripplanner-data-container-finland:v2