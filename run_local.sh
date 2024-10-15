#!/bin/sh

cd admin
npm start &
cd ..
cd namer
npm start &
cd ..
cd realtime
npm start &
cd ..

