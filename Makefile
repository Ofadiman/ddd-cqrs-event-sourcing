prettier/check:
	yarn prettier --ignore-unknown --list-different .

prettier/format:
	yarn prettier --ignore-unknown --write .

docker/up:
	docker compose up -d

docker/stop:
	docker compose stop

docker/down:
	docker compose down --volumes

docker/shell:
	docker compose exec api bash

docker/logs/api:
	docker compose logs -f api

docker/logs/database:
	docker compose logs -f database

docker/start:
	make docker/up
	make docker/logs/api

docker/restart:
	make docker/stop
	make docker/up
	make docker/logs/api

docker/clear_logs:
	echo "" > $(docker inspect --format='{{.LogPath}}' api)
	make docker/logs

docker/recreate_all_containers:
	make docker/down
	make docker/up
	make docker/logs/api

# Example of creating a migrations file from cli: make migrations/create_migrations_file -e name=create_users
migrations/create_migrations_file:
	yarn knex migrate:make "${name}" -x ts

migrations/run_all_migrations:
	docker compose exec api yarn knex migrate:latest

migrations/rollback_latest_migrations_batch:
	docker compose exec api yarn knex migrate:rollback

migrations/rollback_all_migrations:
	docker compose exec api yarn knex migrate:rollback
