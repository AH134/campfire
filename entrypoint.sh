#!/bin/sh

UID=${USER_UID:-1000}
GID=${USER_GID:-1000}

VOLUME_PATH="/var/www/html/data"
DEFAULT_DATA_PATH="/default-data"

if [ -z "$(ls -A $VOLUME_PATH)" ]; then
    echo "Initializing volume with default data..."
    cp -rv $DEFAULT_DATA_PATH/* $VOLUME_PATH/
fi

echo "Setting ownership of $VOLUME_PATH to $UID:$GID..."
chown -R $UID:$GID "$VOLUME_PATH"

exec "$@"