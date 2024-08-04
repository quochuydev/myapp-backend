# Node.js x AWS x Github Action

## Node.js backend application

### Codebase structure

### Testing APIs

```sh
curl -X POST http://localhost:3004/api/api.v1.user.create -H "Content-Type: application/json" -d '{"name":"name" }'

curl -X POST http://localhost:3004/api/api.v1.user.getList -H "Content-Type: application/json" -d '{"q":"name"}'
```

## Setup AWS services

- Create a new EC2 instance
- Create a new S3 bucket
- Create a Relational Database Service
- Create a ElasticCache Service

## Github action and setup a github runner on EC2

### Build and push docker image

```sh
docker build -t quochuydev/myapp-backend .

docker push quochuydev/myapp-backend:latest
```

### Setup github runner in EC2 instance

## Local development

### Setup local redis

```sh
docker run -d --name redis -p 6379:6379 redis:7.2
```

### Setup local postgres

```sh
docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=1 postgres:14.2
```
