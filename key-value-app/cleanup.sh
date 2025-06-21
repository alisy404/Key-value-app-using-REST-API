#1. Stop and remove the MongoDB container
#2. Stop and remove app container
#3. Remove the Docker network
#4. Remove the Docker volume

source .env.db
source .env.network
source .env.volume

if [ "$(docker ps -aq -f name=$DB_CONTAINER_NAME)" ]; then
    echo "Stopping the MongoDB container: $DB_CONTAINER_NAME"
    docker kill $DB_CONTAINER_NAME #&& docker rm $DB_CONTAINER_NAME -- add if you are not using the --rm flag in the initial docker run command

else
    echo "A container with the name $DB_CONTAINER_NAME is doesn't exist, skipping the deletion process."

fi

if [ "$(docker volume ls -q -f name=$VOLUME_NAME)" ]; then
    echo "Removing the Docker volume: $VOLUME_NAME"
    docker volume rm $VOLUME_NAME

else
    echo "A volume with the name $VOLUME_NAME doesn't exist. Skipping the volume   removal."
fi

if [ "$(docker network ls -q -f name=$NETWORK_NAME)" ]; then
    echo "Removing the Docker network: $NETWORK_NAME"
    docker network rm $NETWORK_NAME

else
    echo "A network with the name $NETWORK_NAME doesn't exist. Skipping the network removal."

fi
