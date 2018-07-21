docker-compose up -d
docker exec -it 9 /bin/bash
node bin/cli.js sh

docker volume create --name=mongodata