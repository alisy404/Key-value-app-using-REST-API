MONGODB_IMAGE="mongodb/mongodb-community-server"
MONGODB_TAG="7.0-ubuntu2204"
source .env.db

#Root user credentials
ROOT_USER="root_user"
ROOT_PASSWORD="root_password"

#Key value credentials
KEY_VALUE_DB="key_value_db"
KEY_VALUE_USER="key_value_user"
KEY_VALUE_PASSWORD="key_value_password"

#Connectivity
source .env.network
LOCALHOST_PORT=27017
CONTAINER_PORT=27017

#Storage
source .env.volume
VOLUME_CONTAINER_PATH="/data/db"

source setup.sh

if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "A container with the name $DB_CONTAINER_NAME is already running."
  echo "Stopping and removing it."
  echo "To stop the container, run: docker stop $DB_CONTAINER_NAME"
  exit 1

fi

docker run --rm -d --name $DB_CONTAINER_NAME \
  -e MONGODB_INITDB_ROOT_USERNAME=$ROOT_USER \
  -e MONGODB_INITDB_ROOT_PASSWORD=$ROOT_PASSWORD \
  -e KEY_VALUE_DB=$KEY_VALUE_DB \
  -e KEY_VALUE_USER=$KEY_VALUE_USER \
  -e KEY_VALUE_PASSWORD=$KEY_VALUE_PASSWORD \
  -p $LOCALHOST_PORT:$CONTAINER_PORT \
  -v $VOLUME_NAME:$VOLUME_CONTAINER_PATH \
  -v ./db-config/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro \
  --network $NETWORK_NAME \
  $MONGODB_IMAGE:$MONGODB_TAG
