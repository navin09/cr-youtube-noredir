#!/bin/bash
DATE=$(date +%Y%m%d)
FILENAME="dist/cr-youtube-noredir-${DATE}.zip"
if [ -f ${FILENAME} ]; then echo "Deleting existing file"; rm -f ${FILENAME}; fi;
zip -r -q -9 $FILENAME  _locales icons LICENSE manifest.json README.md content-script.js