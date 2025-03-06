#!/bin/sh

VOLUME_PATH="/var/www/html/data"

if [ -z "$(ls -A $VOLUME_PATH)" ]; then
    echo "Initializing volume with default data..."
    cp -r /data/* $VOLUME_PATH/
fi

exec "$@"