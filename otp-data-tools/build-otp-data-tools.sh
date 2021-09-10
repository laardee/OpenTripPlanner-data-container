#!/bin/bash
# this script is run inside the otp-data-tools container
set -e
apt-get update && \
  apt-get -y install \
    git build-essential python3-dev protobuf-compiler libprotobuf-dev \
    make swig g++ libreadosm-dev \
    libboost-graph-dev libproj-dev libgoogle-perftools-dev \
    osmctools unzip zip wget python3-pyproj python3-argh \
    python3-scipy python3-sklearn python3-pip python3-numpy curl

rm -rf /var/lib/apt/lists/*

pip3 install imposm.parser && \
  pip3 install argh && \
  pip3 install future && \
  pip3 install grequests && \
  pip3 install unicodecsv && \
  pip3 install cffi && \
  pip3 install utm

mkdir -p one-busaway-gtfs-transformer && \
  wget -O one-busaway-gtfs-transformer/onebusaway-gtfs-transformer-cli.jar "http://nexus.onebusaway.org/service/local/artifact/maven/content?r=public&g=org.onebusaway&a=onebusaway-gtfs-transformer-cli&v=1.3.9"

git clone https://github.com/jswhit/pyproj.git
cd pyproj
git checkout ec9151e8c6909f7fac72bb2eab927ff18fa4cf1d
python3 setup.py build
python3 setup.py install
cd ..

git clone --recursive -b fastmapmatch https://github.com/HSLdevcom/gtfs_shape_mapfit.git
cd gtfs_shape_mapfit
make -C pymapmatch
cd ..

git clone https://github.com/HSLdevcom/OTPQA.git
cd OTPQA
git checkout otp2
cd ..
