.PHONY: setup-dev
setup-dev: build up vendor compile-dev stats

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: vendor
vendor:
	docker-compose exec app composer install

.PHONY: stats
stats:
	docker-compose ps

.PHONY: compile-dev
compile-dev:
	docker-compose exec app yarn install
	docker-compose exec app yarn encore dev

.PHONY: compile-watch
compile-watch:
	docker-compose exec app yarn encore dev --watch
