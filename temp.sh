#!/bin/bash
set -e

export ROUTER_NAME=finland
export ORG=payiq
export OTP_TAG=v2 
export SEED_TAG=v3
export BUILDER_TYPE=dev

# sudo rm -rf data

# npx gulp seed
# npx gulp osm:update
# npx gulp gtfs:update
# # cp data/downloads/gtfs/HSL-gtfs.zip data/ready/gtfs
# # cp data/downloads/gtfs/HSL-gtfs.zip data/seed
# JAVA_OPTS="-Xms12g -Xmx12g" npx gulp router:buildGraph

# npx gulp router:store
npx gulp deploy:prepare

# # JAVA_OPTS="-Xms12g -Xmx12g" ./build.sh
# docker tag payiq/opentripplanner-data-container-finland:test payiq/opentripplanner-data-container-finland:v2