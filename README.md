# Node.js x AWS x Github Action

## Node.js backend application

### Codebase structure

```
├── __tests__
│ ├── api.v1.user.create.fixture.ts
│ ├── api.v1.user.create.spec.ts
├── apis
│ ├── api.v1.user.create.ts
├── core
│ ├── server.ts
│ ├── types.ts
│ ├── postgres-service.ts
├── types
│ ├── api.v1.user.ts
├── main.ts
```

### Testing APIs

```sh
curl -X POST http://localhost:3004/api/api.v1.user.create -H "Content-Type: application/json" -d '{"name":"name" }'

curl -X POST http://localhost:3004/api/api.v1.user.getList -H "Content-Type: application/json" -d '{"q":"name"}'
```

## Setup AWS services

### Create a new EC2 instance

- Application and OS Images:

  - Ubuntu Server 24.04 LTS (HVM), SSD Volume Type

  - Architecture: 64-bit (x86)

- Allow HTTPS traffic from the internet: true

- Allow HTTP traffic from the internet: true

- Install Docker

```sh
sudo apt-get update && sudo apt-get install docker.io -y && sudo systemctl start docker && sudo chmod 666 /var/run/docker.sock &&sudo systemctl enable docker

docker --version
```

- Setup github runner in EC2 instance

https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/adding-self-hosted-runners#adding-a-self-hosted-runner-to-a-repository

### Create an Elastic load balancer

### Create a new S3 bucket

### Create a Relational Database Service

### Create a ElasticCache Service

## Github action and setup a github runner on EC2

### Build and push docker image

```sh
docker build -t quochuydev/myapp-backend .

docker push quochuydev/myapp-backend:latest
```
