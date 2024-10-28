#!/bin/bash
set -e

export ROUTER_NAME=finland
export ORG=payiq
export OTP_TAG=v2 

sudo rm -rf data

npx gulp seed
npx gulp osm:update
npx gulp gtfs:update
# cp data/downloads/gtfs/HSL-gtfs.zip data/ready/gtfs
# cp data/downloads/gtfs/HSL-gtfs.zip data/seed
JAVA_OPTS="-Xms12g -Xmx12g" npx gulp router:buildGraph
JAVA_OPTS="-Xms12g -Xmx12g" ./build.sh
docker tag payiq/opentripplanner-data-container-finland:test payiq/opentripplanner-data-container-finland:v2