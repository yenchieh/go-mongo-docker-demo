build:
	cd view/site && ng build -prod && cd ../..
d-build:
	docker-compose build
d-push:
	docker login && docker push jack08300/mongo_project
