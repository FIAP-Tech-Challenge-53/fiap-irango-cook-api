#!/bin/bash

NETWORK_NAME=local-network
NETWORK_ID=$(shell docker network ls -qf "name=${NETWORK_NAME}")

CONTAINER_BACKEND = irango-cook-api

.PHONY: setup
setup: clean down add-network create.env.file build up migration.run seed.run logs

create.env.file:
	if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi

.PHONY: add-network
add-network:
	@if [ -n '${NETWORK_ID}' ]; then \
		echo 'The ${NETWORK_NAME} network already exists. Skipping...'; \
	else \
		docker network create -d bridge ${NETWORK_NAME}; \
	fi

.PHONY: build
build:
	docker compose build --progress=plain
.PHONY: up
up: add-network create.env.file
	docker compose up --remove-orphans -d
.PHONY: down
down:
	docker compose down
.PHONY: logs
logs:
	docker compose logs -f
restart: down up

.PHONY:
clean:
	rm -rf dist/
	rm -rf coverage/

bash:
	docker exec -it ${CONTAINER_BACKEND} /bin/bash
