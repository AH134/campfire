#!/bin/sh

VOLUME_PATH="/var/www/html/data"
DEFAULT_DATA_PATH="/default-data/"

if [ -z "$(ls -A $VOLUME_PATH)" ]; then
    echo "Initializing volume with default data..."
    cp -r $DEFAULT_DATA_PATH/* $VOLUME_PATH/
fi

exec "$@"